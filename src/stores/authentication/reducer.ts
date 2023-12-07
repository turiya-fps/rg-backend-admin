import { never } from '@matt-usurp/grok';
import type { AuthenticationCredentialStorage } from '../../helpers/authentication/credential-storage';
import type { StoreReducerFunction } from '../common';
import type { AuthenticationStoreAction, AuthenticationStoreState } from './store';
import { AuthenticationStoreStateInitialisation } from './store';

/**
 * A function that can handler dispatched {@link AuthenticationStoreAction} and mutate the {@link AuthenticationStoreState} accordingly.
 */
export type AuthenticationStoreReducerFunction<A extends AuthenticationStoreAction = AuthenticationStoreAction> = StoreReducerFunction<AuthenticationStoreState, A>;

/**
 * A factory for handling the {@link AuthenticationStoreAction.AuthenticationStoreInitialise} action.
 */
export const handleAuthenticationStoreInitialise = (storage: AuthenticationCredentialStorage): AuthenticationStoreReducerFunction<AuthenticationStoreAction.AuthenticationStoreInitialise> => {
  return (state) => {
    const tokens = storage.get();

    /* c8 ignore start */
    // Ignore debug directives from code coverage!
    if (DEBUG_STORE === true) {
      if (tokens === undefined) {
        // eslint-disable-next-line no-console
        console.debug('stores.authentication.reducer.initialise', 'session storage empty');
      } else {
        // eslint-disable-next-line no-console
        console.debug('stores.authentication.reducer.initialise', 'session storage contains tokens', { tokens });
      }
    }
    /* c8 ignore stop */

    // When tokens are not present, we are initialised and not authenticated.
    // When tokens are present, we are await verification of tokens and not authenticated.

    return {
      ...state,

      initialised: tokens === undefined
        ? AuthenticationStoreStateInitialisation.Initialised
        : AuthenticationStoreStateInitialisation.AwaitingVerification,

      authenticated: false,
      tokens,
    };
  };
};

/**
 * A factory for handling the {@link AuthenticationStoreAction.AuthenticationStoreSetAdminToken} action.
 */
export const handleAuthenticationStoreSetAdminToken = (storage: AuthenticationCredentialStorage): AuthenticationStoreReducerFunction<AuthenticationStoreAction.AuthenticationStoreSetAdminToken> => {
  return (state, action) => {
    storage.setAdminToken(action.tokens.admin);

    return {
      ...state,

      initialised: AuthenticationStoreStateInitialisation.AwaitingVerification,
      authenticated: false,

      tokens: {
        admin: action.tokens.admin,
      },
    };
  };
};

/**
 * A factory for handling the {@link AuthenticationStoreAction.AuthenticationStoreSetUser} action.
 */
export const handleAuthenticationStoreSetUser = (): AuthenticationStoreReducerFunction<AuthenticationStoreAction.AuthenticationStoreSetUser> => {
  return (state, action) => {
    return {
      ...state,

      initialised: AuthenticationStoreStateInitialisation.Initialised,
      authenticated: true,
      user: action.user,
    };
  };
};

/**
 * A factory for handling the {@link AuthenticationStoreAction.AuthenticationStoreLogout} action.
 */
export const handleAuthenticationStoreLogout = (storage: AuthenticationCredentialStorage): AuthenticationStoreReducerFunction<AuthenticationStoreAction.AuthenticationStoreLogout> => {
  return (state) => {
    storage.reset();

    return {
      ...state,

      initialised: AuthenticationStoreStateInitialisation.Initialised,
      authenticated: false,
      tokens: undefined,
      user: undefined,
    };
  };
};

/**
 * A factory for creating an implementation of {@link AuthenticationStoreReducerFunction}.
 */
export const reducer = (storage: AuthenticationCredentialStorage): AuthenticationStoreReducerFunction => {
  return (state, action) => {
    /* c8 ignore start */
    // Type safety should ensure this is covered!
    switch (action.type) {
      case 'INITIALISE': return handleAuthenticationStoreInitialise(storage)(state, action);

      case 'SET_ADMIN_TOKEN': return handleAuthenticationStoreSetAdminToken(storage)(state, action);
      case 'SET_USER': return handleAuthenticationStoreSetUser()(state, action);

      case 'LOGOUT': return handleAuthenticationStoreLogout(storage)(state, action);
    }
    /* c8 ignore stop */

    // This is an exhaustive check type guard that enforces all actions are present in code.
    // Do not change this, however, implement a case for handling the action that is causing the error above.
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw never(action);
  };
};
