export * as guards from './guards';
export * as tokenUtils from './tokenUtils';
export * as textUtils from './textUtils';
export * as blockchainUtils from './blockchainUtils';

import combineClassNames from 'clsx';
export { combineClassNames };

export const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
export const emptyFunction = () => { };

export const getErrorMessage = (error: unknown) => error instanceof Error ? error.message
  : typeof error === 'string' ? error : 'Unknown error';

