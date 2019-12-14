import { Provider, Consumer, withFirebase } from './context';
import Firebase from './firebase';

export default Firebase;

export {
  Provider as FirebaseProvider,
  Consumer as FirebaseConsumer,
  withFirebase,
};
