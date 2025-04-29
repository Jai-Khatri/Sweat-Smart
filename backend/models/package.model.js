import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, enum: ["1 Month" , "3 Months" , "6 Months" , "1 Year" , "2 Years"],  required: true },
}, { timestamps: true , versionKey: false });

const feePackage = mongoose.model("feePackage", PackageSchema);

export default feePackage;
