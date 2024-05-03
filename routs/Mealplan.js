import express from "express";
import { AddMeal, Meal, Mealassign, Memberassign, showMeals, showmealcard, uploadMealImage } from "../controllers/Mealplan.js";

const router = express.Router();

router.post("/mealplan", AddMeal);
router.post("/meal", Meal);
router.post("/upload",uploadMealImage); 
router.get('/', showMeals);
router.get("/Mealcard",showmealcard)
router.post("/assignmeal", Mealassign);
router.get("/Memberassign/:userId", Memberassign)

export default router;
