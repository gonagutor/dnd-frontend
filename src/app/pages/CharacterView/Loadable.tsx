import { lazyLoad } from 'common/utils/loadable';

export const CharacterView = lazyLoad(
  () => import('./index'),
  module => module.CharacterView,
);
