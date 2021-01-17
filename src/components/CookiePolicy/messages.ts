import { defineMessages } from 'react-intl';

const messages = defineMessages({
  pageTitle: 'Politika kolačića',
});

export const browserCookieLinkMessages = defineMessages({
  chrome: 'https://support.google.com/accounts/answer/61416?hl=hr',
  firefox:
    'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US',
  internetExplorer:
    'https://support.microsoft.com/hr-hr/topic/upravljanje-kola%C4%8Di%C4%87ima-i-njihovo-brisanje-168dab11-0753-043d-7c16-ede5947fc64d',
  opera: 'https://help.opera.com/en/latest/web-preferences/',
  safari: 'https://support.apple.com/hr-hr/guide/safari/sfri11471/mac',
});

export default messages;
