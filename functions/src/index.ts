import * as functions from 'firebase-functions';
import { initializeApp, firestore } from 'firebase-admin';

initializeApp();
const db = firestore();

export let aggregateComments: functions.CloudFunction<any>;
export let addCommentToUserArray: functions.CloudFunction<any>;
export let deleteCommentFromUserArray: functions.CloudFunction<any>;
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

  addCommentToUserArray = functions.firestore
    .document('posts/{postId}/comments/{commentId}')
    .onWrite(async (_, context) => {
      const postId = context.params.postId
      const commentId = context.params.commentId;
      const commentRef = db.doc(`posts/${postId}`).collection('comments').doc(commentId);
      try {
        const commentSnapshot = await commentRef.get();
        let commentData: any;
        if (await commentSnapshot.data() === undefined) {
          throw new Error(('Undefined comment'));
        } else {
          commentData = await commentSnapshot.data();
        }
        const userRef = await db.doc(`users/${commentData.postedBy}`);
        console.log(`Updating user ${commentData.postedBy} with comment ID ${commentSnapshot.id}`)
        return userRef.update({
          comments: firestore.FieldValue.arrayUnion(commentSnapshot.id)
        });
      } catch (err) {
        console.error(err);
        return err;
      }
    });

  deleteCommentFromUserArray = functions.firestore
    .document('posts/{postId}/comments/{commentId}')
    .onDelete(async deleted => {
      try {
        const commentSnapshot = await deleted;
        let commentData: any;
        if (commentSnapshot.data() === undefined) {
          commentData = await commentSnapshot.data();
        } else {
          throw new Error(('Undefined comment'));
        }
        const userRef = db.doc(`users/${commentData.postedBy}`);
        return userRef.update({
          comments: firestore.FieldValue.arrayRemove(commentSnapshot.id)
        });
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
