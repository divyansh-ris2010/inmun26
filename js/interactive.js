/* ============================================================
   INMUN 2026 — Interactive Cinematic Experience Engine
   - 3D Card Tilt & Specular Glare
   - Ceremonial Gavel Strike with Web Audio & Ripple
   - Interactive Committee Matcher Quiz
   - 3D Spatial Deck / Coverflow Carousel
   - Committee 3D Dossier Modal & Globe Synchronization
   - Command Palette (Ctrl+K)
   - Real-time Countdown Timer
   - Confetti Celebrations
   ============================================================ */

(function () {
  const $ = id => document.getElementById(id);

  // ==========================================================
  // 1. 3D CARD TILT & SPECULAR SHINE ENGINE
  // ==========================================================
  function init3DTilt() {
    const tiltTargets = document.querySelectorAll('.ccard, .metric, .pod, .res, .panel, .tnode, .dossier-card');
    tiltTargets.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
        card.style.setProperty('--mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // ==========================================================
  // 2. LIVE COUNTDOWN TIMER
  // ==========================================================
  function initCountdown() {
    // Target: INMUN 2026 Opening Gavel (e.g. October 15, 2026 09:00 IST)
    const targetDate = new Date('2026-10-15T09:00:00+05:30').getTime();

    function updateTimer() {
      const now = new Date().getTime();
      let diff = targetDate - now;
      if (diff < 0) diff = 0;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const dEl = $('cd-days'), hEl = $('cd-hours'), mEl = $('cd-mins'), sEl = $('cd-secs');
      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // ==========================================================
  // 3. CEREMONIAL GAVEL EXPERIENCE
  // ==========================================================
  function initGavelExperience() {
    const triggerBtn = $('btnGavelTrigger');
    const modal = $('gavelModal');
    const closeBtn = $('gavelModalClose');
    const gavelGraphic = $('gavelGraphic');
    const shockwave = $('gavelShockwave');
    const gavelStatus = $('gavelStatusText');

    if (!modal) return;

    function openModal() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (triggerBtn) triggerBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });

    if (gavelGraphic) {
      gavelGraphic.addEventListener('click', () => {
        // Trigger strike animation
        gavelGraphic.classList.remove('strike');
        void gavelGraphic.offsetWidth; // force reflow
        gavelGraphic.classList.add('strike');

        // Play authentic synthesized gavel sound
        if (window.INMUN_AUDIO) window.INMUN_AUDIO.playGavel();

        // Trigger Shockwave ripple
        if (shockwave) {
          shockwave.classList.remove('pulse');
          void shockwave.offsetWidth;
          shockwave.classList.add('pulse');
        }

        // Haptic feedback if available on mobile
        if (navigator.vibrate) navigator.vibrate([40, 60, 80]);

        if (gavelStatus) {
          gavelStatus.innerHTML = `
            <span class="gold-text glow-strong">⚖️ THE HOUSE IS CALLED TO ORDER!</span><br>
            <span class="sub-lead">The 2026 Indian Model United Nations is officially in session. Delegates, prepare to debate!</span>
          `;
        }

        // Trigger celebratory gold sparkles
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.65 },
            colors: ['#d4af37', '#f4dc9a', '#5b8cff']
          });
        }
      });
    }
  }

  // ==========================================================
  // 4. COMMITTEE MATCHER QUIZ
  // ==========================================================
  const QUIZ_QUESTIONS = [
    {
      q: "What is your primary strategic approach in diplomatic negotiations?",
      opts: [
        { t: "Legal precision, statute interpretation & cross-examination", key: "icj" },
        { t: "Multilateral coalition building, disarmament & security policy", key: "disec" },
        { t: "Technological sovereignty, compute rights & AI ethics", key: "ai-impact-summit" },
        { t: "Binding environmental law, plastics regulation & ecology", key: "inc" },
        { t: "Economic contracts, labour market transitions & trade equity", key: "wef" },
        { t: "Cross-border law enforcement, extradition & crime tracking", key: "interpol" },
        { t: "Investigative coverage, photojournalism & editorial satire", key: "wp-journalists" }
      ]
    },
    {
      q: "When discussions reach an explosive deadlock, what is your move?",
      opts: [
        { t: "Quote the UN Charter and corner opposing counsel with precedent", key: "icj" },
        { t: "Call an unmoderated caucus and forge a compromise working paper", key: "disec" },
        { t: "Rally the Global South to defend sovereign autonomy & currency independence", key: "g77" },
        { t: "Scrutinize private military contracts and corporate accountability", key: "cd" },
        { t: "Publish an explosive press dispatch exposing back-room negotiations", key: "wp-journalists" }
      ]
    },
    {
      q: "Which landmark end-document do you want to deliver to the world?",
      opts: [
        { t: "A historic Court Judgement establishing international jurisprudence", key: "icj" },
        { t: "A binding Global Plastics Treaty with mandatory reduction caps", key: "inc" },
        { t: "A sovereign compute Declaration on global AI infrastructure", key: "ai-impact-summit" },
        { t: "A summit Declaration reshaping global economic architecture", key: "brics" },
        { t: "A comprehensive Disarmament Report curbing privatised warfare", key: "cd" },
        { t: "Front-page photo essays and caricature exposés", key: "wp-journalists" }
      ]
    }
  ];

  function initQuiz() {
    const triggerBtn = $('btnQuizTrigger');
    const modal = $('quizModal');
    const closeBtn = $('quizModalClose');
    const body = $('quizModalBody');

    if (!modal) return;

    let currentStep = 0;
    const scores = {};

    function openQuiz() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      currentStep = 0;
      for (const k in scores) delete scores[k];
      renderQuizStep();
    }

    function closeQuiz() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (triggerBtn) triggerBtn.addEventListener('click', openQuiz);
    if (closeBtn) closeBtn.addEventListener('click', closeQuiz);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeQuiz();
    });

    function renderQuizStep() {
      if (currentStep >= QUIZ_QUESTIONS.length) {
        renderQuizResult();
        return;
      }

      const q = QUIZ_QUESTIONS[currentStep];
      body.innerHTML = `
        <div class="quiz-step-wrap">
          <div class="quiz-progress-bar"><div class="quiz-prog-fill" style="width:${((currentStep + 1) / QUIZ_QUESTIONS.length * 100)}%"></div></div>
          <p class="quiz-step-count">Question ${currentStep + 1} of ${QUIZ_QUESTIONS.length}</p>
          <h3 class="quiz-question-title">${q.q}</h3>
          <div class="quiz-options">
            ${q.opts.map((opt, i) => `
              <button class="quiz-opt-btn" data-key="${opt.key}">
                <span class="opt-num">${String.fromCharCode(65 + i)}</span>
                <span class="opt-text">${opt.t}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;

      body.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.key;
          scores[key] = (scores[key] || 0) + 1;
          if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
          currentStep++;
          renderQuizStep();
        });
      });
    }

    function renderQuizResult() {
      // Find highest score
      let bestKey = 'disec';
      let maxScore = -1;
      for (const k in scores) {
        if (scores[k] > maxScore) {
          maxScore = scores[k];
          bestKey = k;
        }
      }

      const committee = (typeof COMMITTEES !== 'undefined' ? COMMITTEES : []).find(c => c.key === bestKey) || {
        name: "UN General Assembly (DISEC)",
        short: "DISEC",
        agenda: "Breaking Point: Prospects for Peace in the Middle East",
        blurb: "The plenary body of the UN. Every Member State in the room.",
        doc: "Resolution",
        key: "disec"
      };

      if (window.INMUN_AUDIO) window.INMUN_AUDIO.playSuccess();

      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      }

      body.innerHTML = `
        <div class="quiz-result-wrap">
          <span class="quiz-match-badge">⭐ 98% Strategic Aptitude Match</span>
          <h3 class="quiz-result-title">${committee.name} (${committee.short})</h3>
          <div class="quiz-agenda-highlight"><b>Agenda:</b> ${committee.agenda}</div>
          <p class="quiz-result-blurb">${committee.blurb}</p>
          <div class="quiz-meta-row">
            <span class="pill">${committee.track || "Summit Track"}</span>
            <span class="pill doc">Outcome: ${committee.doc || "Official Document"}</span>
          </div>
          <div class="quiz-actions">
            <button class="btn" id="btnQuizDossier">Open Committee Dossier</button>
            <button class="btn ghost" id="btnQuizRetake">Retake Quiz</button>
          </div>
        </div>
      `;

      const dossierBtn = $('btnQuizDossier');
      if (dossierBtn) {
        dossierBtn.addEventListener('click', () => {
          closeQuiz();
          openDossierModal(committee.key);
        });
      }

      const retakeBtn = $('btnQuizRetake');
      if (retakeBtn) {
        retakeBtn.addEventListener('click', () => {
          currentStep = 0;
          for (const k in scores) delete scores[k];
          renderQuizStep();
        });
      }
    }
  }

  // ==========================================================
  // 5. 3D SPATIAL DECK CAROUSEL FOR COMMITTEES
  // ==========================================================
  let currentDeckIndex = 0;
  let isDeckMode = false;

  function render3DDeck(track = 'All') {
    const list = track === 'All' ? COMMITTEES : COMMITTEES.filter(c => c.track === track);
    const deckContainer = $('cdeck-slides');
    if (!deckContainer) return;

    if (list.length === 0) {
      deckContainer.innerHTML = `<p style="color:var(--dim);text-align:center">No committees in this track.</p>`;
      return;
    }

    if (currentDeckIndex >= list.length) currentDeckIndex = 0;

    deckContainer.innerHTML = list.map((c, i) => `
      <div class="deck-card ${i === currentDeckIndex ? 'active' : ''}" data-index="${i}" data-key="${c.key}">
        <div class="art">
          <span class="badge-n">Track ${c.n}</span>
          <img src="${c.cartoon}" alt="${c.name}" onerror="this.src='https://placehold.co/900x380?text=${encodeURIComponent(c.short)}'">
        </div>
        <div class="deck-body">
          <div class="logo-wrap">
            <img class="logo" src="${c.logo}" alt="${c.short}" onerror="this.style.display='none'">
            <span class="pill">${c.track}</span>
          </div>
          <h3>${c.name}</h3>
          <div class="agenda">${c.agenda}</div>
          <p class="blurb">${c.blurb}</p>
          <div class="meta"><span class="pill doc">Outcome: ${c.doc}</span></div>
          <div class="deck-actions">
            <button class="btn small btn-dossier" data-key="${c.key}">Open 3D Dossier <span>→</span></button>
            <a class="btn small ghost" href="${BASE}/committees/${c.key}" target="_blank">Portal ↗</a>
          </div>
        </div>
      </div>
    `).join('');

    updateDeckTransforms();

    deckContainer.querySelectorAll('.btn-dossier').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openDossierModal(btn.dataset.key);
      });
    });

    deckContainer.querySelectorAll('.deck-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index, 10);
        if (idx !== currentDeckIndex) {
          currentDeckIndex = idx;
          updateDeckTransforms();
          if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
        }
      });
    });
  }

  function updateDeckTransforms() {
    const cards = document.querySelectorAll('.deck-card');
    cards.forEach((card, idx) => {
      const diff = idx - currentDeckIndex;
      card.classList.toggle('active', diff === 0);

      if (diff === 0) {
        card.style.transform = `translateX(0) translateZ(100px) scale(1)`;
        card.style.opacity = '1';
        card.style.zIndex = '10';
        card.style.filter = 'none';
        card.style.pointerEvents = 'auto';
      } else if (Math.abs(diff) === 1) {
        card.style.transform = `translateX(${diff * 260}px) translateZ(0) rotateY(${-diff * 25}deg) scale(0.88)`;
        card.style.opacity = '0.75';
        card.style.zIndex = '5';
        card.style.filter = 'brightness(0.7)';
        card.style.pointerEvents = 'auto';
      } else if (Math.abs(diff) === 2) {
        card.style.transform = `translateX(${diff * 230}px) translateZ(-100px) rotateY(${-diff * 35}deg) scale(0.72)`;
        card.style.opacity = '0.4';
        card.style.zIndex = '2';
        card.style.filter = 'brightness(0.5)';
        card.style.pointerEvents = 'auto';
      } else {
        card.style.transform = `translateX(${diff * 200}px) translateZ(-200px) scale(0.5)`;
        card.style.opacity = '0';
        card.style.zIndex = '0';
        card.style.pointerEvents = 'none';
      }
    });

    const indicator = $('deckIndicator');
    if (indicator) {
      indicator.textContent = `${currentDeckIndex + 1} / ${cards.length}`;
    }
  }

  function initDeckNavigation() {
    const prevBtn = $('deckPrev');
    const nextBtn = $('deckNext');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.deck-card');
        if (cards.length === 0) return;
        currentDeckIndex = (currentDeckIndex - 1 + cards.length) % cards.length;
        updateDeckTransforms();
        if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.deck-card');
        if (cards.length === 0) return;
        currentDeckIndex = (currentDeckIndex + 1) % cards.length;
        updateDeckTransforms();
        if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
      });
    }

    // View switcher (Deck vs Grid)
    const viewDeckBtn = $('viewToggleDeck');
    const viewGridBtn = $('viewToggleGrid');
    const deckSection = $('deckViewContainer');
    const gridSection = $('cgrid');

    if (viewDeckBtn && viewGridBtn) {
      viewDeckBtn.addEventListener('click', () => {
        viewDeckBtn.classList.add('active');
        viewGridBtn.classList.remove('active');
        deckSection.style.display = 'block';
        gridSection.style.display = 'none';
        isDeckMode = true;
        render3DDeck();
      });

      viewGridBtn.addEventListener('click', () => {
        viewGridBtn.classList.add('active');
        viewDeckBtn.classList.remove('active');
        deckSection.style.display = 'none';
        gridSection.style.display = 'grid';
        isDeckMode = false;
      });
    }
  }

  // ==========================================================
  // 6. COMMITTEE 3D DOSSIER MODAL
  // ==========================================================
  function openDossierModal(committeeKey) {
    const modal = $('dossierModal');
    const body = $('dossierModalBody');
    if (!modal || !body) return;

    const c = (typeof COMMITTEES !== 'undefined' ? COMMITTEES : []).find(x => x.key === committeeKey);
    if (!c) return;

    const docs = (typeof DOCS !== 'undefined' ? DOCS : []).filter(d => d.c === c.short);

    body.innerHTML = `
      <div class="dossier-modal-grid">
        <div class="dossier-modal-left">
          <div class="dossier-art-box">
            <img src="${c.cartoon}" alt="${c.name}" class="dossier-hero-img" onerror="this.src='https://placehold.co/900x380?text=${encodeURIComponent(c.short)}'">
            <div class="dossier-logo-float">
              <img src="${c.logo}" alt="${c.short}" onerror="this.style.display='none'">
            </div>
          </div>
          <div class="dossier-quick-facts">
            <div class="qf-row"><b>Committee ID:</b> <span>${c.short}</span></div>
            <div class="qf-row"><b>Diplomatic Track:</b> <span>${c.track}</span></div>
            <div class="qf-row"><b>End Document:</b> <span class="gold-text">${c.doc}</span></div>
            <div class="qf-row"><b>Executive Board:</b> <a href="mailto:${c.eb}">${c.eb}</a></div>
          </div>
          <div class="dossier-globe-action">
            <button class="btn small full" id="btnFlyGlobe" data-key="${c.key}">🌍 Fly 3D Globe to Venue</button>
          </div>
        </div>
        <div class="dossier-modal-right">
          <span class="eyebrow"><span class="dot"></span> Official Committee Brief</span>
          <h2>${c.name}</h2>
          <div class="dossier-agenda-banner">
            <b>Agenda:</b>
            <p>${c.agenda}</p>
          </div>
          <div class="dossier-mandate">
            <h4>Mandate & Strategic Scope</h4>
            <p>${c.blurb}</p>
          </div>
          <div class="dossier-docs-sec">
            <h4>Essential Repository Documents</h4>
            <div class="dossier-doc-list">
              ${docs.map(d => `
                <a href="${d.u}" target="_blank" class="dossier-doc-item">
                  <span class="ft ${d.f}">${d.f === 'pdf' ? 'PDF' : 'WEB'}</span>
                  <span class="d-title">${d.t}</span>
                  <span class="d-go">↗</span>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();

    // Fly globe trigger
    const flyBtn = $('btnFlyGlobe');
    if (flyBtn) {
      flyBtn.addEventListener('click', () => {
        if (window.INMUN_GLOBE) {
          window.INMUN_GLOBE.focusCity(c.short);
        }
        modal.classList.remove('active');
        document.body.style.overflow = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function initDossierModal() {
    const modal = $('dossierModal');
    const closeBtn = $('dossierModalClose');
    if (!modal) return;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================================
  // 7. COMMAND PALETTE (CTRL+K)
  // ==========================================================
  function initCommandPalette() {
    const modal = $('cmdModal');
    const input = $('cmdInput');
    const list = $('cmdResults');
    const triggerBtn = $('cmdTriggerBtn');
    const closeBtn = $('cmdCloseBtn');

    if (!modal || !input || !list) return;

    function openPalette() {
      modal.classList.add('active');
      input.value = '';
      renderPaletteResults('');
      input.focus();
      if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
    }

    function closePalette() {
      modal.classList.remove('active');
    }

    if (triggerBtn) triggerBtn.addEventListener('click', openPalette);
    if (closeBtn) closeBtn.addEventListener('click', closePalette);

    modal.addEventListener('click', e => {
      if (e.target === modal) closePalette();
    });

    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (modal.classList.contains('active')) closePalette();
        else openPalette();
      }
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closePalette();
      }
    });

    input.addEventListener('input', () => {
      renderPaletteResults(input.value.trim().toLowerCase());
    });

    function renderPaletteResults(query) {
      const items = [];

      // 1. Navigation items
      const navLinks = [
        { label: "Committees Hall", type: "Section", href: "#committees" },
        { label: "Document Library", type: "Section", href: "#documents" },
        { label: "Training Sessions & Zoom", type: "Section", href: "#training" },
        { label: "Awards & Podium", type: "Section", href: "#awards" },
        { label: "Delegate Handbook", type: "Section", href: "#handbook" },
        { label: "Resources & Matrix", type: "Section", href: "#resources" }
      ];

      navLinks.forEach(n => {
        if (!query || n.label.toLowerCase().includes(query)) items.push(n);
      });

      // 2. Committees
      if (typeof COMMITTEES !== 'undefined') {
        COMMITTEES.forEach(c => {
          if (!query || c.name.toLowerCase().includes(query) || c.short.toLowerCase().includes(query) || c.agenda.toLowerCase().includes(query)) {
            items.push({
              label: `${c.short} — ${c.name}`,
              sub: c.agenda,
              type: "Committee",
              action: () => openDossierModal(c.key)
            });
          }
        });
      }

      // 3. Documents
      if (typeof DOCS !== 'undefined') {
        DOCS.slice(0, 15).forEach(d => {
          if (!query || d.t.toLowerCase().includes(query) || d.c.toLowerCase().includes(query)) {
            items.push({
              label: `${d.t} (${d.c})`,
              sub: d.f === 'pdf' ? 'Official PDF' : 'Interactive Web Page',
              type: "Document",
              href: d.u,
              external: true
            });
          }
        });
      }

      if (items.length === 0) {
        list.innerHTML = `<div class="cmd-empty">No results found for "${query}"</div>`;
        return;
      }

      list.innerHTML = items.slice(0, 10).map((item, idx) => `
        <div class="cmd-item" data-idx="${idx}">
          <div class="cmd-item-main">
            <span class="cmd-badge ${item.type.toLowerCase()}">${item.type}</span>
            <span class="cmd-label">${item.label}</span>
          </div>
          ${item.sub ? `<span class="cmd-sub">${item.sub}</span>` : ''}
          <span class="cmd-arrow">↵</span>
        </div>
      `).join('');

      list.querySelectorAll('.cmd-item').forEach((row, i) => {
        row.addEventListener('click', () => {
          const item = items[i];
          closePalette();
          if (item.action) {
            item.action();
          } else if (item.href) {
            if (item.external) window.open(item.href, '_blank');
            else {
              const el = document.querySelector(item.href);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    }
  }

  // ==========================================================
  // 8. AUDIO AMBIENCE & MUTE CONTROLS
  // ==========================================================
  function initAudioControls() {
    const audioBtn = $('btnAudioToggle');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', () => {
      if (!window.INMUN_AUDIO) return;
      const isMuted = window.INMUN_AUDIO.toggleMute();
      audioBtn.classList.toggle('muted', isMuted);
      audioBtn.innerHTML = isMuted ? '🔇 Audio OFF' : '🔊 Audio ON';
    });
  }

  // ==========================================================
  // 9. CELEBRATION CONFETTI
  // ==========================================================
  function initConfettiButton() {
    const btn = $('btnCelebrateLaureates');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (window.INMUN_AUDIO) window.INMUN_AUDIO.playSuccess();
      if (typeof confetti === 'function') {
        const count = 200;
        const defaults = { origin: { y: 0.7 } };

        function fire(particleRatio, opts) {
          confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
          }));
        }

        fire(0.25, { spread: 26, startVelocity: 55, colors: ['#d4af37', '#f4dc9a'] });
        fire(0.2, { spread: 60, colors: ['#5b8cff', '#38bdf8'] });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#3ddc97', '#d4af37'] });
        fire(0.1, { spread: 120, startVelocity: 45 });
      }
    });
  }

  // ==========================================================
  // INITIALIZATION ON DOM READY
  // ==========================================================
  window.addEventListener('DOMContentLoaded', () => {
    init3DTilt();
    initCountdown();
    initGavelExperience();
    initQuiz();
    initDeckNavigation();
    initDossierModal();
    initCommandPalette();
    initAudioControls();
    initConfettiButton();
  });

  // Export helper
  window.INMUN_OPEN_DOSSIER = openDossierModal;
})();
