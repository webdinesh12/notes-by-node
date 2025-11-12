import AuthModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

class AuthController {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const encPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));
            const dupResult = await AuthModel.getUserByEmail(email);
            if (dupResult.length) {
                return res.json({ 'success': 0, 'message': "This email is already registred with us." });
            }
            const result = await AuthModel.register(name, email, encPassword);
            if (result.insertId) {
                return res.json({ 'success': 1, 'message': "Registration successfull." });
            }
            next(new Error("Something went wrong."));
        } catch (error) {
            next(error);
        }
    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            let user = await AuthModel.getUserByEmail(email);
            user = user[0] || {};
            if (!user.id) {
                return res.json({ 'success': 0, 'message': 'Invalid credentials.' });
            }
            const isCorrectPassword = bcrypt.compare(password, user.password);
            if (!isCorrectPassword) {
                return res.json({ 'success': 0, 'message': 'Invalid credentials.' });
            }
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            return res.json({ 'success': 1, 'data': { 'token': token } });
        } catch (error) {
            next(error);
        }
    }
}
export default new AuthController();