// Test to understand transaction structure for:
// Signature: 2i9cUTpzXc3WAcpyeNf4Sm3wmYSzxZv5y1Rf2Pk3mw1DfiWEW2zZxFeFAuEfcHFZQfdyNKSNg2ybLBgTUaVGKRfC

const cexAddress = "is6MTRHEgyFLNTfYcuV4QBWLjrZBfmhVNYR6ccgr8KV";
const destinationAddress = "6EsRXYKJtj4bw46n16DcRfnNB5zpR5WRmhLrymqrVp9";
const amount = 20.02977429;
const amountInLamports = Math.round(amount * 1e9);

console.log("Expected transfer:");
console.log("  From:", cexAddress);
console.log("  To:", destinationAddress);
console.log("  Amount (SOL):", amount);
console.log("  Amount (Lamports):", amountInLamports);
console.log("\nSystem Program pubkey: 11111111111111111111111111111111");
console.log("Transfer instruction discriminator: [2, 0, 0, 0]");
console.log("Followed by 8-byte amount (little-endian)");
