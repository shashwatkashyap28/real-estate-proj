import express from "express";
import { test } from "../controller/user.controller.js";

const router = express.Router();

// Define your user routes here
router.get("/test", test);
export default router;