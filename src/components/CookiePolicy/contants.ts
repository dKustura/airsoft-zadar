import { MessageDescriptor } from 'react-intl';
import { browserCookieLinkMessages as messages } from './messages';
import { BrowserCookieLink } from './types';

export const browserCookieLinks: BrowserCookieLink[] = [
  {
    label: 'Chrome',
    translation: messages.chrome as MessageDescriptor,
  },
  {
    label: 'Firefox',
    translation: messages.firefox as MessageDescriptor,
  },
  {
    label: 'Internet Explorer',
    translation: messages.internetExplorer as MessageDescriptor,
  },
  {
    label: 'Opera',
    translation: messages.opera as MessageDescriptor,
  },
  {
    label: 'Safari',
    translation: messages.safari as MessageDescriptor,
  },
];
