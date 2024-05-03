import { db } from "../db.js";

export const showUsers = (req, res) => {
    const query = "SELECT userid, UserName, Email, Age, Status FROM login";
    db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};

export const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
       
        await db.query('UPDATE login SET status = ? WHERE userid = ?', [status, id]);
        
    
        res.json({ success: true, message: 'User status updated successfully' });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ success: false, message: 'Error updating user status' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
       
        await db.query('DELETE FROM login WHERE userid = ?', [id]);

        
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
      
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
};


export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await db.query('SELECT * FROM login WHERE userid = ?', [id]);
      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user[0]);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  export const updateUserDetails = async (req, res) => {
    const { id } = req.params;
    const { name, username, email, phoneNumber, address, weight, height } = req.body;
    try {
      await db.query(
        'UPDATE login SET Firstname = ?, UserName = ?, Email = ?, PhoneNo = ?, Address = ?, Weight = ?, Height = ? WHERE userid = ?',
        [name, username, email, phoneNumber, address, weight, height, id]
      );
      res.json({ message: 'User details updated successfully' });
    } catch (error) {
      console.error('Error updating user details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };




  export const Userpayments = async (req, res) => {
    const { userID, Amount, Month } = req.body; 
  
    try {
      const result = await db.query('INSERT INTO payments (userid, Amount, Month) VALUES (?, ?, ?)', [userID, Amount, Month]);
      res.status(201).json({ message: 'Payment added successfully' });
    } catch (error) {
      console.error('Error adding payment:', error);
      res.status(500).json({ error: 'An error occurred while adding the payment' });
    }
  };


  export const Paymentget = async (req, res) => {

    const userId = req.params.userId;

    const query = `
      SELECT * FROM payments WHERE userid = ?`;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching user meal plan' });
      } else {
        res.json(results);
      }
    });

  

  };