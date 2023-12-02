import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layouts/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddToys from "../Pages/AddToys/AddToys";
import MyToys from "../Pages/MyToys/MyToys";
import PrivateRoute from "./PrivateRoute";
import AllToys from "../Pages/AllToys/AllToys";
import ToysDetails from "../Shared/ToysDetails/ToysDetails";
import MyToyUpdate from "../Pages/MyToys/MyToyUpdate/MyToyUpdate";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'add-toys',
                element: <PrivateRoute><AddToys></AddToys></PrivateRoute>
            },
            {
                path: 'my-toys',
                element: <PrivateRoute><MyToys></MyToys></PrivateRoute>,
            },
            {
                path: 'toys/update/:id',
                element: <PrivateRoute><MyToyUpdate></MyToyUpdate></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/toys/${params.id}`, {
                    method: "GET",
                    headers: {
                        'content-type': "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('toy-cars-token')}`,
                    }
                })
            },
            {
                path: 'toys',
                element: <AllToys></AllToys>,
            },
            {
                path: 'toys/:id',
                element: <PrivateRoute><ToysDetails></ToysDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/toys/${params.id}`, {
                    method: "GET",
                    headers: {
                        'content-type': "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('toy-cars-token')}`,
                    }
                })
            },
        ]
    },
    {
        path: "*",
        element: <PageNotFound></PageNotFound>
    }
]);

export default router;