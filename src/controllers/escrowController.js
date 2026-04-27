import {
  PublicKey,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { evaluateFreelancerWork } from '../services/aiService.js';
import { connection, getOracleKeypair } from '../services/solanaService.js';

const MEMO_PROGRAM_ID = new PublicKey(
  'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'
);

const PAYOUT_AMOUNT_SOL = 0.01;
const MEMO_TEXT = 'TrustNode AI Approved';

export async function processEscrow(req, res) {
  try {
    const { clientRequirement, freelancerSubmission, freelancerWalletAddress } =
      req.body || {};

    if (!clientRequirement || !freelancerSubmission || !freelancerWalletAddress) {
      return res.status(400).json({
        success: false,
        reason:
          'Missing required fields: clientRequirement, freelancerSubmission, and freelancerWalletAddress are all required.',
      });
    }

    let freelancerPubkey;
    try {
      freelancerPubkey = new PublicKey(freelancerWalletAddress);
    } catch (err) {
      return res.status(400).json({
        success: false,
        reason: `Invalid freelancerWalletAddress: ${err.message}`,
      });
    }

    const evaluation = await evaluateFreelancerWork(
      clientRequirement,
      freelancerSubmission
    );

    if (!evaluation.approved) {
      return res.status(400).json({
        success: false,
        approved: false,
        reason: evaluation.reason,
        signature: null,
      });
    }

    const oracleKeypair = getOracleKeypair();
    if (!oracleKeypair) {
      return res.status(500).json({
        success: false,
        approved: true,
        reason:
          'AI approved the work, but the Oracle wallet is not configured. Cannot release funds.',
        signature: null,
      });
    }

    const transferIx = SystemProgram.transfer({
      fromPubkey: oracleKeypair.publicKey,
      toPubkey: freelancerPubkey,
      lamports: Math.round(PAYOUT_AMOUNT_SOL * LAMPORTS_PER_SOL),
    });

    const memoIx = new TransactionInstruction({
      keys: [
        { pubkey: oracleKeypair.publicKey, isSigner: true, isWritable: false },
      ],
      programId: MEMO_PROGRAM_ID,
      data: Buffer.from(MEMO_TEXT, 'utf8'),
    });

    const transaction = new Transaction().add(transferIx, memoIx);

    let signature;
    try {
      signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [oracleKeypair],
        { commitment: 'confirmed' }
      );
    } catch (txError) {
      console.error('[escrowController] Solana transfer failed:', txError.message);
      return res.status(500).json({
        success: false,
        approved: true,
        reason: `AI approved, but on-chain payout failed: ${txError.message}`,
        signature: null,
      });
    }

    return res.status(200).json({
      success: true,
      approved: true,
      reason: evaluation.reason,
      signature,
      memo: MEMO_TEXT,
      amountSol: PAYOUT_AMOUNT_SOL,
      from: oracleKeypair.publicKey.toBase58(),
      to: freelancerPubkey.toBase58(),
      explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
    });
  } catch (error) {
    console.error('[escrowController] processEscrow error:', error.message);
    return res.status(500).json({
      success: false,
      reason: `Internal server error: ${error.message}`,
      signature: null,
    });
  }
}

export default { processEscrow };
