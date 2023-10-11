import _User from '../models/user.js'
import jwt from "jsonwebtoken";
import { Error } from '../models/error.js';
import { Response } from '../models/response.js';
import crypto from 'crypto';


export const getAllDoctors = async (req, res, next) => {
    try {
        const doctors = await _User.find({ $and: [{ role: 'doctor' }, { status: true }] })
        res.status(200).send(Response("200", doctors, {}));
    }
    catch (err) {
        return res.status(500).json(
            Response("500", {}, Error("500", err.message))
        );
    }
}
export const getAllPatients = async (req, res, next) => {
    try {
        const patients = await _User.find({ $and: [{ role: 'patient' }, { status: true }] }).populate('reviews')
        res.status(200).send(Response("200", patients, {}));
    }
    catch (err) {
        return res.status(500).json(
            Response("500", {}, Error("500", err.message))
        );
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await _User.findOne({ $and: [{ _id: req.params.id }, { status: true }] })
        if (user) {
            res.status(200).send(
                Response("200", user, {})
            );
        } else {
            res.status(404).send(
                Response("404", {}, Error("404", "there is no such User!"))
            )
        }
    }
    catch (err) {
        return res.status(500).json(
            Response("500", {}, Error("500", err.message))
        );
    }
}

export const registerUser = async (req, res, next) => {
    try {
        const { name, password, mobile, role, email, gender, age, bloodType, disease, medicines } = req.body;

        if (!(name && mobile && password && role && email && gender && age)) {
            res.status(400).json(
                Response("400", {}, Error("400", "required input is missing"))
            );
        } else {
            const hashPassword = crypto.createHash('md5').update(password).digest('hex');

            const oldUser = await _User.findOne({
                $and: [{ email: email }, { mobile: mobile }, { role: role }, { status: true }]
            });

            if (oldUser) {
                return res.status(409).json(
                    Response("409", {}, Error("409", "User Already Exist. Please Login"))
                );
            } else {
                if (role === 'doctor') {
                    const doctorObj = {
                        name: name,
                        password: hashPassword,
                        mobile: mobile,
                        gender: gender,
                        age: age,
                        role: role,
                        email: email,
                    };
                    const token = jwt.sign(
                        { email: email, mobile: mobile, role: role },
                        process.env.TOKEN_KEY
                    );
                    doctorObj.token = token;
                    const user = _User(doctorObj);
                    const result = await user.save();

                    return res.status(201).json(
                        Response("201", result, {})
                    );
                } else {
                    const patientObj = {
                        name: name,
                        password: hashPassword,
                        mobile: mobile,
                        gender: gender,
                        age: age,
                        role: role,
                        email: email,
                        bloodType: bloodType,
                        disease: disease,
                        medicines: medicines
                    };
                    const token = jwt.sign(
                        { email: email, mobile: mobile, role: role },
                        process.env.TOKEN_KEY
                    );
                    patientObj.token = token;
                    const user = _User(patientObj);
                    const result = await user.save();

                    return res.status(201).json(
                        Response("201", result, {})
                    );
                }
            }
        }
    } catch (err) {
        return res.status(500).json(
            Response("500", {}, Error("500", err.message))
        );
    }
}

export const updatePatientData = async (req, res, next) => {
    const { mobile, email, bloodType, disease, medicines } = req.body;

    const user = await _User.findOneAndUpdate(
        { $and: [{ _id: req.params.id }, { status: true }] },
        {
            mobile: mobile,
            email: email,
            bloodType: bloodType,
            disease: disease,
            medicines: medicines
        },
        {
            useFindAndModify: false,
            new: true
        }
    );
    res.send(Response("200", user, {}));
}

export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const hashPassword = crypto.createHash('md5').update(password).digest('hex');

        if (!(email && hashPassword)) {
            return res.status(406).json(
                Response("406", {}, Error("406", "required inputs is missing"))
            );
        }

        const user = await _User.findOne({
            $and: [{ email: email }, { password: hashPassword }, { status: true }]
        })
            .populate('reviews')
        if (user != null) {
            res.status(200).json(Response("200", user, {}));
        } else {
            res.status(404).json(
                Response("404", {}, Error("404", "User not found"))
            )
        }
    } catch (err) {
        return res.status(500).json(
            Response("500", {}, Error("500", err.message))
        );
    }
}