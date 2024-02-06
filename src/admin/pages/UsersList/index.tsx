import * as React from 'react';
import { DashboardPage } from 'admin/components/DashboardPage';
import styled from 'styled-components';
import Table from '@mui/joy/Table';
import { useSelector } from 'react-redux';
import { RootState } from 'types';
import Checkbox from 'app/components/Checkbox';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-right: 1rem;
  gap: 1rem;
`;

interface jsonUsers {
  code: 'string';
  error: 'string';
  message: 'string';
  data: [
    {
      ID: 'string';
      Email: 'string';
      Name: 'string';
      Surname: 'string';
      Role: 'string';
      ProfilePicture: 'string';
      IsActive: 'boolean';
      DeletedAt: 'string';
      CreatedAt: 'string';
      UpdatedAt: 'string';
    },
  ];
  pagination: {
    maxPages: 'number';
    page: 'number';
    pageSize: 'number';
  };
}

export function UsersList() {
  const { isLoggedIn, accessToken } = useSelector(
    (state: RootState) => state.auth,
  );
  const [data, setData] = React.useState<jsonUsers | null>(null);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://127.0.0.1:3000/user?page=' + page,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error al obtener el JSON:', error);
      }
    };
    fetchData();
  }, [accessToken]);

  if (!isLoggedIn) {
    return <p>Debes iniciar sesión para ver esta página</p>;
  }

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <DashboardPage currentPage="users">
      <Container>
        <Table color="neutral" size="md" stickyHeader variant="plain">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th style={{ width: '15%' }}>Email</th>
              <th>Rol</th>
              <th>Activo</th>
              <th style={{ width: '20%' }}>Fecha de creación</th>
              <th style={{ width: '20%' }}>Fecha de actualización</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map(user => (
              <tr key={user.ID} style={{ color: 'white' }}>
                <td>{user.ID}</td>
                <td>{user.Name}</td>
                <td>{user.Surname}</td>
                <td>{user.Email}</td>
                <td>{user.Role}</td>
                <td>
                  <Checkbox
                    checked={user.IsActive ? true : false}
                    label=""
                    id="isActive"
                    setChecked={function (checked: boolean): void {
                      throw new Error('Function not implemented.');
                    }}
                  />
                </td>
                <td>{user.CreatedAt}</td>
                <td>{user.UpdatedAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p style={{ color: 'white' }}>Pagina: {data.pagination.page}</p>
      </Container>
    </DashboardPage>
  );
}
