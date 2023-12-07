/**
 * A fake implementation of {@link Storage} for testing and storybook.
 * This is mainly required for storybook as it doesn't have access to the happy dom implementation.
 */
export class FakeStorage implements Storage {
  private readonly storage: Record<string, string | undefined> = {};

  /**
   * @inheritdoc
   */
  public get length(): number {
    return Object.entries(this.storage).length;
  }

  /**
   * @inheritdoc
   */
  public getItem(key: string): string | null {
    return this.storage[key] ?? null;
  }

  /**
   * @inheritdoc
   */
  public setItem(key: string, value: string): void {
    this.storage[key] = value;
  }

  /**
   * @inheritdoc
   */
  public removeItem(key: string): void {
    delete this.storage[key];
  }

  /**
   * @inheritdoc
   */
  public key(): string | null {
    throw new Error('Method (FakeStorage.key) not implemented.');
  }

  /**
   * @inheritdoc
   */
  public clear(): void {
    throw new Error('Method (FakeStorage.clear) not implemented.');
  }
}
