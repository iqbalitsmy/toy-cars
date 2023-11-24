import { createBrowserRouter } from "react-router-dom";
import Home from "../layout/Home";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children: [
            {
                path: "/",
                element: <h2>Hello World 2</h2>
            },
        ]
    },
]);

export default router;