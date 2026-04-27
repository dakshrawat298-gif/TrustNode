(() => {
  const form = document.getElementById('escrow-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitLabel = document.getElementById('submit-label');
  const submitIcon = document.getElementById('submit-icon');
  const resultContainer = document.getElementById('result-container');
  const toastRoot = document.getElementById('toast-root');

  const SPINNER_HTML = `
    <svg viewBox="0 0 24 24" class="w-[18px] h-[18px] animate-spin" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12a9 9 0 1 1-6.22-8.56" />
    </svg>
  `;
  const ARROW_HTML = `
    <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  `;

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    if (isLoading) {
      submitIcon.innerHTML = SPINNER_HTML;
      submitLabel.textContent = 'AI Agent Evaluating...';
    } else {
      submitIcon.innerHTML = ARROW_HTML;
      submitLabel.textContent = 'Submit to AI Oracle';
    }
  }

  function shortHash(str, head = 8, tail = 8) {
    if (!str || str.length <= head + tail + 3) return str || '';
    return `${str.slice(0, head)}…${str.slice(-tail)}`;
  }

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showToast({ type = 'error', title = 'Error', message = '' }) {
    const colors =
      type === 'error'
        ? {
            ring: 'ring-red-500/30',
            grad: 'from-rose-500/20 to-red-500/10',
            dot: 'bg-red-400 text-red-400',
            icon: `<svg viewBox="0 0 24 24" class="w-4 h-4 text-red-300" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16.5h.01"/></svg>`,
          }
        : {
            ring: 'ring-emerald-500/30',
            grad: 'from-emerald-500/20 to-teal-500/10',
            dot: 'bg-emerald-400 text-emerald-400',
            icon: `<svg viewBox="0 0 24 24" class="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
          };

    const el = document.createElement('div');
    el.className =
      `pointer-events-auto min-w-[280px] max-w-sm rounded-2xl glass ring-1 ${colors.ring} ` +
      `bg-gradient-to-br ${colors.grad} p-4 flex items-start gap-3 animate-slide-down`;
    el.innerHTML = `
      <div class="mt-0.5 w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
        ${colors.icon}
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-[13px] font-semibold text-white">${escapeHtml(title)}</div>
        <div class="text-[12px] text-white/70 mt-0.5 break-words">${escapeHtml(message)}</div>
      </div>
      <button class="text-white/40 hover:text-white/80 transition-colors text-lg leading-none" aria-label="Dismiss">×</button>
    `;
    el.querySelector('button').addEventListener('click', () => removeToast(el));
    toastRoot.appendChild(el);
    setTimeout(() => removeToast(el), 6000);
  }

  function removeToast(el) {
    if (!el || !el.isConnected) return;
    el.style.transition = 'opacity 240ms ease, transform 240ms ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    setTimeout(() => el.remove(), 260);
  }

  function renderApproved(data) {
    const sig = data.signature || '';
    const explorerUrl =
      data.explorerUrl ||
      (sig ? `https://explorer.solana.com/tx/${sig}?cluster=devnet` : '');

    resultContainer.classList.remove('hidden');
    resultContainer.innerHTML = `
      <div class="glass rounded-3xl p-6 md:p-8 animate-fade-in-up ring-1 ring-emerald-400/20">
        <div class="flex items-start justify-between gap-4 mb-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse-glow">
              <svg viewBox="0 0 24 24" class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <div>
              <div class="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80">Approved · Funds Released</div>
              <div class="text-lg font-semibold text-white">AI Oracle verdict delivered</div>
            </div>
          </div>
          <div class="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 badge-dot text-emerald-400"></span>
            <span class="text-[11px] text-emerald-200/90">Confirmed on Devnet</span>
          </div>
        </div>

        <div class="h-px w-full divider-glow mb-5"></div>

        <div class="space-y-4">
          <div>
            <div class="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-1.5">Oracle Reason</div>
            <div class="text-[14px] text-white/85 leading-relaxed">${escapeHtml(data.reason || '—')}</div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
              <div class="text-[11px] uppercase tracking-[0.18em] text-white/40">Amount</div>
              <div class="mt-1 text-[14px] font-semibold text-white">${escapeHtml(String(data.amountSol ?? '0.01'))} SOL</div>
            </div>
            <div class="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
              <div class="text-[11px] uppercase tracking-[0.18em] text-white/40">On-chain Memo</div>
              <div class="mt-1 text-[14px] font-semibold text-white truncate">${escapeHtml(data.memo || 'TrustNode AI Approved')}</div>
            </div>
          </div>

          <div class="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
            <div class="text-[11px] uppercase tracking-[0.18em] text-white/40">Transaction Signature</div>
            <div class="mt-1 flex items-center gap-2">
              <code class="mono text-[12px] text-white/85 break-all">${escapeHtml(sig)}</code>
              <button id="copy-sig" class="shrink-0 text-[11px] px-2 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/70 transition-colors">Copy</button>
            </div>
            ${explorerUrl ? `
              <a href="${escapeHtml(explorerUrl)}" target="_blank" rel="noopener noreferrer"
                 class="mt-3 inline-flex items-center gap-1.5 text-[12px] text-indigo-300 hover:text-indigo-200 transition-colors">
                View on Solana Explorer
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17 17 7M7 7h10v10"/>
                </svg>
              </a>
            ` : ''}
          </div>

          <div class="pt-2 flex items-center justify-between gap-3 flex-wrap">
            <div class="text-[11px] text-white/40">
              Disagree with the verdict? You can escalate to decentralized human arbitration.
            </div>
            <button id="dispute-btn"
              class="text-[12px] font-medium px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/10 border border-white/10 hover:border-rose-400/40 text-white/80 hover:text-rose-200 transition-colors">
              Dispute AI Decision
            </button>
          </div>
        </div>
      </div>
    `;

    const copyBtn = document.getElementById('copy-sig');
    if (copyBtn && sig) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(sig);
          copyBtn.textContent = 'Copied';
          setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
        } catch (_) {
          showToast({ type: 'error', title: 'Copy failed', message: 'Clipboard unavailable.' });
        }
      });
    }

    const disputeBtn = document.getElementById('dispute-btn');
    if (disputeBtn) {
      disputeBtn.addEventListener('click', handleDisputeClick);
    }

    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleDisputeClick() {
    const agreed = confirm(
      'SECURITY WARNING: To prevent malicious disputes, you must stake an additional 10% penalty fee. ' +
      'If Decentralized Human Arbitrators (Kleros Court) rule in favor of the freelancer, you will LOSE this deposit as compensation. ' +
      'Do you agree to stake the penalty and proceed with the dispute?'
    );

    if (agreed) {
      showToast({
        type: 'success',
        title: 'Dispute Logged',
        message: '10% penalty staked on-chain. Case routed to Kleros Decentralized Arbitration.',
      });
    } else {
      showToast({
        type: 'error',
        title: 'Dispute Cancelled',
        message: '24-hour time-lock remains active. Funds will release to the freelancer automatically.',
      });
    }
  }

  function renderRejected(data) {
    resultContainer.classList.remove('hidden');
    resultContainer.innerHTML = `
      <div class="glass rounded-3xl p-6 md:p-8 animate-fade-in-up ring-1 ring-rose-500/20">
        <div class="flex items-start gap-3 mb-5">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
            <svg viewBox="0 0 24 24" class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </div>
          <div>
            <div class="text-[11px] uppercase tracking-[0.18em] text-rose-300/80">Rejected · No Funds Moved</div>
            <div class="text-lg font-semibold text-white">AI Oracle did not approve the work</div>
          </div>
        </div>
        <div class="h-px w-full divider-glow mb-5"></div>
        <div>
          <div class="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-1.5">Oracle Reason</div>
          <div class="text-[14px] text-white/85 leading-relaxed">${escapeHtml(data.reason || '—')}</div>
        </div>
      </div>
    `;
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const clientRequirement = document.getElementById('clientRequirement').value.trim();
    const freelancerSubmission = document.getElementById('freelancerSubmission').value.trim();
    const freelancerWalletAddress = document.getElementById('freelancerWalletAddress').value.trim();

    if (!clientRequirement || !freelancerSubmission || !freelancerWalletAddress) {
      showToast({
        type: 'error',
        title: 'Missing fields',
        message: 'Fill out the requirement, submission and wallet address.',
      });
      return;
    }

    resultContainer.classList.add('hidden');
    resultContainer.innerHTML = '';
    setLoading(true);

    try {
      const res = await fetch('/api/escrow/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientRequirement,
          freelancerSubmission,
          freelancerWalletAddress,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        renderApproved(data);
      } else if (res.status === 400 && data && data.approved === false) {
        renderRejected(data);
      } else {
        showToast({
          type: 'error',
          title: 'Escrow failed',
          message: data?.reason || `Request failed with status ${res.status}.`,
        });
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Network error',
        message: err?.message || 'Could not reach the TrustNode server.',
      });
    } finally {
      setLoading(false);
    }
  });
})();
