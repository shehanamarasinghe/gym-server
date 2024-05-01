import express from "express";
import { AddMeal, Meal, getMealNames, uploadMealImage } from "../controllers/Mealplan.js";

const router = express.Router();

router.post("/", AddMeal);
router.post("/meal", Meal);
router.post("/upload",uploadMealImage); 
router.get('/', getMealNames);

export default router;
