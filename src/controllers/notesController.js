import mongoose from 'mongoose';
import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// app.get('/notes', (req, res) => {
//   res.status(200).json({
//     message: 'Retrieved all notes',
//   });
// });

// app.get('/notes/:noteId', (req, res) => {
//   const { noteId } = req.params;
//   res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
// });

export const getAllNotes = async (req, res) => {
  const note = await Note.find();
  res.status(200).json(note);
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;

  if (!mongoose.isValidObjectId(noteId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const note = await Note.findById(noteId);

  if (!note) {
    next(createHttpError(400, 'Note not found'));
  }

  res.status(200).json(note);
};

export const createNote = (req, res) => {
  const note = Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  if (!mongoose.isValidObjectId(noteId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const note = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    next(createHttpError(400, 'Note not found'));
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  if (!mongoose.isValidObjectId(noteId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const note = await Note.findByIdAndUpdate({ _id: noteId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!note) {
    next(createHttpError(400, 'Note not found'));
  }

  res.status(200).json(note);
};
