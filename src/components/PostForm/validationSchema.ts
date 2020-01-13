import * as yup from 'yup';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_CONTENT_LENGTH,
  MAX_CONTENT_LENGTH,
} from './constants';

export const postSchema = yup.object({
  title: yup
    .string()
    .min(
      MIN_TITLE_LENGTH,
      `Title must be at least ${MIN_TITLE_LENGTH} characters long.`
    )
    .max(
      MAX_TITLE_LENGTH,
      `Title must be at most ${MAX_TITLE_LENGTH} characters long.`
    )
    .required('Title is required.'),
  content: yup
    .string()
    .min(
      MIN_CONTENT_LENGTH,
      `Post must be at least ${MIN_CONTENT_LENGTH} characters long.`
    )
    .max(
      MAX_CONTENT_LENGTH,
      `Post must be at most ${MAX_CONTENT_LENGTH} characters long.`
    )
    .required('Title is required.'),
});
