import { lazyLoad } from 'utils/loadable';

export const UsersList = lazyLoad(
  () => import('./index'),
  module => module.UsersList,
);
