import type { Dispatch } from 'react';

/**
 * A constraint type for store state.
 */
export type StoreStateKind = Record<string, unknown>;

/**
 * The base of all store actions.
 */
export type StoreAction<T extends string> = {
  /**
   * The action identifier to trigger.
   */
  readonly type: T;
};

/**
 * A constraint type for {@link StoreAction}.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StoreActionKind = StoreAction<any>;

/**
 * A function that can mutate the state of type {@link S} using an action of type {@link A}.
 */
export type StoreReducerFunction<S extends StoreStateKind, A extends StoreActionKind> = (state: S, action: A) => S;

/**
 * A type representing the value within a context and returned from store hooks.
 */
export type StoreContextControls<S extends StoreStateKind, A extends StoreActionKind> = {
  /**
   * The store current state.
   */
  readonly state: S;

  /**
   * A function that will dispatch actions of type {@link A} to the store.
   */
  readonly dispatch: Dispatch<A>;
};

/**
 * A proxy dispatcher that will allow for debugging.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const proxy = <T extends Dispatch<any>>(name: string, dispatcher: T): T => {
  return ((action) => {
    /* c8 ignore start */
    // Ignore debug directives from code coverage!
    if (DEBUG_STORE === true) {
      // eslint-disable-next-line no-console
      console.debug(`stores.${name}.reducer.dispatch`, action);
    }
    /* c8 ignore stop */

    dispatcher(action);
  }) as T;
};
