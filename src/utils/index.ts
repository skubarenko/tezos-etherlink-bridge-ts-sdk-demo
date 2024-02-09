export * as guards from './guards';
export * as tokenUtils from './tokenUtils';
export * as textUtils from './textUtils';

import combineClassNames from 'clsx';
export { combineClassNames };

export const getErrorMessage = (error: unknown) => error instanceof Error ? error.message
  : typeof error === 'string' ? error : 'Unknown error';

