const getDecimalSeparatorIndex = (value: string): number => {
  for (let i = value.length - 1; i >= 0; i--) {
    const character = value[i];
    if (character === '.' || character === ',') {
      return i;
    }
  }

  return -1;
};
export const truncateTokensAmountToDecimals = (amount: string, decimals: number): string => {
  const decimalSeparatorIndex = getDecimalSeparatorIndex(amount);
  if (decimalSeparatorIndex === -1)
    return amount;

  const integerPart = amount.substring(0, decimalSeparatorIndex);
  return decimals ? integerPart + amount.substring(decimalSeparatorIndex, decimalSeparatorIndex + 1 + decimals) : integerPart;
};

const onlyDigitsRegex = /[^0-9]/g;
export const convertTokensAmountToRawAmount = (amount: string, decimals: number): bigint | null => {
  try {
    const truncatedAmount = truncateTokensAmountToDecimals(amount, decimals);

    const decimalSeparatorIndex = getDecimalSeparatorIndex(truncatedAmount);
    const exponent = !decimals || decimalSeparatorIndex === -1 || decimalSeparatorIndex === truncatedAmount.length - 1
      ? decimals
      : decimals - (truncatedAmount.length - decimalSeparatorIndex - 1);
    const multiplier = BigInt(10 ** exponent);

    const preparedAmount = truncatedAmount.replace(onlyDigitsRegex, '');
    const result = BigInt(preparedAmount) * multiplier;

    return result;
  }
  catch (error) {
    console.error(error);
    return null;
  }
};

export const convertTokensRawAmountToAmount = (amount: bigint, decimals: number): string => {
  const amountString = amount.toString(10);
  if (!decimals)
    return amountString;

  const integerPartLength = amountString.length - decimals;
  const amountWithDecimals = integerPartLength > 0
    ? amountString.substring(0, integerPartLength) + '.' + amountString.substring(integerPartLength)
    : '0.' + amountString;

  let excessTrailingZeroIndex = -1;
  for (let i = amountWithDecimals.length - 1; i >= 0; i--) {
    const character = amountWithDecimals[i];

    if (character === '.' || character === ',') {
      excessTrailingZeroIndex = i - 1;
      break;
    }
    else if (character !== '0') {
      excessTrailingZeroIndex = i;
      break;
    }
  }

  const result = excessTrailingZeroIndex > -1
    ? amountWithDecimals.substring(0, excessTrailingZeroIndex + 1)
    : amountWithDecimals;

  return result;
};
