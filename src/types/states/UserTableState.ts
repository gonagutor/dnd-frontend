import { User } from 'services/user.service';

export type UserState = {
  page?: number;
  maxPages?: number;
  users?: User[];
  key?: string;
  sortOrder?: string;
  pending?: boolean;
  error?: string;
};
