import { SyncedTimer } from './syncedTimer';

export interface EstimatedTime {
  currentDate: Date;
  targetDate: Date;
  isDelayed: boolean;
  days: number,
  hours: number;
  minutes: number;
  seconds: number;
}

export type EstimatedTimerHandler = (estimatedTime: EstimatedTime) => void;

export class EstimatedTimer {
  private readonly handlers: Map<EstimatedTimerHandler, Date> = new Map();
  private readonly syncedTimer = new SyncedTimer();

  constructor() {
  }

  addHandler(targetDate: Date, handler: EstimatedTimerHandler) {
    this.handlers.set(handler, targetDate);
    this.startInternalTimerIfNeeded();

    handler(this.getEstimatedTime(new Date(), targetDate));
  }

  removeHandler(handler: EstimatedTimerHandler) {
    const isDeleted = this.handlers.delete(handler);
    this.stopInternalTimerIfNeeded();

    return isDeleted;
  }

  removeAllHandler() {
    this.handlers.clear();
  }

  private startInternalTimer() {
    this.syncedTimer.addHandler(this.internalTimerHandler);
  }

  private stopInternalTimer() {
    this.syncedTimer.removeHandler(this.internalTimerHandler);
  }

  private startInternalTimerIfNeeded() {
    if (!this.handlers.size)
      return;

    this.startInternalTimer();
  }

  private stopInternalTimerIfNeeded() {
    if (this.handlers.size)
      return;

    this.stopInternalTimer();
  }

  private internalTimerHandler = (currentDate: Date) => {
    for (const [handler, targetDate] of this.handlers) {
      handler(this.getEstimatedTime(currentDate, targetDate));
    }
  };

  private getEstimatedTime(currentDate: Date, targetDate: Date): EstimatedTime {
    const currentDateTime = currentDate.getTime();
    const targetDateTime = targetDate.getTime();

    let isDelayed: boolean;
    let timespan: number;
    if (currentDateTime <= targetDateTime) {
      timespan = targetDateTime - currentDateTime;
      isDelayed = false;
    }
    else {
      timespan = currentDateTime - targetDateTime;
      isDelayed = true;
    }

    let seconds = Math.floor(timespan / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    return {
      currentDate,
      targetDate,
      isDelayed,
      days,
      hours,
      minutes,
      seconds
    };
  }
}
