import { createReducer, ActionType } from 'typesafe-actions';

import { SET_LOCALE } from 'actions/constants';
import { localeActions } from 'actions';
import { Locales } from './constants';

export type LocaleState = {
  locale: string;
};

export type LocaleAction = ActionType<typeof localeActions>;

const initialState: LocaleState = {
  locale: Locales.croatian,
};

export default createReducer<LocaleState, LocaleAction>(
  initialState
).handleAction(SET_LOCALE, (state, action) => {
  return { ...state, locale: action.payload.locale };
});
