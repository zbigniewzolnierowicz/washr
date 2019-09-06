import * as functions from 'firebase-functions';
import { initializeApp, firestore } from 'firebase-admin';

initializeApp();
const db = firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export let aggregateComments: functions.CloudFunction<any>;
export let generateUserDocument: functions.CloudFunction<any>;
export let deleteUserDocument: functions.CloudFunction<any>;
aggregateComments = functions.firestore
  .document('posts/{postId}/comments/{commentId}')
  .onWrite(async (_, context) => {
    // Get ID of the post
    const postId = context.params.postId;
    // Get ref of the post
    const postRef = db.doc(`posts/${postId}`);
    // Get amount of comments
    try {
      const commentsSnapshot = await postRef.collection('comments').orderBy('postedAt', 'desc').get();
      const commentCount = commentsSnapshot.size;
      return postRef.update({commentCount});
    } catch (err) {
      console.error(err);
      return err;
    }
  });

  generateUserDocument = functions.auth.user().onCreate(user => {
    const userData = {
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      bio: '',
      followerCount: 0,
      following: []
    }
    console.log(userData);

    db.collection('users').doc(user.uid).create(userData)
      .then(data => { return data })
      .catch(err => { return err });
  })

  deleteUserDocument = functions.auth.user().onDelete(user => {
    db.collection('users').doc(user.uid).delete()
      .then(data => { return data })
      .catch(err => { return err });
  })
