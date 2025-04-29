import express from "express";
import { loginUser, logoutUser, updatePassword } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js"

const router = express.Router();

router.post("/loginUser" , loginUser)
router.post("/updatePassword/:userId" , auth , updatePassword )
router.post("/logoutUser" , auth , logoutUser)

export default router;