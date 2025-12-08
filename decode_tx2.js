import { Connection } from '@solana/web3.js';
import bs58 from 'bs58';

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
    console.log('  Accounts:', instr.accounts, '(from=0, to=2)');
    
    // Decode Base58 data
    const dataStr = typeof instr.data === 'string' ? instr.data : instr.data;
    const decodedData = bs58.decode(dataStr);
    
    console.log('  Data (decoded hex):', decodedData.toString('hex'));
    console.log('  Data length:', decodedData.length);
    
    // First 4 bytes = discriminator
    const discriminator = Array.from(decodedData.slice(0, 4));
    console.log('  Discriminator:', discriminator);
    
    // Next 8 bytes = amount (little-endian)
    if (decodedData.length >= 12) {
      const amountBuf = decodedData.slice(4, 12);
      const amount = amountBuf.readBigUInt64LE();
      console.log('  Amount (lamports):', amount.toString());
      console.log('  Amount (SOL):', (Number(amount) / 1e9).toFixed(8));
    }
    
    console.log('\nExpected:');
    console.log('  Amount: 20.02977429 SOL = 20029774290 lamports');
    
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
