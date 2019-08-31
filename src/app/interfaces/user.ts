export interface User {
  displayName: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  providerId: string;
  bio?: string;
  uid: string;
  followerCount?: number;
  following?: string[];
}
