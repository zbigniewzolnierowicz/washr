import { DocumentReference } from '@angular/fire/firestore/interfaces';

export interface Comment {
  id?: string;
  ref?: DocumentReference;
  content: string;
  postedAt: Date;
  postedBy: string;
  image?: string;
  isNSFW?: boolean;
}
