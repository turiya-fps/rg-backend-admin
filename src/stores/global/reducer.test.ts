import * as reducer from './reducer';
import type { GlobalStoreAction, GlobalStoreState } from './store';
import { initial } from './store';

describe('handleGlobalStoreSetLoading()', (): void => {
  it('when state is true, set loading true', (): void => {
    const initial: GlobalStoreState = {
      loading: false,
    };

    expect(
      reducer.handleGlobalStoreSetLoading(initial, {
        type: 'SET_LOADING',
        state: true,
      }),
    ).toStrictEqual<GlobalStoreState>({
      loading: true,
    });
  });

  it('with state is false, set loading false', (): void => {
    const initial: GlobalStoreState = {
      loading: true,
    };

    expect(
      reducer.handleGlobalStoreSetLoading(initial, {
        type: 'SET_LOADING',
        state: false,
      }),
    ).toStrictEqual<GlobalStoreState>({
      loading: false,
    });
  });
});

describe('reducer()', (): void => {
  it('with invalid action, throw', (): void => {
    expect(
      () => reducer.reducer()(initial, {
        type: 'INVALID',
      } as unknown as GlobalStoreAction),
    ).toThrowError('A never reach assertion was executed with given value: "INVALID"');
  });
});
