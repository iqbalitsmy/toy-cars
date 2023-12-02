import { Button } from "flowbite-react";
import { Link } from "react-router-dom";


const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <Link to={'/'}>
                <Button color="failure"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg> Home</Button>
            </Link>
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600">Oops! The page you are looking for might be in another castle.</p>
                <img
                    src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg"
                    alt="Illustration of a lost astronaut"
                    className="mt-8 rounded-lg shadow-md"
                />
            </div>
        </div>
    );
};

export default PageNotFound;