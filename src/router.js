import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";


const Router = () => {
    const { userToken } = useContext(AuthContext);
    if (userToken !== null) {
        return (
            <BrowserRouter>
                <Routes>
                </Routes>
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Routes>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default Router;
