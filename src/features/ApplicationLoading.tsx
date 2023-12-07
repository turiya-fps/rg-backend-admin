import type { FunctionComponent } from 'react';
import { PageLoader } from '../components/loading/page/PageLoader';
import { useGlobalStore } from '../stores/global/context';

/**
 * Handle the display of page loading states.
 */
export const ApplicationLoading: FunctionComponent = () => {
  const global = useGlobalStore();

  if (global.state.loading === false) {
    return null;
  }

  return (
    <PageLoader />
  );
};
