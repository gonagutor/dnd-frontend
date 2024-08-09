import * as React from 'react';
import Table from '@mui/joy/Table';
import Checkbox from '@mui/joy/Checkbox';
import styled from 'styled-components';
import { User } from 'services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import Loader from 'app/components/Loader';
import UserTableActions from 'store/actions/userTable';
import moment from 'moment';
import {
  Dropdown,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
} from '@mui/joy';

export function UsersTable({ users }: { users: User[] }) {
  const dispatch = useDispatch();
  const { pending, error } = useSelector((state: RootState) => state.userTable);

  const copyIdToClipboard = async (id: string) => {
    await navigator.clipboard.writeText(id);
  };

  return (
    <Sheet sx={{ borderRadius: 10 }}>
      {pending && <Loader />}
      {!pending && error && <p style={{ color: 'white' }}>{error}</p>}
      <Table
        sx={{
          bgcolor: 'gray',
        }}
        color="neutral"
        size="md"
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Fecha de creación</th>
            <th>Fecha de actualización</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ color: 'white' }}>
              <td
                style={{ textTransform: 'capitalize' }}
                onClick={() => copyIdToClipboard(user.id)}
              >
                {user.name}
              </td>
              <td style={{ textTransform: 'capitalize' }}>{user.surname}</td>
              <td>{user.email}</td>
              <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
              <td>
                <Checkbox
                  color="primary"
                  label=""
                  variant="solid"
                  checked={user.isActive}
                />
              </td>
              <td>
                {user.createdAt
                  ? moment(user.createdAt).format('DD/MM/YYYY HH:mm')
                  : 'Unkown'}
              </td>
              <td>
                {user.updatedAt
                  ? moment(user.updatedAt).format('DD/MM/YYYY HH:mm')
                  : 'Unkown'}
              </td>
              <td style={{ textAlign: 'center' }}>
                <Dropdown>
                  <MenuButton>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="size-6"
                      width={24}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </MenuButton>
                  <Menu>
                    <MenuItem onClick={() => copyIdToClipboard(user.id)}>
                      Copiar ID
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch({
                          type: UserTableActions.UPDATE_USER,
                          payload: {
                            id: user.id,
                            isActive: !user.isActive,
                            users,
                          },
                        });
                      }}
                    >
                      Activar/Desactivar
                    </MenuItem>
                    <ListDivider />
                    <MenuItem
                      onClick={() =>
                        dispatch({
                          type: UserTableActions.DELETE_USER,
                          payload: { id: user.id, users },
                        })
                      }
                      sx={{ color: 'red' }}
                    >
                      Eliminar
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
