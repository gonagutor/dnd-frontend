import { lazyLoad } from 'utils/loadable';

export const CharacterList = lazyLoad(
  () => import('./index'),
  module => module.CharacterList,
);
