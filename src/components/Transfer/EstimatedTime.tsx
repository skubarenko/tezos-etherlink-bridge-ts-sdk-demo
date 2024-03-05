import { memo, useEffect, useMemo, useState } from 'react';

import { TransferStatus } from './transferStatus';
import { EstimatedTimer, EstimatedTime as EstimatedTimeModel } from '@/core';
import { textUtils } from '@/utils';

const estimatedTimer = new EstimatedTimer();

const getEstimatedTimeDisplayValue = (estimatedTime: EstimatedTimeModel) => {
  // eslint-disable-next-line max-len
  let result = `${textUtils.padStart(estimatedTime.hours.toString(), 2, '0')}:${textUtils.padStart(estimatedTime.minutes.toString(), 2, '0')}:${textUtils.padStart(estimatedTime.seconds.toString(), 2, '0')}`;

  if (estimatedTime.days) {
    result = `${estimatedTime.days} days ${result}`;
  }
  if (estimatedTime.isDelayed) {
    result = 'delayed for ' + result;
  }

  return result;
};

interface EstimatedTimeBaseProps {
  estimatedTimestamp: string;
}

const EstimatedTimeBase = (props: EstimatedTimeBaseProps) => {
  const [estimatedTimeDisplayValue, setEstimatedTimeDisplayValue] = useState<string>();
  const estimatedDate = useMemo(
    () => new Date(props.estimatedTimestamp),
    [props.estimatedTimestamp]
  );

  useEffect(
    () => {
      const timerHandler = (estimatedTime: EstimatedTimeModel) => {
        setEstimatedTimeDisplayValue(getEstimatedTimeDisplayValue(estimatedTime));
      };

      estimatedTimer.addHandler(estimatedDate, timerHandler);

      return () => {
        estimatedTimer.removeHandler(timerHandler);
      };
    },
    [estimatedDate]
  );

  return estimatedTimeDisplayValue
    ? <span>{estimatedTimeDisplayValue}</span>
    : null;
};

interface EstimatedSealedStatusTimeProps {
  estimatedTimestamp: string;
  className?: string;
}

const EstimatedSealedStatusTime = (props: EstimatedSealedStatusTimeProps) => {
  return <span className={props.className}>
    <span>Estimated to Sealed: </span>
    <EstimatedTimeBase estimatedTimestamp={props.estimatedTimestamp} />
  </span>;
};

interface EstimatedTimeProps {
  isDeposit: boolean;
  status: TransferStatus;
  estimatedNextStatusTimestamp: string;
  className?: string;
}

export const EstimatedTime = (props: EstimatedTimeProps) => {
  return (!props.isDeposit && props.status === TransferStatus.Created)
    ? <EstimatedSealedStatusTime estimatedTimestamp={props.estimatedNextStatusTimestamp} className={props.className} />
    : null;
};

export const EstimatedTimePure = memo(EstimatedTime);
