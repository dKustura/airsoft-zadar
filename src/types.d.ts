import { StateType } from 'typesafe-actions';
import rootReducer from 'reducers';

export type RootState = StateType<typeof rootReducer>;

type Optionalize<T extends K, K> = Omit<T, keyof K>;

type OptionalArgTuple<T = undefined> = T extends undefined ? [] : [T];

interface User extends firebase.User {
  roles?: {
    [key: string]: boolean;
  };
}
