import express from "express";
import multer from "multer";
import { db } from "../db.js";
import path from "path";

export const AddMeal = (req, res) => {
    const insertMeal = "INSERT INTO mealplan (MealTitle, MealDesc, sunb,monb,tueb,wenb,thub,frib,satb,sunl,monl,tuel,wenl,thul,fril,satl,sund,mond,tued,wend,thud,frid,satd,Cardio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.MTitle, req.body.MDescription, req.body.SunBreak, req.body.MonBreak, req.body.TueBreak, req.body.WenBreak,
        req.body.ThuBreak,req.body.FriBreak,req.body.SatBreak,req.body.SunLun,req.body.MonLun,req.body.TueLun,req.body.WenLun,
        req.body.ThuLun,req.body.FriLun,req.body.SatLun,req.body.SunDinner,req.body.MonDinner,req.body.TueDinner,req.body.WenDinner,
        req.body.ThuDinner,req.body.FriDinner,req.body.SatDinner,req.body.Userc];


    db.query(insertMeal, values, (err, result) => {
      if (err) {
        console.error("Error inserting meal:", err);
        return res.status(500).json({ error: "Failed to add meal" });
      }
      return res.status(200).json({ message: "Meal has been added successfully" });
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

// export const getMealNames = async (req, res) => {
//     try {
//       console.log("Check one");
//       const rows = await db.query('SELECT * FROM meals');
//         res.json(rows);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
// };

// export const getMealNames = async (req, res) => {
//     try {
//         // Query to retrieve all meal names from the database
//         const query = 'SELECT MealName FROM meals';

//         // Execute the query
//         const rows = await db.query(query);

//         // Extracting only the meal names from the rows
//         const mealNames = rows.map(row => row.MealName);

//         // Send the extracted meal names as the response
//         res.json(mealNames);
//     } catch (err) {
//         // Handle errors
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// };


// exports.getAllMealNames = async (req, res) => {
    // try {
    //     // Query to retrieve all meal names from the database
    //     const query = 'SELECT MealName FROM meals';

    //     // Execute the query
    //     const rows = await db.query(query);

    //     // Extract meal names from the query result
    //     const mealNames = rows.map(row => row.MealName);

    //     // Send the meal names in the response
    //     res.json(mealNames);
    // } catch (err) {
    //     // Handle errors
    //     console.error(err);
    //     res.status(500).json({ error: 'Server error' });
    // }
// };

export const showMeals = (req, res) => {
    const query = "SELECT MealName FROM meals";
    db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};

export const showmealcard = (req, res) => {
const sql = 'SELECT MealPlanid, MealTitle, MealDesc FROM mealplan';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
};

export const Mealassign = async (req, res) => {
    const userId = req.body.userId; 
    const mealPlanId = req.body.mealPlanId;

    try {
        const result = await db.query('INSERT INTO usermeal (userid,mealid) VALUES (?,?)', [userId, mealPlanId]);

        res.status(201).json({ message: 'Meal added successfully' });
    } catch (error) {
        console.error('Error adding meal:', error);
        res.status(500).json({ error: 'An error occurred while adding the meal' });
    }
};



export const Memberassign = async (req, res) => {

    const userId = req.params.userId;

    const query = `
      SELECT mealplan.*
      FROM mealplan
      JOIN usermeal ON mealplan.MealPlanid = usermeal.mealid
      WHERE usermeal.userid = ?;
    `;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching user meal plan' });
      } else {
        res.json(results);
      }
    });


};