export class User {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  profilePicture?: string;
  isActive: boolean;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
    this.role = user.role;
    this.profilePicture = user.profilePicture;
    this.isActive = user.isActive;
    this.deletedAt = user.deletedAt;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
