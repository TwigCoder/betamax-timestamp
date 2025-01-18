import BetamaxCounter, { BetamaxCounterError } from './betamax-timestamp';

const converter = new BetamaxCounter();

try {
    // converting video timestamp to a Betamax counter:
    console.log("Converting timestamp '01:30:00' to counter...");
    const counter = converter.timestampToCounter('01:30:00');
    console.log(`Counter value: ${counter}`);

    // converting Betamax counter to a video timestamp:
    console.log("\nConverting counter 13500 to timestamp...");
    const timestamp = converter.counterToTimestamp(13500);
    console.log(`Timestamp: ${timestamp}`);

    // calculating difference between two counters in seconds:
    console.log("\nCalculating difference between counters 13500 and 14000...");
    const diff = converter.counterDifference(13500, 14000);
    console.log(`Time difference: ${diff}`);
} catch (error) {
    if (error instanceof BetamaxCounterError) {
        console.error('Betamax Error:', error.message);
    } else {
        console.error('Error:', error);
    }
}
