import express from "express";
import { createPackage, deletePackage, getAllPackages, getPackage } from "../controllers/package.controller.js";

const router = express.Router();

router.post("/createPackage" , createPackage)
router.delete("/deletePackage/:packageId" , deletePackage)
router.get("/getAllPackages" , getAllPackages)
router.get("/:id", getPackage);
  

export default router;