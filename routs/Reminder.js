import express from "express";
import { createReminder } from "../controllers/Reminder.js";

const router = express.Router();

router.post("/Reminder", createReminder);

export default router