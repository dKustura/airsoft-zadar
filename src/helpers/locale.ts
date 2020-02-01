export const countryLanguageCodeMap: {
  [countryCode: string]: string;
} = {
  gb: 'en',
};

export const languageCountryCodeMap: {
  [languageCode: string]: string;
} = {
  en: 'gb',
};

export const getLanguageCodeForCountry = (countryCode: string) => {
  const languageCode = countryLanguageCodeMap[countryCode];
  return languageCode || countryCode;
};

export const getCountryCodeForLanguage = (languageCode: string) => {
  const countryCode = languageCountryCodeMap[languageCode];
  return countryCode || languageCode;
};
