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
  // TODO: Add an option to toggle whether the user wants to see NSFW content or not
  // TODO: Add more user details
}
