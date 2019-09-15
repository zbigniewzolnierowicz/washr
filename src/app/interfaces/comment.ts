import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface Comment {
  id?: string;
  ref?: DocumentReference;
  content: string;
  postedAt: Timestamp;
  postedBy: string;
  image?: string;
  isNSFW?: boolean;
}
