import {createBrowserRouter, Navigate } from "react-router-dom"
import Home from "./pages/Home/home"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import ProductDetails from "./pages/Product/ProductDetails"
import Card from "./pages/Card/card"
import App from "./App"
import UpdateItem from "./pages/Manage-products/updateItem"
import AddItem from "./pages/Manage-products/addItem"
import DeleteItem from "./pages/Manage-products/deleteItem"
import ManageProducts from "./pages/Manage-products/manageProducts"


export const routs = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: ":id",
                element: <ProductDetails />
            },
            {
                path: "/card",
                element: <Card />
            },
            {
                path: "/Manage-products",
                children: [
                    {
                        path: "",
                        element: <ManageProducts />
                    },
                    {
                        path: "add",
                        element: <AddItem />
                    },
                    {
                        path: ":id",
                        element: <UpdateItem/>
                    },
                    

                ]
            },
        ]
    },
    {
        path: "*",
        element: <Navigate to={"/"}/>
    }
    
])