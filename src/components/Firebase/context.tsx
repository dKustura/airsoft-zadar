import React from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext<Firebase | null>(null);

export type WithFirebase = {
  readonly firebase: Firebase;
};

export const withFirebase = <Props extends object>(
  Component: React.ComponentType<Props>
) => (props: Props) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
