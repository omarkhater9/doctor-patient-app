import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const DoctorHome = () => {
    const [diagnose, setDiagnose] = useState('');
    const [diagnoseError, setDiagnoseError] = useState('');

    const handleValidation = (event) => {
        let formIsValid = true;

        if (!diagnose) {
            formIsValid = false;
            setDiagnoseError("Please write a diagnose first");
            return false;
        } else {
            setDiagnoseError("");
            formIsValid = true;
        }

        return formIsValid;
    };

    const diagnoseSubmit = (e) => {
        e.preventDefault();
        handleValidation();
    };
    return (
        <div>
            <Container>
                <Row className="vh-300 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={10} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="d-flex justify-content-end align-items-center">
                                    <Button variant="link">logout</Button>
                                </div>
                                <div className="mb-3 mt-md-3">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <h2 className="fw-bold mb-2 text-uppercase ">Welcome DR. Momamed</h2>
                                    </div>
                                    <div className="d-flex flex-row justify-content-around mb-5 mt-3">
                                        <h5>26 years old</h5>
                                        <h5>01112233455</h5>
                                        <h5>male</h5>
                                    </div>
                                    <div className="mb-3 border border-2 p-2">
                                        <div className="d-flex justify-content-center align-items-center mb-3">
                                            <h3>Patient Details</h3>
                                        </div>
                                        <Row className="mb-3 d-flex flex-row">
                                            <Col>
                                                <h6>mohamed Ahmed</h6>
                                                <h6>26 years old</h6>
                                                <h6>male</h6>
                                                <h6>O+</h6>
                                            </Col>
                                            <Col>
                                                <h6>suger disease</h6>
                                                Medicines: <h6>male</h6>
                                            </Col>
                                        </Row>
                                        <Form onSubmit={diagnoseSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control as="textarea" rows={3} placeholder="Enter Your Comments" onChange={e => setDiagnose(e.target.value)} />
                                                <small id="diagnoseError" className="text-danger form-text">
                                                    {diagnoseError}
                                                </small>
                                            </Form.Group>
                                            <div className="d-flex justify-content-end">
                                                <Button variant="primary" type="submit">
                                                    Send comment to the patient
                                                </Button>
                                            </div>
                                        </Form>
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

export default DoctorHome;