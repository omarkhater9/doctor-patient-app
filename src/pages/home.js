import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import DoctorHome from "./doctorHome";
import PatientHome from "./patientHome";

const Home = () => {
    const { userRole } = useContext(AuthContext)
    if(userRole === 'doctor') {
        return(
            <DoctorHome/>
        );
    } else {
        return (
            <PatientHome />
        )
    }
}

export default Home;