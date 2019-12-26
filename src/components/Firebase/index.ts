import {
  Provider,
  Consumer,
  withFirebase,
  WithFirebaseProps as WithFirebasePropsType,
} from './context';
import Firebase from './firebase';

export default Firebase;

export {
  Provider as FirebaseProvider,
  Consumer as FirebaseConsumer,
  withFirebase,
};

export type WithFirebaseProps = WithFirebasePropsType;
