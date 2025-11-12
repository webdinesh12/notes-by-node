import pool from "../db/index.js";

class NoteModel {
    async getAllNotes(user_id = null) {
        try {
            const [rows] = await pool.query("SELECT * FROM notes WHERE user_id = ?", [user_id]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async createNewNote(title, description, user_id) {
        try {
            const sql = "INSERT INTO notes (title, details, user_id, created_at) VALUES (?, ?, ?, NOW())";
            const [result] = await pool.query(sql, [title, description, user_id]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getNoteDetails(id, user_id = null) {
        try {
            const sql = "SELECT * FROM notes WHERE id = ? AND user_id = ? LIMIT 1";
            const [result] = await pool.query(sql, [id, user_id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteNote(id, user_id = null) {
        try {
            const sql = "DELETE FROM notes WHERE id = ? AND user_id = ?";
            const [result] = await pool.query(sql, [id, user_id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateNote(id, data = {}, user_id = null) {
        try {
            let sql = "UPDATE notes SET title = ?, details = ? WHERE id = ? AND user_id = ?";
            const [result] = await pool.query(sql, [data.title, data.details, id, user_id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default new NoteModel();