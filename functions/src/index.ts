import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth?.token.admin !== true) {
    return {
      error: 'Request not authorized. User must be an admin.',
    };
  }

  const email = data.email;
  return grantAdminRole(email)
    .then(() => {
      return {
        result: `${email} is now a moderator.`,
      };
    })
    .catch(error => {
      error;
    });
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
