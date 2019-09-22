import * as functions from 'firebase-functions';
import { firestore, initializeApp } from 'firebase-admin';

initializeApp();
const db = firestore();

export let aggregateComments: functions.CloudFunction<any>;
export let generateUserDocument: functions.CloudFunction<any>;
export let deleteUserDocument: functions.CloudFunction<any>;
export let addUserDataToComment: functions.CloudFunction<any>;
export let addUserDataToPost: functions.CloudFunction<any>;
aggregateComments = functions.firestore.document('posts/{postId}/comments/{commentId}').onWrite(async (_, context) => {
  // Get ID of the post
  const postId = context.params.postId;
  // Get ref of the post
  const postRef = db.doc(`posts/${postId}`);
  // Get amount of comments
  try {
    const commentsSnapshot = await postRef
      .collection('comments')
      .orderBy('postedAt', 'desc')
      .get();
    const commentCount = commentsSnapshot.size;
    return await postRef.update({ commentCount });
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
  };
  console.log(userData);

  db.collection('users')
    .doc(user.uid)
    .create(userData)
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
});

deleteUserDocument = functions.auth.user().onDelete(user => {
  db.collection('users')
    .doc(user.uid)
    .delete()
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
});

addUserDataToComment = functions.firestore.document('posts/{postId}/comments/{commentId}').onWrite(async change => {
  try {
    const beforeData = change.before.data() || { postedBy: null };
    const userRef = await db.doc(`users/${beforeData.postedBy}`);
    const userDocument = await userRef.get();
    const userData = (await userDocument.data()) || { displayName: null, photoURL: null };
    return await change.after.ref.update({
      userData: {
        userID: beforeData.postedBy,
        userName: userData.displayName,
        userPhoto: userData.photoURL
      }
    });
  } catch (error) {
    console.error(error);
    return error;
  }
});

addUserDataToPost = functions.firestore.document('posts/{postId}').onWrite(async change => {
  try {
    const beforeData = change.before.data() || { postedBy: null };
    const userRef = await db.doc(`users/${beforeData.postedBy}`);
    const userDocument = await userRef.get();
    const userData = (await userDocument.data()) || { displayName: null, photoURL: null };
    return await change.after.ref.update({
      userData: {
        userID: beforeData.postedBy,
        userName: userData.displayName,
        userPhoto: userData.photoURL
      }
    });
  } catch (error) {
    console.error(error);
    return error;
  }
});

// TODO: Add a function that generates a smaller thumb image whenever the user uploads an image
// TODO: Add a function that generates a thumbnail for the uploaded video
