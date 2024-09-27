import { lazyLoad } from 'common/utils/loadable';

export const NotFound = lazyLoad(
  () => import('./index'),
  module => module.NotFound,
);
