import type { FunctionComponent, PropsWithChildren } from 'react';
import { createContext, useContext, useReducer } from 'react';
import type { StoreContextControls } from '../common';
import { proxy } from '../common';
import type { GlobalStoreReducerFunction } from './reducer';
import { reducer } from './reducer';
import type { GlobalStoreAction, GlobalStoreState } from './store';
import { initial } from './store';

/**
 * A type representing the controls available from within context.
 */
export type GlobalStoreContext = StoreContextControls<GlobalStoreState, GlobalStoreAction>;

/**
 * The context that will be used to store {@link GlobalStoreContext}.
 * This is jailed in local scope to enforce the usage of the {@link GlobalStoreContextProvider} instead.
 * The value `undefined` is used so we can detect the lack of the {@link GlobalStoreContextProvider} and warn for it.
 */
const Context = createContext<GlobalStoreContext | undefined>(undefined);

/**
 * Retrieve the {@link GlobalStoreContext} from context.
 */
export const useGlobalStore = (): GlobalStoreContext => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error([
      'The context "GlobalStoreContext" is not available to this component.',
      'Ensure the "GlobalStoreContextProvider" provider has been used and is a parent of this component.',
    ].join(' '));
  }

  return context;
};

export type GlobalStoreContextProviderProps = {
  readonly initial?: GlobalStoreState;
};

/**
 * Provide the {@link GlobalStoreContext} context and setup with defaults.
 */
export const GlobalStoreContextProvider: FunctionComponent<PropsWithChildren<GlobalStoreContextProviderProps>> = (props) => {
  const [state, fn] = useReducer<GlobalStoreReducerFunction>(reducer(), props.initial ?? initial);
  const dispatch = proxy('global', fn);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
