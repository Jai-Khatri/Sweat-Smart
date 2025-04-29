import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, loginAdmin, updateMember } from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/login" , loginAdmin)
router.post("/createUser" , createUser)
router.post("/deleteUser" , deleteUser)
router.get("/getAllUsers" , getAllUsers)
router.get("/getUserById/:userId" , getUserById)
router.put("/updateMember/:userId" , auth, updateMember)

export default router;