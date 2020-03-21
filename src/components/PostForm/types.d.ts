import * as yup from 'yup';
import { postSchema } from './validation/schema';

export type PostForm = yup.InferType<typeof postSchema>;
