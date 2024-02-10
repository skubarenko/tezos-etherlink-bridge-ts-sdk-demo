export * as guards from './guards';
export * as tokenUtils from './tokenUtils';
export * as textUtils from './textUtils';
export * as blockchainUtils from './blockchainUtils';

import combineClassNames from 'clsx';
export { combineClassNames };

export const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyFunction: () => any = () => { };

export const getErrorMessage = (error: unknown) => error instanceof Error ? error.message
  : typeof error === 'string' ? error : 'Unknown error';

