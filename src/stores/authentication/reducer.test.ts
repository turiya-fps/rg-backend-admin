import { instance, partial } from '@matt-usurp/grok/testing';
import type { UserHttpResource } from '@project-rouge/service-user-client/resource/user';
import type { AuthenticationCredentialStorage } from '../../helpers/authentication/credential-storage';
import * as reducer from './reducer';
import type { AuthenticationStoreAction, AuthenticationStoreState } from './store';
import { AuthenticationStoreStateInitialisation, initial } from './store';

describe('handleAuthenticationStoreInitialise()', (): void => {
  it('when storage is empty, state initialises instantly', (): void => {
    const storage = instance<AuthenticationCredentialStorage>([
      'get',
    ]);

    storage.get.mockReturnValueOnce(undefined);

    expect(
      reducer.handleAuthenticationStoreInitialise(storage)(initial, {
        type: 'INITIALISE',
      }),
    ).toStrictEqual<AuthenticationStoreState>({
      ...initial,

      initialised: AuthenticationStoreStateInitialisation.Initialised,
    });

    expect(storage.get).toBeCalledTimes(1);
    expect(storage.get).toBeCalledWith<[]>();
  });

  it('when storage has credentials, state awaits verification', (): void => {
    const storage = instance<AuthenticationCredentialStorage>([
      'get',
    ]);

    storage.get.mockReturnValueOnce({
      admin: 'test:token:admin',
    });

    expect(
      reducer.handleAuthenticationStoreInitialise(storage)(initial, {
        type: 'INITIALISE',
      }),
    ).toStrictEqual<AuthenticationStoreState>({
      ...initial,

      initialised: AuthenticationStoreStateInitialisation.AwaitingVerification,

      tokens: {
        admin: 'test:token:admin',
      },
    });

    expect(storage.get).toBeCalledTimes(1);
    expect(storage.get).toBeCalledWith<[]>();
  });
});

describe('handleAuthenticationStoreSetAdminToken()', (): void => {
  it('when storage is empty, set admin token', (): void => {
    const storage = instance<AuthenticationCredentialStorage>([
      'setAdminToken',
    ]);

    expect(
      reducer.handleAuthenticationStoreSetAdminToken(storage)(initial, {
        type: 'SET_ADMIN_TOKEN',

        tokens: {
          admin: 'test:token:admin',
        },
      }),
    ).toStrictEqual<AuthenticationStoreState>({
      ...initial,

      initialised: AuthenticationStoreStateInitialisation.AwaitingVerification,
      authenticated: false,

      tokens: {
        admin: 'test:token:admin',
      },
    });

    expect(storage.setAdminToken).toBeCalledTimes(1);
    expect(storage.setAdminToken).toBeCalledWith<[string]>('test:token:admin');
  });

  it('when storage has token, override admin token', (): void => {
    const storage = instance<AuthenticationCredentialStorage>([
      'setAdminToken',
    ]);

    expect(
      reducer.handleAuthenticationStoreSetAdminToken(storage)(
        {
          ...initial,

          tokens: {
            admin: 'test:token:existing',
          },
        },
        {
          type: 'SET_ADMIN_TOKEN',

          tokens: {
            admin: 'test:token:admin',
          },
        },
      ),
    ).toStrictEqual<AuthenticationStoreState>({
      ...initial,

      initialised: AuthenticationStoreStateInitialisation.AwaitingVerification,
      authenticated: false,

      tokens: {
        admin: 'test:token:admin',
      },
    });

    expect(storage.setAdminToken).toBeCalledTimes(1);
    expect(storage.setAdminToken).toBeCalledWith<[string]>('test:token:admin');
  });
});

describe('handleAuthenticationStoreSetUser()', (): void => {
  it('when state is empty, set user', (): void => {
    expect(
      reducer.handleAuthenticationStoreSetUser()(initial, {
        type: 'SET_USER',

        user: partial<UserHttpResource>({
          email: 'person@email.com',
        }),
      }),
    ).toStrictEqual<AuthenticationStoreState>({
      ...initial,

      initialised: AuthenticationStoreStateInitialisation.Initialised,
      authenticated: true,

      user: partial<UserHttpResource>({
        email: 'person@email.com',
      }),
    });
  });

  it('when state has user, override user', (): void => {
    expect(
      reducer.handleAuthenticationStoreSetUser()(
        {
          ...initial,

          tokens: {
            admin: 'test:token:admin',
          },

          user: partial<UserHttpResource>({
            email: 'exising@email.com',
          }),
        },
        {
          type: 'SET_USER',

          user: partial<UserHttpResource>({
            email: 'person@email.com',
          }),
        },
      ),
    ).toStrictEqual<AuthenticationStoreState>({
      ...initial,

      initialised: AuthenticationStoreStateInitialisation.Initialised,
      authenticated: true,

      tokens: {
        admin: 'test:token:admin',
      },

      user: partial<UserHttpResource>({
        email: 'person@email.com',
      }),
    });
  });
});

describe('handleAuthenticationStoreLogout()', (): void => {
  it('when state is empty, do nothing', (): void => {
    const storage = instance<AuthenticationCredentialStorage>([
      'reset',
    ]);

    expect(
      reducer.handleAuthenticationStoreLogout(storage)(initial, {
        type: 'LOGOUT',
      }),
    ).toStrictEqual<AuthenticationStoreState>({
      ...initial,

      initialised: AuthenticationStoreStateInitialisation.Initialised,
      tokens: undefined,
      user: undefined,
    });

    expect(storage.reset).toBeCalledTimes(1);
    expect(storage.reset).toBeCalledWith<[]>();
  });

  it('when state is authenticated, de-authenticates', (): void => {
    const storage = instance<AuthenticationCredentialStorage>([
      'reset',
    ]);

    expect(
      reducer.handleAuthenticationStoreLogout(storage)(
        {
          ...initial,

          initialised: AuthenticationStoreStateInitialisation.Initialised,
          authenticated: true,

          tokens: {
            admin: 'test:token:admin',
          },

          user: partial<UserHttpResource>({
            email: 'person@email.com',
          }),
        },
        {
          type: 'LOGOUT',
        },
      ),
    ).toStrictEqual<AuthenticationStoreState>({
      ...initial,

      initialised: AuthenticationStoreStateInitialisation.Initialised,
      tokens: undefined,
      user: undefined,
    });

    expect(storage.reset).toBeCalledTimes(1);
    expect(storage.reset).toBeCalledWith<[]>();
  });
});

describe('reducer()', (): void => {
  const storage = instance<AuthenticationCredentialStorage>([
    'get',
  ]);

  storage.get.mockReturnValueOnce(undefined);

  it('with invalid action, throw', (): void => {
    expect(
      () => reducer.reducer(storage)(initial, {
        type: 'INVALID',
      } as unknown as AuthenticationStoreAction),
    ).toThrowError('A never reach assertion was executed with given value: {"type":"INVALID"}');
  });
});
