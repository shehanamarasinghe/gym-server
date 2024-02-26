import express from "express"
import { login, logout, register, getQRCode } from "../controllers/auth.js";
const router = express.Router()

router.post("/Register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/qr-code/:userId", getQRCode); 

export default router