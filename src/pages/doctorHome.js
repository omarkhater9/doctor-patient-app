import React, { useContext, useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { GetMethod, PostMethod } from "../assets/APIs";
import { AuthContext } from "../context/AuthProvider";
import Swal from 'sweetalert2';

const DoctorHome = () => {
    const { logout, userInfo } = useContext(AuthContext)

    const [diagnose, setDiagnose] = useState('');
    const [patients, setPatients] = useState([]);

    const [diagnoseError, setDiagnoseError] = useState('');

    useEffect(() => {
        const getPatients = async () => {
            try {
                const res = await GetMethod({
                    url: 'user/allPatients'
                })
                setPatients(res.body)
                console.log(res.body)
            } catch (err) {
                console.log(err)
            }
        }
        getPatients();
    }, [])
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const sendComment = async (patientId) => {
        try {
            const res = await PostMethod({
                url: 'diagnose/postdiagnose',
                body: {
                    diagnose: diagnose,
                    doctorId: userInfo._id,
                    patientId: patientId
                },
            })
            Toast.fire({
                icon: 'success',
                title: 'Your diagnose have been Sent'
            })
            setDiagnose('')
        } catch (err) {
            Toast.fire({
                icon: 'error',
                title: `${err?.response.data.error.message}`
            })
        }
    }
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
                                    <Button variant="link" onClick={() => logout()}>logout</Button>
                                </div>
                                <div className="mb-3 mt-md-3">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <h2 className="fw-bold mb-2 text-uppercase ">Welcome DR. {userInfo.name}</h2>
                                    </div>
                                    <div className="d-flex flex-row justify-content-around mb-5 mt-3">
                                        <h5>{userInfo.age} years old</h5>
                                        <h5>{userInfo.mobile}</h5>
                                        <h5>{userInfo.gender}</h5>
                                    </div>
                                    {patients ?
                                        patients.map((patient, index) => (
                                            <div className="mb-3 border border-2 p-2" key={index}>
                                                <div className="d-flex justify-content-center align-items-center mb-3">
                                                    <h3>Patient Details</h3>
                                                </div>
                                                <Row className="mb-3 d-flex flex-row">
                                                    <Col>
                                                        <h6>{patient.name}</h6>
                                                        <h6>{patient.age} years old</h6>
                                                        <h6>{patient.gender}</h6>
                                                        <h6>{patient.bloodType}</h6>
                                                    </Col>
                                                    <Col>
                                                        <h6>{patient.disease}</h6>
                                                        Medicines: <h6>{patient.medicines}</h6>
                                                    </Col>
                                                </Row>
                                                <Form onSubmit={diagnoseSubmit}>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Control value={diagnose} as="textarea" rows={3} placeholder="Enter Your Comments" onChange={e => setDiagnose(e.target.value)} />
                                                        <small id="diagnoseError" className="text-danger form-text">
                                                            {diagnoseError}
                                                        </small>
                                                    </Form.Group>
                                                    <div className="d-flex justify-content-end">
                                                        <Button variant="primary" type="submit" onClick={()=> sendComment(patient._id)}>
                                                            Send comment to the patient
                                                        </Button>
                                                    </div>
                                                </Form>
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

export default DoctorHome;