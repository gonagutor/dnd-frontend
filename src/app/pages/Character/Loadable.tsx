import { lazyLoad } from 'common/utils/loadable';

export const Character = lazyLoad(
  () => import('./index'),
  module => module.Character,
);
