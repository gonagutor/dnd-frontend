import { lazyLoad } from 'common/utils/loadable';

export const UsersList = lazyLoad(
  () => import('./index'),
  module => module.UsersList,
);
