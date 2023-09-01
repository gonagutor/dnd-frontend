import { lazyLoad } from 'utils/loadable';

export const Homebrew = lazyLoad(
  () => import('./index'),
  module => module.Homebrew,
);
