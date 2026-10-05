/* ============================================================
   INMUN 2026 — Delegate Handbook (full long-form, embedded)
   Block types: p · ul · ol · table · swap · note · lead · terms
   ============================================================ */
const HANDBOOK = [
{ id:"welcome", kicker:"Start here", title:"Welcome", t:0, b:[
  {t:"lead", x:"Dear Delegate,"},
  {t:"p", x:"This handbook was made for you — to guide you, answer your questions, and support your preparation from the very first step. Take your time with it, keep it close while you prepare, and treat it as a companion you return to throughout the conference. Every section exists to help you understand the process, take part with confidence, and get the most out of your committee."},
  {t:"p", x:"A Model UN is a rare kind of event: for three days, the decisions are yours to make and the outcome is yours to shape — much like life itself. So don't be afraid to take risks, step outside your comfort zone, and try the things you have always hesitated over. Growth, learning, and discovery tend to happen exactly where the familiar ends."},
  {t:"callout", x:"And here is the single most useful thing we can tell a new delegate: a Best Delegate is a very busy delegate. The delegates who win are almost never the loudest or the cleverest — they are the ones who simply do more. They speak, they question, they send chits, they lobby, they write. Do enough, and do it well, and you make it statistically impossible to lose. This whole handbook is built around that one idea."},
  {t:"p", x:"We hope you finish these pages feeling prepared, inspired, and supported. Above all, enjoy it, learn from the people around you, and make the most of this experience. We cannot wait to see you in committee."},
  {t:"sig", x:"Wishing you the very best,<br><b>The Indian MUN 2026 Team</b>"}
]},

{ id:"what-is-mun", kicker:"Basics", title:"What is MUN?", t:1, b:[
  {t:"p", x:"Model UN is a role-play where you become a country's diplomat and argue your way to a solution."},
  {t:"p", x:"The United Nations is where the world's countries meet to talk through shared problems — war, climate, trade, human rights — and try to agree on what to do about it. A Model UN simulates that. You are handed a country to represent (your “portfolio” or allocation), you research how that country really sees the issue, and then you debate it exactly as that country's diplomat would — even if you personally disagree with them. That last point is the heart of the game: in committee you argue your country's interests, not your own opinions."},
  {t:"p", x:"A committee is simply a room full of delegates, each speaking for a different country, all working on the same agenda (the topic). Over a few days you will make speeches, question one another, build alliances, and write formal documents — moving, step by step, toward a written solution the room can agree on. Running the room is a small panel called the Executive Board, or “EB” — your chairs. They keep order, guide the debate, answer questions, and score how well each delegate does."}
]},

{ id:"what-you-do", kicker:"Basics", title:"So what do you actually do?", t:1, b:[
  {t:"p", x:"Plenty — and that is the point. In a single committee you will:"},
  {t:"ul", x:["make speeches setting out your country's position and your ideas;","ask and answer questions (“Points of Information”) to test other delegates' arguments;","send chits — short written notes — to the EB and to other delegates;","lobby — negotiate with delegates who share your goals to build a team;","write documents — turning your ideas into formal, votable proposals."]},
  {t:"p", x:"Notice that every one of those is a chance to be marked. We will come back to that idea constantly."}
]},

{ id:"why-bother", kicker:"Basics", title:"Why bother?", t:1, b:[
  {t:"p", x:"Because few things teach so much at once: speaking with confidence, thinking on your feet, negotiating with people who disagree with you, and writing clearly under pressure. MUN delegates tend to become the people who are comfortable in any room, can hold an argument, and can bring others around to an idea. It is also good fun, you will meet sharp people from across the country, and you will surprise yourself with what you can do by day three."},
  {t:"callout", x:"MUN is not about “winning the argument.” It is about turning your ideas into a solution the whole room can put its name to. The delegate who solves the problem beats the delegate who only describes it — every single time."}
]},

{ id:"one-secret", kicker:"The core idea", title:"The One Secret: Be a Busy Delegate", t:0, b:[
  {t:"lead", x:"Do so much, and so well, that it becomes statistically impossible to lose."},
  {t:"p", x:"If you remember nothing else from this handbook, remember this. New delegates assume the award goes to the most brilliant speaker. It does not. It goes to the delegate who is present everywhere — who speaks, questions, writes, and negotiates again and again, all weekend, all to a high standard. There is no single moment that wins a MUN. There is a stack of small, good contributions that, added up, leave the Executive Board with no one else to choose."},
  {t:"p", x:"Here is why this works in your favour. You are scored across many different areas, and they add up. A delegate who gives three good speeches but never writes a document, sends a chit, or lobbies has left most of their marks on the table. A delegate who shows up in every area — even imperfectly — collects from every pile. Effort compounds."},
  {t:"p", x:"So the strategy is simple: contribute constantly, and make each contribution count. Don't wait for the perfect moment to speak — speak, then improve. Don't write one document — write several. Don't ask one question — ask whenever you spot a flaw. Quantity and quality together are unbeatable."}
]},

{ id:"first-committee", kicker:"Day one", title:"Your First Committee", t:0, b:[
  {t:"p", x:"The hardest part of any MUN is the cold start — walking into a room of strangers before anyone has spoken. So let's remove the mystery. Here is exactly what that first hour looks like, and exactly what to do with it."},
  {t:"h3", x:"What the room looks like"},
  {t:"p", x:"At the front sits the Executive Board (the dais) — your chairs. Facing them are the delegates, each with a placard showing their country's name. You will be given your seat. The session opens with a roll call: the EB reads out each country, and you answer “Present” or “Present and Voting” when yours is called. For your first time, “Present” is the obvious choice, since it keeps the option to abstain on a substantive vote if you are unsure. After roll call, debate begins."},
  {t:"h3", x:"Your first hour, step by step"},
  {t:"ol", x:["Arrive early and settle in. Find your placard, get your notes and laptop out, and take a breath before the room fills. Walking in calm beats walking in late.","Introduce yourself to the delegates near you. “Hi, I'm the delegate of France — who are you representing?” is all it takes. You have just started building your alliances, and it costs nothing.","Raise your placard early. When the EB opens the General Speakers' List, put your placard up to be added. Speaking once in the first hour settles your nerves for the rest of the conference.","Listen like it's your job, because it is. Quietly note who agrees with you (future allies), who opposes you (delegates to win over or rebut), and any factual or logical gaps you can question later.","Get a contribution on the board fast. Speak, ask a question, or send a chit within the first hour. The first contribution is the hardest; after it, you are simply a delegate doing the job."]},
  {t:"callout", x:"Nervous? That's exactly right. Every good delegate in that room is a little nervous too — nerves are just energy with nowhere to go. Confidence is not what you bring to your first contribution. It is what you get from it."},
  {t:"h3", x:"Decoding the Chair"},
  {t:"p", x:"The EB speaks in a particular committee shorthand. Miss the cue and you miss your moment."},
  {t:"table", head:["When the Chair says…","…it means / do this"], rows:[
    ["“The floor is now open.”","The EB is inviting points or motions. If you want a caucus or want to raise something, this is your cue — raise your placard."],
    ["“Are there any points or motions on the floor?”","Same cue, said directly. Raise your placard to propose a caucus, change speaking time, or move the committee along."],
    ["“We will now entertain points of information.”","You may raise your placard to ask the current speaker a question."],
    ["“The motion is in order / out of order.”","“In order” = it's allowed and will proceed; “out of order” = not permitted right now."],
    ["“We will move into a procedural vote.”","Everyone must vote, no abstaining. Placards up for, then against."],
    ["“The motion carries.”","It passed — the committee now does what the motion said."],
    ["“Please maintain decorum.”","The room is getting noisy or off-track. Settle, stop side conversations."]]}
]},

{ id:"speaking", kicker:"Speaking", title:"Speaking in Committee", t:0, b:[
  {t:"lead", x:"Speeches and questions are where most of your marks live — and where most beginners freeze."},
  {t:"h3", x:"Speak like a diplomat"},
  {t:"ul", x:["Third person, always. Never say “I” or “me.” Say “the delegate of Brazil” or “Brazil believes.”","Address the dais. Open with “Honourable Chair” or “Thank you, Chair,” and speak to the whole committee, not at a single rival.","Attack ideas, never people. “Brazil respectfully disagrees with that approach, because…” — never “the delegate is wrong.”","Stay in character. Defend your country's real position, even one you personally dislike.","End with an action. Don't just describe the problem — say what the committee should do about it."]},
  {t:"h3", x:"What to say — a phrasebook"},
  {t:"table", head:["To do this…","…stand and say something like"], rows:[
    ["Start a speech","Honourable Chair, the delegate of [Country]…"],
    ["State your position","[Country] firmly believes that…"],
    ["Agree and build","[Country] echoes the delegate of [X], and would add that…"],
    ["Disagree politely","[Country] respectfully differs with the previous delegate; in our view…"],
    ["Bring a solution","[Country] proposes that this committee establish / create / call upon…"],
    ["Push the debate","The real question this committee must answer is…"],
    ["Bring others in","[Country] invites like-minded delegations to join us in…"],
    ["Make a point in caucus","Two quick points from [Country]: first… second…"],
    ["Yield your time","[Country] yields its remaining time to the Chair."],
    ["Ask a question (POI)","Would the delegate not agree that…?"],
    ["Concede gracefully","[Country] takes the delegate's point, and would refine our proposal to…"],
    ["Close strongly","[Country] urges this committee to act, and yields."]]},
  {t:"h3", x:"Saying it out loud — motions & points"},
  {t:"p", x:"The moderated caucus: “The delegate of [Country] moves for a moderated caucus, total time ten minutes, speaking time sixty seconds, on the topic of financing the proposed fund.” The pattern never changes: total time, speaking time, topic."},
  {t:"p", x:"The unmoderated caucus: “The delegate of [Country] moves for an unmoderated caucus for a duration of ten minutes.” Just a duration. Use the time to find allies and draft your documents."},
  {t:"p", x:"To question a speaker, raise your placard; when recognised, say “Point of Information,” then ask. To flag a factual error or a rules slip, say “Point of Order” and explain briefly."},
  {t:"h3", x:"How to answer a question you don't know"},
  {t:"ol", x:["Bridge to what you do know — “While [Country] does not have that exact figure to hand, what we can say is…”","Reframe the question — “The more important question for this committee is…”","Promise to follow up, then actually do it — “[Country] will address that point in a substantive chit to the dais.”","Turn it back, sparingly — “[Country] would welcome the delegate's own view on that.”"]],
  {t:"h3", x:"A tough portfolio? You can still shine"},
  {t:"ul", x:["Become the expert — pick one corner of the agenda and know it better than anyone in the room.","Be the bridge — small, neutral states make the best mediators between rival blocs.","Sell the swing — if your vote is up for grabs, trade it for your priorities being written into the draft.","Observers: write and persuade — you may not vote, but you can speak, lobby and co-author."]}
]},

{ id:"chits", kicker:"Writing", title:"Chits", t:0, b:[
  {t:"lead", x:"A chit is a short written note — the quiet, parallel conversation running underneath every committee, and a steady source of marks."},
  {t:"p", x:"Debate time is limited, and you will not be recognised to speak as often as you would like. Chits are the answer. They let you keep contributing — making points, asking questions, and negotiating — in writing, even when you do not hold the floor. At INMUN 2026, chits are submitted online; the exact tool and process will be explained by your Executive Board. Whatever the medium, the three kinds and the etiquette below stay the same."},
  {t:"h3", x:"The three kinds of chit"},
  {t:"ol", x:["Substantive chit (to the EB) — an argument, analysis or solution you want credited but could not fit into a speech. This is the one that earns you marks: explain why it matters, how it connects to the agenda, and what the committee should do about it.","Point of Information chit (to another delegate, via the EB) — a written question that lets you challenge an argument even when you are not on the floor.","Transitive chit (delegate to delegate) — a private note for lobbying or coordination. Not marked, but stay professional and on-topic even here."]},
  {t:"h3", x:"What a strong chit looks like"},
  {t:"swap", a:"Norway has the highest EV adoption in the world. We think everyone should follow our model.", b:"Norway's EV transition only worked because incentives were paired with charging infrastructure — subsidies alone failed in markets without it. This committee's fund should therefore tie any subsidy to a matching infrastructure commitment, or it will repeat that failure."},
  {t:"swap", a:"Does the delegate of Brazil even have a real plan?", b:"Brazil demands both absolute national sovereignty and binding international inspections. How does the delegate reconcile compelling inspections on a sovereign state with the non-interference principle Brazil just invoked?"},
  {t:"callout", x:"The golden rule of chits: a substantive chit is a silent speech. Make it argue, not just inform — every chit should leave the dais with a flaw exposed, a link drawn, or a solution proposed. Then send them often: many good chits beat one perfect one you never sent."}
]},

{ id:"documentation", kicker:"Writing", title:"Documentation", t:0, b:[
  {t:"lead", x:"Documentation is the written half of MUN — and the half where busy delegates quietly pull ahead."},
  {t:"p", x:"There are four kinds of document at INMUN: Position Papers, Working Papers, Resolutions (and other end documents), and Press Releases. Only the position paper is compulsory; the rest are optional but heavily rewarded — so write them. Send a few detailed documents rather than many shallow ones; quality is marked, not word-count. Everything is typed and sent to your committee's Executive Board. Nothing is accepted in physical form."},
  {t:"h3", x:"A · Position Paper"},
  {t:"p", x:"Your one compulsory document, written before the conference. It sets out your country's stance on the agenda and the ideas you hope to push — think of it as walking in with a plan already on paper."},
  {t:"ul", x:["What your country has already done about the issue — past actions, treaties signed, policies passed.","The core problems your country believes the committee must solve.","Your proposed solutions — and, honestly, the challenges each one faces."]},
  {t:"table", head:["Position Paper — before you submit, tick every box"], rows:[
    ["Heading has committee, country and agenda — and no name or school"],
    ["Says clearly what my country has already done about the issue"],
    ["Names the core problems the committee must solve"],
    ["Proposes concrete solutions — and honestly admits their challenges"],
    ["Reads as my country's voice, not my personal opinion"],
    ["About two pages, 12pt, single-spaced, justified; key sources cited"],
    ["Proofread for grammar and clarity"],
    ["Submitted before the deadline — 25th August 2026, 23:59"]]},
  {t:"h3", x:"B · Working Paper"},
  {t:"p", x:"A collection of the solutions you and others develop during committee — the rough draft of ideas that comes before any formal end document. Informal: no strict format, not voted on."},
  {t:"swap", a:"We should raise awareness about the issue and encourage all countries to cooperate for a better future.", b:"Establish a regional Rapid-Response Fund, seeded by a 0.1% levy on member-state trade, that disburses within thirty days of a verified emergency and is audited annually by an independent panel."},
  {t:"h3", x:"C · Press Release"},
  {t:"p", x:"A short, formal statement in which your country announces a position, a policy shift, or a response to another delegate's actions. Use it for a major announcement, a joint statement when several countries share a stance, or to formally register protest or condemnation."},
  {t:"h3", x:"D · Resolution and end documents"},
  {t:"p", x:"The committee's final product. Sponsors are the principal authors — they cannot withdraw once introduced, and the maximum is 10% of committee strength, capped at five. Signatories merely want the document debated; a document usually needs signatories equal to at least 20% of committee strength."},
  {t:"table", head:["Part","What it is"], rows:[
    ["Preambulatory clauses","Set the scene — describe the problem, recall past efforts. Begin with an italicised participle: <i>Recognizing, Reaffirming, Noting with concern, Recalling, Deeply disturbed, Bearing in mind…</i>"],
    ["Operative clauses","The action — numbered, amendable, voted on. Begin with an active verb: <i>Calls upon, Urges, Recommends, Requests, Encourages, Establishes, Decides, Invites, Affirms, Welcomes…</i>"]]},
  {t:"swap", a:"1. Urges all countries to do more about the problem and work together for a better future;", b:"1. Calls upon member states to establish a shared early-warning network, coordinated by the existing UN office, funded through voluntary contributions and reporting annually to this committee;"},
  {t:"h3", x:"Not every committee writes a “resolution”"},
  {t:"table", head:["Committee","Final document"], rows:[
    ["International Court of Justice","Judgement"],["UN General Assembly (DISEC)","Resolution"],
    ["Conference on Disarmament","Report"],["AI Impact Summit","Declaration"],
    ["Intergovernmental Negotiating Committee","Draft Treaty"],["World Economic Forum","Agreement"],
    ["Group of 77","Resolution"],["INTERPOL","Resolution"],["BRICS","Declaration"]]}
]},

{ id:"samples", kicker:"Writing", title:"Sample Documents", t:1, b:[
  {t:"p", x:"Real examples, lightly trimmed, so you can see the shape of each document. Don't copy them — study the structure, then write in your own country's voice."},
  {t:"h3", x:"Sample Position Paper"},
  {t:"doc", title:"Committee: United Nations Environment Assembly · Country: French Republic · Agenda: Deliberation on combatting Climate Change", x:"The French Republic recognises that Climate Change is one of this century's biggest environmental challenges, which should be a priority for all member nations. We acknowledge the efforts made by the world community through the Sustainable Development Goals 2030. France is currently at its all-time low of greenhouse emissions… France has ratified all major international instruments on climate change, including the UNFCCC, its Kyoto Protocol, and the Paris Climate Accords. We recognise the role of private companies and the need for their regulation, and propose that nations regulate Corporate Social Responsibility funds and form Corporate Reporting Mechanisms inspired by the Global Reporting Initiative.", by:"Authored by Manasvi Singh (Batch of 2025)"},
  {t:"h3", x:"Sample Working Paper"},
  {t:"doc", title:"WORKING PAPER 1.0 · Committee: Organization of Islamic Cooperation · Author: The United Arab Emirates", x:"1. Recognizes that a working definition of Islamophobia can offer practical guidance for identifying it in its various forms, and therefore proposes such a definition for the committee's adoption;  2. Encourages the formation of collaborative networks to foster mutual understanding and constructive action toward shared goals — education, health, conflict prevention, and media education — to prevent acts of religious intolerance;  3. Recommends the cultural sensitisation of younger generations, law-enforcement officials, and media outlets through community outreach and awareness campaigns;  4. Recommends appointing a Special Rapporteur for Freedom from Religious Hatred to monitor conditions of religious intolerance…", by:"Authored by Madhav Sadana (Batch of 2025)"},
  {t:"h3", x:"Sample Draft Resolution"},
  {t:"doc", title:"Draft Resolution 3.0 · Agenda: Responsibility to Protect (2005 World Summit) · Sponsors: Chile, the United Kingdom, Thailand · Signatories: Nepal, Canada, Nigeria, Indonesia…", x:"The United Nations General Assembly,  <i>Recognizing</i> the Responsibility to Protect as adopted in the 2005 World Summit Outcome Document… <i>Noting with concern</i> the increasing frequency of atrocity crimes that threaten international peace and human dignity;  1. Encourages the General Assembly to endorse a Compliance Network Framework linking R2P adherence with access to international privileges…  9. Urges States to strengthen domestic legal frameworks by incorporating atrocity crimes into national law…", by:"Adapted from a real draft"}
]},

{ id:"marksheets", kicker:"Scoring", title:"Marksheets — How You Are Scored", t:0, b:[
  {t:"lead", x:"Seven areas are scored. Show up in every one of them."},
  {t:"note", x:"1. You are never punished for taking part — the EB will not average your submissions or mark you down for participating. The only exceptions are foreign policy and diplomatic courtesy.  2. Full marksheets are shared after the conference, broken down by area."},
  {t:"h3", x:"1 · Speeches"},
  {t:"p", x:"Judged on Research (depth of understanding, not citation), Analysis (how you structure the speech and connect the dots — the most important part), and Impact (delivery, and how your ideas carry into chits, lobbying and documents)."},
  {t:"h3", x:"2 · Lobbying"},
  {t:"p", x:"Building coalitions, persuading toward common ground, staying active outside formal debate, and showing flexibility without abandoning your country's core position. Good lobbying is listening, not shouting."},
  {t:"h3", x:"3 · Diplomatic Courtesy"},
  {t:"p", x:"Professionalism, respect for others and positive contribution — in words and demeanour. This area carries negative marking: discourtesy actively costs you. The easiest area to keep perfect, and the easiest to throw away."},
  {t:"h3", x:"4 · Points"},
  {t:"p", x:"A good POI shows three things at once: that you are attentive, that you are analytical, and that you are well read. Aim at a logical or inherent flaw in the argument. No marks for flagging a procedural error the Board may have made — but a genuine factual inaccuracy ruled in your favour earns marks in proportion to its significance."},
  {t:"h3", x:"5 · Substantive Chits"},
  {t:"p", x:"Relevance, analysis and insight, clarity and structure, originality. Make them actionable — suggest a solution, a clause, a recommendation."},
  {t:"h3", x:"6 · POI Chits"},
  {t:"p", x:"Relevance, clarity, concision — and thoughtful, complete replies when you are questioned."},
  {t:"h3", x:"7 · Documentation"},
  {t:"p", x:"Substance, relevance, originality and collaboration. Start early, keep documents neat, reflect your country's stance, and proofread."},
  {t:"callout", x:"Foreign policy — the one place staying in character matters most. Speaking or writing against your own country's policy carries negative marking. The role-play is the point."},
  {t:"h3", x:"What the Executive Board is actually looking for"},
  {t:"ul", x:["Solves, never just describes — actions, clauses and solutions, in every area.","Is everywhere — speaks, questions, chits, lobbies and writes.","Builds on the room — references others instead of just being loud.","Stays in character — argues their country's real interests, consistently.","Lifts others — improves other delegates' ideas."]}
]},

{ id:"how-to-win", kicker:"Strategy", title:"How to Win MUNs", t:0, b:[
  {t:"lead", x:"Marksheets tell you what is judged. This tells you how to actually do it — in five moves."},
  {t:"h3", x:"1 · Prepare"},
  {t:"ul", x:["Frame the topic — key players, what has been tried, which angles matter.","Build your country's policy — pick two or three “signature points” and learn them inside out.","Plan your moves — natural allies, who blocks you, which solutions you push and how.","Rehearse — say your speeches out loud. If you have “seen” yourself do it, you will be calmer in the moment."]},
  {t:"h3", x:"2 · Inspire"},
  {t:"swap", a:"India is a developing country with a large population… We believe everyone should work together.", b:"India will not sign a fund that exists only on paper. We propose three things this committee can do today: a fixed contribution formula so no nation can free-ride, an independent body to audit where every rupee goes, and a first disbursement within ninety days. India will sponsor any draft that carries all three."},
  {t:"p", x:"Then deliver it. Slow down. Project from your chest, not by yelling. Stand tall, make eye contact, and use your hands with purpose."},
  {t:"h3", x:"3 · Connect"},
  {t:"p", x:"Before the first caucus, use your soft power. See delegates as teammates: who has trust to share, who has strong ideas, who has the writing power? Listen more than you talk. Leadership is people talking to you because they trust you."},
  {t:"h3", x:"4 · Negotiate"},
  {t:"ul", x:["Count your votes — a sponsor is almost always a guaranteed vote.","Handle objections — often it is the wording, not the idea. Reframe it.","Drive mergers — if documents merge, lead the process and keep your core ideas intact.","Negotiate on interests, not ego."]},
  {t:"h3", x:"5 · Brand"},
  {t:"p", x:"A Best Delegate wins and leaves a legacy. Medals are short-term; your brand — how people remember you — lasts your whole MUN career. Reflect after every conference, network beyond the sessions."},
  {t:"callout", x:"The trap: don't try to win by dominating. Influence is quiet — be the one whose ideas everyone ends up building on, and the one who visibly did more than anyone else."}
]},

{ id:"scorecard", kicker:"Tool", title:"The Busy Delegate Scorecard", t:1, b:[
  {t:"p", x:"Print this page and tally it as you go. If a column looks empty by lunch, you know exactly what to do next."},
  {t:"score", head:"Each day, did you…", rows:["Gave a speech on the General Speakers' List","Spoke in a moderated caucus","Asked a verbal Point of Information","Sent a substantive chit (with real analysis)","Sent or answered a POI chit","Lobbied — built or joined a coalition","Contributed to a working paper","Sponsored or signed an end document / proposed an amendment","Stayed in character and courteous throughout"]}
]},

{ id:"research", kicker:"Tool", title:"Researching Your Country", t:1, b:[
  {t:"lead", x:"About thirty focused minutes gets you genuinely prepared."},
  {t:"h3", x:"Where to go"},
  {t:"ul", x:["Your country's Ministry of Foreign Affairs website — official positions, straight from the source.","un.org and the UN Digital Library (digitallibrary.un.org) — how your country actually voted.","Reuters, AP, BBC or Al Jazeera — current real-world context.","The CIA World Factbook — quick, reliable basics on any country.","The parent body's website — WTO, INTERPOL, UNEP — how that organisation works."]},
  {t:"h3", x:"What to find — four questions"},
  {t:"ol", x:["What does my country want? Its core interest on this agenda.","What does it fear? The outcome it most wants to avoid.","Who are its allies and rivals? Where your bloc will come from.","What has it already done? A treaty, law, or action you can cite."]},
  {t:"h3", x:"How to read a background guide — fast"},
  {t:"ol", x:["The agenda statement — what the committee is actually asked to solve.","The players — major countries and groups, and where yours sits.","The fault lines — the two or three core disagreements where debate will live.","Your country's angle — wherever it is mentioned, and how it lines up.","The questions — most guides end with discussion questions. Answer them in advance."]},
  {t:"note", x:"Let the prep worksheet do the work: each committee has a Delegate Prep Worksheet that walks you through all of this. Fill it in once and your speeches, chits and position paper are half-written."}
]},

{ id:"glossary", kicker:"Reference", title:"Glossary", t:1, terms:[
  ["Abstain","To formally not vote either way on a substantive matter (only “Present” delegates may)."],
  ["Agenda","The topic the committee is debating."],
  ["Amendment","A proposed change to an operative clause — addition, deletion or reword."],
  ["Bloc","A group of delegates with shared interests who work together."],
  ["Caucus","A pause in formal debate — moderated (focused) or unmoderated (free movement and lobbying)."],
  ["Dais","The Executive Board's table; the people running the committee."],
  ["Delegate","You — the representative of a country or portfolio."],
  ["Draft Resolution","A formal written proposal, debated and voted on; the committee's main product."],
  ["Executive Board (EB)","Your chairs — they run the room and score you."],
  ["Foreign Policy","Your country's real positions; staying true to them is marked, and breaking from them is penalised."],
  ["GSL","General Speakers' List — the default queue of speakers."],
  ["Lobbying","Negotiating with other delegates to build support, usually during unmoderated caucus."],
  ["Motion","A formal proposal to do something procedural (e.g., open a caucus)."],
  ["Observer","A delegate who can speak and lobby but cannot vote on substantive matters."],
  ["Operative clause","A numbered, action clause in a resolution — the “what we will do.”"],
  ["Placard","Your country's name card; raise it to be recognised."],
  ["Point of Information (POI)","A question to a delegate who has the floor."],
  ["Point of Order (POO)","Flags a procedural error or a factual inaccuracy."],
  ["Portfolio","The country or character you represent."],
  ["Preambulatory clause","An opening clause in a resolution that sets the scene — the “why.”"],
  ["Quorum","The minimum attendance needed for debate (one-third of members)."],
  ["Resolution","An adopted draft resolution — the committee's final decision."],
  ["Signatory","A delegate who wants a document debated (not necessarily a supporter)."],
  ["Sponsor","A principal author of a document, who agrees with its content."],
  ["Substantive vs Procedural","Substantive = the content (resolutions, amendments); procedural = how the committee runs."],
  ["Yield","To give up your remaining speaking time — to the Chair, another delegate, or questions."]
]},

{ id:"see-you", kicker:"Close", title:"See you at INMUN", t:1, b:[
  {t:"lead", x:"You are more ready than you feel."},
  {t:"p", x:"Walk in, take part early, be kind, do more than anyone else — and build something. All the best."}
]},

/* ---------------- Annexure ---------------- */
{ id:"annexure", kicker:"Annexure", title:"Ryan MUN Procedure", t:1,
  by:"Authored by Vedansh Arora, MUN Advisor",
  intro:"Technical, and not needed before your first committee — your EB will explain procedure in due time. Keep it at the back as the document that settles disputes about the rules.",
  sections:[
  { h:"Section 1 · General Rules", rules:[
    ["Rule 1 · Official Language","The official language of debate in all committees is English. Delegates must draft all speeches, working papers, draft resolutions and amendments in English only."],
    ["Rule 2 · Quorum","A quorum is at least one-third of the total member states in committee; if lost, the Chair suspends debate. A simple majority (more than half of present members) is required for any substantive vote."],
    ["Rule 3 · Decorum","Formal decorum must be maintained at all times, including professional attire. No offensive language, personal attacks or disruption. Devices are for committee purposes only; chit-passing only through the Secretariat or as permitted. Repeated violations may result in expulsion."],
    ["Rule 4 · Authority of the Chair","The Chair is the highest authority in committee; decisions are final and binding. A delegate who feels the Chair erred may raise an Appeal to the Decision, addressed by the Head of MUN, Secretary-General or MUN Advisor."]]},
  { h:"Section 2 · Agenda & Debate Structure", rules:[
    ["Rule 5 · Roll Call","Conducted at the start of each session. Delegates answer “Present and Voting” or “Present”. Procedural voting: all delegates vote, no abstentions. Substantive voting: only Member States (Observers do not vote)."],
    ["Rule 6 · Setting the Agenda","The first session determines which agenda item is taken up first; with a single agenda it is set by default. Requires a simple majority; abstentions permitted. Closed agenda items may not be reopened."],
    ["Rule 7 · General Speakers' List","The default form of debate. Speaking time is set by the committee (typically 60–180 seconds; default 90). Time may be yielded to the Chair, to another delegate (not added to their upcoming speech), or to questions."],
    ["Rule 8 · Moderated Caucus","Focused debate on a sub-topic. The motion must specify total duration, speaking time per delegate and the sub-topic. Simple majority; may be extended only once, by no more than its original duration."],
    ["Rule 9 · Unmoderated Caucus","Suspends formal debate for free discussion, lobbying and drafting. Specify the duration; simple majority; no abstentions; no limit on total time."],
    ["Rule 10 · Open House Discussion","Semi-formal format with no fixed speaking time. Specify total duration and topic; simple majority; no abstentions; time may not be yielded."],
    ["Rule 11 · Closure of Debate","Any delegate may motion to close debate when the agenda item is sufficiently discussed. Simple majority; no abstentions. The committee then proceeds to voting on draft resolutions."]]},
  { h:"Section 3 · Points & Motions", rules:[
    ["Rule 12 · General","Points and motions may only be raised when the floor is open unless otherwise specified. Raise your placard and wait to be recognised."],
    ["Rule 13 · Point of Personal Privilege","For a personal condition preventing effective participation (hearing, temperature, discomfort). May interrupt a speaker only if related to audibility. May also be raised right after a speech to request repetition."],
    ["Rule 14 · Point of Order","Corrects a procedural error, or an objective factual inaccuracy in another delegate's speech. Cannot interrupt a speaker, cannot be used to express disagreement with an opinion, or to challenge the Chair's substantive judgement. The Chair may request supporting documentation."],
    ["Rule 15 · Point of Inquiry","To enquire of the Chair about the rules of procedure. Not for substantive issues."],
    ["Rule 16 · Point of Information","A question to a delegate who has the floor. Must be concise, without statement or comment. Follow-up PoIs are not permitted unless allowed by the Chair."],
    ["Rule 17 · Right of Reply","May be requested if personal dignity as a representative was insulted. Must be submitted in writing identifying the offending statement; the Chair decides and sets the time limit."],
    ["Rule 18 · Motions","Phrased formally: “The delegate of [Country] moves to…”. Order of disruption: Suspend the Meeting → Unmoderated Caucus → Moderated Caucus → Change Speaking Time → Close Debate → Re-Order Draft Resolutions → Adjourn the Meeting."]]},
  { h:"Section 4 · End Documentation", rules:[
    ["Rule 19 · Resolutions","A draft resolution contains the committee's recommendations. Sponsors are principal authors who cannot withdraw once introduced; maximum 10% of committee strength, capped at five. Signatories: minimum 20% of committee strength. Drafts are submitted in writing to the Chair for format and relevance review."],
    ["Rule 20 · Introduction","Once approved and at the appropriate stage of debate. Requires a simple majority. The Chair announces sponsors and signatories and assigns a number (e.g., “Draft Resolution 1.1”)."],
    ["Rule 21 · Discussion on Resolutions","Via a moderated caucus dedicated to the DR, clause-by-clause debate, or a Provisional Speakers List limited to the DR."],
    ["Rule 22 · Amendments","Friendly amendments (all sponsors agree) are incorporated without a vote; unfriendly amendments go to substantive vote. Submitted in writing; types are Addition, Deletion and Modification."],
    ["Rule 23 · Voting","All votes on resolutions, amendments and division of the question are substantive: only Member States vote, one vote each, simple majority, abstentions not counted, normally by show of placards. A roll-call vote may be requested at the Chair's discretion."]]},
  { h:"Section 5 · Miscellaneous Rules", rules:[
    ["Rule 24 · Suspension & Adjournment","A motion to suspend covers breaks and meals (simple majority). A motion to adjourn concludes the day's work or ends the session."],
    ["Rule 25 · Attendance","Delegates are expected throughout committee; absences should be informed to the Chair and Secretariat in advance. Late arrivals may request status updated to “Present” or “Present and Voting.”"],
    ["Rule 26 · Conduct & Decorum","Highest standards of courtesy toward delegates, the dais and staff. Offensive, discriminatory or derogatory language is forbidden; personal attack results in warning and possible expulsion."],
    ["Rule 27 · Precedence of Rules","These rules apply to all committee sessions unless modified by the Secretariat. In a conflict with the UN Charter or the committee's mandate, the latter prevails."],
    ["Rule 28 · Amendments to Rules","Any change, suspension or exception requires a simple majority with final discretion of the Chair; the Secretariat may overrule changes conflicting with the conference framework."],
    ["Rule 29 · Devices & Internet","Laptops, tablets and devices are permitted for research, drafting and communication provided debate is not disturbed. Internet access is permitted for all participants. Misuse may result in withdrawal of the privilege."],
    ["Rule 30 · Spirit of the Rules","The purpose of these rules is orderly, fair and constructive debate, enabling delegates to work together toward diplomatic solutions. Procedure is a tool for cooperation, not a barrier to it."]]}
]},

{ id:"contact", kicker:"Contact", title:"Get in Touch", t:1, b:[
  {t:"p", x:"This handbook is shared by every committee. For any questions before the conference:"},
  {t:"kv", x:"MUN Advisor: Vedansh Arora — vedansh.arora@ryangroup.org"},
  {t:"kv", x:"Secretary-General: Vishrut Mishra  ·  MUN Head: Hemanshi Dedhia"}
]}
];