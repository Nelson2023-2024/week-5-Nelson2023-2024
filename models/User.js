// models/User.js
const db = require('../db');
const bcrypt = require('bcryptjs');

class User {
    static async create(username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO Users (username, password) VALUES (?, ?)';
            const [result] = await db.query(query, [username, hashedPassword]);
            return result.insertId;
        } catch (err) {
            throw new Error('Error creating user: ' + err.message);
        }
    }

    static async findByUsername(username) {
        try {
            const query = 'SELECT * FROM Users WHERE username = ?';
            const [results] = await db.query(query, [username]);
            return results[0];
        } catch (err) {
            throw new Error('Error finding user: ' + err.message);
        }
    }
}

module.exports = User;
