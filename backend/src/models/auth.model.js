import pool from "../db/index.js";

class AuthModel {
    async register(name, email, password) {
        try {
            const sql = "INSERT INTO users (name, email, password) VALUES(?, ?, ?)";
            const [result] = await pool.query(sql, [name, email, password]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
            const [result] = await pool.query(sql, [email]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthModel();