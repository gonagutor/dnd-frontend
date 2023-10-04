import { lazyLoad } from 'utils/loadable';

export const CreateCharacterCancel = lazyLoad(
  () => import('./index'),
  module => module.CreateCharacterCancel,
);
