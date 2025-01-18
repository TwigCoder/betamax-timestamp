# betamax-timestamp
## A TypeScript library to convert between digital timestamps and Betamax counter numbers

This library converts modern digital timestamps (HH:MM:SS) to Betamax counter numbers and vice versa. Perfect for archivists, museums, and any tech enthusiasts working with digitized Betamax tapes.

## Why?
Ever tried referencing a specific point in a digitized Betamax tape using modern timestamps? It's like trying to sync a sundial with an atomic clock. This tool bridges that gap, making it easy to convert between modern digital timestamps and those nostalgic Betamax counter numbers.

## Install
```bash
npm install betamax-timestamp
```

## Usage
```typescript
import BetamaxCounter from 'betamax-timestamp';

const converter = new BetamaxCounter();

// Convert timestamp to counter number
console.log(converter.timestampToCounter('01:30:00')); // outputs 13500

// Convert counter back to timestamp
console.log(converter.counterToTimestamp(13500)); // outputs "01:30:00"

// Calculate time difference between counter values
console.log(converter.counterDifference(13500, 14000)); // outputs "00:03:20"
```

## Features
- Converts HH:MM:SS timestamps to Betamax counter numbers
- Converts counter numbers back to timestamps
- Calculates time differences between counter values
- Validates inputs to match actual Betamax limitations
- Written in TypeScript with full type safety
- Matches the original Betamax counter rate (2.5 counts/second)

## Some Important Details
- Counter Rate: 2.5 counts per second
- Maximum Counter Value: 99999
- Time Format: HH:MM:SS (up to 99:59:59)

