export type SyncedTimerHandler = (currentDate: Date) => void;

export class SyncedTimer {
  private readonly handlers: Set<SyncedTimerHandler> = new Set();
  private internalTimerId: ReturnType<typeof setTimeout> | ReturnType<typeof setInterval> | undefined = undefined;

  constructor() {
  }

  addHandler(handler: SyncedTimerHandler) {
    this.handlers.add(handler);
    this.startInternalTimerIfNeeded();
  }

  removeHandler(handler: SyncedTimerHandler) {
    const isDeleted = this.handlers.delete(handler);
    this.stopInternalTimerIfNeeded();

    return isDeleted;
  }

  removeAllHandler() {
    this.handlers.clear();
  }

  private startInternalTimer() {
    this.stopInternalTimer();

    this.internalTimerId = setTimeout(
      () => {
        this.internalTimerId = setInterval(this.internalTimerHandler, 1000);
      },
      1000 - new Date().getMilliseconds()
    );
  }

  private stopInternalTimer() {
    clearInterval(this.internalTimerId);
    clearTimeout(this.internalTimerId);

    this.internalTimerId = undefined;
  }

  private startInternalTimerIfNeeded() {
    if (this.internalTimerId || !this.handlers.size)
      return;

    this.startInternalTimer();
  }

  private stopInternalTimerIfNeeded() {
    if (!this.internalTimerId || this.handlers.size)
      return;

    this.stopInternalTimer();
  }

  private internalTimerHandler = () => {
    const currentDate = new Date();

    for (const handler of this.handlers) {
      handler(currentDate);
    }
  };
}
