import React from 'react';
import Firebase from './firebase';

const { Provider, Consumer } = React.createContext<Firebase | null>(null);

export type WithFirebase = {
  readonly firebase: Firebase;
};

export const withFirebase = <Props extends object>(
  Component: React.ComponentType<Props>
) => (props: Props) => (
  <Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </Consumer>
);

export { Provider, Consumer };
