import mongoose from 'mongoose';
import * as dotenv from "dotenv" ;
dotenv.config();

const { MONGO_PASSWORD, MONGO_USER } = process.env;


//MongoDB Connection
export default mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.o16y4ih.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true
    }
)
.then(() => console.log('Connected to db!'))
.catch((err) => {
    console.log(err)
})
    