import Joi from "joi";

export const createNoteSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 3 characters",
            "string.max": "Title cannot exceed 100 characters"
        }),
    description: Joi.string().trim().min(5).max(500).required()
        .messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 5 characters",
            "string.max": "Description cannot exceed 500 characters"
        })
});
