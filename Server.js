const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup"
});

app.post('/Register', (req, res) => {
  const { firstname, lastname, username, address, email, phoneNo, gender, age, weight, height, password } = req.body;

  const sql = "INSERT INTO login (Firstname, Lastname, UserName, Address, Email, PhoneNo, Gender, Age, Weight, Height, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    firstname,
    lastname,
    username,
    address,
    email,
    phoneNo,
    gender, 
    age,
    weight,
    height,
    password
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Error inserting data" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});


app.post('/Login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM login WHERE Email = ? AND Password = ?";

  db.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error("Error querying data:", err);
      return res.status(500).json({ error: "Error querying data" });
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

app.listen(8081, () => {
  console.log("Listening....");
});