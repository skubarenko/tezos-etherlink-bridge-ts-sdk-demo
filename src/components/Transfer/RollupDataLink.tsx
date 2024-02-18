import { ExternalLink } from '../ExternalLink';
import { config } from '@/config';

export interface RollupData {
  readonly outboxMessageLevel: number;
  readonly outboxMessageIndex: number;
  readonly commitment?: string;
  readonly proof?: string;
}

interface RollupDataLinkProps {
  rollupData?: RollupData;
}

export const RollupDataLink = (props: RollupDataLinkProps) => {
  if (!props.rollupData || !props.rollupData.commitment || !props.rollupData.proof)
    return null;

  const url = `${config.bridge.smartRollupNodeBaseUrl}/global/block/head/helpers/proofs/outbox/${props.rollupData.outboxMessageLevel}/messages?index=${props.rollupData.outboxMessageIndex}`;
  return <ExternalLink href={url}>Rollup Data</ExternalLink>;
};
