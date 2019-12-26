import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { checkAdminPermissions } from './utils';

try {
  admin.initializeApp();
} catch (e) {}

const addAdminRole = functions.https.onCall(async (data, context) => {
  checkAdminPermissions(context);

  const email = data.email;
  await grantAdminRole(email);
  return {
    result: `${email} is now an administrator.`,
  };
});

const removeAdminRole = functions.https.onCall(async (data, context) => {
  checkAdminPermissions(context);

  const email = data.email;
  await revokeAdminRole(email);
  return {
    result: `${email} is no longer an administrator.`,
  };
});

const setAdminRole = functions.https.onCall(async (data, context) => {
  checkAdminPermissions(context);

  const { email, admin: setIsAdmin } = data;
  if (setIsAdmin) {
    await grantAdminRole(email);
  } else {
    await revokeAdminRole(email);
  }
  return {
    result: `${email} admin role is set to ${!!setIsAdmin}`,
  };
});

const grantAdminRole = async (email: string): Promise<void> => {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).admin === true) {
    return;
  }

  return admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });
};

const revokeAdminRole = async (email: string): Promise<void> => {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).admin === true) {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: false,
    });
  }
};

export { addAdminRole, removeAdminRole, setAdminRole };
