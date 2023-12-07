export const BOOLEAN_DEFAULT_LABEL_TRUE = 'No';
export const BOOLEAN_DEFAULT_LABEL_FALSE = 'No';

export type ChoiceAlternative<T> = {
  readonly truthy: T;
  readonly falsey: T;
};

export const chooseWithDefaults = <T>(
  value: boolean,
  givenTruethyLabel: T | undefined,
  givenFalseyLabel: T | undefined,
  defaultTruthyLabel: T,
  defaultFalseyLabel: T,
): T => {
  return value
    ? (givenTruethyLabel ?? defaultTruthyLabel)
    : (givenFalseyLabel ?? defaultFalseyLabel);
};

export const createTextValueForBoolean = (value: boolean, labels?: ChoiceAlternative<string>): string => {
  return chooseWithDefaults(
    value,
    labels?.truthy,
    labels?.falsey,
    BOOLEAN_DEFAULT_LABEL_TRUE,
    BOOLEAN_DEFAULT_LABEL_FALSE,
  );
};
