import { lazyLoad } from 'common/utils/loadable';

export const Landing = lazyLoad(
  () => import('./index'),
  module => module.Landing,
);
