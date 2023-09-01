import { lazyLoad } from 'utils/loadable';

export const Character = lazyLoad(
  () => import('./index'),
  module => module.Character,
);
