import { DocumentReference } from '@angular/fire/firestore';

export interface Post {
  id?: string;
  title: string;
  postedBy: string;
  postedAt: Date;
  content: string;
  images?: string[];
  replies?: string[];
  ref?: DocumentReference;
  isAgeLimited?: boolean;
}
