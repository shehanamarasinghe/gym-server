import { db } from "../db.js";

export const storeData = (req, res) => {
  
    const { userdata } = req.body;
    const sql = 'INSERT INTO scanned_data (Userqr) VALUES (?)';
    db.query(sql, [userdata], (err, result) => {
      if (err) {
        console.error('Error storing data in database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log('Data stored in database');
      res.status(200).json({ message: 'Data stored successfully' });
    });
};
