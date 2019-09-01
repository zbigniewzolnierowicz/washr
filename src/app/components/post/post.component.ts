import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Comment } from 'src/app/interfaces/comment';
import { PostsService } from 'src/app/services/posts.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @ViewChild('reply', { static: false }) replyForm: ElementRef;
  reply = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
    isNSFW: new FormControl(false),
    image: new FormControl(null)
  });

  constructor(private pS: PostsService, private upS: FileUploadService) { }

  ngOnInit() {
  }

  onSubmit() {
    const uploader = this.upS.uploadImageForPost(this.reply.value.image);
    const comment: Comment = { // Object to be posted as a new post
      ...this.reply.value,
      commentCount: 0,
      postedAt: new Date(), // Get the date right
      postedBy: '00000000' // TODO: Replace with UID of the authenticated user
    };
    uploader.task.percentageChanges().subscribe(progress => console.log(progress)); // Get the percentage status of the image upload
    uploader.task.snapshotChanges().pipe(
      finalize(() => {
        uploader.ref.getDownloadURL().subscribe(url => { // Get the URL of the uploaded image
          comment.image = url; // Append it to the object responsible for being uploaded
          this.pS.addCommentToPost(this.post, comment) // Create a new post
            .then(() => {
              this.replyForm.nativeElement.reset(); // Reset the upload form
            })
            .catch(err => console.log(err)); // TODO: handle errors in a less dev-y way
        });
      })
    ).subscribe();
  }
}
