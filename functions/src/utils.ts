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

export const checkmemberPermissions = (
  context: functions.https.CallableContext
) => {
  if (
    context.auth?.token.member !== true &&
    context.auth?.token.admin !== true
  ) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'You must have member permissions.'
    );
  }
};
