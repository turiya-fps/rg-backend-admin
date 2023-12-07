import type { StoreAction } from '../common';

/**
 * A union of all available actions against this store.
 */
export type GlobalStoreAction = (
  | GlobalStoreAction.GlobalStoreSetLoading
);

export namespace GlobalStoreAction {
  /**
   * Set the global loading state.
   */
  export type GlobalStoreSetLoading = StoreAction<'SET_LOADING'> & { readonly state: boolean };
}

/**
 * The type describing the shape of this store.
 */
export type GlobalStoreState = {
  /**
   * Determines if the application is performing a task that requires the UI to be blocked.
   * This is typically only used for cases when the application is recovering from a page reload.
   */
  readonly loading: boolean;
};

/**
 * The initial (default) value for {@link GlobalStoreState}.
 */
export const initial: GlobalStoreState = {
  loading: false,
};
