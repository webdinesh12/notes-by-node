import express from "express";
import noteController from "../controllers/notes.controller.js";
import { validate } from "../middleware/validate.js";
import { createNoteSchema } from "../validations/noteValidation.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/", noteController.getAllNotes);
router.post("/", validate(createNoteSchema), noteController.createNote);
router.get("/:id", noteController.getNoteDetails);
router.delete("/:id", noteController.deleteNote);
router.put("/:id", validate(createNoteSchema), noteController.updateNote);

export default router;
