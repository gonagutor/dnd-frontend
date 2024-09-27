import { lazyLoad } from 'common/utils/loadable';

export const Login = lazyLoad(
  () => import('./index'),
  module => module.Login,
);
