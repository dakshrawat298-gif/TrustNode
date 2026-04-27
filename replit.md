# AI-Oracle Escrow

## Overview
A programmable escrow system on Solana Devnet where a Node.js AI agent acts as a neutral judge. Clients lock USDC, freelancers submit work, and the AI evaluates submissions against the client's prompt. Approved work triggers an automated USDC release with an on-chain memo containing the AI's approval hash for transparency.

See `SYSTEM_CONTEXT.md` for the full architecture and rulebook (the master source of truth).

## Tech Stack
- Backend: Node.js (ES Modules), Express.js
- Blockchain: Solana Web3.js, SPL Token (planned)
- AI Engine: OpenAI API (planned)
- Frontend: Vanilla HTML/CSS/JS (planned)

## Project Structure
```
.
├── SYSTEM_CONTEXT.md      # Master architecture & PRD
├── index.js               # Express entry point (health check on /)
├── package.json
├── .env                   # Environment variables (empty; secrets via Replit Secrets)
└── src/
    ├── controllers/       # Route handlers (planned)
    ├── routes/            # Express routers (planned)
    └── services/          # AI + Solana logic (planned)
```

## Development
- Workflow `Start application` runs `node index.js` on port 3000.
- Health check: `GET /` returns service status JSON.

## Status
Foundational scaffolding complete. Awaiting next module instructions.
