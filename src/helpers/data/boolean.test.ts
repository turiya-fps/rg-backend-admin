import { BOOLEAN_DEFAULT_LABEL_FALSE, BOOLEAN_DEFAULT_LABEL_TRUE, chooseWithDefaults, createTextValueForBoolean } from './boolean';

describe('chooseWithDefaults()', (): void => {
  it('with false, no alternative labels, return default false label', (): void => {
    expect(
      chooseWithDefaults(
        false,
        undefined,
        undefined,
        'true',
        'false',
      ),
    ).toStrictEqual('false');
  });

  it('with true, no alternative labels, return default true label', (): void => {
    expect(
      chooseWithDefaults(
        true,
        undefined,
        undefined,
        'true',
        'false',
      ),
    ).toStrictEqual('true');
  });

  it('with false, with alternative labels, return alternative false label', (): void => {
    expect(
      chooseWithDefaults(
        false,
        'given-true',
        'given-false',
        'true',
        'false',
      ),
    ).toStrictEqual('given-false');
  });

  it('with true, with alternative labels, return alternative true label', (): void => {
    expect(
      chooseWithDefaults(
        true,
        'given-true',
        'given-false',
        'true',
        'false',
      ),
    ).toStrictEqual('given-true');
  });
});

describe('createTextValueForBoolean()', (): void => {
  it('with false, no alternative labels, return default false label', (): void => {
    expect(
      createTextValueForBoolean(false),
    ).toStrictEqual(BOOLEAN_DEFAULT_LABEL_FALSE);
  });

  it('with true, no alternative labels, return default true label', (): void => {
    expect(
      createTextValueForBoolean(true),
    ).toStrictEqual(BOOLEAN_DEFAULT_LABEL_TRUE);
  });

  it('with false, with alternative labels, return alternative false label', (): void => {
    expect(
      createTextValueForBoolean(false, {
        truthy: 'True',
        falsey: 'False',
      }),
    ).toStrictEqual('False');
  });

  it('with true, with alternative labels, return alternative true label', (): void => {
    expect(
      createTextValueForBoolean(true, {
        truthy: 'True',
        falsey: 'False',
      }),
    ).toStrictEqual('True');
  });
});
