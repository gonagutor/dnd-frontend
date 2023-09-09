import { lazyLoad } from 'utils/loadable';

export const CreateCharacter = lazyLoad(
  () => import('./index'),
  module => module.CreateCharacter,
);
