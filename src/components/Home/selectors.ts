import { createSelector } from 'reselect';
import { RootState } from 'types';

export const selectThemeState = (state: RootState) => state.theme;

export const selectThemeMode = createSelector(
  selectThemeState,
  (themeState) => themeState.mode
);
