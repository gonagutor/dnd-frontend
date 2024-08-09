import { User } from 'services/user.service';

export type UserTableState = {
  page?: number;
  maxPages?: number;
  users?: User[];
  pending?: boolean;
  error?: string;
};
