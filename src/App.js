import React from "react";
import { AuthProvider } from "./context/AuthProvider";

import Router from "./router";

export default function App() {

    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}