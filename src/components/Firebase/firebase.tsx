import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './config';

class Firebase {
  public emailAuthProvider: typeof firebase.auth.EmailAuthProvider;
  public auth: firebase.auth.Auth;
  public db: firebase.firestore.Firestore;
  public googleProvider: firebase.auth.GoogleAuthProvider;
  public facebookProvider: firebase.auth.FacebookAuthProvider;
  public twitterProvider: firebase.auth.TwitterAuthProvider;

  constructor() {
    firebase.initializeApp(firebaseConfig);

    /* Helper */
    this.emailAuthProvider = firebase.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = firebase.auth();
    this.db = firebase.firestore();

    /* Social Sign In Method Provider */

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
    this.twitterProvider = new firebase.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () => {
    if (
      process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT &&
      this.auth.currentUser
    ) {
      this.auth.currentUser.sendEmailVerification({
        url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      });
    }
  };

  doPasswordUpdate = (password: string) => {
    this.auth.currentUser?.updatePassword(password);
  };

  onAuthUserListener = (
    next: (user: firebase.User) => void,
    fallback: () => void
  ) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // TODO: fix This next operation is forbidden
        // this.user(authUser.uid)
        //   .once('value')
        //   .then(snapshot => {
        // const dbUser = snapshot.val();

        // // default empty roles
        // if (!dbUser.roles) {
        //   dbUser.roles = {};
        // }

        // // merge auth and db user
        // authUser = {
        //   uid: authUser.uid,
        //   email: authUser.email,
        //   emailVerified: authUser.emailVerified,
        //   providerData: authUser.providerData,
        //   ...dbUser,
        // };

        //   console.log('authUser', authUser);
        //   next(authUser);
        // });
        next(authUser);
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = (uid: string) => this.users().doc(`${uid}`);

  users = () => this.db.collection('users');
}

export default Firebase;
