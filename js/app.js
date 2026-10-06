/* ============================================================
   INMUN 2026 — Interaction & Rendering Layer (Upgraded)
   ============================================================ */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));

/* ---------- LOADER ---------- */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = $("loader");
    if (loader) loader.classList.add("hide");
  }, 400);
});

/* ---------- SCROLL PROGRESS + NAV STATE + SPY ---------- */
const sections = ["committees","documents","training","awards","handbook","resources"];
function onScroll() {
  const st = window.scrollY, max = document.body.scrollHeight - innerHeight;
  const p = $("progress");
  if (p && max > 0) p.style.width = (st / max * 100) + "%";
  const nav = $("nav");
  if (nav) nav.classList.toggle("solid", st > 40);
}
addEventListener("scroll", onScroll, { passive:true });
onScroll();

const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    document.querySelectorAll(".navlink").forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }
}), { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(id => { const el = $(id); if (el) spy.observe(el); });

/* ---------- REVEAL ON SCROLL ---------- */
const rev = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); rev.unobserve(e.target); }
}), { threshold: .1 });
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 60 + "ms";
  rev.observe(el);
});

/* ---------- HERO COUNTERS ---------- */
const cnt = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  cnt.unobserve(e.target);
  const el = e.target.querySelector("b"), to = +e.target.dataset.to, suf = e.target.dataset.suffix || "";
  if (!el) return;
  const t0 = performance.now(), dur = 1600;
  (function step(t) {
    const p = Math.min((t - t0) / dur, 1), e2 = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(to * e2) + suf;
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}), { threshold: .4 });
document.querySelectorAll(".metric").forEach(m => cnt.observe(m));

/* ---------- MARQUEE ---------- */
const marquee = $("marquee");
if (marquee && typeof COMMITTEES !== "undefined") {
  const itemsHtml = COMMITTEES.map(c => `<span>${c.name} — ${c.agenda}</span>`).join("");
  marquee.innerHTML = itemsHtml + itemsHtml;
}

/* ---------- 3D CARD TILT HELPER ---------- */
function refreshTilt() {
  const tiltTargets = document.querySelectorAll('.ccard, .metric, .pod, .res, .panel, .tnode');
  tiltTargets.forEach(card => {
    if (card._tiltAttached) return;
    card._tiltAttached = true;

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });

    card.addEventListener('mouseenter', () => {
      if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
    });
  });
}

/* ---------- COMMITTEES RENDERING ---------- */
function renderCommittees(track = "All") {
  const list = track === "All" ? COMMITTEES : COMMITTEES.filter(c => c.track === track);
  const grid = $("cgrid");
  if (!grid) return;

  grid.innerHTML = list.map((c, i) => `
    <article class="ccard" style="animation-delay:${i*50}ms" data-key="${c.key}">
      <div class="art">
        <span class="badge-n">Track ${c.n}</span>
        <img src="${c.cartoon}" alt="${c.name}" loading="lazy"
             onerror="this.src='https://placehold.co/900x380?text=${encodeURIComponent(c.short)}'">
      </div>
      <img class="logo" src="${c.logo}" alt="${c.short}" loading="lazy" onerror="this.style.display='none'">
      <div class="body">
        <h3>${c.name}</h3>
        <div class="agenda">${c.agenda}</div>
        <p class="blurb">${c.blurb}</p>
        <div class="meta">
          <span class="pill">${c.track}</span>
          <span class="pill doc">Outcome: ${c.doc}</span>
        </div>
        <div class="ccard-cta-row">
          <button class="btn small btn-open-dossier" data-key="${c.key}">3D Dossier <span>→</span></button>
          <a class="btn small ghost" href="${BASE}/committees/${c.key}" target="_blank">Portal ↗</a>
        </div>
        <details class="dossier-det">
          <summary>Official documents & executive board ▾</summary>
          <div class="dossier">
            <div class="d-sec">Official documents</div>
            ${DOCS.filter(d => d.c === c.short).map(d => `
              <a class="d-link" href="${d.u}" target="_blank">
                <span class="ft ${d.f}">${d.f === "pdf" ? "PDF" : "WEB"}</span>${d.t} <em>→</em>
              </a>`).join("")}
            <div class="d-sec">Executive board</div>
            <a class="d-link" href="mailto:${c.eb}">${c.eb} <em>✉</em></a>
          </div>
        </details>
      </div>
    </article>`).join("");

  // Attach dossier clicks
  grid.querySelectorAll(".btn-open-dossier").forEach(b => {
    b.addEventListener("click", e => {
      e.stopPropagation();
      if (typeof window.INMUN_OPEN_DOSSIER === "function") {
        window.INMUN_OPEN_DOSSIER(b.dataset.key);
      }
    });
  });

  // Also render 3D Deck with the track
  const deckSlides = $("cdeck-slides");
  if (deckSlides) {
    deckSlides.innerHTML = list.map((c, i) => `
      <div class="deck-card ${i === 0 ? 'active' : ''}" data-index="${i}" data-key="${c.key}">
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
            <button class="btn small btn-open-dossier" data-key="${c.key}">Open 3D Dossier <span>→</span></button>
            <a class="btn small ghost" href="${BASE}/committees/${c.key}" target="_blank">Portal ↗</a>
          </div>
        </div>
      </div>
    `).join('');

    deckSlides.querySelectorAll(".btn-open-dossier").forEach(b => {
      b.addEventListener("click", e => {
        e.stopPropagation();
        if (typeof window.INMUN_OPEN_DOSSIER === "function") {
          window.INMUN_OPEN_DOSSIER(b.dataset.key);
        }
      });
    });

    // Rebind deck clicks
    let deckIdx = 0;
    const cards = deckSlides.querySelectorAll('.deck-card');
    function updateTransforms() {
      cards.forEach((card, idx) => {
        const diff = idx - deckIdx;
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
      const ind = $('deckIndicator');
      if (ind) ind.textContent = `${deckIdx + 1} / ${cards.length}`;
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index, 10);
        if (idx !== deckIdx) {
          deckIdx = idx;
          updateTransforms();
          if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
        }
      });
    });

    const prevBtn = $('deckPrev'), nextBtn = $('deckNext');
    if (prevBtn) prevBtn.onclick = () => {
      deckIdx = (deckIdx - 1 + cards.length) % cards.length;
      updateTransforms();
      if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
    };
    if (nextBtn) nextBtn.onclick = () => {
      deckIdx = (deckIdx + 1) % cards.length;
      updateTransforms();
      if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
    };

    updateTransforms();
  }

  refreshTilt();
}

renderCommittees();

const trackFilter = $("trackFilter");
if (trackFilter) {
  trackFilter.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    document.querySelectorAll("#trackFilter .chip").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    renderCommittees(b.dataset.track);
    if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
  });
}

/* ---------- DOCUMENT LIBRARY ---------- */
const docCmt = $("docCmt");
if (docCmt && typeof DOCS !== "undefined") {
  docCmt.insertAdjacentHTML("beforeend", [...new Set(DOCS.map(d => d.c))].map(c => `<option>${c}</option>`).join(""));
}

function renderDocs() {
  const searchInput = $("docSearch");
  const cmtSelect = $("docCmt");
  if (!searchInput || !cmtSelect || typeof DOCS === "undefined") return;

  const q = searchInput.value.toLowerCase(), cm = cmtSelect.value;
  const rows = DOCS.filter(d =>
    (cm === "All" || d.c === cm) &&
    (!q || d.t.toLowerCase().includes(q) || d.c.toLowerCase().includes(q)));
  
  const countEl = $("docCount");
  if (countEl) countEl.textContent = `${rows.length} of ${DOCS.length} documents`;

  const byCmt = {};
  rows.forEach(d => (byCmt[d.c] ||= []).push(d));

  const docList = $("doclist");
  if (!docList) return;

  docList.innerHTML = Object.entries(byCmt).map(([c, list]) => {
    const pdfs = list.filter(d => d.f === "pdf"), webs = list.filter(d => d.f === "page");
    const branch = (label, items, cls) => !items.length ? "" : `
      <div class="branch">
        <div class="b-label ${cls}">${label} <span>${items.length}</span></div>
        ${items.map(d => `
          <a class="docrow nested" href="${d.u}" target="_blank">
            <span class="ft ${d.f}">${d.f === "pdf" ? "PDF" : "WEB"}</span>
            <span><b>${d.t}</b><div class="sub">${c === "All" ? "Conference-wide" : c + " · opens in a new tab"}</div></span>
            <span class="cmt">${c}</span>
            <span class="go">→</span>
          </a>`).join("")}
      </div>`;
    return `
    <details class="awgroup cmt-branch" ${q || cm !== "All" ? "open" : ""}>
      <summary>${c === "All" ? "Conference-wide" : c}<span class="cnt">${list.length} document${list.length > 1 ? "s" : ""}</span></summary>
      <div style="padding:6px 12px 16px">
        ${branch("PDF documents", pdfs, "b-pdf")}
        ${branch("Web resources", webs, "b-web")}
      </div>
    </details>`;
  }).join("") || `<p style="color:var(--dim);text-align:center;padding:24px 0">No documents match that search filter.</p>`;
}

const docSearchInput = $("docSearch");
if (docSearchInput) docSearchInput.addEventListener("input", renderDocs);
if (docCmt) docCmt.addEventListener("change", renderDocs);
renderDocs();

/* ---------- TRAINING TIMELINE ---------- */
const timeline = $("timeline");
if (timeline && typeof TRAINING !== "undefined") {
  timeline.innerHTML = TRAINING.map(t => `
    <div class="tnode reveal">
      <div class="tn-top">
        <span class="tno">SESSION ${t.n}</span>
        <h3>${t.title}</h3>
        <span class="when">${t.date}<br>${t.time}</span>
      </div>
      <div class="hosts"><b>Executive Board:</b> ${t.hosts}</div>
      <div class="focus">${t.focus}</div>
      ${t.table ? `<table class="ebtable">${t.table.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</table>` : ""}
    </div>`).join("");
}

/* ---------- AWARDS ---------- */
const awCmtSelect = $("awCmt");
if (awCmtSelect && typeof CM !== "undefined") {
  const AW_CMTS = ["All", ...Object.keys(CM).map(k => CM[k]), "Best School Delegation", "Best Country Profile"];
  awCmtSelect.innerHTML = AW_CMTS.map(c => `<option>${c}</option>`).join("");
}

function renderAwards() {
  const tierEl = document.querySelector("#tierFilter .chip.active");
  const awCmt = $("awCmt"), awSearch = $("awSearch");
  if (!tierEl || !awCmt || !awSearch || typeof AWARDS === "undefined") return;

  const tier = tierEl.dataset.tier;
  const cm = awCmt.value, q = awSearch.value.toLowerCase();

  let rows = AWARDS.filter(a =>
    (tier === "all" || (tier === "oos" ? a.oos : a.tier === tier)) &&
    (cm === "All" || COMMITTEE_LABEL[a.c] === cm) &&
    (!q || (a.name + " " + a.country + " " + a.school).toLowerCase().includes(q)));
  rows.sort((a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier] || (a.oos ? 1 : 0) - (b.oos ? 1 : 0));

  const groups = {};
  rows.forEach(a => (groups[COMMITTEE_LABEL[a.c]] ||= []).push(a));
  const tiersOf = list => {
    const tiers = {};
    list.forEach(a => (tiers[a.tier] ||= []).push(a));
    return Object.entries(tiers).sort((a,b) => TIER_RANK[a[0]] - TIER_RANK[b[0]]);
  };
  const TIER_HEAD = {
    best:"🏆 Best Delegate (First Place)",
    hc:"🎖️ High Commendation",
    sm:"✳ Special Mention",
    bestdelegation:"🥇 Best School Delegation",
    profile:"📑 Best Country Profile"
  };

  const awardGroups = $("awardGroups");
  if (awardGroups) {
    awardGroups.innerHTML = Object.entries(groups).map(([name, list]) => `
      <details class="awgroup" open>
        <summary>${name}<span class="cnt">${list.length} award${list.length > 1 ? "s" : ""}</span></summary>
        <div style="padding:6px 12px 16px">
          ${tiersOf(list).map(([t, items]) => `
            <div class="branch">
              <div class="b-label" style="color:var(--gold-lt)">${TIER_HEAD[t]} <span>${items.length}</span></div>
              ${items.map(a => `
                <div class="awrow nested">
                  <div>
                    <span class="nm">${a.name}</span>
                    ${a.oos ? '<span class="oos">OUTSTATION</span>' : ""}
                    <div class="sub">${a.country}</div>
                  </div>
                  <span class="school">${a.school || "—"}</span>
                </div>`).join("")}
            </div>`).join("")}
        </div>
      </details>`).join("") || `<p style="color:var(--dim);padding:24px 0;text-align:center">No awards match that filter.</p>`;
  }

  refreshTilt();
}

const tierFilter = $("tierFilter");
if (tierFilter) {
  tierFilter.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    document.querySelectorAll("#tierFilter .chip").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    renderAwards();
    if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
  });
}
if (awCmtSelect) awCmtSelect.addEventListener("change", renderAwards);
const awSearchInput = $("awSearch");
if (awSearchInput) awSearchInput.addEventListener("input", renderAwards);

/* 3D Podium Render */
const podium = $("podium");
if (podium && typeof AWARDS !== "undefined") {
  const PODIUM = AWARDS.filter(a => a.tier === "best").sort((a,b) => a.c.localeCompare(b.c));
  podium.innerHTML = PODIUM.map((a, idx) => `
    <div class="pod reveal in pod-tier-1" style="animation-delay:${idx*40}ms">
      <div class="pod-pedestal">
        <div class="pod-crest">🏆</div>
        <div class="pod-rank-num">#1</div>
      </div>
      <b>${a.name}</b>
      <span class="pod-country">${a.country}</span>
      <div class="pod-committee">${COMMITTEE_LABEL[a.c]}</div>
      <div class="school">${a.school || "—"}</div>
    </div>`).join("");
}

/* Leaderboards */
function tally(key) {
  const m = {};
  if (typeof AWARDS !== "undefined") {
    AWARDS.forEach(a => { const k = a[key]; if (k) m[k] = (m[k] || 0) + 1; });
  }
  return Object.entries(m).sort((x, y) => y[1] - x[1]);
}
function barList(el, rows, color, limit = 8) {
  if (!el) return;
  const top = rows.slice(0, limit), max = top[0]?.[1] || 1;
  el.innerHTML = top.map(([k, v]) => `
    <div class="barrow">
      <div>${k}<div class="track"><i data-w="${v / max * 100}" style="background:linear-gradient(90deg,${color},${color}66)"></i></div></div>
      <b>${v}</b>
    </div>`).join("");
  requestAnimationFrame(() => el.querySelectorAll("i").forEach(i => i.style.width = i.dataset.w + "%"));
}

const lb = $("leaderboard");
if (lb) {
  const schoolTally = tally("school");
  const topSchoolVal = schoolTally[0]?.[1] || 1;
  lb.innerHTML = schoolTally.slice(0,9).map(([k,v],i)=>`
    <div class="lbrow"><i>${String(i+1).padStart(2,"0")}</i><span>${k}</span><b>${v}</b></div>
    <div class="lbrow"><i></i><div class="bar"><b data-w="${v/topSchoolVal*100}"></b></div></div>`).join("");
  requestAnimationFrame(() => lb.querySelectorAll(".bar b").forEach(b => b.style.width = b.dataset.w + "%"));
}

const cmtCounts = {};
if (typeof AWARDS !== "undefined") {
  AWARDS.forEach(a => { const c = COMMITTEE_LABEL[a.c]; cmtCounts[c] = (cmtCounts[c]||0)+1; });
}
barList($("awBars"), Object.entries(cmtCounts).sort((a,b)=>b[1]-a[1]), "var(--blue)");
barList($("countryBars"), tally("country").filter(([c]) => !/United States|India|Brazil 1/.test(c)), "var(--violet)", 8);

renderAwards();

/* ---------- HANDBOOK RENDERING ---------- */
function blockHtml(b) {
  switch (b.t) {
    case "lead":  return `<p class="lead">${b.x}</p>`;
    case "h3":    return `<h4>${b.x}</h4>`;
    case "ul":    return `<ul>${b.x.map(i => `<li>${i}</li>`).join("")}</ul>`;
    case "ol":    return `<ol>${b.x.map(i => `<li>${i}</li>`).join("")}</ol>`;
    case "note":  return `<div class="note">${b.x}</div>`;
    case "callout":return `<div class="callout">${b.x}</div>`;
    case "sig":   return `<p class="sig">${b.x}</p>`;
    case "kv":    return `<div class="kv">${b.x}</div>`;
    case "swap":  return `<div class="swap"><div class="w"><b>Weak:</b> ${b.a}</div><div class="s"><b>Strong:</b> ${b.b}</div></div>`;
    case "table": return `<table class="hb"><thead><tr>${b.head.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    case "score": return `<table class="hb score-tbl"><thead><tr><th>${b.head}</th><th>Day 1</th><th>Day 2</th></tr></thead><tbody>${
        b.rows.map((r,i)=>`<tr><td><span class="box" data-i="${i}"></span>${r}</td><td><span class="box" data-i="${i}"></span></td><td><span class="box" data-i="${i}"></span></td></tr>`).join("")}</tbody></table>`;
    case "doc":   return `<div class="docbox"><div class="dt">${b.title}</div><p>${b.x}</p><div class="by">${b.by}</div></div>`;
    default:      return `<p>${b.x}</p>`;
  }
}

const hbBody = $("hbBody");
if (hbBody && typeof HANDBOOK !== "undefined") {
  hbBody.innerHTML = HANDBOOK.map(s => `
    <section class="hs" id="hb-${s.id}">
      <div class="hs-head"><span class="k">${s.kicker}</span><h3>${s.title}</h3></div>
      ${s.by ? `<div class="note">${s.by}</div>` : ""}
      ${s.intro ? `<p class="lead">${s.intro}</p>` : ""}
      ${s.terms ? `<div class="terms">${s.terms.map(([a,b]) => `<div><b>${a}</b>${b}</div>`).join("")}</div>` : ""}
      ${s.b ? s.b.map(blockHtml).join("") : ""}
      ${s.sections ? s.sections.map(sec => `<h4>${sec.h}</h4>${sec.rules.map(([h,p])=>`<div class="rules"><h4>${h}</h4><p>${p}</p></div>`).join("")}`).join("") : ""}
    </section>`).join("");
}

const toc = $("toc");
if (toc && typeof HANDBOOK !== "undefined") {
  toc.innerHTML = HANDBOOK.map(s => `<li><a href="#hb-${s.id}">${s.title}</a></li>`).join("");
}

function hbScroll() {
  if (!hbBody) return;
  const r = hbBody.getBoundingClientRect(), total = hbBody.offsetHeight - innerHeight;
  const p = Math.max(0, Math.min(1, (-r.top + 120) / Math.max(total, 1)));
  const hbBar = $("hbBar"), hbProg = $("hbProg");
  if (hbBar) hbBar.style.width = (p * 100) + "%";
  if (hbProg) hbProg.textContent = Math.round(p * 100) + "%";
}
addEventListener("scroll", hbScroll, { passive:true });
hbScroll();

const hbSpy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    document.querySelectorAll("#toc a").forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }
}), { rootMargin: "-20% 0px -70% 0px" });
document.querySelectorAll(".hs").forEach(s => hbSpy.observe(s));

/* Scorecard Checkboxes */
const KEY = "inmun26_scorecard";
let sc = JSON.parse(localStorage.getItem(KEY) || "[]");
document.querySelectorAll(".box").forEach(b => {
  if (sc.includes(b.dataset.i)) b.classList.add("on");
  b.addEventListener("click", () => {
    b.classList.toggle("on");
    sc = [...document.querySelectorAll(".box.on")].map(x => x.dataset.i);
    localStorage.setItem(KEY, JSON.stringify(sc));
    if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
  });
});

/* ---------- RESOURCES ---------- */
const RES = [
  ["Participation Guide", "The full delegate guide for INMUN 2026.", CONTACT.guide],
  ["Master Matrix", "Delegate · committee · portfolio allocations.", CONTACT.matrix],
  ["Anonymous Complaints", "Confidential committee grievance form.", CONTACT.complaints],
  ["MUN Crash Course", "Executive preparation video series.", CONTACT.crash],
  ["Training Recordings", "All five EB masterclass recordings.", CONTACT.recordings],
  ["Zoom Chamber", "Live sessions · ID 849 216 4833.", CONTACT.zoom],
  ["Position Papers Drive", "Submitted research dossiers by committee.", `${BASE}/committees/icj`],
  ["MUN Advisor Inquiries", "vedansh.arora@ryangroup.org", "mailto:vedansh.arora@ryangroup.org"],
];

const resgrid = $("resgrid");
if (resgrid) {
  resgrid.innerHTML = RES.map(r => `
    <a class="res reveal" href="${r[2]}" target="_blank">
      <div class="res-corner">↗</div>
      <b>${r[0]}</b>
      <span>${r[1]}</span>
    </a>`).join("");
}
document.querySelectorAll(".res.reveal").forEach(el => rev.observe(el));

/* ---------- MOBILE NAVIGATION ---------- */
const burger = $("burger");
if (burger) {
  burger.addEventListener("click", () => {
    const l = document.querySelector(".links");
    if (!l) return;
    const open = l.classList.contains("mobile-open");
    l.classList.toggle("mobile-open", !open);
    burger.textContent = open ? "☰" : "✕";
  });
}

// Global button sound listener
document.querySelectorAll('button, .btn, .chip').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
  });
});

refreshTilt();