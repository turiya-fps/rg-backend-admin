export const charSets = [
  'abcdefghijklmnopqrstuvwxyz',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789',
  '123456789',
  '!#$%&*+-/:<=>?@^_~',
];

export const generatePassword = (length = 12): string => {
  let genStr = '';

  do {
    for (let k = 0; k <= charSets.length - 1; k++) {
      genStr += charSets[k].charAt(Math.floor(Math.random() * charSets[k].length));
    }
  } while (genStr.length < length);

  return genStr;
};
