<div align="center">

```text
████████╗██████╗ ██╗   ██╗███████╗████████╗███╗   ██╗ ██████╗ ██████╗ ███████╗
╚══██╔══╝██╔══██╗██║   ██║██╔════╝╚══██╔══╝████╗  ██║██╔═══██╗██╔══██╗██╔════╝
   ██║   ██████╔╝██║   ██║███████╗   ██║   ██╔██╗ ██║██║   ██║██║  ██║█████╗  
   ██║   ██╔══██╗██║   ██║╚════██║   ██║   ██║╚██╗██║██║   ██║██║  ██║██╔══╝  
   ██║   ██║  ██║╚██████╔╝███████║   ██║   ██║ ╚████║╚██████╔╝██████╔╝███████╗
   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝
```

# 🛡️ TrustNode Protocol
**Escrow, judged by an impartial AI Oracle.**

*The world's first AI-driven, decentralized escrow protocol. TrustNode acts as a neutral, autonomous judge—eliminating human bias, reducing transaction friction, and securing Web3 freelance payments with zero middlemen.*

## ⚡ Important Links & Pitch
 * **GitHub Repository:** [Insert Your GitHub Repo Link Here]
 * **Pitch Video:** [Insert Your YouTube Link Here]
 * **Live MVP:** [Insert Replit or Vercel Link Here]
</div>

---

## 🚨 The Problem: Trust is the Bottleneck of the Gig Economy
In the freelance and gig economy, trust is broken.
 * Clients refuse to pay upfront, fearing poor quality or scams.
 * Freelancers refuse to work without an advance, fearing non-payment.
 * Traditional escrow platforms take **20% cuts**, introduce days of human delay, and suffer from subjective, biased arbitration.

## 💡 The Solution: Autonomous AI Escrow
TrustNode replaces biased human escrow agents with a hyper-intelligent, impartial AI Oracle (powered by Gemini 2.5 Flash).
 1. Client locks USDC on Solana.
 2. Freelancer submits deliverables.
 3. AI strictly evaluates the submission against the original prompt.
 4. If approved, funds are **instantly released on-chain** with a cryptographic AI verdict memo.

## 🏗️ Protocol Architecture
```text
+-------------------+       +--------------------+       +-------------------+
|                   |       |                    |       |                   |
|  Client (Buyer)   | ----> | TrustNode Escrow   | <---- | Freelancer        |
|  Locks USDC       |       | Smart Contract     |       | Submits Work      |
|                   |       |                    |       |                   |
+-------------------+       +---------+----------+       +-------------------+
                                      |
                                      v
                            +--------------------+
                            | Gemini 2.5 Flash   |
                            | AI Oracle Engine   |
                            +---------+----------+
                                      |
         +----------------------------+-----------------------------+
         |                                                          |
+--------v---------+                                       +--------v---------+
| AI Approves      |                                       | AI Rejects       |
| 24-hr Time-Lock  |                                       | Funds Returned   |
+--------+---------+                                       +------------------+
         |
         v
+------------------+
| Client Disputes? |
| Stakes 10% Fee   |
+--------+---------+
         |
         v
+------------------+
| Kleros Human     |
| Arbitration      |
+------------------+
```

## 🗺️ The Path to Mainnet: MVP vs. V2 Roadmap
A true Web3 product is built in iterations. For this hackathon, TrustNode is presented as a functional **Proof of Concept (MVP)** demonstrating our core innovation: *Autonomous On-Chain AI Settlement*. Here is our roadmap to a full Mainnet launch:

| Feature | Hackathon MVP (Current State) | V2 Mainnet Protocol (Future State) |
|---|---|---|
| **Funding Mechanism** | Centralized Escrow Pool (Node.js backend wallet simulates the lock). | **Phantom Wallet Connect.** Clients interact directly with a Rust-based Solana PDA smart contract to lock funds. |
| **Work Submission** | Public URLs (Google Drive, Figma) pasted into the UI textbox for AI evaluation. | **Decentralized Storage (IPFS/Arweave).** Freelancers upload image.png or code files directly to immutable storage. |
| **Client Visibility** | Unified single-screen demo UI to showcase the immediate AI evaluation flow. | **Dedicated Client Dashboard.** A secure portal to manage active escrows, view watermarked previews, and handle disputes. |

## 🛡️ Handling Edge Cases (The "God-Level" Mechanics)
Building an AI Oracle isn't just about API calls; it's about robust Game Theory. TrustNode is engineered to prevent all malicious exploits:

### 1. The Oracle Problem (Subjectivity)
 * **Risk:** What if the AI misjudges subjective art or code, and the client is unhappy?
 * **Solution:** **24-Hour Time-Locked Disputes.** AI approval does not instantly drain funds. It triggers a 24-hour lock, giving the client a window to manually review and dispute the AI's verdict before final settlement.

### 2. Griefing Attacks (Malicious Clients)
 * **Risk:** What if the freelancer does perfect work, but a malicious client clicks "Dispute" just to stall payment or steal the work for free?
 * **Solution:** **Stake-to-Dispute Penalty.** To trigger a human dispute (via Kleros Decentralized Arbitration), the client MUST stake an additional **10% penalty fee** on-chain. If the human court rules in favor of the freelancer, the client loses this 10% deposit as compensation to the freelancer. This financial deterrent makes the protocol bulletproof against fake disputes.

### 3. Digital Theft
 * **Risk:** Client downloads the work and then rejects/disputes it.
 * **Solution:** **Encrypted Deliverables (V2).** Freelancers submit high-res files to the protocol. Clients only see an AI-generated watermarked preview. The high-res file is cryptographically unlocked *only* after funds are definitively released.

## ⚙️ Core Technology Stack
 * **Backend:** Node.js, Express
 * **Blockchain:** Solana Web3.js, SPL-Token (Devnet)
 * **AI Oracle Engine:** Google Gemini 2.5 Flash API
 * **Frontend UI:** Vanilla JS, HTML5, Tailwind CSS (Glassmorphism Engine)

## 📱 The "Built on Mobile" Underdog Story
Ideas are cheap; execution is everything.

This entire protocol—from the Node.js backend logic to the Gemini AI integration, Solana Web3.js transaction signing, game-theory mechanics, and the premium Glassmorphism UI—was **architected, coded, and deployed entirely on an iPhone 13**. 

Using Replit as my cloud IDE, pivoting from mobile screens to a Jio Cloud PC virtual desktop to overcome terminal limitations, and leveraging raw AI prompting, I bypassed the need for expensive multi-monitor setups or massive seed funding. This is a testament to the true ethos of Web3: giving powerful financial tools to anyone, anywhere, with just an internet connection and a smartphone.

## 🚀 How to Run Locally

 **1. Clone the repository**
```bash
git clone [Insert Your GitHub Repo Link Here]
cd TrustNode
```

 **2. Install dependencies**
```bash
npm install
```

 **3. Configure environment variables in .env**
```env
PORT=3000
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
AGENT_ORACLE_PRIVATE_KEY=<your_base58_private_key>
GEMINI_API_KEY=<your_gemini_api_key>
```

 **4. Start the Oracle Engine**
```bash
node src/index.js
```

---
*Built for the Solana Frontier Hackathon | The machines are ready to judge. Are you?*
