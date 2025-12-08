import { Connection } from '@solana/web3.js';
import * as dotenv from 'dotenv';

dotenv.config();

const conn = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
const txSig = '2i9cUTpzXc3WAcpyeNf4Sm3wmYSzxZv5y1Rf2Pk3mw1DfiWEW2zZxFeFAuEfcHFZQfdyNKSNg2ybLBgTUaVGKRfC';

async function test() {
  try {
    const tx = await conn.getTransaction(txSig, { maxSupportedTransactionVersion: 0 });
    if (!tx) {
      console.log('Transaction not found');
      return;
    }
    
    console.log('Transaction found!');
    console.log('Instructions count:', tx.transaction.message.instructions.length);
    
    tx.transaction.message.instructions.forEach((instr, idx) => {
      console.log(`\nInstruction #${idx}:`);
      console.log('  Program Index:', instr.programIdIndex);
      console.log('  Accounts:', instr.accounts);
      console.log('  Data (first 20 bytes):', Buffer.from(instr.data).slice(0, 20).toString('hex'));
    });
    
    console.log('\n\nAccounts:');
    const keys = tx.transaction.message.staticAccountKeys || tx.transaction.message.accountKeys;
    keys.forEach((k, idx) => {
      const addr = typeof k === 'string' ? k : k.toBase58();
      console.log(`  [${idx}]`, addr);
    });
  } catch (e) {
    console.error('Error:', e.message);
  }
}

test();
