import { lazyLoad } from 'common/utils/loadable';

export const Register = lazyLoad(
  () => import('./index'),
  module => module.Register,
);
