import { DocumentReference } from '@angular/fire/firestore/interfaces';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface Post {
  id?: string;
  ref?: DocumentReference;
  title: string;
  postedBy: string;
  postedAt: Timestamp;
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
