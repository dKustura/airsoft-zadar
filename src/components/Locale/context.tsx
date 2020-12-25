import React, { useState, createContext, useContext, ReactNode } from 'react';
import { Locale } from './constants';

type State = Locale;
type Dispatch = (prevState: State) => void;
type LocaleProviderProps = { children: ReactNode };

const LocaleStateContext = createContext<State | undefined>(undefined);
const LocaleDispatchContext = createContext<Dispatch | undefined>(undefined);

const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const initialState: State = Locale.croatian;
  const [locale, setLocale] = useState<State>(initialState);

  return (
    <LocaleStateContext.Provider value={locale}>
      <LocaleDispatchContext.Provider value={setLocale}>
        {children}
      </LocaleDispatchContext.Provider>
    </LocaleStateContext.Provider>
  );
};

const useLocaleState = () => {
  const context = useContext(LocaleStateContext);

  if (context === undefined) {
    throw new Error('useLocaleState must be used within a LocaleProvider');
  }

  return context;
};

const useLocaleDispatch = () => {
  const context = useContext(LocaleDispatchContext);

  if (context === undefined) {
    throw new Error('useLocaleDispatch must be used within a LocaleProvider');
  }

  return context;
};

const useLocale = () => {
  return [useLocaleState(), useLocaleDispatch()] as [State, Dispatch];
};

export { LocaleProvider, useLocale };
