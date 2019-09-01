import * as functions from 'firebase-functions';
import { initializeApp, firestore } from 'firebase-admin';

initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const aggregateComments = functions.firestore
    .document('posts/{postId}/comments/{commentId}')
    .onWrite(async (_, context) => {
      // Get ID of the post
      const postId = context.params.postId;
      // Get ref of the post
      const postRef = firestore().doc(`posts/${postId}`);
      // Get amount of comments
      try {
        const commentsSnapshot = await postRef.collection('comments').orderBy('postedAt', 'desc').get();
        const commentCount = commentsSnapshot.size;
        return postRef.update({ commentCount });
      }
      catch (err) {
        console.error(err);
      }
});
