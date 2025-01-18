"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetamaxCounter = exports.BetamaxCounterError = void 0;
class BetamaxCounterError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BetamaxCounterError';
    }
}
exports.BetamaxCounterError = BetamaxCounterError;
class BetamaxCounter {
    constructor() {
        this.COUNTER_RATE = 2.5;
        this.MAX_COUNTER = 99999;
    }
    validateTimestamp(timestamp) {
        const regex = /^([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})$/;
        if (!regex.test(timestamp)) {
            throw new BetamaxCounterError('Invalid timestamp format. Use HH:MM:SS');
        }
        const [hours, minutes, seconds] = timestamp.split(':').map(Number);
        if (hours > 99 || minutes > 59 || seconds > 59) {
            throw new BetamaxCounterError('Invalid time values');
        }
    }
    validateCounter(counter) {
        if (!Number.isInteger(counter) || counter < 0 || counter > this.MAX_COUNTER) {
            throw new BetamaxCounterError(`Counter must be between 0 and ${this.MAX_COUNTER}`);
        }
    }
    formatTwoDigits(num) {
        return num.toString().padStart(2, '0');
    }
    timestampToCounter(timestamp) {
        this.validateTimestamp(timestamp);
        const [hours, minutes, seconds] = timestamp.split(':').map(Number);
        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        const counterValue = Math.round(totalSeconds * this.COUNTER_RATE);
        if (counterValue > this.MAX_COUNTER) {
            throw new BetamaxCounterError(`Time too large for Betamax counter. Maximum is ${this.counterToTimestamp(this.MAX_COUNTER)}`);
        }
        return counterValue;
    }
    counterToTimestamp(counter) {
        this.validateCounter(counter);
        const totalSeconds = Math.floor(counter / this.COUNTER_RATE);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${this.formatTwoDigits(hours)}:${this.formatTwoDigits(minutes)}:${this.formatTwoDigits(seconds)}`;
    }
    counterDifference(counter1, counter2) {
        this.validateCounter(counter1);
        this.validateCounter(counter2);
        const diffCounter = Math.abs(counter2 - counter1);
        return this.counterToTimestamp(diffCounter);
    }
}
exports.BetamaxCounter = BetamaxCounter;
exports.default = BetamaxCounter;
