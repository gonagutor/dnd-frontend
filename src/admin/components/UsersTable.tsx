import * as React from 'react';
import Table from '@mui/joy/Table';
import Checkbox from '@mui/joy/Checkbox';
import {
  Box,
  Dropdown,
  IconButton,
  Link,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
} from '@mui/joy';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/types';
import Loader from 'app/components/Loader';
import UserTableActions from 'common/store/actions/users';
import { User } from 'common/models/user.model';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'surname',
    numeric: false,
    disablePadding: false,
    label: 'Apellido',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Rol',
  },
  {
    id: 'is_active',
    numeric: false,
    disablePadding: false,
    label: 'Activo?',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de creación',
  },
  {
    id: 'updated_at',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de actualización',
  },
];

const EnhancedTableHead = () => {
  const dispatch = useDispatch();
  const {
    page,
    key: orderBy,
    sortOrder,
  } = useSelector((state: RootState) => state.user);

  const handleChangeOrder = (key: string) => {
    const order = key === orderBy && sortOrder === 'DESC' ? 'ASC' : 'DESC';

    dispatch({
      type: UserTableActions.INIT_TABLE,
      payload: {
        page,
        key,
        sortOrder: order,
      },
    });
  };

  return (
    <thead>
      <tr>
        {headCells.map(headCell => {
          const active = orderBy === headCell.id;
          return (
            <th
              style={{ width: 'fit-content' }}
              key={headCell.id}
              aria-sort={
                active
                  ? ({ asc: 'ascending', desc: 'descending' } as const)[
                      sortOrder
                    ]
                  : undefined
              }
            >
              <Link
                underline="none"
                color="neutral"
                textColor={active ? 'primary.plainColor' : undefined}
                component="button"
                onClick={() => {
                  handleChangeOrder(headCell.id);
                }}
                fontWeight="lg"
                startDecorator={
                  headCell.numeric ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      width={14}
                      className="size-6"
                      style={{ opacity: active ? 1 : 0 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      />
                    </svg>
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      width={14}
                      className="size-6"
                      style={{ opacity: active ? 1 : 0 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      />
                    </svg>
                  ) : null
                }
                sx={{
                  '& svg': {
                    transition: '0.2s',
                    transform:
                      active && sortOrder === 'DESC'
                        ? 'rotate(0deg)'
                        : 'rotate(180deg)',
                  },
                  '&:hover': { '& svg': { opacity: 1 } },
                }}
              >
                {headCell.label}
                {active ? (
                  <Box component="span" sx={{ display: 'none' }}>
                    {sortOrder === 'DESC'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
        <th style={{ width: '5rem' }}></th>
      </tr>
    </thead>
  );
};

const UserTableSort = () => {
  const dispatch = useDispatch();
  const { pending, error, users } = useSelector(
    (state: RootState) => state.user,
  );

  const copyIdToClipboard = async (id: string) => {
    await navigator.clipboard.writeText(id);
  };

  return (
    <Sheet
      variant="outlined"
      sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}
    >
      {pending && <Loader />}
      {!pending && error && <p style={{ color: 'white' }}>{error}</p>}
      <Table
        aria-labelledby="Users"
        hoverRow
        sx={{
          '--TableCell-headBackground': 'transparent',
          '--TableCell-selectedBackground': theme =>
            theme.vars.palette.success.softBg,
        }}
      >
        <EnhancedTableHead />
        <tbody>
          {(users as User[]).map(user => {
            return (
              <tr
                tabIndex={-1}
                key={user.id}
                // selected={isItemSelected}
              >
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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
                        stroke="black"
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
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={8}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  justifyContent: 'flex-end',
                }}
              >
                <Pagination />
              </Box>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Sheet>
  );
};

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, maxPages } = useSelector((state: RootState) => state.user);

  const [pages, setPages] = React.useState<React.ReactNode[]>([]);

  React.useEffect(() => {
    const generatePages = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const firstPages = generatePages(1, Math.min(3, maxPages));
    const lastPages = generatePages(Math.max(maxPages - 2, 1), maxPages);
    const middlePages = generatePages(
      Math.max(page - 1, 1),
      Math.min(page + 1, maxPages),
    );

    const pagesSet = new Set([...firstPages, ...middlePages, ...lastPages]);
    const pages = Array.from(pagesSet).sort((a, b) => a - b);

    const buttons: React.ReactNode[] = [];

    for (let i = 0; i < pages.length; i++) {
      buttons.push(
        <IconButton
          size="sm"
          color="neutral"
          variant="outlined"
          disabled={
            page === maxPages || maxPages === undefined || maxPages === 0
          }
          onClick={() =>
            dispatch({
              type: UserTableActions.SELECT_PAGE,
              payload: { page: page as number, maxPages },
            })
          }
          sx={{ bgcolor: 'background.surface' }}
        >
          {page}
        </IconButton>,
      );

      if (i < pages.length - 1 && pages[i + 1] > pages[i] + 1) {
        buttons.push(
          <span key={`ellipsis-${i}`} style={{ margin: '0 5px' }}>
            ...
          </span>,
        );
      }
    }

    setPages(buttons);
  }, [page, maxPages, dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'flex-end',
      }}
    >
      <IconButton
        size="sm"
        color="neutral"
        variant="outlined"
        disabled={page === 1 || page === undefined || page === 0}
        onClick={() =>
          dispatch({
            type: UserTableActions.PREV_PAGE,
            payload: { page: page - 1 },
          })
        }
        sx={{ bgcolor: 'background.surface' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          width={24}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
      </IconButton>
      {pages}
      <IconButton
        size="sm"
        color="neutral"
        variant="outlined"
        disabled={page === maxPages || maxPages === undefined || maxPages === 0}
        onClick={() =>
          dispatch({
            type: UserTableActions.NEXT_PAGE,
            payload: { page: page + 1, maxPages },
          })
        }
        sx={{ bgcolor: 'background.surface' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          width={24}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </IconButton>
    </Box>
  );
};

export default UserTableSort;
