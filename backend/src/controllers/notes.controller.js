import noteModel from "../models/notes.model.js";

class NoteController {
    async getAllNotes(req, res, next) {
        try {
            const allNotes = await noteModel.getAllNotes(req.user.id);
            return res.json({ success: 1, data: allNotes });
        } catch (error) {
            next(error);
        }
    }

    async createNote(req, res, next) {
        try {
            const { title, description } = req.body;
            const result = await noteModel.createNewNote(title, description, req.user.id);
            if (result) {
                return res.json({ "success": 1, 'message': 'Note created successfully.' });
            }
            next(new Error('Data not inserted, something went wrong!'));
        } catch (error) {
            next(error);
        }
    }

    async getNoteDetails(req, res, next) {
        try {
            const { id } = req.params;
            const result = await noteModel.getNoteDetails(id, req.user.id);
            if (result.length) {
                return res.json({ "success": 1, 'data': result });
            }
            next(new Error('Note not found.'));
        } catch (error) {
            next(error);
        }
    }

    async deleteNote(req, res, next) {
        try {
            const { id } = req.params;
            const result = await noteModel.deleteNote(id, req.user.id);
            if (result.affectedRows) {
                return res.json({ "success": 1, 'message': 'Note deleted successfully.' });
            }
            next(new Error('Note not found.'));
        } catch (error) {
            next(error);
        }
    }

    async updateNote(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const result = await noteModel.updateNote(id, { title: title, details: description }, req.user.id);
            if (result.affectedRows) {
                return res.json({ "success": 1, 'message': 'Note updated successfully.' });
            }
            next(new Error('Note not found.'));
        } catch (error) {
            next(error);
        }
    }
}
export default new NoteController();