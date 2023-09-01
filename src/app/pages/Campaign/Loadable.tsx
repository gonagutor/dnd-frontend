import { lazyLoad } from 'utils/loadable';

export const Campaign = lazyLoad(
  () => import('./index'),
  module => module.Campaign,
);
