import { lazyLoad } from 'common/utils/loadable';

export const Homebrew = lazyLoad(
  () => import('./index'),
  module => module.Homebrew,
);
