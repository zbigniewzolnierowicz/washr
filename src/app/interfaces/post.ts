import { DocumentReference } from '@angular/fire/firestore';

export interface Post {
  id?: string;
  title: string;
  postedBy: string;
  postedAt: Date;
  content: string;
  image?: string;
  ref?: DocumentReference;
  isNSFW?: boolean;
}
