import { lazyLoad } from 'utils/loadable';

export const Index = lazyLoad(
  () => import('./index'),
  module => module.Index,
);
