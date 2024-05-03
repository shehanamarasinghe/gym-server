import express from "express";
import { Addworkout, ShowWorkoutcard, Workoutassign, showworkouts, workouts } from "../controllers/Workout.js";

const router = express.Router();

router.post("/", workouts );
router.post("/Works", Addworkout)
router.get('/SW', showworkouts);
router.get('/workoutcard', ShowWorkoutcard);
router.post("/assingworkout",Workoutassign)





export default router;