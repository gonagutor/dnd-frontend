import { lazyLoad } from 'utils/loadable';

export const CharacterView = lazyLoad(
  () => import('./index'),
  module => module.CharacterView,
);
