export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                const field = detail.path.join(".");
                errors[field] = detail.message.replaceAll("\"", "");
            });
            return res.status(400).json({ 'success': 0, errors });
        }
        next();
    };
};