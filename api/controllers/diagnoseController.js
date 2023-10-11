import _diagnose from '../models/diagnose.js';
import _User from '../models/user.js';
import nodemailer from 'nodemailer';
import { Error } from '../models/error.js';
import { Response } from '../models/response.js';


export const getDiagnoses = async (req, res, next) => {
    try {
        const diagnoses = await _diagnose.find({ status: true })
        .populate('doctorId')
        .populate('patientId')

        res.status(200).send(Response("200", diagnoses, {}));
    }
    catch (err) {
        return res.status(500).json(
            Response("500", {}, Error("500", err.message))
        );
    }
}

export const postDiagnose = async (req, res, next) => {
    try {
        const { diagnose, doctorId, patientId } = req.body;

        if (!(diagnose && doctorId && patientId)) {
            res.status(400).json(
                Response("400", {}, Error("400", "required input is missing"))
            );
        } else {
            const diagnoseObj = {
                diagnose: diagnose,
                doctorId: doctorId,
                patientId: patientId,
            };

            const diagnose = _diagnose(diagnoseObj);
            const result = await diagnose.save();

            await _User.findOneAndUpdate(
                { $and: [{ _id: patientId }, { status: true }] },
                {
                    $push: {
                        diagnoses: result._id
                    }
                },
                {
                    useFindAndModify: false,
                    new: true
                }
            );
            const patient = _User.findOne({ $and: [{ _id: patientId }, { status: true }] })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'khateromar9@gmail.com',
                    pass: 'khaterO98?'
                }
            });

            const mailOptions = {
                from: 'khateromar9@gmail.com',
                to: patient.email,
                subject: 'Diagnose your profile',
                text: diagnose
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return res.status(201).json(
                Response("201", 'Diagnose have sent to patient', {})
            );
        }
    } catch (err) {
        return res.status(500).json(
            Response("500", {}, Error("500", err.message))
        );
    }
}

