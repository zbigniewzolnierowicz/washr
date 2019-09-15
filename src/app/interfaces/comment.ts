import { DocumentReference } from '@angular/fire/firestore/interfaces';

export interface Comment {
  id?: string;
  ref?: DocumentReference;
  content: string;
  postedAt: FirebaseFirestore.Timestamp;
  postedBy: string;
  image?: string;
  isNSFW?: boolean;
}
