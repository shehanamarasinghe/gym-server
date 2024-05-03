import { db } from "../db.js";
import path from "path";
import express from "express";

export const workouts = (req, res) => {
    const insertMeal = "INSERT INTO workouts (workoutname,workdesc,Usercategory) VALUES (?,?,?)";
    const value = [req.body.MSTitle, req.body.MDescription, req.body.WSUser,];
    db.query(insertMeal, value, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Meal has been added");
    });
};

export const showworkouts = (req, res) => {
    const query = "SELECT workoutname FROM workouts";
    db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};



export const Addworkout = (req, res) => {
    const insertWorkout = "INSERT INTO workoutplan (Title, Discription,DayOneArms1,DayOneArms2,DayOneArms3,DayOneArms4,DayOneArms5,DayOneLegs1,DayOneLegs2,DayOneLegs3,DayOneLegs4,DayOneLegs5,DayTwoChest1,DayTwoChest2,DayTwoChest3,DayTwoChest4,DayTwoChest5,DayTwoshoulder1,DayTwoshoulder2	,DayTwoshoulder3,DayTwoshoulder4,DayTwoshoulder5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.MTitle, req.body.MDescription, req.body.DoneA1, req.body.DoneA2, req.body.DoneA3, req.body.DoneA4
        , req.body.DoneA5, req.body.DoneL1, req.body.DoneL2, req.body.DoneL3, req.body.DoneL4, req.body.DoneL5, req.body.DtwoA1
        , req.body.DtwoA2, req.body.DtwoA3, req.body.DtwoA4, req.body.DtwoA5, req.body.DtwoL1, req.body.DtwoL2, req.body.DtwoL3, req.body.DtwoL4, req.body.DtwoL5];



    db.query(insertWorkout, values, (err, result) => {
      if (err) {
        console.error("Error inserting meal:", err);
        return res.status(500).json({ error: "Failed to add meal" });
      }
      return res.status(200).json({ message: "Meal has been added successfully" });
    });
  };

  export const ShowWorkoutcard = (req, res) => {
    const sql = 'SELECT Workoutid, Title, Discription FROM workoutplan';
      db.query(sql, (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(result);
        }
      });
    };


    export const Workoutassign = async (req, res) => {
        const userId = req.body.userId; 
        const Workoutid = req.body.Workoutid;
    
        try {
            const result = await db.query('INSERT INTO userworkout (userid ,workoutid) VALUES (?,?)', [userId, Workoutid]);
    
            res.status(201).json({ message: 'Workout added successfully' });
        } catch (error) {
            console.error('Error adding Workout:', error);
            res.status(500).json({ error: 'An error occurred while adding the meal' });
        }
    };