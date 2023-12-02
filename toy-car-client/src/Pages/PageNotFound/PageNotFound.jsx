

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
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