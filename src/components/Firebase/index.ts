import {
  Provider,
  Consumer,
  withFirebase,
  WithFirebaseProps as WithFirebasePropsType,
  useFirebase,
} from './context';
import Firebase, { FirebaseInstance } from './firebase';

export default Firebase;

export {
  Provider as FirebaseProvider,
  Consumer as FirebaseConsumer,
  withFirebase,
  useFirebase,
  FirebaseInstance,
};

export type WithFirebaseProps = WithFirebasePropsType;
