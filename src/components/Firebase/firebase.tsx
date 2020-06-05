import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import firebaseConfig from './config';
import { functionNames } from './constants';

class Firebase {
  public emailAuthProvider: typeof firebase.auth.EmailAuthProvider;
  public auth: firebase.auth.Auth;
  public firestore: firebase.firestore.Firestore;
  public functions: firebase.functions.Functions;
  public storage: firebase.storage.Storage;
  public googleProvider: firebase.auth.GoogleAuthProvider;
  public facebookProvider: firebase.auth.FacebookAuthProvider;
  public twitterProvider: firebase.auth.TwitterAuthProvider;

  constructor() {
    firebase.initializeApp(firebaseConfig);

    /* Helper */
    this.emailAuthProvider = firebase.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.functions = firebase.functions();
    this.storage = firebase.storage();

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

  doSignInWithFacebook = () =>
    this.auth.signInWithRedirect(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = (languageCode?: string) => {
    if (
      process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT &&
      this.auth.currentUser
    ) {
      if (languageCode) {
        firebase.auth().languageCode = languageCode;
      }

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
    this.auth.onAuthStateChanged(async (authUser) => {
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

  users = () => this.firestore.collection('users');

  user = (uid: string) => this.users().doc(uid);

  posts = () => this.firestore.collection('posts');

  post = (uid: string) => this.posts().doc(uid);

  //******* Functions API *******//

  // Admin role
  doAddAdminRole = (email: string) =>
    this.functions.httpsCallable(functionNames.ADD_ADMIN_ROLE_FUNCTION)({
      email,
    });

  doRemoveAdminRole = (email: string) =>
    this.functions.httpsCallable(functionNames.REMOVE_ADMIN_ROLE_FUNCTION)({
      email,
    });

  doSetAdminRole = (email: string, admin: boolean) =>
    this.functions.httpsCallable(functionNames.SET_ADMIN_ROLE_FUNCTION)({
      email,
      admin,
    });

  // Member role
  doAddMemberRole = (email: string) =>
    this.functions.httpsCallable(functionNames.ADD_MEMBER_ROLE_FUNCTION)({
      email,
    });

  doRemoveMemberRole = (email: string) =>
    this.functions.httpsCallable(functionNames.REMOVE_MEMBER_ROLE_FUNCTION)({
      email,
    });

  doSetMemberRole = (email: string, member: boolean) =>
    this.functions.httpsCallable(functionNames.SET_MEMBER_ROLE_FUNCTION)({
      email,
      member,
    });

  // Post Management
  // TODO: set appropriate type for post content
  doCreatePost = (title: string, content: any) =>
    this.functions.httpsCallable(functionNames.CREATE_POST_FUNCTION)({
      title,
      content,
    });

  doUpdatePost = (uid: string, title: string, content: any) =>
    this.functions.httpsCallable(functionNames.UPDATE_POST_FUNCTION)({
      uid,
      title,
      content,
    });

  doDeletePost = (uid: string) =>
    this.functions.httpsCallable(functionNames.DELETE_POST_FUNCTION)({
      uid,
    });

  doUploadImage = (url: string) => {
    const storageRef = this.storage.ref();
    const uid = uuidv4();

    const imageRef = storageRef.child(`/images/${uid}`);
    return imageRef.putString(url, 'data_url');
  };

  doGetUniqueIdentifier = () =>
    this.functions.httpsCallable(functionNames.GET_UNIQUE_IDENTIFIER)();

  doCheckIsEmailVerified = () =>
    this.functions.httpsCallable(functionNames.CHECK_IS_EMAIL_VERIFIED)();
}

export default Firebase;
