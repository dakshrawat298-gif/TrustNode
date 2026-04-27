# AI-Oracle Escrow: System Architecture & PRD

## 1. Core Concept
A programmable escrow system where a Node.js AI Agent acts as a neutral judge. Client locks USDC on Solana Devnet. Freelancer submits work. The backend AI Agent evaluates the work strictly against the Client's prompt. If approved, the Node.js backend automatically executes a Solana transaction to release USDC.
WINNING FEATURE: The transaction must include an on-chain cryptographic memo with the AI's approval hash/ID for transparency.

## 2. Tech Stack
- Backend: Node.js, Express.js
- Blockchain: Solana Web3.js, SPL Token
- AI Engine: OpenAI API (Node.js SDK)
- Frontend: Vanilla HTML/CSS/JS

## 3. Strict Development Rules
1. Never write the entire codebase at once. Build step-by-step modularly.
2. Use modern ES6+ syntax.
3. Always implement robust error handling (try/catch).
4. Store all sensitive keys in a `.env` file. Do not hardcode private keys.
