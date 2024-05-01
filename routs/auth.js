
import express from "express";
import { Mlogin, logout, register, getQRCode, generateQRCode } from "../controllers/auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", Mlogin);
router.post("/logout", logout);
router.get("/qr-code/:userId", getQRCode);
router.post("/qr-code/:userId", generateQRCode);


export default router;
