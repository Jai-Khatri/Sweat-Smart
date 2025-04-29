import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {type: String, enum: ["admin" , "user"], required: true},
    phone: { type: String , required: true},
    address: { type: String , required: true},
    feePackage: { type: mongoose.Schema.Types.ObjectId, ref: "feePackage" },
    dietPlan: { type: String }
}, {versionKey: false , timestamps: true})

const User = mongoose.model("user" , userSchema)

export default User;