import {
  Provider,
  Consumer,
  withFirebase,
  WithFirebaseProps as WithFirebasePropsType,
  useFirebase,
} from './context';
import Firebase from './firebase';

export default Firebase;

export {
  Provider as FirebaseProvider,
  Consumer as FirebaseConsumer,
  withFirebase,
  useFirebase,
};

export type WithFirebaseProps = WithFirebasePropsType;
