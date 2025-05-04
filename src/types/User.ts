export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  password: string;
  role: number;
}

export enum UserRole {
  User = 1,
  Admin = 2,
  Moderator = 3,
}
