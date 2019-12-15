import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './config';

class Firebase {
  private serverValue: typeof firebase.database.ServerValue;
  private emailAuthProvider: typeof firebase.auth.EmailAuthProvider;
  private auth: firebase.auth.Auth;
  private db: firebase.database.Database;
  private googleProvider: firebase.auth.GoogleAuthProvider;
  private facebookProvider: firebase.auth.FacebookAuthProvider;
  private twitterProvider: firebase.auth.TwitterAuthProvider;

  constructor() {
    firebase.initializeApp(firebaseConfig);

    /* Helper */

    this.serverValue = firebase.database.ServerValue;
    this.emailAuthProvider = firebase.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = firebase.auth();
    this.db = firebase.database();

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
    if (this.auth.currentUser) {
      this.auth.currentUser.updatePassword(password);
    }
  };

  // *** User API ***

  user = (uid: string) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
