import { createAction } from 'typesafe-actions';
import { SET_LOCALE } from './constants';

export const setLocale = createAction(SET_LOCALE, (action) => {
  return (locale: string) => action({ locale });
});
