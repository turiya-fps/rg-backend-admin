/**
 * A mapping of session tokens.
 */
export type AuthenticationTokenMapping = {
  readonly admin: string;
};

/**
 * The storage key used for admin tokens.
 */
export const KEY_SESSION_TOKEN_ADMIN = 'session:token:admin';

/**
 * A class that handles the storage of authentication credentials.
 */
export class AuthenticationCredentialStorage {
  public constructor(
    public readonly storage: Storage,
  ) {}

  /**
   * Attempt to retreive the {@link AuthenticationTokenMapping} from storage.
   */
  public get(): AuthenticationTokenMapping | undefined {
    const admin = this.storage.getItem(KEY_SESSION_TOKEN_ADMIN);

    if (admin === null) {
      return undefined;
    }

    return {
      admin,
    };
  }

  /**
   * Set the admin token in storage.
   */
  public setAdminToken(token: string): void {
    this.storage.setItem(KEY_SESSION_TOKEN_ADMIN, token);
  }

  /**
   * Reset the store, clearing the stored tokens if any.
   */
  public reset(): void {
    this.storage.removeItem(KEY_SESSION_TOKEN_ADMIN);
  }
}
