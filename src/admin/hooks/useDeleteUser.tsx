import { AxiosError } from 'axios';
import React from 'react';
import { User } from 'services/user.service';

const useDeleteUser = (id: string) => {
  const [completed, setCompleted] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [pending, setPending] = React.useState(false);

  const deleteUser = async () => {
    setPending(true);
    setCompleted(false);
    setError(undefined);

    try {
      await User.deleteUser(id);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    }

    setPending(false);
    setCompleted(true);
  };

  return { deleteUser, completed, pending, error };
};

export default useDeleteUser;
