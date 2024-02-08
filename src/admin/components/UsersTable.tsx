import * as React from 'react';
import Table from '@mui/joy/Table';
import Checkbox from 'app/components/Checkbox';
import { RootState } from 'types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Button = styled.button`
  background-color: red;
  color: white;
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
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
      IsActive: boolean;
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

interface jsonDefUser {
  code: 'string';
  error: 'string';
  message: 'string';
}

interface UsersTableProps {
  page: number;
}

export function UsersTable(props: UsersTableProps) {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [data, setData] = React.useState<jsonUsers | null>(null);
  const [defUser, setDefUser] = React.useState<jsonDefUser | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://127.0.0.1:3000/user?page=' + props.page,
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
  }, [props.page, accessToken]);

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch('http://127.0.0.1:3000/user/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const jsonData = await response.json();
      setDefUser(jsonData);

      if (defUser?.error != null) {
        alert('Error al eliminar el usuario: ' + defUser.error);
        console.error('Error al eliminar el usuario:', defUser.error);
      } else {
        alert('Usuario eliminado correctamente');
        window.location.reload();
      }
    } catch (error) {}
  };

  const copyIdToClipboard = async (id: string) => {
    await navigator.clipboard.writeText(id);
    alert('ID copiado');
  };

  const delUserButton = (id: string) => {
    return <Button onClick={() => deleteUser(id)}>Eliminar</Button>;
  };

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <Table color="neutral" size="md" stickyHeader variant="plain">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th style={{ width: '15%' }}>Email</th>
          <th>Rol</th>
          <th>Activo</th>
          <th style={{ width: '20%' }}>Fecha de creación</th>
          <th style={{ width: '20%' }}>Fecha de actualización</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.data.map(user => (
          <tr key={user.ID} style={{ color: 'white' }}>
            <td onClick={() => copyIdToClipboard(user.ID)}>{user.Name}</td>
            <td>{user.Surname}</td>
            <td>{user.Email}</td>
            <td>{user.Role}</td>
            <td>
              <input
                type="checkbox"
                name="isActive"
                value="isActive"
                checked={user.IsActive}
                onChange={async () => {
                  const response = await fetch(
                    'http://127.0.0.1:3000/user/' + user.ID,
                    {
                      method: 'PUT',
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ IsActive: !user.IsActive }),
                    },
                  );

                  const jsonData = await response.json();
                  setDefUser(jsonData);

                  if (defUser?.error != null) {
                    alert('Error al actualizar el usuario: ' + defUser.error);
                    console.error(
                      'Error al actualizar el usuario:',
                      defUser.error,
                    );
                  } else {
                    alert('Usuario actualizado correctamente');
                    window.location.reload();
                  }
                }}
              />
            </td>
            <td>{user.CreatedAt}</td>
            <td>{user.UpdatedAt}</td>
            <td>{delUserButton(user.ID)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
