import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim:true},
    password: {type: String, required: true, trim:true},
    mobile: {type: String, required:true, trim:true},
    email: {type: String, required:true, trim:true},
    role: {type: String, required:true, trim:true},
    gender: {type: String, required:true, trim:true},
    age: {type: String, required:true, trim:true},
    disease: {type: String, required:true, trim:true},
    bloodType: {type: String, required:true, trim:true},
    medicines: {type: String, required:true, trim:true},
    diagnoses: {type: [mongoose.Schema.Types.ObjectId], ref:'Diagnose'},
    token: {type: String, required:true, trim:true},
    status: {type: Boolean, default: true},
    entryDate: {type: Date, default:Date.now}
});
const User = mongoose.model('User', userSchema);
export default User;