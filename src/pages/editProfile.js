import React, { useContext, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthProvider";

const EditProfile = () => {
    const { userInfo, submitData } = useContext(AuthContext)
    const [email, setEmail] = useState(userInfo.email);
    const [mobile, setMobile] = useState(userInfo.mobile);
    const [disease, setDisease] = useState(userInfo.disease);
    const [bloodType, setBloodType] = useState(userInfo.bloodType);
    const [medicines, setMedicines] = useState(userInfo.medicines);

    const [emailError, setemailError] = useState("");
    const UpdateBody = {
        email: email,
        mobile: mobile,
        bloodType: bloodType,
        disease: disease,
        medicines: medicines
    }

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

        return formIsValid;
    };

    const submit = (e) => {
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
                                <div className="mb-3 mt-md-2">
                                    <Link to='/'><Button variant="link">Go Back</Button></Link>
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <h2 className="fw-bold mb-2 text-uppercase ">Welcome Momamed</h2>
                                        <p className=" mb-3">Update your data</p>
                                    </div>
                                    <div className="mb-3">
                                        <Form onSubmit={submit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control type="email" value={email} placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                                                <small id="emailHelp" className="text-danger form-text">
                                                    {emailError}
                                                </small>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Control type="text" value={mobile} placeholder="Enter your mobile" required onChange={(e) => setMobile(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Control type="text" value={disease} placeholder="Enter type of disease" required onChange={(e) => setDisease(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Select defaultValue='Select blood type' value={bloodType} onChange={e => setBloodType(e.target.value)} required>
                                                    <option disabled>Select blood type</option>
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
                                                <Form.Control value={medicines} as="textarea" rows={3} placeholder='Medicines you take' required onChange={e => setMedicines(e.target.value)} />
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit" onClick={() => submitData(UpdateBody, userInfo._id)}>
                                                    Submit
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
    )
}
export default EditProfile;