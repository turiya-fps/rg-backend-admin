import { isValidEmail } from './email';

describe('isValidEmail()', (): void => {
  it('without @ or . return false', (): void => {
    expect(isValidEmail('something')).toStrictEqual(false);
  });
  it('without @ return false', (): void => {
    expect(isValidEmail('user.something.xyz')).toStrictEqual(false);
  });
  it('without mailbox name return false', (): void => {
    expect(isValidEmail('@something.xyz')).toStrictEqual(false);
  });
  it('without TLD return false', (): void => {
    expect(isValidEmail('no-tld@something')).toStrictEqual(false);
  });
  it('for valid email structure return true', (): void => {
    expect(isValidEmail('user@something.xyz')).toStrictEqual(true);
  });
});
