import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticationStore } from '../../stores/authentication/context';
import { AuthenticationStoreStateInitialisation } from '../../stores/authentication/store';

/**
 * A higher order component that will enforce that the user is authenticated.
 *
 * @see https://reactjs.org/docs/higher-order-components.html
 */
export const withAuthentication = (component: ReactNode): ReactNode => {
  const authentication = useAuthenticationStore();

  // We are waiting for authentication state to initialise before we make a decision.
  // In this case we render nothing and wait for the stores state to be available.
  // This should never be seen realistically because of the global loading state.
  if (authentication.state.initialised !== AuthenticationStoreStateInitialisation.Initialised) {
    return null;
  }

  if (authentication.state.authenticated === false) {
    return (
      <Navigate to={'/login'} />
    );
  }

  // Otherwise return the component that was going to be rendered.
  // This cannot be wrapped or modified as the component will expect user data.
  // This prevents components from getting extremely complex.
  return component;
};
