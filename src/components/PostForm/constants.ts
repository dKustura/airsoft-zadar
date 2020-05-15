import { PostSchemaType } from './types';

export const INITIAL_POST_FORM_VALUES: PostSchemaType = {
  title: '',
  content: [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ],
};
