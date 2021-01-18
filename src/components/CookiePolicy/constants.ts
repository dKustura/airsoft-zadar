import { MessageDescriptor } from 'react-intl';
import { browserCookieLinkMessages as messages } from './messages';
import { BrowserCookieLink, LinkDisplay } from './types';

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

export const cookieEducationLinks: { [name: string]: LinkDisplay } = {
  allAboutCOokies: {
    full: 'https://www.allaboutcookies.org',
    short: 'www.allaboutcookies.org',
  },
  yourOnlineChoices: {
    full: 'https://www.youronlinechoices.eu',
    short: 'www.youronlinechoices.eu',
  },
};

export const gaOptOutLink: LinkDisplay = {
  full: 'https://tools.google.com/dlpage/gaoptout',
  short: 'tools.google.com/dlpage/gaoptout',
};
