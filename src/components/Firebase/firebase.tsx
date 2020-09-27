import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { get, all, collection } from 'typesaurus';

import firebaseConfig from './config';
import { functionNames } from './constants';
import { User } from 'types';
import {
  AdminRoleSetRequest,
  MemberRoleSetRequest,
  Post,
  PostCreateRequest,
  PostDeleteRequest,
  PostUpdateRequest,
  RoleAddRequest,
  RoleRemoveRequest,
} from './types';
import { createFunction } from './utils';

firebase.initializeApp(firebaseConfig);

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
    if (this.auth.currentUser) {
      if (languageCode) {
        firebase.auth().languageCode = languageCode;
      }

      return this.auth.currentUser.sendEmailVerification();
    }

    return Promise.resolve();
  };

  doPasswordUpdate = (password: string) => {
    this.auth.currentUser?.updatePassword(password);
  };

  onAuthUserListener = (next: (user: User) => void, fallback: () => void) =>
    this.auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const tokenResult = await authUser?.getIdTokenResult();
        const claims = tokenResult.claims;

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

        const roles = {
          admin: claims.admin,
          member: claims.member,
        };
        const user: User = Object.assign(authUser, { roles });

        next(user);
      } else {
        fallback();
      }
    });

  // *** User API ***

  // TODO idea:
  // Add custom hook that fetches last N notifications
  // and listens (onSnapshot) for new notifications
  // if this turns ugly, try redux-firestore with react-redux-firebase
  // Plus an additional cloud function which returns the number of unread notifications

  users = () => this.firestore.collection('users');

  getUser = (uid: string) => this.users().doc(uid).get();

  posts = collection<Post>('posts');

  getAllPosts = () =>
    all(this.posts).then((snapshot) => {
      const dataArray: any[] = [];
      snapshot.forEach((doc) => {
        const data = {
          id: doc.ref.id,
          ...doc.data,
        };
        dataArray.push(data);
      });
      return dataArray;
    });

  getPost = (uid: string) => get(this.posts, uid);

  //******* Functions API *******//

  //// Role Management

  // Admin role
  doAddAdminRole = createFunction<RoleAddRequest>(
    functionNames.ADD_ADMIN_ROLE_FUNCTION
  );

  doRemoveAdminRole = createFunction<RoleAddRequest>(
    functionNames.REMOVE_ADMIN_ROLE_FUNCTION
  );

  doSetAdminRole = createFunction<AdminRoleSetRequest>(
    functionNames.SET_ADMIN_ROLE_FUNCTION
  );

  // Member role
  doAddMemberRole = createFunction<RoleAddRequest>(
    functionNames.ADD_MEMBER_ROLE_FUNCTION
  );

  doRemoveMemberRole = createFunction<RoleRemoveRequest>(
    functionNames.REMOVE_MEMBER_ROLE_FUNCTION
  );

  doSetMemberRole = createFunction<MemberRoleSetRequest>(
    functionNames.SET_MEMBER_ROLE_FUNCTION
  );

  //// Post Management

  doCreatePost = createFunction<PostCreateRequest>(
    functionNames.CREATE_POST_FUNCTION
  );

  doUpdatePost = createFunction<PostUpdateRequest>(
    functionNames.UPDATE_POST_FUNCTION
  );

  doDeletePost = createFunction<PostDeleteRequest>(
    functionNames.DELETE_POST_FUNCTION
  );

  doUploadImage = (url: string) => {
    const storageRef = this.storage.ref();
    const uid = uuidv4();

    const imageRef = storageRef.child(`/images/${uid}`);
    return imageRef.putString(url, 'data_url');
  };

  doUploadThumbnail = (url: string) => {
    const storageRef = this.storage.ref();
    const uid = uuidv4();

    const imageRef = storageRef.child(`/thumbnails/${uid}`);
    return imageRef.putString(url, 'data_url');
  };

  doGetUniqueIdentifier = () =>
    this.functions.httpsCallable(functionNames.GET_UNIQUE_IDENTIFIER)();

  doCheckIsEmailVerified = () =>
    this.functions.httpsCallable(functionNames.CHECK_IS_EMAIL_VERIFIED)();
}

export default Firebase;

export const FirebaseInstance = new Firebase();
