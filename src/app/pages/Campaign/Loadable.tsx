import { lazyLoad } from 'common/utils/loadable';

export const Campaign = lazyLoad(
  () => import('./index'),
  module => module.Campaign,
);
