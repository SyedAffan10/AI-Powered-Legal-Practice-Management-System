FROM python:3.9

# Create and set the working directory
RUN mkdir /app
WORKDIR /app

# Copy the requirements file first to install dependencies
COPY app/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app files into the container
COPY app /app

# Run the application
CMD ["python", "app.py"]
