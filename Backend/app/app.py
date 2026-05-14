from fastapi import FastAPI, HTTPException, Form, Depends, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.orm import declarative_base
from typing import Optional, List
from template import process_plan
from format import process_and_save_colleges_files
from portal_elite_avenue_format import process_and_save_portal_elite_colleges_files
import json
import uvicorn
import os
import re
import socket
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Drive service
SERVICE_ACCOUNT_FILE = 'service_account_credentials.json'
# SERVICE_ACCOUNT_FILE = 'new_credentials.json'
drive_service = Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=['https://www.googleapis.com/auth/drive']
)
service = build('drive', 'v3', credentials=drive_service)

# client drive folders credentials
PARENT_FOLDER_ID = '14OVDlmWHKVBupzcewgqlHUhuX3hDakP6'
regular_plan_SAVE_FOLDER_ID = '1ZlO2UTDZiIzLgV5K3KxL0BVEObh2qEWg'
committed_plan_SAVE_FOLDER_ID = '1Np387cOSQLUhxaypuPpLP3FpFDzqt4_G'
young_plan_SAVE_FOLDER_ID = '1zVfLDjO-UGwog3l2-_MBw4OFCDHq6XvU'
portal_elite_avenue_plan_SAVE_FOLDER_ID = '1bHJ2PbiMUEBwRRHDJGJLHawbBpbT8XXd'

# PARENT_FOLDER_ID = '1EVD6bPtQXnG2EvvIBn9hdQT4tVEXCTvJ'
# regular_plan_SAVE_FOLDER_ID = '1MBaxJlCorSvYsiZ3Ap9t23ni9rM9bjNM'
# committed_plan_SAVE_FOLDER_ID = '1AsbxfpJCuQOIZNJL1yWn-Ii45V_ozGYU'
# young_plan_SAVE_FOLDER_ID = '1iyBeW3VggV20L3n7aZRPxL_rgsLjDRHE'
# portal_elite_avenue_plan_SAVE_FOLDER_ID = '1aY2wUwrSlzjpC106vI9EHGkY3GOPbW2w'

@app.middleware("http")
async def no_cache_middleware(request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

# Database Configuration
DATABASE_URL = "sqlite:///./test.db"  # Replace with your database URL
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Secret Key and Algorithm
SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_if_env_not_set")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Regex Patterns
USERNAME_REGEX = r"^[a-zA-Z0-9_]{3,15}$"  # 3-15 characters, letters, numbers, underscores
PASSWORD_REGEX = r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
# At least 8 characters, one uppercase, one lowercase, one digit, one special character

# Database Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

Base.metadata.create_all(bind=engine)

# Utility Functions
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

# Endpoints
@app.post("/signup")
def signup(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    # Validate username
    if not re.match(USERNAME_REGEX, username):
        raise HTTPException(
            status_code=400,
            detail="Username must be 3-15 characters long, containing only letters, numbers, and underscores."
        )
    # Validate password
    if not re.match(PASSWORD_REGEX, password):
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 8 characters long, contain one uppercase, one lowercase, one digit, and one special character."
        )
    # Check for duplicate username
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=400, detail="Username already exists.")

    # Hash password and save user
    hashed_password = get_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(
        data={"sub": username}, 
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer", "username": username}

@app.post("/login")
def login(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    # Authenticate user
    user = authenticate_user(db, username, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials.")

    # Generate JWT token
    access_token = create_access_token(
        data={"sub": username}, 
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer", "username": username}


def get_drive_items(folder_id):
    query = f"'{folder_id}' in parents"
    results = service.files().list(q=query, fields="files(id, name, mimeType)").execute()
    return results.get('files', [])


@app.get("/group_names", response_model=list)
async def get_group_names():
    """
    Fetch and return only group names and their IDs in ascending order.
    """
    try:
        group_names_data = []

        groups = get_drive_items(PARENT_FOLDER_ID)

        for group in groups:
            if group.get('mimeType') == 'application/vnd.google-apps.folder' and 'name' in group:
                group_name = group['name']
                group_id = group['id']
                group_names_data.append({
                    'id': group_id,
                    'GroupName': group_name
                })

        # Sort the list by 'GroupName' in ascending order
        group_names_data = sorted(group_names_data, key=lambda x: x['GroupName'])

        return group_names_data

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch data: {e}")


@app.get("/filter_group", response_model=dict)
async def get_group_details(group_id: str):
    """
    Fetch and return data for a specific group by its ID.
    """
    try:
        # Fetch all groups
        groups = get_drive_items(PARENT_FOLDER_ID)

        # Find the specified group by ID
        for group in groups:
            if group.get('id') == group_id and group.get('mimeType') == 'application/vnd.google-apps.folder':
                group_name = group['name']
                group_data = {'id': group_id, 'GroupName': group_name, 'Schools': [], 'files': []}

                # Fetch files in the group folder
                group_files = get_drive_items(group_id)
                group_data['files'] = [
                    {'file_name': file['name'], 'file_id': file['id'], 'mimeType': file['mimeType']}
                    for file in group_files
                ]

                # Fetch schools within the group
                schools = [item for item in group_files if item.get('mimeType') == 'application/vnd.google-apps.folder']
                for school in schools:
                    school_name = school['name']
                    school_id = school['id']
                    school_data = {'school_id': school_id, 'school_name': school_name, 'files': []}

                    # Fetch files within the school
                    files = get_drive_items(school_id)
                    for file in files:
                        if 'name' in file:
                            school_data['files'].append({
                                'file_name': file['name'],
                                'file_id': file['id'],
                                'mimeType': file['mimeType']
                            })

                    group_data['Schools'].append(school_data)

                return group_data

        # If group not found
        raise HTTPException(status_code=404, detail="Group not found")

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch group data: {e}")


@app.post("/regular_plan")
async def process_regular_plan_schools(
    group_id: str = Form(...),
    school_ids: Optional[str] = Form(None),
    prompt: Optional[str] = Form(None),
    add_files: Optional[List[UploadFile]] = File(None)
):
    """
    Process specific schools in a group using its ID.
    If no 'school_ids' are provided, process all schools in the group.
    """
    try:
        # Parse school_ids into a list
        if school_ids:
            school_ids = json.loads(school_ids)  # Convert stringified JSON to Python list

        # Simulate fetching group details
        group_data = await get_group_details(group_id)
        if not group_data:
            raise HTTPException(status_code=404, detail="Group data not found")

        group_name = group_data.get("GroupName", "Unknown Group")
        group_files = group_data.get("files", [])
        if not group_files:
            raise HTTPException(status_code=404, detail="No files found in the group folder")

        # Check for .docx files in the group_data
        docx_files = [
            file for file in group_files if file["mimeType"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]

        if len(docx_files) == 0:
            raise HTTPException(
                status_code=404,
                detail="First you need to place the shell of regular plan in the group folder"
            )
        elif len(docx_files) > 1:
            raise HTTPException(
                status_code=400,
                detail="Please add only one .docx file. Multiple files found in the group folder."
            )

        template_file = docx_files[0]  # Only one file will be selected now

        # Filter schools to process
        schools_to_process = []
        all_schools = group_data.get("Schools", [])
        if school_ids:
            schools_to_process = [
                school for school in all_schools
                if school.get("school_id") in school_ids
            ]
            if not schools_to_process:
                valid_ids = [school.get("school_id") for school in all_schools]
                raise HTTPException(
                    status_code=404,
                    detail=f"No valid schools found for the provided IDs. Available IDs: {valid_ids}"
                )
        else:
            # Process all schools if no specific IDs are provided
            schools_to_process = all_schools

        # Organize files by type and prepare response data
        response_data = {}
        for school in schools_to_process:
            pdf_files = []
            docx_files = []
            for file in school["files"]:
                if file["mimeType"] == "application/pdf":
                    pdf_files.append({
                        "file_name": file["file_name"],
                        "file_id": file["file_id"]
                    })
                elif file["mimeType"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    docx_files.append({
                        "file_name": file["file_name"],
                        "file_id": file["file_id"]
                    })

            response_data[school["school_name"]] = {
                "files": {
                    "pdf_files": pdf_files,
                    "docx_files": docx_files
                }
            }

        schools_data = {
            "group_name": group_name,
            "schools": response_data
        }
        
        processed_data = {group_name: process_plan(schools_data, template_file, prompt, add_files)}
        uploaded_files = process_and_save_colleges_files(processed_data, regular_plan_SAVE_FOLDER_ID, service)

        return {"status": "Successfully Generated", "saved_files": uploaded_files}

    except HTTPException as http_exc:
        # Return HTTPException as is
        raise http_exc
    except Exception as e:
        # Catch any other unexpected errors
        return {"status": "Error", "detail": f"An unexpected error occurred: {str(e)}"}



@app.post("/committed_plan")
async def process_committed_plan_schools(
    group_id: str = Form(...),
    school_ids: Optional[str] = Form(None),
    prompt: Optional[str] = Form(None),
    add_files: Optional[List[UploadFile]] = File(None)
):
    """
    Process specific schools in a group using its ID.
    If no 'school_ids' are provided, process all schools in the group.
    """
    try:
        # Parse school_ids into a list
        if school_ids:
            school_ids = json.loads(school_ids)  # Convert stringified JSON to Python list

        # Simulate fetching group details
        group_data = await get_group_details(group_id)
        if not group_data:
            raise HTTPException(status_code=404, detail="Group data not found")

        group_name = group_data.get("GroupName", "Unknown Group")
        group_files = group_data.get("files", [])
        if not group_files:
            raise HTTPException(status_code=404, detail="No files found in the group folder")

        # Check for .docx files in the group_data
        docx_files = [
            file for file in group_files if file["mimeType"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]

        if len(docx_files) == 0:
            raise HTTPException(
                status_code=404,
                detail="First you need to place the shell of committed plan in the group folder"
            )
        elif len(docx_files) > 1:
            raise HTTPException(
                status_code=400,
                detail="Please add only one .docx file. Multiple files found in the group folder."
            )

        template_file = docx_files[0]  # Only one file will be selected now

        # Filter schools to process
        schools_to_process = []
        all_schools = group_data.get("Schools", [])
        if school_ids:
            schools_to_process = [
                school for school in all_schools
                if school.get("school_id") in school_ids
            ]
            if not schools_to_process:
                valid_ids = [school.get("school_id") for school in all_schools]
                raise HTTPException(
                    status_code=404,
                    detail=f"No valid schools found for the provided IDs. Available IDs: {valid_ids}"
                )
        else:
            # Process all schools if no specific IDs are provided
            schools_to_process = all_schools

        # Organize files by type and prepare response data
        response_data = {}
        for school in schools_to_process:
            pdf_files = []
            docx_files = []
            for file in school["files"]:
                if file["mimeType"] == "application/pdf":
                    pdf_files.append({
                        "file_name": file["file_name"],
                        "file_id": file["file_id"]
                    })
                elif file["mimeType"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    docx_files.append({
                        "file_name": file["file_name"],
                        "file_id": file["file_id"]
                    })

            response_data[school["school_name"]] = {
                "files": {
                    "pdf_files": pdf_files,
                    "docx_files": docx_files
                }
            }

        schools_data = {
            "group_name": group_name,
            "schools": response_data
        }

        processed_data = {group_name: process_plan(schools_data, template_file, prompt, add_files)}
        uploaded_files = process_and_save_colleges_files(processed_data, committed_plan_SAVE_FOLDER_ID, service)

        return {"status": "Successfully Generated", "saved_files": uploaded_files}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.post("/young_plan")
async def process_young_plan_schools(
    group_id: str = Form(...),
    school_ids: Optional[str] = Form(None),
    prompt: Optional[str] = Form(None),
    add_files: Optional[List[UploadFile]] = File(None)
):
    """
    Process specific schools in a group using its ID.
    If no 'school_ids' are provided, process all schools in the group.
    """
    try:
        # Parse school_ids into a list
        if school_ids:
            school_ids = json.loads(school_ids)  # Convert stringified JSON to Python list

        # Simulate fetching group details
        group_data = await get_group_details(group_id)
        if not group_data:
            raise HTTPException(status_code=404, detail="Group data not found")

        group_name = group_data.get("GroupName", "Unknown Group")
        group_files = group_data.get("files", [])
        if not group_files:
            raise HTTPException(status_code=404, detail="No files found in the group folder")

        # Check for .docx files in the group_data
        docx_files = [
            file for file in group_files if file["mimeType"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]

        if len(docx_files) == 0:
            raise HTTPException(
                status_code=404,
                detail="First you need to place the shell of young plan in the group folder"
            )
        elif len(docx_files) > 1:
            raise HTTPException(
                status_code=400,
                detail="Please add only one .docx file. Multiple files found in the group folder."
            )

        template_file = docx_files[0]  # Only one file will be selected now

        # Filter schools to process
        schools_to_process = []
        all_schools = group_data.get("Schools", [])
        if school_ids:
            schools_to_process = [
                school for school in all_schools
                if school.get("school_id") in school_ids
            ]
            if not schools_to_process:
                valid_ids = [school.get("school_id") for school in all_schools]
                raise HTTPException(
                    status_code=404,
                    detail=f"No valid schools found for the provided IDs. Available IDs: {valid_ids}"
                )
        else:
            # Process all schools if no specific IDs are provided
            schools_to_process = all_schools

        # Organize files by type and prepare response data
        response_data = {}
        for school in schools_to_process:
            pdf_files = []
            docx_files = []
            for file in school["files"]:
                if file["mimeType"] == "application/pdf":
                    pdf_files.append({
                        "file_name": file["file_name"],
                        "file_id": file["file_id"]
                    })
                elif file["mimeType"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    docx_files.append({
                        "file_name": file["file_name"],
                        "file_id": file["file_id"]
                    })

            response_data[school["school_name"]] = {
                "files": {
                    "pdf_files": pdf_files,
                    "docx_files": docx_files
                }
            }

        schools_data = {
            "group_name": group_name,
            "schools": response_data
        }

        processed_data = {group_name: process_plan(schools_data, template_file, prompt, add_files)}
        uploaded_files = process_and_save_colleges_files(processed_data, young_plan_SAVE_FOLDER_ID, service)

        return {"status": "Successfully Generated", "saved_files": uploaded_files}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    


@app.post("/portal_elite_avenue_plan")
async def process_portal_elite_avenue_plan_schools(
    group_id: str = Form(...),
    school_ids: Optional[str] = Form(None),
    prompt: Optional[str] = Form(None),
    add_files: Optional[List[UploadFile]] = File(None)
):
    """
    Process specific schools in a group using its ID.
    If no 'school_ids' are provided, process all schools in the group.
    """
    try:
        # Parse school_ids into a list
        if school_ids:
            school_ids = json.loads(school_ids)

        # Simulate fetching group details
        group_data = await get_group_details(group_id)
        if not group_data:
            raise HTTPException(status_code=404, detail="Group data not found")

        group_name = group_data.get("GroupName", "Unknown Group")
        group_files = group_data.get("files", [])
        if not group_files:
            raise HTTPException(status_code=404, detail="No files found in the group folder")

        # Check for .docx files in the group_data
        docx_files = [
            file for file in group_files if file["mimeType"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]

        if len(docx_files) == 0:
            raise HTTPException(
                status_code=404,
                detail="First you need to place the shell of regular plan in the group folder"
            )
        elif len(docx_files) > 1:
            raise HTTPException(
                status_code=400,
                detail="Please add only one .docx file. Multiple files found in the group folder."
            )

        template_file = docx_files[0]

        # Filter schools to process
        schools_to_process = []
        all_schools = group_data.get("Schools", [])
        if school_ids:
            schools_to_process = [
                school for school in all_schools
                if school.get("school_id") in school_ids
            ]
            if not schools_to_process:
                valid_ids = [school.get("school_id") for school in all_schools]
                raise HTTPException(
                    status_code=404,
                    detail=f"No valid schools found for the provided IDs. Available IDs: {valid_ids}"
                )
        else:
            # Process all schools if no specific IDs are provided
            schools_to_process = all_schools

        # Organize files by type and prepare response data
        response_data = {}
        for school in schools_to_process:
            pdf_files = []
            docx_files = []
            for file in school["files"]:
                if file["mimeType"] == "application/pdf":
                    pdf_files.append({
                        "file_name": file["file_name"],
                        "file_id": file["file_id"]
                    })
                elif file["mimeType"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    docx_files.append({
                        "file_name": file["file_name"],
                        "file_id": file["file_id"]
                    })

            response_data[school["school_name"]] = {
                "files": {
                    "pdf_files": pdf_files,
                    "docx_files": docx_files
                }
            }

        schools_data = {
            "group_name": group_name,
            "schools": response_data
        }
        
        processed_data = {group_name: process_plan(schools_data, template_file, prompt, add_files)}
        uploaded_files = process_and_save_portal_elite_colleges_files(processed_data, portal_elite_avenue_plan_SAVE_FOLDER_ID, service)

        return {"status": "Successfully Generated", "saved_files": uploaded_files}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return {"status": "Error", "detail": f"An unexpected error occurred: {str(e)}"}



@app.get("/regular_plan_preview")
async def fetch_docs_from_drive():
    """
    Fetches folders (representing schools) and their associated .docx files from Google Drive (SAVE_FOLDER_ID).
    Returns a structured response in JSON format, where each group contains school folders,
    and inside each school folder, there are .docx files.
    """
    try:
        # Initialize the response data structure
        response_data = []

        # Get the groups (folders) inside the SAVE_FOLDER_ID
        groups = get_drive_items(regular_plan_SAVE_FOLDER_ID)

        for group in groups:
            if group.get('mimeType') == 'application/vnd.google-apps.folder' and 'name' in group:
                group_name = group['name']
                group_id = group['id']
                group_data = {
                    "id": group_id,
                    "GroupName": group_name,
                    "Schools": []
                }

                # Fetch school folders inside the group
                schools = get_drive_items(group_id)
                for school in schools:
                    if school.get('mimeType') == 'application/vnd.google-apps.folder' and 'name' in school:
                        school_name = school['name']
                        school_id = school['id']
                        school_data = {
                            "school_id": school_id,
                            "school_name": school_name,
                            "docx_files": []
                        }

                        # Fetch .docx files inside the school folder
                        files = get_drive_items(school_id)
                        for file in files:
                            if 'name' in file and file['mimeType'] == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                school_data['docx_files'].append({
                                    "file_name": file['name'],
                                    "file_id": file['id']
                                })

                        # Add school data to the group
                        group_data["Schools"].append(school_data)

                # Add group data to the response
                response_data.append(group_data)

        return response_data

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        error_message = f"Failed to fetch .docx files: {str(e)}"
        raise HTTPException(status_code=500, detail=error_message)


@app.get("/committed_plan_preview")
async def fetch_docs_from_drive():
    """
    Fetches folders (representing schools) and their associated .docx files from Google Drive (SAVE_FOLDER_ID).
    Returns a structured response in JSON format, where each group contains school folders,
    and inside each school folder, there are .docx files.
    """
    try:
        # Initialize the response data structure
        response_data = []

        # Get the groups (folders) inside the SAVE_FOLDER_ID
        groups = get_drive_items(committed_plan_SAVE_FOLDER_ID)

        for group in groups:
            if group.get('mimeType') == 'application/vnd.google-apps.folder' and 'name' in group:
                group_name = group['name']
                group_id = group['id']
                group_data = {
                    "id": group_id,
                    "GroupName": group_name,
                    "Schools": []
                }

                # Fetch school folders inside the group
                schools = get_drive_items(group_id)
                for school in schools:
                    if school.get('mimeType') == 'application/vnd.google-apps.folder' and 'name' in school:
                        school_name = school['name']
                        school_id = school['id']
                        school_data = {
                            "school_id": school_id,
                            "school_name": school_name,
                            "docx_files": []
                        }

                        # Fetch .docx files inside the school folder
                        files = get_drive_items(school_id)
                        for file in files:
                            if 'name' in file and file['mimeType'] == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                school_data['docx_files'].append({
                                    "file_name": file['name'],
                                    "file_id": file['id']
                                })

                        # Add school data to the group
                        group_data["Schools"].append(school_data)

                # Add group data to the response
                response_data.append(group_data)

        return response_data

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        error_message = f"Failed to fetch .docx files: {str(e)}"
        raise HTTPException(status_code=500, detail=error_message)


@app.get("/young_plan_preview")
async def fetch_docs_from_drive():
    """
    Fetches folders (representing schools) and their associated .docx files from Google Drive (SAVE_FOLDER_ID).
    Returns a structured response in JSON format, where each group contains school folders,
    and inside each school folder, there are .docx files.
    """
    try:
        # Initialize the response data structure
        response_data = []

        # Get the groups (folders) inside the SAVE_FOLDER_ID
        groups = get_drive_items(young_plan_SAVE_FOLDER_ID)

        for group in groups:
            if group.get('mimeType') == 'application/vnd.google-apps.folder' and 'name' in group:
                group_name = group['name']
                group_id = group['id']
                group_data = {
                    "id": group_id,
                    "GroupName": group_name,
                    "Schools": []
                }

                # Fetch school folders inside the group
                schools = get_drive_items(group_id)
                for school in schools:
                    if school.get('mimeType') == 'application/vnd.google-apps.folder' and 'name' in school:
                        school_name = school['name']
                        school_id = school['id']
                        school_data = {
                            "school_id": school_id,
                            "school_name": school_name,
                            "docx_files": []
                        }

                        # Fetch .docx files inside the school folder
                        files = get_drive_items(school_id)
                        for file in files:
                            if 'name' in file and file['mimeType'] == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                school_data['docx_files'].append({
                                    "file_name": file['name'],
                                    "file_id": file['id']
                                })

                        # Add school data to the group
                        group_data["Schools"].append(school_data)

                # Add group data to the response
                response_data.append(group_data)

        return response_data

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        error_message = f"Failed to fetch .docx files: {str(e)}"
        raise HTTPException(status_code=500, detail=error_message)
    

@app.get("/portal_elite_avenue_plan_preview")
async def fetch_docs_from_drive():
    """
    Fetches folders (representing schools) and their associated .docx files from Google Drive (SAVE_FOLDER_ID).
    Returns a structured response in JSON format, where each group contains school folders,
    and inside each school folder, there are .docx files.
    """
    try:
        # Initialize the response data structure
        response_data = []

        # Get the groups (folders) inside the SAVE_FOLDER_ID
        groups = get_drive_items(portal_elite_avenue_plan_SAVE_FOLDER_ID)

        for group in groups:
            if group.get('mimeType') == 'application/vnd.google-apps.folder' and 'name' in group:
                group_name = group['name']
                group_id = group['id']
                group_data = {
                    "id": group_id,
                    "GroupName": group_name,
                    "Schools": []
                }

                # Fetch school folders inside the group
                schools = get_drive_items(group_id)
                for school in schools:
                    if school.get('mimeType') == 'application/vnd.google-apps.folder' and 'name' in school:
                        school_name = school['name']
                        school_id = school['id']
                        school_data = {
                            "school_id": school_id,
                            "school_name": school_name,
                            "docx_files": []
                        }

                        # Fetch .docx files inside the school folder
                        files = get_drive_items(school_id)
                        for file in files:
                            if 'name' in file and file['mimeType'] == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                school_data['docx_files'].append({
                                    "file_name": file['name'],
                                    "file_id": file['id']
                                })

                        # Add school data to the group
                        group_data["Schools"].append(school_data)

                # Add group data to the response
                response_data.append(group_data)

        return response_data

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        error_message = f"Failed to fetch .docx files: {str(e)}"
        raise HTTPException(status_code=500, detail=error_message)
    

def main():
    """Entry point"""
    # Get the local machine's IP address (assuming you're on the same network)
    host = socket.gethostbyname(socket.gethostname())  # Get the local IP
    uvicorn.run("app:app", host=host, port=8005, reload=True)

if __name__ == "__main__":
    main()
