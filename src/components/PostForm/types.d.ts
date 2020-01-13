import * as yup from 'yup';
import { postSchema } from './validationSchema';

export type PostForm = yup.InferType<typeof postSchema>;
