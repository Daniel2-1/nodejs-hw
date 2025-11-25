import { Segments, Joi } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

export const getAllNotesSchema = {
  [Segments.BODY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Name must be a number',
      'number.min': 'Name should have at least {#limit} characters',
      'number.max': 'Name should have at most {#limit} characters',
    }),
    perPage: Joi.number().integer().min(5).max(20).default(10).messages({
      'number.base': 'Name must be a number',
      'number.min': 'Name should have at least {#limit} characters',
      'number.max': 'Name should have at most {#limit} characters',
    }),
    tag: Joi.string().valid(...TAGS),
  }),
};
// ------------------------------------------
const objectIdValidation = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidation).required(),
  }),
};
// ------------------------------------------
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name should have at least {#limit} characters',
      'any.required': 'Title is required',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Name must be a string',
    }),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().trim().allow(''),
  }),
};
// ------------------------------------------
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidation).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name should have at least {#limit} characters',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Name must be a string',
    }),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
};
