import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const admin = await User.findOne({ email });

        if (!admin || admin.role !== "admin") {
            return res.status(401).json({ message: "Invalid admin credentials!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid admin credentials!" });
        }

        const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({ token, user: { ...admin.toObject(), password: undefined } });

    } catch (error) {
        console.error("Error in loginAdmin controller:", error.message);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const createUser = async (req, res) => {
    const { name, email, role, phone, address, feePackage, password } = req.body;

    try {
        if (!name || !email || !role || !phone || !address) {
            return res.status(400).json({ message: "All the essential credentials are required!" });
        }

        if (role === "user" && !feePackage) {
            return res.status(400).json({ message: "Fee package is required for users!" });
        }

        if (role === "admin" && feePackage) {
            return res.status(400).json({ message: "Admin users should not have a fee package!" });
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        let hashedPassword = null;

        if (role === "admin") {
            if (!password) {
                return res.status(400).json({ message: "Password is required for admin users!" });
            }
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const newUser = await User.create({
            name,
            email,
            role,
            phone,
            address,
            ...(role === "user" && { feePackage }),
            password: hashedPassword, 
        });

        res.status(201).json({ user: newUser, message: "User created successfully!" });

    } catch (error) {
        console.error("Error in createUser controller!", error.message);
        res.status(500).json({ message: "Server error occurred!", error: error.message });
    }
};



export const deleteUser = async(req,res) => {
    const {email} = req.body;

    try {
        
        if(!email){
            return res.status(401).json({message: "Email is required in order to delete the user!"})
        }

        const userDeleted = await User.findOneAndDelete({email})

        if(userDeleted){
            return res.status(200).json({message: "User deleted successfully!"})
        }
        
    } catch (error) {
        console.log("Error in deleteUser controller! " , error.message)
        res.status(500).json({message: "Server error occured!" , error: error.message})
    }
}

export const getAllUsers = async(req,res) => {
    try {
        const users = await User.find();

        return res.status(200).json({users: users})

    } catch (error) {
        console.log("Error in getAllUsers controller! " , error.message)
        return res.status(500).json({message: "Internal Server Error! " , error: error.message})
    }
}

export const getUserById = async (req, res) => {
    const { userId } = req.params; 
  
    try {
      const user = await User.findById(userId).select("-password"); 
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      res.status(500).json({ message: "Server error occurred!", error: error.message });
    }
  };

export const updateMember = async (req, res) => {
    const { userId } = req.params; 
    const { feePackage, dietPlan } = req.body; 
    const adminId = req.userId; 

    try {

        const admin = await User.findById(adminId);
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized! Only admins can update members." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        if (user.role === "admin" && feePackage) {
            return res.status(400).json({ message: "Admins cannot have a fee package!" });
        }

        user.feePackage = feePackage !== undefined ? feePackage : user.feePackage;
        user.dietPlan = dietPlan !== undefined ? dietPlan : user.dietPlan;

        await user.save();

        res.status(200).json({ 
            message: "Member updated successfully!", 
            user 
        });

    } catch (error) {
        console.error("Error in updateMember controller:", error.message);
        res.status(500).json({ message: "Server error occurred!", error: error.message });
    }
};
