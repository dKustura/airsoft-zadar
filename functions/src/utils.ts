import * as functions from 'firebase-functions';

export const checkAdminPermissions = (
  context: functions.https.CallableContext
) => {
  if (context.auth?.token.admin !== true) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'You must have administrator permissions.'
    );
  }
};
