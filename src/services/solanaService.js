import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import bs58 from 'bs58';
import dotenv from 'dotenv';

dotenv.config();

const RPC_URL = process.env.SOLANA_RPC_URL || clusterApiUrl('devnet');
const NETWORK = process.env.SOLANA_NETWORK || 'devnet';

export const connection = new Connection(RPC_URL, 'confirmed');

export function getOracleKeypair() {
  try {
    const privateKey = process.env.AGENT_ORACLE_PRIVATE_KEY;

    if (!privateKey || privateKey.trim() === '') {
      console.warn(
        '[CRITICAL WARNING] AGENT_ORACLE_PRIVATE_KEY is not set. ' +
          'The Oracle cannot sign or release escrow funds until a valid bs58-encoded ' +
          'Solana private key is provided in the environment.'
      );
      return null;
    }

    const decoded = bs58.decode(privateKey.trim());
    const keypair = Keypair.fromSecretKey(decoded);
    return keypair;
  } catch (error) {
    console.error(
      '[CRITICAL WARNING] Failed to load Oracle Keypair from AGENT_ORACLE_PRIVATE_KEY:',
      error.message
    );
    return null;
  }
}

export async function checkHealth() {
  try {
    const slot = await connection.getSlot('confirmed');
    return {
      ok: true,
      network: NETWORK,
      rpcUrl: RPC_URL,
      slot,
    };
  } catch (error) {
    console.error('[Solana] Health check failed:', error.message);
    return {
      ok: false,
      network: NETWORK,
      rpcUrl: RPC_URL,
      error: error.message,
    };
  }
}

export default { connection, getOracleKeypair, checkHealth };
