import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [disease, setDisease] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [medicines, setMedicines] = useState("");


    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");

    const handleValidation = (event) => {
        let formIsValid = true;

        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            formIsValid = false;
            setemailError("Email Not Valid");
            return false;
        } else {
            setemailError("");
            formIsValid = true;
        }

        if (!password.match(/^[a-zA-Z]{8,22}$/)) {
            formIsValid = false;
            setpasswordError(
                "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
            );
            return false;
        } else {
            setpasswordError("");
            formIsValid = true;
        }

        return formIsValid;
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        handleValidation();
    };
    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-1 text-uppercase ">Clinic App</h2>
                                    <p className=" mb-3">Please enter data!</p>
                                    <div className="mb-3">
                                        <Form onSubmit={loginSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Control type="text" placeholder="Enter your name" required onChange={(e) => setName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                                                <small id="emailHelp" className="text-danger form-text">
                                                    {emailError}
                                                </small>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                                                <small id="passworderror" className="text-danger form-text">
                                                    {passwordError}
                                                </small>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Control type="text" placeholder="Enter your mobile" value={mobile} required onChange={(e) => setMobile(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Control type="text" placeholder="Enter your age" required onChange={(e) => setAge(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Select onChange={e => setGender(e.target.value)} required>
                                                    <option selected disabled>Select gender</option>
                                                    <option>male</option>
                                                    <option>female</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Select onChange={e => setRole(e.target.value)} required>
                                                    <option selected disabled>Select role</option>
                                                    <option>doctor</option>
                                                    <option>patient</option>
                                                </Form.Select>
                                            </Form.Group>
                                            {role === 'patient' ?
                                                <>
                                                    <div className="border border-3 border-primary mb-3"></div>
                                                    <Form.Group className="mb-3">
                                                        <Form.Control type="text" placeholder="Enter type of disease" required onChange={(e) => setDisease(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Select onChange={e => setBloodType(e.target.value)} required>
                                                            <option selected disabled>Select blood type</option>
                                                            <option>A+</option>
                                                            <option>A-</option>
                                                            <option>B+</option>
                                                            <option>B-</option>
                                                            <option>O+</option>
                                                            <option>O-</option>
                                                            <option>AB+</option>
                                                            <option>AB-</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Control as="textarea" rows={3} placeholder='Medicines you take' required onChange={e => setMedicines(e.target.value)} />
                                                    </Form.Group>
                                                </> : null}
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account?{" "}
                                                <a href="/" className="text-primary fw-bold">
                                                    Sign In
                                                </a>
                                            </p>
                                        </div>
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
export default Register;