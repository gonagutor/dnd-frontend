import { lazyLoad } from 'common/utils/loadable';

export const Dashboard = lazyLoad(
  () => import('./index'),
  module => module.Dashboard,
);
