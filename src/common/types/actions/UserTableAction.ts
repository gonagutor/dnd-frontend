import { User } from 'common/models/user.model';
import UserTableActions from 'common/store/actions/users';

export type UserAction = {
  type: keyof typeof UserTableActions;
  payload: {
    page?: number;
    maxPages?: number;
    users?: User[];
    id?: string;
    isActive?: boolean;
    key?: string;
    sortOrder?: string;
    pending?: boolean;
    error?: string;
  };
};
