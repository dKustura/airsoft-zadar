import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { checkAdminPermissions } from './utils';

try {
  admin.initializeApp();
} catch (e) {}

const addMemberRole = functions.https.onCall(async (data, context) => {
  checkAdminPermissions(context);

  const email = data.email;
  await grantMemberRole(email);
  return {
    result: `${email} is now a member.`,
  };
});

const removeMemberRole = functions.https.onCall(async (data, context) => {
  checkAdminPermissions(context);

  const email = data.email;
  await revokeMemberRole(email);
  return {
    result: `${email} is no longer a member.`,
  };
});

const setMemberRole = functions.https.onCall(async (data, context) => {
  checkAdminPermissions(context);

  const { email, member: setIsMember } = data;
  if (setIsMember) {
    await grantMemberRole(email);
  } else {
    await revokeMemberRole(email);
  }
  return {
    result: `${email} member role is set to ${!!setMemberRole}`,
  };
});

const grantMemberRole = async (email: string): Promise<void> => {
  const user = await admin.auth().getUserByEmail(email);
  const customClaims = user.customClaims as any;
  if (
    user.customClaims &&
    (customClaims.admin === true || customClaims.member === true)
  ) {
    return;
  }

  return admin.auth().setCustomUserClaims(user.uid, {
    member: true,
  });
};

const revokeMemberRole = async (email: string): Promise<void> => {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).member === true) {
    return admin.auth().setCustomUserClaims(user.uid, {
      member: false,
    });
  }
};

export { addMemberRole, removeMemberRole, setMemberRole };
