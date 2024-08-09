import { User } from 'services/user.service';
import UserTableActions from 'store/actions/userTable';

export type UserTableAction = {
  type: keyof typeof UserTableActions;
  payload: {
    page?: number;
    maxPages?: number;
    users?: User[];
    id?: string;
    isActive?: boolean;
    pending?: boolean;
    error?: string;
  };
};
