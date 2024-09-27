import { User } from 'common/models/user.model';

export type UserState = {
  page?: number;
  maxPages?: number;
  users?: User[];
  key?: string;
  sortOrder?: string;
  pending?: boolean;
  error?: string;
};
