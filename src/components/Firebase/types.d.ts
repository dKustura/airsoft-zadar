import { Node } from 'slate';

export interface Post {
  readonly title: string;
  readonly content: Node[];
  readonly thumbnailUrl?: string;
}
