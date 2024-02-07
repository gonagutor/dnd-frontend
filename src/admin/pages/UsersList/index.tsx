import * as React from 'react';
import { DashboardPage } from 'admin/components/DashboardPage';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'types';
import { UsersTable } from 'admin/components/UsersTable';

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

interface jsonUsers {
  code: 'string';
  error: 'string';
  message: 'string';
  pagination: {
    page: 'number';
    maxPages: 'number';
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
        const response = await fetch('http://127.0.0.1:3000/user/pages', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error al obtener el JSON:', error);
      }
    };

    fetchData();
  }, [page, accessToken]);

  if (!isLoggedIn) {
    return <p>Debes iniciar sesión para ver esta página</p>;
  }

  if (!data) {
    return <p>Cargando...</p>;
  }

  if (!data.message.includes('Pages found')) {
    return <p>Hubo un error al obtener los usuarios {data.error}</p>;
  }

  return (
    <DashboardPage currentPage="users">
      <Container>
        <UsersTable page={page} />
        <PagesText>
          Pagina: {page} de {data.pagination.maxPages}
        </PagesText>
        <Button
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
        >
          Pagina anterior
        </Button>
        <Button
          onClick={() => {
            if (page < Number(data.pagination.maxPages)) setPage(page + 1);
          }}
        >
          Siguiente pagina
        </Button>
      </Container>
    </DashboardPage>
  );
}
