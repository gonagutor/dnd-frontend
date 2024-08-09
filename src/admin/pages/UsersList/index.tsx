import * as React from 'react';
import { DashboardPage } from 'admin/components/DashboardPage';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import UserTableSort from 'admin/components/UsersTable';
import UserTableActions from 'store/actions/userTable';
import Loader from 'app/components/Loader';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-right: 1rem;
  gap: 1rem;
`;

const PagesText = styled.p`
  color: white;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export function UsersList() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const { pending, error, users, page, maxPages } = useSelector(
    (state: RootState) => state.userTable,
  );

  React.useEffect(() => {
    if (!isLoggedIn) return;

    dispatch({ type: UserTableActions.INIT_TABLE, payload: { page: 1 } });
  }, [dispatch, isLoggedIn]);

  return (
    <DashboardPage currentPage="users">
      <Container>
        {!isLoggedIn && <p>Acceso restringido</p>}
        {pending && <Loader />}
        {!pending && error && <p style={{ color: 'white' }}>{error}</p>}
        {!pending && !error && <UserTableSort users={users} />}
      </Container>
    </DashboardPage>
  );
}
