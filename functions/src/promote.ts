import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const grantAdminRole = async (userEmail: string): Promise<void> => {
  const user = await admin.auth().getUserByEmail(userEmail);
  if (user.customClaims && (user.customClaims as any).admin === true) {
    return;
  }

  return admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });
};

if (process.argv.length !== 3) {
  throw Error('Invalid use of promote. Usage: node promote.js <email>');
}
const email = process.argv[2];
grantAdminRole(email)
  .then(res => {
    console.log(`User ${email} has been given Admin role.`);
    process.exit(0);
  })
  .catch(err => {
    console.log('Failed to grant user Admin role: ' + err);
    process.exit(1);
  });
