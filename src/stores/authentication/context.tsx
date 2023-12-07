import type { FunctionComponent, PropsWithChildren } from 'react';
import { createContext, useContext, useReducer } from 'react';
import type { AuthenticationCredentialStorage, AuthenticationTokenMapping } from '../../helpers/authentication/credential-storage';
import type { StoreContextControls } from '../common';
import { proxy } from '../common';
import type { AuthenticationStoreReducerFunction } from './reducer';
import { reducer } from './reducer';
import type { AuthenticationStoreAction, AuthenticationStoreState } from './store';
import { initial } from './store';

/**
 * A type representing the controls available from within context.
 */
export type AuthenticationStoreContext = StoreContextControls<AuthenticationStoreState, AuthenticationStoreAction>;

/**
 * The context that will be used to store {@link AuthenticationStoreContext}.
 * This is jailed in local scope to enforce the usage of the {@link AuthenticationStoreContextProvider} instead.
 * The value `undefined` is used so we can detect the lack of the {@link AuthenticationStoreContextProvider} and warn for it.
 */
const Context = createContext<AuthenticationStoreContext | undefined>(undefined);

/**
 * Retrieve the {@link AuthenticationStoreContext} from context.
 */
export const useAuthenticationStore = (): AuthenticationStoreContext => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error([
      'The context "AuthenticationStoreContext" is not available to this component.',
      'Ensure the "AuthenticationStoreContextProvider" provider has been used and is a parent of this component.',
    ].join(' '));
  }

  return context;
};

/**
 * A shortcut hook to access the {@link AuthenticationStoreContext} stored credentials.
 */
export const useAuthenticationStoreCredentials = (): AuthenticationTokenMapping | undefined => {
  const authentication = useAuthenticationStore();

  return authentication.state.tokens;
};

export type AuthenticationStoreContextProviderProps = {
  readonly storage: AuthenticationCredentialStorage;
  readonly initial?: AuthenticationStoreState;
};

/**
 * Provide the {@link AuthenticationStoreContext} context and setup with defaults.
 */
export const AuthenticationStoreContextProvider: FunctionComponent<PropsWithChildren<AuthenticationStoreContextProviderProps>> = (props) => {
  const [state, fn] = useReducer<AuthenticationStoreReducerFunction>(reducer(props.storage), props.initial ?? initial);
  const dispatch = proxy('authentication', fn);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
