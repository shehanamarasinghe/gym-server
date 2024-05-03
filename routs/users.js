import express from "express";
import { Paymentget, Userpayments, deleteUser, getUserById, showUsers, updateUserDetails, updateUserStatus } from "../controllers/users.js";

const router = express.Router();

router.get("/", showUsers);
router.put("/:id/status", updateUserStatus);
router.delete('/:id', deleteUser);
router.get('/user/:id', getUserById);
router.put('/:id', updateUserDetails);
router.post("/Payments",Userpayments)
router.get("/memberPayments/:userId",Paymentget)


export default router;
