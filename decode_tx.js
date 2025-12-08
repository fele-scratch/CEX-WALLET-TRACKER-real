import { Connection } from '@solana/web3.js';

const conn = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
const txSig = '2i9cUTpzXc3WAcpyeNf4Sm3wmYSzxZv5y1Rf2Pk3mw1DfiWEW2zZxFeFAuEfcHFZQfdyNKSNg2ybLBgTUaVGKRfC';

async function test() {
  try {
    const tx = await conn.getTransaction(txSig, { maxSupportedTransactionVersion: 0 });
    if (!tx) {
      console.log('Transaction not found');
      return;
    }
    
    // Instruction #3 is the transfer
    const instr = tx.transaction.message.instructions[3];
    console.log('Instruction #3 (transfer):');
    console.log('  Program Index:', instr.programIdIndex);
    console.log('  Accounts:', instr.accounts);
    
    // The data is already a Uint8Array
    const data = instr.data;
    console.log('  Data type:', data.constructor.name);
    console.log('  Data length:', data.length);
    console.log('  Full data (hex):', Buffer.from(data).toString('hex'));
    
    // First 4 bytes = discriminator
    const discriminator = Array.from(data.slice(0, 4));
    console.log('  Discriminator:', discriminator);
    
    // Next 8 bytes = amount (little-endian)
    if (data.length >= 12) {
      const amountBuf = Buffer.from(data.slice(4, 12));
      const amount = amountBuf.readBigUInt64LE();
      console.log('  Amount (lamports):', amount.toString());
      console.log('  Amount (SOL):', (Number(amount) / 1e9).toFixed(8));
    }
    
    console.log('\nAccounts referenced:');
    const keys = tx.transaction.message.staticAccountKeys;
    instr.accounts.forEach(idx => {
      console.log(`  [${idx}] ${keys[idx].toBase58()}`);
    });
  } catch (e) {
    console.error('Error:', e.message);
  }
}

test();
