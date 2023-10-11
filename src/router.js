import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import EditProfile from "./pages/editProfile";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

const Router = () => {
    const { userToken } = useContext(AuthContext);
    if (userToken !== null) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/editProfile' element={<EditProfile />} />
                </Routes>
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default Router;
