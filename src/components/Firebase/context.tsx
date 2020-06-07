import * as React from 'react';
import { useContext } from 'react';
import Firebase from './firebase';
import { Optionalize } from 'types';

// @ts-ignore
const FirebaseContext = React.createContext<Firebase>();

export type WithFirebaseProps = {
  readonly firebase: Firebase;
};

export const withFirebase = <Props extends WithFirebaseProps>(
  Component: React.ComponentType<Props>
) => (props: Optionalize<Props, WithFirebaseProps>) => (
  <FirebaseContext.Consumer>
    {(firebase: Firebase) => (
      <Component {...(props as Props)} firebase={firebase} />
    )}
  </FirebaseContext.Consumer>
);

export const useFirebase = (): Firebase => useContext(FirebaseContext);

export const { Provider, Consumer } = FirebaseContext;
