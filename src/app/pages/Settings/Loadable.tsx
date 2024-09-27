import { lazyLoad } from 'common/utils/loadable';

export const Settings = lazyLoad(
  () => import('./index'),
  module => module.Settings,
);
