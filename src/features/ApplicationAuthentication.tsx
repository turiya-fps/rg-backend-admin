import { isHttpResponseIdentifier } from '@project-rouge/service-core/http/endpoint';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useGetUserQuery } from '../hooks/api/user/get-user';
import { useAuthenticationStore } from '../stores/authentication/context';
import { AuthenticationStoreStateInitialisation } from '../stores/authentication/store';
import { useGlobalStore } from '../stores/global/context';

/**
 * Handle the bootstrapping of the authentication store and refreshing of credentials.
 */
export const ApplicationAuthentication: FunctionComponent<PropsWithChildren> = (props) => {
  const global = useGlobalStore();
  const authentication = useAuthenticationStore();
  const getUserQuery = useGetUserQuery();

  /**
   * The state is in a fresh state, it needs to be rehydrated from a cache or storage.
   */
  const handleStateInFreshState = async (): Promise<void> => {
    authentication.dispatch({
      type: 'INITIALISE',
    });
  };

  /**
   * The tokens have been rehydrated from cache or storage but have not been verified.
   * At this point we are not yet authenticated, we need to check the session is still valid.
   */
  const handleStateInAwaitingVerificationState = async (): Promise<void> => {
    global.dispatch({
      type: 'SET_LOADING',
      state: true,
    });

    const response = await getUserQuery.make({
      id: 'me',
    });

    if (isHttpResponseIdentifier(response, 'success:data:user')) {
      authentication.dispatch({
        type: 'SET_USER',
        user: response.body,
      });
    } else {
      authentication.dispatch({
        type: 'LOGOUT',
      });
    }

    global.dispatch({
      type: 'SET_LOADING',
      state: false,
    });
  };

  useEffect(() => {
    if (authentication.state.initialised === AuthenticationStoreStateInitialisation.Fresh) {
      if (DEBUG_STORE === true) {
        // eslint-disable-next-line no-console
        console.debug('application.authentication', 'initialising ..');
      }

      // eslint-disable-next-line no-void
      void handleStateInFreshState();
    } else if (authentication.state.initialised === AuthenticationStoreStateInitialisation.AwaitingVerification) {
      if (DEBUG_STORE === true) {
        // eslint-disable-next-line no-console
        console.debug('application.authentication', 'awaiting verification ..');
      }

      // eslint-disable-next-line no-void
      void handleStateInAwaitingVerificationState();
    }
  }, [authentication.state.initialised]);

  return (
    <>{props.children}</>
  );
};
