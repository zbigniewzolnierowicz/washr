import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Comment } from 'src/app/interfaces/comment';
import { PostsService } from 'src/app/services/posts.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { NsfwService } from 'src/app/services/nsfw.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { firestore } from 'firebase/app';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @ViewChild('reply', { static: false }) replyForm: ElementRef;
  isReply = false;
  reply = new FormGroup({
    content: new FormControl(null, Validators.required),
    isNSFW: new FormControl(false),
    image: new FormControl(null)
  });
  isEdit = false;
  postEdit = new FormGroup({
    content: new FormControl(null, Validators.required)
  });
  replies: Observable<Comment[]>;
  error: string;
  progress: number = null;
  showNsfw: boolean;
  userInfo: Observable<any>;
  start = 0;
  end = 0;
  thumbimage: string;
  postimage: string;
  fileMetadata: any;

  constructor(
    private pS: PostsService,
    private upS: FileUploadService,
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private nsfw: NsfwService,
    public uS: UserDataService
  ) {}

  get userUID() {
    return this.afAuth.auth.currentUser.uid;
  }

  async ngOnInit() {
    this.replies = this.pS.getCommentsForPost(this.post);
    this.userInfo = this.uS.getUserData(this.post.userData.userID);
    this.nsfw.nsfwStatus.subscribe(nsfw => {
      if (nsfw === false) {
        this.post.isNSFW ? (this.showNsfw = false) : (this.showNsfw = true);
      } else {
        this.showNsfw = true;
      }
    });
    this.postEdit.setValue({
      content: this.post.content
    });
    if (this.post.image) {
      const imageRef = this.afStorage.ref(this.post.image);
      let thumbRef: AngularFireStorageReference;
      imageRef.getMetadata().subscribe(metadata => {
        thumbRef = this.afStorage.ref(`posts/${metadata.name.replace(/(\.[\w\d_-]+)$/i, '_200x200$1')}`);
        thumbRef.getDownloadURL().subscribe(img => (this.thumbimage = img));
        imageRef.getDownloadURL().subscribe(img => (this.postimage = img));
      });
    }
  }

  format(ev: Event, type: string) {
    ev.preventDefault();
    const text: string = this.postEdit.value.content || '';
    const startIndex = this.start;
    const endIndex = this.end - this.start;
    const newText = `${text.substr(0, startIndex) || ''}${type}${text.substr(startIndex, endIndex) ||
      ''}${type}${text.substr(this.end, 999) || ''}`;
    this.postEdit.setValue({
      ...this.postEdit.value,
      content: newText
    });
  }

  selectEvent(ev: any) {
    this.start = ev.target.selectionStart;
    this.end = ev.target.selectionEnd;
  }

  insertHoriRule(ev: Event) {
    ev.preventDefault();
    const text: string = this.postEdit.value.content || '';
    const newText = text + '\n\n---';
    this.postEdit.setValue({
      ...this.postEdit.value,
      content: newText
    });
  }

  closeError() {
    this.error = '';
  }

  toggleIsReply() {
    this.isReply = !this.isReply;
  }

  toggleIsEdit() {
    this.isEdit = !this.isEdit;
  }

  onSubmitEdit() {
    this.pS.edit(this.post, this.postEdit.value.content).catch(err => (this.error = err));
  }

  onSubmit() {
    let uploader: { task: any; ref: any };
    if (this.reply.value.image != null) {
      uploader = this.upS.uploadImageForPost(this.reply.value.image);
    }
    const comment: Post = {
      // Object to be posted as a new reply
      ...this.reply.value,
      commentCount: 0,
      postedAt: firestore.FieldValue.serverTimestamp(), // Get the current date
      postedBy: this.afAuth.auth.currentUser.uid
    };
    if (this.reply.value.image != null) {
      uploader.task
        .percentageChanges()
        .pipe(finalize(() => (this.progress = null)))
        .subscribe(progress => (this.progress = progress)); // Get the percentage status of the image upload
      uploader.task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            uploader.ref.getDownloadURL().subscribe(url => {
              // Get the URL of the uploaded image
              comment.image = url; // Append it to the object responsible for being uploaded
              this.pS
                .addCommentToPost(this.post, comment) // Create a new post
                .catch(err => (this.error = err));
            });
          })
        )
        .subscribe();
    } else {
      this.pS
        .addCommentToPost(this.post, comment) // Create a new post
        .catch(err => (this.error = err));
    }
    this.replyForm.nativeElement.reset();
  }

  deletePost() {
    this.pS.delete(this.post); // .then(() => console.log('Post deleted'));
  }
}
