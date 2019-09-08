import { DocumentReference } from '@angular/fire/firestore/interfaces';

export interface Post {
  id?: string;
  ref?: DocumentReference;
  title: string;
  postedBy: string;
  postedAt: Date;
  content: string;
  image?: string;
  isNSFW?: boolean;
  commentCount: number;
  userData: {
    userID: string;
    userName: string;
    userPhoto: string;
  };
}
