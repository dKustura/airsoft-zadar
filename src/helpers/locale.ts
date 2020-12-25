import { Locale } from 'components/Locale';

export const countryLanguageCodeMap: {
  [countryCode: string]: Locale;
} = {
  gb: Locale.english,
};

export const languageCountryCodeMap: {
  [languageCode: string]: string;
} = {
  [Locale.english]: 'gb',
};

export const getLanguageCodeForCountry = (countryCode: string) => {
  const languageCode = countryLanguageCodeMap[countryCode];
  return languageCode || countryCode;
};

export const getCountryCodeForLanguage = (locale: Locale) => {
  const countryCode = languageCountryCodeMap[locale];
  return countryCode || locale;
};
