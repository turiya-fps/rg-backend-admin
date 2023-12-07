import { never } from '@matt-usurp/grok';
import type { StoreReducerFunction } from '../common';
import type { GlobalStoreAction, GlobalStoreState } from './store';

/**
 * A function that can handler dispatched {@link GlobalStoreAction} and mutate the {@link GlobalStoreState} accordingly.
 */
export type GlobalStoreReducerFunction<A extends GlobalStoreAction = GlobalStoreAction> = StoreReducerFunction<GlobalStoreState, A>;

/**
 * Handle the {@link GlobalStoreAction.GlobalStoreSetLoading} action.
 */
export const handleGlobalStoreSetLoading: GlobalStoreReducerFunction<GlobalStoreAction.GlobalStoreSetLoading> = (state, action) => {
  return {
    ...state,

    loading: action.state,
  };
};

/**
 * A factory for creating an implementation of {@link GlobalStoreReducerFunction}.
 */
export const reducer = (): GlobalStoreReducerFunction => {
  return (state, action) => {
    /* c8 ignore start */
    // Type safety should ensure this is covered!
    switch (action.type) {
      case 'SET_LOADING': return handleGlobalStoreSetLoading(state, action);
    }
    /* c8 ignore stop */

    // This is an exhaustive check type guard that enforces all actions are present in code.
    // Do not change this, however, implement a case for handling the action that is causing the error above.
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw never(action.type);
  };
};
