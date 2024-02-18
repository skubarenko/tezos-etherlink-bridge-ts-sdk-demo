import Image from 'next/image';
import { memo } from 'react';

interface AddressAvatarProps {
  address: string;
  width?: number;
  height?: number;
}

const getAvatarUrl = (address: string) => 'https://services.tzkt.io/v1/avatars/' + address;

export const AddressAvatar = (props: AddressAvatarProps) => {
  const width = props.width || 24;
  const height = props.height || 24;

  return <Image width={width} height={height} className="inline w-6 h-6 mr-0.5 rounded-full"
    src={getAvatarUrl(props.address)}
    alt={`Avatar of the ${props.address} address`}
  />;
};

export const AddressAvatarPure = memo(AddressAvatar);
