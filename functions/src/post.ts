import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

try {
  admin.initializeApp();
} catch (e) {}

const addPost = functions.firestore
  .document('/posts/{postId}')
  .onCreate((snapshot, _) => {
    const data = snapshot.data();

    if (data) {
      const timestamp = data.dateCreated
        ? admin.firestore.Timestamp.fromDate(data.dateCreated)
        : snapshot.createTime;
      return snapshot.ref.set({ ...data, dateCreated: timestamp });
    }

    return null;
  });

export { addPost };
