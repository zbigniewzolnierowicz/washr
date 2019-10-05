import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Post } from '../interfaces/post';
import { Comment } from '../interfaces/comment';
import { firestore } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private db: AngularFirestore, private st: AngularFireStorage) {}

  get getAllPosts() {
    return this.db
      .collection<Post>('posts', query => query.orderBy('postedAt', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Post;
            const id = a.payload.doc.id;
            const ref = a.payload.doc.ref;
            return { id, ref, ...data };
          })
        )
      );
  }

  getCommentsForPost(post: Post) {
    try {
      return this.db
        .doc(post.ref)
        .collection('comments', query => query.orderBy('postedAt', 'asc'))
        .snapshotChanges()
        .pipe(
          map(actions =>
            actions.map(a => {
              const data = a.payload.doc.data() as Post;
              const id = a.payload.doc.id;
              const ref = a.payload.doc.ref;
              return { id, ref, ...data };
            })
          )
        );
    } catch (e) {}
  }

  createPost(post: Post) {
    return new Promise((resolve, reject) => {
      this.db
        .collection<Post>('posts')
        .add(post) // Add a new post to the posts collection in Firebase
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  addCommentToPost(post: Post, comment: Comment) {
    return new Promise((resolve, reject) => {
      // Add a new comment to the comments subcollection of a post
      post.ref
        .collection('comments')
        .add(comment)
        .then(data => {
          this.db
            .doc(`users/${post.postedBy}`)
            .update({ comments: firestore.FieldValue.arrayUnion(data.id) })
            .then(() => resolve(data));
        })
        .catch(err => reject(err));
    });
  }

  delete(subject: Post | Comment) {
    if (subject.image) {
      this.st.ref(subject.image).delete();
    }
    return subject.ref.delete();
  }
  edit(subject: Post | Comment, content: string) {
    return subject.ref.update({ content });
  }
}
