import { PostForm } from './types';

export const INITIAL_POST_FORM_VALUES: PostForm = {
  title: '',
  content: [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ],
};
