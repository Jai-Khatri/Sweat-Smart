import Package from "../models/package.model.js";
import mongoose from "mongoose";

export const createPackage = async (req, res) => {
    const { name, price, duration } = req.body;

    try {
        if (!name || !price || !duration) {
            return res.status(400).json({ message: "Enter all the essential info to create the package" });
        }

        const newPackage = await Package.create({ name, price, duration });

        if (newPackage) {
            return res.status(201).json({
                success: true,
                message: "Successfully created new Package!",
                package: newPackage,
            });
        }

        return res.status(500).json({ message: "Failed to create package" });

    } catch (error) {
        console.log("Error in createPackage controller!", error.message);
        return res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
};

export const deletePackage = async (req, res) => {
    const { packageId } = req.params;

    try {
        const deletedPackage = await Package.findOneAndDelete({ _id: packageId });

        if (!deletedPackage) {
            return res.status(404).json({ message: "Package not found!" });
        }

        return res.status(200).json({ success: true, message: "Package deleted successfully!" });

    } catch (error) {
        console.log("Error in deletePackage controller!", error.message);
        return res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
};

export const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find({});

        if (!packages || packages.length === 0) {
            return res.status(404).json({ success: false, message: "No packages found." });
        }

        return res.status(200).json({ success: true, packages: packages });
    } catch (error) {
        console.error("Error fetching packages:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export const getPackage = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid package ID format" });
    }
  
    try {
      const pkg = await Package.findById(id);
      if (!pkg) return res.status(404).json({ message: "Package not found" });
  
      res.status(200).json({
        name: pkg.name,
        duration: pkg.duration,
        price: pkg.price,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

