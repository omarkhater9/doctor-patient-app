import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const PatientHome = () => {
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
                                    <Button variant="link">logout</Button>
                                </div>
                                <div className="mb-3 mt-md-3">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <h2 className="fw-bold mb-2 text-uppercase ">Welcome Momamed</h2>
                                    </div>
                                    <div className="d-flex flex-row justify-content-around mb-5 mt-3">
                                        <h5>26 years old</h5>
                                        <h5>01112233455</h5>
                                        <h5>male</h5>
                                        <h5>A+</h5>
                                        <h5>suger disease</h5>
                                    </div>
                                    <div className="mb-3 border border-2 p-2">
                                        <div className="d-flex justify-content-center align-items-center mb-3">
                                            <h3>Doctor Diagnose</h3>
                                        </div>
                                        <div className="d-flex flex-row justify-content-around mb-2 mt-3">
                                            <h6>DR. Ahmed Mohemed</h6>
                                            <h6>26 years old</h6>
                                            <h6>01112233455</h6>
                                            <h6>male</h6>
                                        </div>
                                        Diagnose: <p>diagnoseskdvnnnnnnnlvkjwewbchsjajcnskanscbcj shgegsbchbxhc</p>
                                    </div>
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