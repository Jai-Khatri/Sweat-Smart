import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const ConnectToDB = async() => {
    try {
        await mongoose.connect(MONGO_URL);

        console.log("MONGODB cluster connected at:- " , mongoose.connection.host)

    } catch (error) {
        console.log("Failed to connect to MONGODB server! " , error.message)
    }
}

export default ConnectToDB;