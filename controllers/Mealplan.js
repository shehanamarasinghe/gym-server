import express from "express";
import multer from "multer";
import { db } from "../db.js";
import path from "path";

export const AddMeal = (req, res) => {
    const insertQuery = "INSERT INTO mealplan (MealTitle) VALUES (?)";
    const values = [req.body.Mtitle];

    db.query(insertQuery, values, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Meal plan has been added");
    });
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({
    storage: storage
}).single('image');

export const uploadMealImage = (req, res) => {
    const image = req.file.filename;
    const ImageValue = "INSERT INTO meals (MImage) VALUES (?)";
    db.query(ImageValue, [image], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Meal image has been added");
    });
};

export const Meal = (req, res) => {
    const insertMeal = "INSERT INTO meals (MealName,MealDesc) VALUES (?,?)";
    const value = [req.body.MTitle, req.body.MDescription];
    db.query(insertMeal, value, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Meal has been added");
    });
};

export const getMealNames = async (req, res) => {
    try {
      console.log("Check one");
      const rows = await db.query('SELECT * FROM meals');
        res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};