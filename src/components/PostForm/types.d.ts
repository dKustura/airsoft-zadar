import * as yup from 'yup';
import { postSchema } from './validation/schema';

export type PostSchemaType = yup.InferType<typeof postSchema>;
