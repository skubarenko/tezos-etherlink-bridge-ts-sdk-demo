import { AbortedBeaconError } from '@airgap/beacon-core';

const etherlinkWalletUserRejectedCode = 4001;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isUserAbortedWalletError = (error: any): boolean => {
  return typeof error !== 'undefined' && (
    // Tezos
    (error instanceof AbortedBeaconError)
    // Etherlink
    || (error.code === etherlinkWalletUserRejectedCode || error.error?.code === etherlinkWalletUserRejectedCode
      || error.innerError?.code === etherlinkWalletUserRejectedCode)
  );
};
