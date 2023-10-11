import React, { useState, useContext } from "react";
import { Col, Button, Row, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";


const PatientHome = () => {
    const { logout, userInfo } = useContext(AuthContext)
    return (
        <div>
            <Container>
                <Row className="vh-300 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={10} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to='/editProfile'> <Button variant="dark">Edit Profile</Button></Link>
                                    <Button variant="link" onClick={()=> logout()}>logout</Button>
                                </div>
                                <div className="mb-3 mt-md-3">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <h2 className="fw-bold mb-2 text-uppercase ">Welcome {userInfo.name}</h2>
                                    </div>
                                    <div className="d-flex flex-row justify-content-around mb-5 mt-3">
                                        <h5>{userInfo.age} years old</h5>
                                        <h5>{userInfo.mobile}</h5>
                                        <h5>{userInfo.gender}</h5>
                                        <h5>{userInfo.bloodType}</h5>
                                        <h5>{userInfo.disease}</h5>
                                    </div>
                                    {(userInfo.diagnoses) ? (userInfo.diagnoses).map((diagnose, index) => (
                                    <div className="mb-3 border border-2 p-2" key={index}>
                                        <div className="d-flex justify-content-center align-items-center mb-3">
                                            <h3>Doctor Diagnose</h3>
                                        </div>
                                        <div className="d-flex flex-row justify-content-around mb-2 mt-3">
                                            <h6>DR. {diagnose.doctorId.name}</h6>
                                            <h6>{diagnose.doctorId.age} years old</h6>
                                            <h6>{diagnose.doctorId.mobile}</h6>
                                            <h6>{diagnose.doctorId.gender}</h6>
                                        </div>
                                        Diagnose: <p>{diagnose.diagnose}</p>
                                    </div>)) : null}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PatientHome;