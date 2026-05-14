// import { Link } from "react-router";
// import { Button } from "./ui/button";

function NotFound() {
  return (
    <div className="bg-sidebar h-screen flex justify-center items-center text-sidebar-foreground">
      <div className="flex flex-col items-center gap-4" >
        <img src="/404-computer.svg" alt="404" />
        <div className="text-center text-4xl " >404 Page not Found</div>
        {/* <Button variant="dark" >
            <Link to={"/"} >
            Back to Home
            </Link>
        </Button> */}
      </div>
    </div>
  );
}

export default NotFound;
