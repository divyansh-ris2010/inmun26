/* ============================================================
   INMUN 2026 — interaction & rendering layer
   ============================================================ */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));

/* ---------- LOADER ---------- */
window.addEventListener("load", () => setTimeout(() => $("loader").classList.add("hide"), 350));

/* ---------- SCROLL PROGRESS + NAV STATE + SPY ---------- */
const sections = ["committees","documents","training","awards","handbook","resources"];
function onScroll() {
  const st = window.scrollY, max = document.body.scrollHeight - innerHeight;
  $("progress").style.width = (st / max * 100) + "%";
  $("nav").classList.toggle("solid", st > 40);
}
addEventListener("scroll", onScroll, { passive:true }); onScroll();

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
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 6) * 70 + "ms"; rev.observe(el); });

/* ---------- HERO COUNTERS ---------- */
const cnt = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  cnt.unobserve(e.target);
  const el = e.target.querySelector("b"), to = +e.target.dataset.to, suf = e.target.dataset.suffix || "";
  const t0 = performance.now(), dur = 1500;
  (function step(t) {
    const p = Math.min((t - t0) / dur, 1), e2 = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(to * e2) + suf;
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}), { threshold:.5 });
document.querySelectorAll(".metric").forEach(m => cnt.observe(m));

/* ---------- MARQUEE ---------- */
$("marquee").innerHTML = (COMMITTEES.map(c => `<span>${c.name} — ${c.agenda}</span>`).join(""))
  + COMMITTEES.map(c => `<span>${c.name} — ${c.agenda}</span>`).join("");

/* ---------- COMMITTEES ---------- */
function renderCommittees(track = "All") {
  const list = track === "All" ? COMMITTEES : COMMITTEES.filter(c => c.track === track);
  $("cgrid").innerHTML = list.map((c, i) => `
    <article class="ccard" style="animation-delay:${i*60}ms">
      <div class="art">
        <span class="badge-n">Committee ${c.n}</span>
        <img src="${c.cartoon}" alt="${c.name}" loading="lazy"
             onerror="this.src='https://placehold.co/900x380?text=${encodeURIComponent(c.short)}'">
      </div>
      <img class="logo" src="${c.logo}" alt="${c.short}" loading="lazy" onerror="this.style.display='none'">
      <div class="body">
        <h3>${c.name}</h3>
        <div class="agenda">${c.agenda}</div>
        <p>${c.blurb}</p>
        <div class="meta"><span class="pill">${c.track}</span><span class="pill doc">Final doc: ${c.doc}</span></div>
        <a class="open" href="${BASE}/committees/${c.key}" target="_blank">Open committee <span>→</span></a>
        <details class="dossier-det">
          <summary>Show committee dossier ▾</summary>
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
}
renderCommittees();
$("trackFilter").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  document.querySelectorAll("#trackFilter .chip").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  renderCommittees(b.dataset.track);
});

/* ---------- DOCUMENT LIBRARY ---------- */
$("docCmt").insertAdjacentHTML("beforeend", [...new Set(DOCS.map(d => d.c))].map(c => `<option>${c}</option>`).join(""));
function renderDocs() {
  const q = $("docSearch").value.toLowerCase(), cm = $("docCmt").value;
  const rows = DOCS.filter(d =>
    (cm === "All" || d.c === cm) &&
    (!q || d.t.toLowerCase().includes(q) || d.c.toLowerCase().includes(q)));
  $("docCount").textContent = `${rows.length} of ${DOCS.length} documents`;

  // branched hierarchy: committee > file type > documents
  const byCmt = {};
  rows.forEach(d => (byCmt[d.c] ||= []).push(d));
  $("doclist").innerHTML = Object.entries(byCmt).map(([c, list]) => {
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
      <div style="padding:4px 10px 14px">
        ${branch("PDF documents", pdfs, "b-pdf")}
        ${branch("Web resources", webs, "b-web")}
      </div>
    </details>`;
  }).join("") || `<p style="color:var(--dim)">No documents match that filter.</p>`;
}
$("docSearch").addEventListener("input", renderDocs);
$("docCmt").addEventListener("change", renderDocs);
renderDocs();

/* ---------- TRAINING TIMELINE ---------- */
$("timeline").innerHTML = TRAINING.map(t => `
  <div class="tnode">
    <div class="tn-top"><span class="tno">${t.n}</span><h3>${t.title}</h3><span class="when">${t.date}<br>${t.time}</span></div>
    <div class="hosts">${t.hosts}</div>
    <div class="focus">${t.focus}</div>
    ${t.table ? `<table class="ebtable">${t.table.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</table>` : ""}
  </div>`).join("");

/* ---------- AWARDS ---------- */
const AW_CMTS = ["All", ...Object.keys(CM).map(k => CM[k]), "Best School Delegation", "Best Country Profile"];
$("awCmt").innerHTML = AW_CMTS.map(c => `<option>${c}</option>`).join("");

const TIER_TEXT = { best:"Best", hc:"High Comm.", sm:"Special Mention", bestdelegation:"Best School", profile:"Best Profile" };

function renderAwards() {
  const tier = document.querySelector("#tierFilter .chip.active").dataset.tier;
  const cm = $("awCmt").value, q = $("awSearch").value.toLowerCase();
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
  const TIER_HEAD = { best:"🏆 Best Delegate", hc:"🎖️ High Commendation", sm:"✳ Special Mention", bestdelegation:"🥇 Best School Delegation", profile:"📑 Best Country Profile" };

  $("awardGroups").innerHTML = Object.entries(groups).map(([name, list]) => `
    <details class="awgroup" open>
      <summary>${name}<span class="cnt">${list.length} award${list.length > 1 ? "s" : ""}</span></summary>
      <div style="padding:4px 10px 14px">
        ${tiersOf(list).map(([t, items]) => `
          <div class="branch">
            <div class="b-label" style="color:var(--gold-lt)">${TIER_HEAD[t]} <span>${items.length}</span></div>
            ${items.map(a => `
              <div class="awrow nested">
                <div><span class="nm">${a.name}</span>${a.oos ? '<span class="oos">OUTSTATION</span>' : ""}
                <div class="sub">${a.country}</div></div>
                <span class="school">${a.school || "—"}</span>
              </div>`).join("")}
          </div>`).join("")}
      </div>
    </details>`).join("") || `<p style="color:var(--dim);padding:20px 0">No awards match that filter.</p>`;
}
$("tierFilter").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  document.querySelectorAll("#tierFilter .chip").forEach(x => x.classList.remove("active"));
  b.classList.add("active"); renderAwards();
});
$("awCmt").addEventListener("change", renderAwards);
$("awSearch").addEventListener("input", renderAwards);

/* Podium — the highest single honour roll-up */
const PODIUM = AWARDS.filter(a => a.tier === "best").sort((a,b) => a.c.localeCompare(b.c));
$("podium").innerHTML = PODIUM.map(a => `
  <div class="pod reveal in">
    <div class="la">${a.tier === "best" ? "🏆" : "🎖️"}</div>
    <b>${a.name}</b>
    <span>${a.country} · ${COMMITTEE_LABEL[a.c]}</span>
    <div class="school">${a.school || "—"}</div>
  </div>`).join("");

/* Leaderboards */
function tally(key) {
  const m = {};
  AWARDS.forEach(a => { const k = a[key]; if (k) m[k] = (m[k] || 0) + 1; });
  return Object.entries(m).sort((x, y) => y[1] - x[1]);
}
function barList(el, rows, color, limit = 8) {
  const top = rows.slice(0, limit), max = top[0]?.[1] || 1;
  el.innerHTML = top.map(([k, v], i) => `
    <div class="barrow">
      <div>${k}<div class="track"><i data-w="${v / max * 100}" style="background:linear-gradient(90deg,${color},${color}66)"></i></div></div>
      <b>${v}</b>
    </div>`).join("");
  requestAnimationFrame(() => el.querySelectorAll("i").forEach(i => i.style.width = i.dataset.w + "%"));
}
$("leaderboard").innerHTML = tally("school").slice(0,9).map(([k,v],i)=>`
  <div class="lbrow"><i>${String(i+1).padStart(2,"0")}</i><span>${k}</span><b>${v}</b></div>
  <div class="lbrow"><i></i><div class="bar"><b data-w="${v/tally("school")[0][1]*100}"></b></div></div>`).join("");
requestAnimationFrame(()=>$("leaderboard").querySelectorAll(".bar b").forEach(b=>b.style.width=b.dataset.w+"%"));

const cmtCounts = {};
AWARDS.forEach(a => { const c = COMMITTEE_LABEL[a.c]; cmtCounts[c] = (cmtCounts[c]||0)+1; });
barList($("awBars"), Object.entries(cmtCounts).sort((a,b)=>b[1]-a[1]), "var(--blue)");
barList($("countryBars"), tally("country").filter(([c]) => !/United States|India|Brazil 1/.test(c)), "var(--violet)", 8);

renderAwards();

/* ---------- HANDBOOK ---------- */
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
    case "swap":  return `<div class="swap"><div class="w"><b>Weak</b>${b.a}</div><div class="s"><b>Strong</b>${b.b}</div></div>`;
    case "table": return `<table class="hb"><thead><tr>${b.head.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    case "score": return `<table class="hb score-tbl"><thead><tr><th>${b.head}</th><th>Day 1</th><th>Day 2</th></tr></thead><tbody>${
        b.rows.map((r,i)=>`<tr><td><span class="box" data-i="${i}"></span>${r}</td><td><span class="box" data-i="${i}"></span></td><td><span class="box" data-i="${i}"></span></td></tr>`).join("")}</tbody></table>`;
    case "doc":   return `<div class="docbox"><div class="dt">${b.title}</div><p>${b.x}</p><div class="by">${b.by}</div></div>`;
    default:      return `<p>${b.x}</p>`;
  }
}

$("hbBody").innerHTML = HANDBOOK.map(s => `
  <section class="hs" id="hb-${s.id}">
    <div class="hs-head"><span class="k">${s.kicker}</span><h3>${s.title}</h3></div>
    ${s.by ? `<div class="note">${s.by}</div>` : ""}
    ${s.intro ? `<p class="lead">${s.intro}</p>` : ""}
    ${s.terms ? `<div class="terms">${s.terms.map(([a,b]) => `<div><b>${a}</b>${b}</div>`).join("")}</div>` : ""}
    ${s.b ? s.b.map(blockHtml).join("") : ""}
    ${s.sections ? s.sections.map(sec => `<h4>${sec.h}</h4>${sec.rules.map(([h,p])=>`<div class="rules"><h4>${h}</h4><p>${p}</p></div>`).join("")}`).join("") : ""}
  </section>`).join("");

/* TOC */
$("toc").innerHTML = HANDBOOK.map(s => `<li><a href="#hb-${s.id}">${s.title}</a></li>`).join("");

/* Handbook scroll progress + active TOC item */
const hbBody = $("hbBody");
function hbScroll() {
  const r = hbBody.getBoundingClientRect(), total = hbBody.offsetHeight - innerHeight;
  const p = Math.max(0, Math.min(1, (-r.top + 120) / Math.max(total, 1)));
  $("hbBar").style.width = (p * 100) + "%";
  $("hbProg").textContent = Math.round(p * 100) + "%";
}
addEventListener("scroll", hbScroll, { passive:true }); hbScroll();

const hbSpy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    document.querySelectorAll("#toc a").forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }
}), { rootMargin: "-20% 0px -70% 0px" });
document.querySelectorAll(".hs").forEach(s => hbSpy.observe(s));

/* Scorecard checkboxes (persisted) */
const KEY = "inmun26_scorecard";
let sc = JSON.parse(localStorage.getItem(KEY) || "[]");
document.querySelectorAll(".box").forEach(b => {
  if (sc.includes(b.dataset.i)) b.classList.add("on");
  b.addEventListener("click", () => {
    b.classList.toggle("on");
    sc = [...document.querySelectorAll(".box.on")].map(x => x.dataset.i);
    localStorage.setItem(KEY, JSON.stringify(sc));
  });
});

/* ---------- RESOURCES ---------- */
const RES = [
  ["Participation Guide","The full delegate guide for INMUN 2026.",CONTACT.guide],
  ["Master Matrix","Delegate · committee · portfolio sheet.",CONTACT.matrix],
  ["Anonymous Complaints","Raise a concern confidentially.",CONTACT.complaints],
  ["MUN Crash Course","Videos to get you started.",CONTACT.crash],
  ["Training Recordings","All five session recordings.",CONTACT.recordings],
  ["Zoom Room","Live sessions · ID 849 216 4833.",CONTACT.zoom],
  ["Positions Papers Drive","Submitted position papers, per committee.",`${BASE}/committees/icj`],
  ["MUN Advisor","vedansh.arora@ryangroup.org","mailto:vedansh.arora@ryangroup.org"],
];
$("resgrid").innerHTML = RES.map(r => `<a class="res reveal" href="${r[2]}" target="_blank"><b>${r[0]}</b><span>${r[1]}</span></a>`).join("");
document.querySelectorAll(".res.reveal").forEach(el => rev.observe(el));

/* ---------- MOBILE NAV ---------- */
$("burger").addEventListener("click", () => {
  const l = document.querySelector(".links");
  const open = l.style.display === "flex";
  l.style.display = open ? "" : "flex";
  if (!open) Object.assign(l.style, { position:"absolute", top:"68px", left:0, right:0,
    flexDirection:"column", background:"rgba(8,11,22,.98)", padding:"14px 22px", gap:"14px", borderBottom:"1px solid var(--line)" });
});