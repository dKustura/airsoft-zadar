import { PostSchemaType } from './types';

export const DEFAULT_POST_FORM_VALUES: PostSchemaType = {
  title: '',
  content: [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ],
};
