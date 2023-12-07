import { charSets, generatePassword } from './password';

describe('generatePassword()', (): void => {
  it('with length, generates password of that length containing a lowercase, an uppercase, a number and a symbol', (): void => {
    const length = 12;
    const password = generatePassword(length);
    expect(password).to.contain.oneOf(charSets[0].split(''));
    expect(password).to.contain.oneOf(charSets[1].split(''));
    expect(password).to.contain.oneOf(charSets[2].split(''));
    expect(password).to.contain.oneOf(charSets[3].split(''));
    expect(password.length).toEqual(length);
  });
});
