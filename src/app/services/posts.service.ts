import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Post } from '../interfaces/post';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private db: AngularFirestore) {}

  get getAllPosts() {
    return this.db.collection<Post>('posts').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        const ref = a.payload.doc.ref;
        return { id, ref, ...data };
      }))
    );
  }

  createPost(post: Post) {
    return new Promise((resolve, reject) => {
      this.db.collection<Post>('posts').add(post) // Add a new post to the posts collection in Firebase
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  /*
    TODO: Make the method add a string to the comments array in the User document
  */

  addCommentToPost(post: Post, comment: Comment) {
    return new Promise((resolve, reject) => { // Add a new comment to the comments subcollection of a post
      post.ref.collection('comments').add(comment)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  /*
    TODO: Make the same method as above, but with likes.
  */
}
