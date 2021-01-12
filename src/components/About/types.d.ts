import { MessageDescriptor } from 'react-intl';

export interface AboutProfile {
  id: number;
  name: string;
  imageUrl: string;
  description: MessageDescriptor;
  pathDescription: string;
}
