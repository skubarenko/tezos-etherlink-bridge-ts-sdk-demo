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
