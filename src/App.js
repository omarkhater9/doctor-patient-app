import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import EditProfile from "./pages/editProfile";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

export default function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/editProfile' element={<EditProfile />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}