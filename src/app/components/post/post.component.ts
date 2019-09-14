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
  replies: Observable<Comment[]>;
  error: string;
  progress: number = null;
  showNsfw: boolean;

  constructor(private pS: PostsService, private upS: FileUploadService, private afAuth: AngularFireAuth, private nsfw: NsfwService) { }

  ngOnInit() {
    this.replies = this.pS.getCommentsForPost(this.post);
    this.nsfw.nsfwStatus.subscribe(nsfw => {
      if (nsfw === false) {
        this.post.isNSFW ? this.showNsfw = false : this.showNsfw = true;
      } else {
        this.showNsfw = true;
      }
    });
  }

  closeError() {
    this.error = '';
  }

  toggleIsReply() {
    this.isReply = !this.isReply;
  }

  onSubmit() {
    let uploader: { task: any; ref: any; };
    if (this.reply.value.image != null) {
      uploader = this.upS.uploadImageForPost(this.reply.value.image);
    }
    const comment: Post = { // Object to be posted as a new reply
      ...this.reply.value,
      commentCount: 0,
      postedAt: new Date().getTime(), // Get the current date
      postedBy: this.afAuth.auth.currentUser.uid
    };
    if (this.reply.value.image != null) {
      uploader.task.percentageChanges()
      .pipe(
        finalize(() => this.progress = null)
      )
      .subscribe(progress => this.progress = progress); // Get the percentage status of the image upload
      uploader.task.snapshotChanges().pipe(
      finalize(() => {
        uploader.ref.getDownloadURL().subscribe(url => { // Get the URL of the uploaded image
          comment.image = url; // Append it to the object responsible for being uploaded
          this.pS.addCommentToPost(this.post, comment) // Create a new post
            .catch(err => this.error = err);
        });
      })).subscribe();
    } else {
      this.pS.addCommentToPost(this.post, comment) // Create a new post
        .catch(err => this.error = err);
    }
    this.replyForm.nativeElement.reset();
  }
}
