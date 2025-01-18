type TimeStamp = `${number}:${number}:${number}`;


interface IBetamaxCounter {
  timestampToCounter(timestamp: TimeStamp): number;
  counterToTimestamp(counter: number): TimeStamp;
  counterDifference(counter1: number, counter2: number): TimeStamp;
}

export class BetamaxCounterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BetamaxCounterError';
  }
}

export class BetamaxCounter implements IBetamaxCounter {
  private readonly COUNTER_RATE: number = 2.5;
  private readonly MAX_COUNTER: number = 99999;

  private validateTimestamp(timestamp: TimeStamp): void {
    const regex = /^([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})$/;
    if (!regex.test(timestamp)) {
      throw new BetamaxCounterError('Invalid timestamp format. Use HH:MM:SS');
    }

    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    if (hours > 99 || minutes > 59 || seconds > 59) {
      throw new BetamaxCounterError('Invalid time values');
    }
  }

  private validateCounter(counter: number): void {
    if (!Number.isInteger(counter) || counter < 0 || counter > this.MAX_COUNTER) {
      throw new BetamaxCounterError(`Counter must be between 0 and ${this.MAX_COUNTER}`);
    }
  }

  private formatTwoDigits(num: number): string {
    return num.toString().padStart(2, '0');
  }

  public timestampToCounter(timestamp: TimeStamp): number {
    this.validateTimestamp(timestamp);

    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    const counterValue = Math.round(totalSeconds * this.COUNTER_RATE);
    
    if (counterValue > this.MAX_COUNTER) {
      throw new BetamaxCounterError(`Time too large for Betamax counter. Maximum is ${this.counterToTimestamp(this.MAX_COUNTER)}`);
    }
    
    return counterValue;
  }

  public counterToTimestamp(counter: number): TimeStamp {
    this.validateCounter(counter);

    const totalSeconds = Math.floor(counter / this.COUNTER_RATE);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.formatTwoDigits(hours)}:${this.formatTwoDigits(minutes)}:${this.formatTwoDigits(seconds)}` as TimeStamp;
  }

  public counterDifference(counter1: number, counter2: number): TimeStamp {
    this.validateCounter(counter1);
    this.validateCounter(counter2);

    const diffCounter = Math.abs(counter2 - counter1);
    return this.counterToTimestamp(diffCounter);
  }
}

export default BetamaxCounter;
