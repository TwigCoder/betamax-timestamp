"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const betamax_timestamp_1 = __importStar(require("./betamax-timestamp"));
const converter = new betamax_timestamp_1.default();
try {
    // converting video timestamp to a betamax counter:
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
}
catch (error) {
    if (error instanceof betamax_timestamp_1.BetamaxCounterError) {
        console.error('Betamax Error:', error.message);
    }
    else {
        console.error('Error:', error);
    }
}
