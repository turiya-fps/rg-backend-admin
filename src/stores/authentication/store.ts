import type { UserHttpResource } from '@project-rouge/service-user-client/resource/user';
import type { AuthenticationTokenMapping } from '../../helpers/authentication/credential-storage';
import type { StoreAction } from '../common';

/**
 * A union of all available actions against this store.
 */
export type AuthenticationStoreAction = (
  | AuthenticationStoreAction.AuthenticationStoreInitialise
  | AuthenticationStoreAction.AuthenticationStoreSetAdminToken
  | AuthenticationStoreAction.AuthenticationStoreSetUser
  | AuthenticationStoreAction.AuthenticationStoreLogout
);

export namespace AuthenticationStoreAction {
  /**
   * Initialise the store by reading values from persistent storage.
   */
  export type AuthenticationStoreInitialise = StoreAction<'INITIALISE'>;

  /**
   * Set the admin token against the store.
   */
  export type AuthenticationStoreSetAdminToken = StoreAction<'SET_ADMIN_TOKEN'> & {
    readonly tokens: {
      readonly admin: string;
    };
  };

  /**
   * Set the authenticated user data against the store.
   */
  export type AuthenticationStoreSetUser = StoreAction<'SET_USER'> & {
    readonly user: UserHttpResource;
  };

  /**
   * Clear authentication and crednetials from the store.
   */
  export type AuthenticationStoreLogout = StoreAction<'LOGOUT'>;
}

/**
 * Determines if the state has been initialised from persistent storage.
 * Essentially recovering the stored authentication credentials.
 */
export const enum AuthenticationStoreStateInitialisation {
  Fresh,
  AwaitingVerification,
  Initialised,
}

/**
 * The type describing the shape of this store.
 */
export type AuthenticationStoreState = {
  /**
   * Seee {@link AuthenticationStoreStateInitialisation}.
   */
  readonly initialised: AuthenticationStoreStateInitialisation;

  /**
   * Determines if the authentication credentials we have are valid.
   */
  readonly authenticated: boolean;

  /**
   * The authentication tokens.
   */
  readonly tokens: AuthenticationTokenMapping | undefined;

  /**
   * The authenticated users data.
   */
  readonly user: UserHttpResource | undefined;
};

/**
 * The initial (default) value for {@link AuthenticationStoreState}.
 */
export const initial: AuthenticationStoreState = {
  initialised: AuthenticationStoreStateInitialisation.Fresh,
  authenticated: false,
  tokens: undefined,
  user: undefined,
};
