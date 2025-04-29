import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email) {
            return res.status(401).json({ message: "Please enter your email!" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email!" });
        }

        if (!user.password) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return res.status(200).json({ token, user: { ...user.toObject(), password: undefined }, firstTime: true });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ token, user: { ...user.toObject(), password: undefined } });

    } catch (error) {
        console.log("Error in loginUser controller!", error.message);
        return res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};


export const getLoggedInUser = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token" });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findById(decoded.userId).populate("feePackage");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ user }); 
    } catch (error) {
      console.error("getLoggedInUser error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

export const updatePassword = async(req,res) => {
    const {password} = req.body;
    const{userId} = req.params;

    try {
        if(!password) {
            return res.status(401).json({message: "No password was entered!"})
        }

        const Salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, Salt)
        const updatedPassword = await User.findByIdAndUpdate(userId , {password: hashedPassword})

        if(updatedPassword){
            return res.status(200).json({message: "Password updated successfully!"})
        }

    } catch (error) {
        console.log("Error in updatePassword controller! " , error.message)
        return res.status(500).json({message: "Internal server Error!" , error: error.message})
    }
}


export const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};