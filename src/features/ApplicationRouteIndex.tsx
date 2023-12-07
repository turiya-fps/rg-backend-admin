import type { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticationStore } from '../stores/authentication/context';
import { AuthenticationStoreStateInitialisation } from '../stores/authentication/store';

/**
 * An index route that is rendered initially by the router.
 * This should be used to decided where the user should be redirected too.
 */
export const ApplicationRouteIndex: FunctionComponent = () => {
  const authentication = useAuthenticationStore();

  // Waiting for authentication state to initialised before we make a decision.
  // This can be blank whilst we wait, in theory a global loading state is enabled at this point.
  if (authentication.state.initialised !== AuthenticationStoreStateInitialisation.Initialised) {
    return null;
  }

  if (authentication.state.authenticated === true) {
    return (
      <Navigate to={'/dashboard'} />
    );
  }

  return (
    <Navigate to={'/login'} />
  );
};
