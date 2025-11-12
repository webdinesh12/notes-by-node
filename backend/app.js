import express from "express";
import cors from "cors";
import morgan from "morgan";
import notesRoutes from "./src/routes/notes.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
const allowedOrigins = ["http://localhost:5173"];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/auth", authRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    return res.json({
        success: 0,
        message: err.message || 'Something went wrong.'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});