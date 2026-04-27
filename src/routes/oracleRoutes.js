import { Router } from 'express';
import { evaluateFreelancerWork } from '../services/aiService.js';
import { processEscrow } from '../controllers/escrowController.js';

const router = Router();

router.post('/evaluate', async (req, res) => {
  try {
    const { clientRequirement, freelancerSubmission } = req.body || {};

    if (!clientRequirement || !freelancerSubmission) {
      return res.status(400).json({
        approved: false,
        reason:
          'Both "clientRequirement" and "freelancerSubmission" are required in the request body.',
      });
    }

    const result = await evaluateFreelancerWork(clientRequirement, freelancerSubmission);
    return res.status(200).json(result);
  } catch (error) {
    console.error('[oracleRoutes] /evaluate error:', error.message);
    return res.status(500).json({
      approved: false,
      reason: `Internal server error: ${error.message}`,
    });
  }
});

router.post('/escrow/process', processEscrow);

export default router;
