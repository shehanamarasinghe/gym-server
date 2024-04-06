//Backend Controllers Mealplan.js

import { db } from "../db.js";


export const AddMeal = (req, res) => {
  

        const insertQuery = "INSERT INTO mealplan (MealTitle) VALUES (?)";

        const values = [
            req.body.Mtitle,
           
        ];

        db.query(insertQuery, values, (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Meal plan has been added");
        });
   
};


export const Meal = (req, res) => {
  



const insertMeal = "INSERT INTO meals (Mealid) VALUES (?)";

    const value = [
        req.body.MID,
       
    ];

    db.query(insertMeal, value, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Meal has been added");
    });
};