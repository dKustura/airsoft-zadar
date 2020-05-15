import * as React from 'react';
import Firebase from './firebase';
import { Optionalize } from 'types';

const { Provider, Consumer } = React.createContext<Firebase | null>(null);

export type WithFirebaseProps = {
  readonly firebase: Firebase;
};

export const withFirebase = <Props extends WithFirebaseProps>(
  Component: React.ComponentType<Props>
) => (props: Optionalize<Props, WithFirebaseProps>) => (
  <Consumer>
    {(firebase) => <Component {...(props as Props)} firebase={firebase} />}
  </Consumer>
);

export { Provider, Consumer };
