import { MessageDescriptor } from 'react-intl';

export interface BrowserCookieLink {
  label: string;
  translation: MessageDescriptor;
}

export interface LinkDisplay {
  full: string;
  short: string;
}
