//Backend routs Mealplan.js
import express from "express"
import { AddMeal, Meal } from "../controllers/Mealplan.js";


const router = express.Router()

router.post("/", AddMeal);
router.post("/meal", Meal);


  export default router;