import { lazyLoad } from 'common/utils/loadable';

export const CreateClass = lazyLoad(
  () => import('./index'),
  module => module.CreateClass,
);
