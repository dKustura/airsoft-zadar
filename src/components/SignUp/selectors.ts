import { createSelector } from 'reselect';
import { RootState } from 'types';

export const selectLocaleState = (state: RootState) => state.locale;

export const selectSessionState = (state: RootState) => state.session;

export const selectLocale = createSelector(
  selectLocaleState,
  (localeState) => localeState.locale
);

export const selectAuthUser = createSelector(
  selectSessionState,
  (sessionState) => sessionState.authUser
);
