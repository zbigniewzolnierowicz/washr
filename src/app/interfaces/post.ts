import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { FieldValue, Timestamp } from '@google-cloud/firestore';

export interface Post {
  id?: string;
  ref?: DocumentReference;
  title: string;
  postedBy: string;
  postedAt: FieldValue | Timestamp;
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
