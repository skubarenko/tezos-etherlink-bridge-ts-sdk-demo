export const enum LinkType {
  Address = 0,
  Operation = 1
}

export const enum ExplorerType {
  TzKT = 0,
  BCD = 1,
  Blockscout = 2
}

export const getExplorerUrl = (value: string, type: LinkType, explorer?: ExplorerType): string => {
  explorer = explorer ?? (value.startsWith('0x') ? ExplorerType.Blockscout : ExplorerType.TzKT);

  switch (explorer) {
    case ExplorerType.TzKT:
      return `https://nairobinet.tzkt.io/${value}`;
    case ExplorerType.BCD:
      return `https://better-call.dev/nairobinet/${value}`;
    case ExplorerType.Blockscout:
      return `https://blockscout.dipdup.net/${type === LinkType.Address ? 'address' : 'tx'}/${value}`;
  }
};
