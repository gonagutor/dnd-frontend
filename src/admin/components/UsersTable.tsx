import * as React from 'react';
import Table from '@mui/joy/Table';
import Checkbox from '@mui/joy/Checkbox';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';
import { User } from 'services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import Loader from 'app/components/Loader';
import UserTableActions from 'store/actions/userTable';
import moment from 'moment';
import {
  Box,
  Dropdown,
  FormControl,
  IconButton,
  Link,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Typography,
} from '@mui/joy';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
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
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Rol' },
  { id: 'isActive', numeric: false, disablePadding: false, label: 'Activo' },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de creación',
  },
  {
    id: 'updatedAt',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de actualización',
  },
];

interface Data {
  name: string;
  surname: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <thead>
      <tr>
        {headCells.map(headCell => {
          const active = orderBy === headCell.id;
          return (
            <th
              key={headCell.id}
              aria-sort={
                active
                  ? ({ asc: 'ascending', desc: 'descending' } as const)[order]
                  : undefined
              }
            >
              <Link
                underline="none"
                color="neutral"
                textColor={active ? 'primary.plainColor' : undefined}
                component="button"
                onClick={createSortHandler(headCell.id)}
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
                      active && order === 'desc'
                        ? 'rotate(0deg)'
                        : 'rotate(180deg)',
                  },
                  '&:hover': { '& svg': { opacity: 1 } },
                }}
              >
                {headCell.label}
                {active ? (
                  <Box component="span" sx={{ display: 'none' }}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
        <th></th>
      </tr>
    </thead>
  );
};

const UserTableSort = ({ users }: { users: User[] }) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const dispatch = useDispatch();
  const { pending, error, page, maxPages } = useSelector(
    (state: RootState) => state.userTable,
  );

  const copyIdToClipboard = async (id: string) => {
    await navigator.clipboard.writeText(id);
  };

  const usersParsed = users.map(user => ({
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    isActive: user.isActive ? 1 : 0,
    createdAt: user.createdAt || '',
    updatedAt: user.updatedAt || '',
  }));

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map(user => user.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

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
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={users.length}
        />
        <tbody>
          {stableSort(usersParsed, getComparator(order, orderBy)).map(
            (user, index) => {
              const isItemSelected = isSelected(user.id);

              return (
                <tr
                  onClick={event => handleClick(event, user.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={user.id}
                  // selected={isItemSelected}
                  style={
                    isItemSelected
                      ? ({
                          '--TableCell-dataBackground':
                            'var(--TableCell-selectedBackground)',
                          '--TableCell-headBackground':
                            'var(--TableCell-selectedBackground)',
                        } as React.CSSProperties)
                      : {}
                  }
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
                      checked={user.isActive === 1}
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
            },
          )}
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
  const { page, maxPages } = useSelector((state: RootState) => state.userTable);

  const [pages, setPages] = React.useState<React.ReactNode[]>([]);

  React.useEffect(() => {
    const generatePages = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const firstPages = generatePages(1, Math.min(3, maxPages));

    // Últimos 3 botones
    const lastPages = generatePages(Math.max(maxPages - 2, 1), maxPages);

    // Botones alrededor de la página actual
    const middlePages = generatePages(
      Math.max(page - 1, 1),
      Math.min(page + 1, maxPages),
    );

    // Combina todos los conjuntos de botones y elimina duplicados
    const pagesSet = new Set([...firstPages, ...middlePages, ...lastPages]);
    const pages = Array.from(pagesSet).sort((a, b) => a - b);

    const buttons: React.ReactNode[] = [];

    for (let i = 0; i < pages.length; i++) {
      // Agregar el primer botón
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

      // Agregar "..." si hay un salto de más de 1 página
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

// export function UsersTable({ users }: { users: User[] }) {
//   const dispatch = useDispatch();
//   const { pending, error } = useSelector((state: RootState) => state.userTable);

//   const copyIdToClipboard = async (id: string) => {
//     await navigator.clipboard.writeText(id);
//   };

//   return (
//     <Sheet sx={{ borderRadius: 10 }}>
//       {pending && <Loader />}
//       {!pending && error && <p style={{ color: 'white' }}>{error}</p>}
//       <Table
//         sx={{
//           bgcolor: 'gray',
//         }}
//         color="neutral"
//         size="md"
//       >
//         <thead>
//           <tr>
//             <th>Nombre</th>
//             <th>Apellido</th>
//             <th>Email</th>
//             <th>Rol</th>
//             <th>Activo</th>
//             <th>Fecha de creación</th>
//             <th>Fecha de actualización</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id} style={{ color: 'white' }}>
//               <td
//                 style={{ textTransform: 'capitalize' }}
//                 onClick={() => copyIdToClipboard(user.id)}
//               >
//                 {user.name}
//               </td>
//               <td style={{ textTransform: 'capitalize' }}>{user.surname}</td>
//               <td>{user.email}</td>
//               <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
//               <td>
//                 <Checkbox
//                   color="primary"
//                   label=""
//                   variant="solid"
//                   checked={user.isActive}
//                 />
//               </td>
//               <td>
//                 {user.createdAt
//                   ? moment(user.createdAt).format('DD/MM/YYYY HH:mm')
//                   : 'Unkown'}
//               </td>
//               <td>
//                 {user.updatedAt
//                   ? moment(user.updatedAt).format('DD/MM/YYYY HH:mm')
//                   : 'Unkown'}
//               </td>
//               <td style={{ textAlign: 'center' }}>
//                 <Dropdown>
//                   <MenuButton>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="white"
//                       className="size-6"
//                       width={24}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
//                       />
//                     </svg>
//                   </MenuButton>
//                   <Menu>
//                     <MenuItem onClick={() => copyIdToClipboard(user.id)}>
//                       Copiar ID
//                     </MenuItem>
//                     <MenuItem
//                       onClick={() => {
//                         dispatch({
//                           type: UserTableActions.UPDATE_USER,
//                           payload: {
//                             id: user.id,
//                             isActive: !user.isActive,
//                             users,
//                           },
//                         });
//                       }}
//                     >
//                       Activar/Desactivar
//                     </MenuItem>
//                     <ListDivider />
//                     <MenuItem
//                       onClick={() =>
//                         dispatch({
//                           type: UserTableActions.DELETE_USER,
//                           payload: { id: user.id, users },
//                         })
//                       }
//                       sx={{ color: 'red' }}
//                     >
//                       Eliminar
//                     </MenuItem>
//                   </Menu>
//                 </Dropdown>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Sheet>
//   );
// }
