import { AxiosError } from 'axios';
import * as React from 'react';
import { User } from 'services/user.service';

const useGetUsers = async (page: number) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [pending, setPending] = React.useState(false);

  const getUsers = async () => {
    setPending(true);
    setError(undefined);
    setUsers([]);

    try {
      const data = await User.getUsers(page);
      setUsers(data?.users || []);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    }

    setPending(false);
  };

  return { getUsers, users, pending, error };
};

export default useGetUsers;
