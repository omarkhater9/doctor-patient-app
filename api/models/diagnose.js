import mongoose from 'mongoose';

const diagnoseSchema = new mongoose.Schema({
    diagnose: {type: String, required: true, trim:true},
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    patientId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    status: {type: Boolean, default: true},
    entryDate: {type: Date, default:Date.now}
});

const Diagnose = mongoose.model('Diagnose', diagnoseSchema);

export default Diagnose;