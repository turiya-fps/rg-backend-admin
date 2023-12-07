import type { AuthenticationTokenMapping } from './credential-storage';
import { AuthenticationCredentialStorage, KEY_SESSION_TOKEN_ADMIN } from './credential-storage';

describe(AuthenticationCredentialStorage.name, (): void => {
  describe('get()', (): void => {
    it('with empty storage, return undefined', (): void => {
      const storage = new Storage();

      const credentails = new AuthenticationCredentialStorage(storage);

      expect(
        credentails.get(),
      ).toStrictEqual(undefined);
    });

    it('with token storage, return token mapping', (): void => {
      const storage = new Storage();

      storage.setItem(KEY_SESSION_TOKEN_ADMIN, 'test:token:admin');

      const credentails = new AuthenticationCredentialStorage(storage);

      expect(
        credentails.get(),
      ).toStrictEqual<AuthenticationTokenMapping>({
        admin: 'test:token:admin',
      });
    });
  });

  describe('setAdminToken()', (): void => {
    it('with empty storage, set admin token', (): void => {
      const storage = new Storage();

      expect(storage.length).toStrictEqual(0);
      expect(storage.getItem(KEY_SESSION_TOKEN_ADMIN)).toStrictEqual(null);

      const credentails = new AuthenticationCredentialStorage(storage);

      credentails.setAdminToken('test:token:admin');

      expect(storage.length).toStrictEqual(1);
      expect(storage.getItem(KEY_SESSION_TOKEN_ADMIN)).toStrictEqual('test:token:admin');
    });

    it('with existing item in storage, set admin token', (): void => {
      const storage = new Storage();

      storage.setItem(KEY_SESSION_TOKEN_ADMIN, 'test:existing:token:admin');

      expect(storage.length).toStrictEqual(1);

      const credentails = new AuthenticationCredentialStorage(storage);

      credentails.setAdminToken('test:token:admin');

      expect(storage.length).toStrictEqual(1);
      expect(storage.getItem(KEY_SESSION_TOKEN_ADMIN)).toStrictEqual('test:token:admin');
    });
  });

  describe('reset()', (): void => {
    it('with existing items in storage, clears storage', (): void => {
      const storage = new Storage();

      storage.setItem(KEY_SESSION_TOKEN_ADMIN, 'test:existing:token:admin');

      expect(storage.length).toStrictEqual(1);

      const credentials = new AuthenticationCredentialStorage(storage);

      credentials.reset();

      expect(storage.length).toStrictEqual(0);
      expect(storage.getItem(KEY_SESSION_TOKEN_ADMIN)).toStrictEqual(null);
    });
  });
});
