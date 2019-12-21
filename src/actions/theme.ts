import { createAction } from 'typesafe-actions';
import { TOGGLE_THEME } from './constants';

export const toggleTheme = createAction(TOGGLE_THEME, action => {
  return () => action();
});
