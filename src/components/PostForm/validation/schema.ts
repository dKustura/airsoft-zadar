import * as yup from 'yup';
import { Node } from 'slate';

import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_CONTENT_LENGTH,
  MAX_CONTENT_LENGTH,
  INVALID_CONTENT_MESSAGE,
} from './constants';
import { getNodesLength } from './helpers';

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
    .array()
    .of(yup.object<Node>())
    .test('content-test', INVALID_CONTENT_MESSAGE, (nodes: Node[]) => {
      const contentLength = getNodesLength(nodes);
      return (
        contentLength >= MIN_CONTENT_LENGTH &&
        contentLength <= MAX_CONTENT_LENGTH
      );
    }),
});
