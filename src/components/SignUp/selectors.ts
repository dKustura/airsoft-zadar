import { createSelector } from 'reselect';
import { RootState } from 'types';

export const selectLocaleState = (state: RootState) => state.locale;

export const selectLocale = createSelector(
  selectLocaleState,
  (localeState) => localeState.locale
);
