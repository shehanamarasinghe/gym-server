
import express from "express"
import { AddMeal } from "../controllers/Mealplan.js";


const router = express.Router()

router.post("/MemberMeal", AddMeal);

  export default router;