// models/Expense.js
const db = require('../db');

class Expense {
    static async add(userId, amount, date, category) {
        try {
            const query = 'INSERT INTO Expenses (user_id, amount, date, category) VALUES (?, ?, ?, ?)';
            const [result] = await db.query(query, [userId, amount, date, category]);
            return result.insertId;
        } catch (err) {
            throw new Error('Error adding expense: ' + err.message);
        }
    }

    static async getAll(userId) {
        try {
            const query = 'SELECT * FROM Expenses WHERE user_id = ?';
            const [results] = await db.query(query, [userId]);
            return results;
        } catch (err) {
            throw new Error('Error retrieving expenses: ' + err.message);
        }
    }

    static async update(id, userId, amount, date, category) {
        try {
            const query = 'UPDATE Expenses SET amount = ?, date = ?, category = ? WHERE id = ? AND user_id = ?';
            await db.query(query, [amount, date, category, id, userId]);
        } catch (err) {
            throw new Error('Error updating expense: ' + err.message);
        }
    }

    static async delete(id, userId) {
        try {
            const query = 'DELETE FROM Expenses WHERE id = ? AND user_id = ?';
            await db.query(query, [id, userId]);
        } catch (err) {
            throw new Error('Error deleting expense: ' + err.message);
        }
    }
}

module.exports = Expense;
