/* ============================================================
   INMUN 2026 — Master dataset (all content embedded locally)
   ============================================================ */
const BASE = "https://portal-inmun26.netlify.app";

const CONTACT = {
  guide: "https://ryaninmun2026.netlify.app/",
  complaints: "https://forms.gle/rKPKg1oxisKdSiSA6",
  matrix: "https://docs.google.com/spreadsheets/d/13-sy3HF8qCwx8BICGP51KoahCrrOFM_s/edit",
  zoom: "https://zoom.us/j/8492164833?pwd=bXcrZkdUbHA5Yml1c3NuZDVyTW9jdz09",
  recordings: "https://drive.google.com/drive/folders/1jAW4jr6YhM70Jmcl6f1zK_iGddGNwt9O",
  crash: "https://drive.google.com/drive/folders/1ykXvqHnOz-4OLPGDjKfcD9-W6kXGh99A",
  advisor: "vedansh.arora@ryangroup.org",
  sg: "Vishrut Mishra",
  head: "Hemanshi Dedhia",
  zoomId: "849 216 4833",
  passcode: "143143"
};

/* ---------------- Committees ---------------- */
const COMMITTEES = [
  { n:"01", key:"icj", name:"International Court of Justice", short:"ICJ",
    agenda:"Relocation of the United States Embassy to Jerusalem", doc:"Judgement",
    logo:`${BASE}/assets/logos/icj.png`, cartoon:`${BASE}/assets/cartoons/icj.webp`,
    eb:"icj.inmun@ryangroup.org", track:"Judicial",
    blurb:"The Court hears a single case between two States. Delegates argue admissibility, jurisdiction and the merits before delivering a Judgement." },
  { n:"02", key:"disec", name:"UN General Assembly (DISEC)", short:"DISEC",
    agenda:"Breaking Point: Prospects for Peace in the Middle East", doc:"Resolution",
    logo:`${BASE}/assets/logos/disec.png`, cartoon:`${BASE}/assets/cartoons/disec.webp`,
    eb:"disec.inmun@ryangroup.org", track:"Plenary",
    blurb:"The plenary body of the UN. Every Member State in the room, one agenda, and a resolution only a consensus can carry." },
  { n:"03", key:"cd", name:"Conference on Disarmament", short:"CD",
    agenda:"War for Hire: Regulating the Privatisation of Armed Conflicts", doc:"Report",
    logo:`${BASE}/assets/logos/cd.png`, cartoon:`${BASE}/assets/cartoons/cd.webp`,
    eb:"cd.inmun@ryangroup.org", track:"Specialised",
    blurb:"Negotiating the rules of the age of private military actors — from proxy warfare to corporate contractors." },
  { n:"04", key:"ai-impact-summit", name:"AI Impact Summit", short:"AIS",
    agenda:"Competition for Computation: The Geopolitics of the AI Infrastructure Boom", doc:"Declaration",
    logo:`${BASE}/assets/logos/ai-impact-summit.jpg`, cartoon:`${BASE}/assets/cartoons/ai-impact-summit.webp`,
    eb:"ai.inmun@ryangroup.org", track:"Specialised",
    blurb:"Chips, data centres and compute sovereignty — who owns the infrastructure the intelligence age runs on." },
  { n:"05", key:"inc", name:"Intergovernmental Negotiating Committee", short:"INC",
    agenda:"Wrap It Up: Delivering a Global Plastics Treaty", doc:"Draft Treaty",
    logo:`${BASE}/assets/logos/inc.png`, cartoon:`${BASE}/assets/cartoons/inc.webp`,
    eb:"inc.inmun@ryangroup.org", track:"Negotiated",
    blurb:"A hard-nosed treaty negotiation. Text, brackets and compromises — the committee that writes binding international law." },
  { n:"06", key:"wef", name:"World Economic Forum", short:"WEF",
    agenda:"Work in Progress: Jobs, Skills, and the Social Safety Net", doc:"Agreement",
    logo:`${BASE}/assets/logos/wef.png`, cartoon:`${BASE}/assets/cartoons/wef.webp`,
    eb:"wef.inmun@ryangroup.org", track:"Specialised",
    blurb:"Multi-stakeholder bargaining between governments, employers and labour — the social contract under stress." },
  { n:"07", key:"g77", name:"Group of 77", short:"G77",
    agenda:"Tariff-flying Times: Managing the Weaponization of Trade", doc:"Resolution",
    logo:`${BASE}/assets/logos/g77.png`, cartoon:`${BASE}/assets/cartoons/g77.webp`,
    eb:"g77.inmun@ryangroup.org", track:"Bloc",
    blurb:"The Global South's negotiating bloc. Development equity, export leverage and the rules of trade, from the other side of the table." },
  { n:"08", key:"interpol", name:"INTERPOL", short:"INTERPOL",
    agenda:"Illicit Affairs: Confronting Criminal Networks Across Borders", doc:"Resolution",
    logo:`${BASE}/assets/logos/interpol.svg`, cartoon:`${BASE}/assets/cartoons/interpol.webp`,
    eb:"interpol.inmun@ryangroup.org", track:"Specialised",
    blurb:"Law-enforcement cooperation, extradition red lines and the criminal networks that ignore borders." },
  { n:"09", key:"brics", name:"BRICS", short:"BRICS",
    agenda:"BRICS by BRICS: Building the Other World", doc:"Declaration",
    logo:`${BASE}/assets/logos/brics.png`, cartoon:`${BASE}/assets/cartoons/brics.webp`,
    eb:"brics.inmun@ryangroup.org", track:"Bloc",
    blurb:"An emerging-power bloc redrawing the institutions of the 21st century — payments, expansion, and who gets a seat." },
  { n:"10", key:"wp-journalists", name:"World Press — Journalists", short:"WPJ",
    agenda:"International Press · Journalism", doc:"Press coverage",
    logo:`${BASE}/assets/logos/world-press.svg`, cartoon:`${BASE}/assets/cartoons/wp-journalists.webp`,
    eb:"press.inmun@ryangroup.org", track:"World Press",
    blurb:"Report the committee as it happens — coverage of speeches, caucuses and the documents that leave the dais." },
  { n:"10", key:"wp-photographers", name:"World Press — Photographers", short:"WPP",
    agenda:"International Press · Photography", doc:"Photo essays",
    logo:`${BASE}/assets/logos/world-press.svg`, cartoon:`${BASE}/assets/cartoons/wp-photographers.webp`,
    eb:"press.inmun@ryangroup.org", track:"World Press",
    blurb:"The visual record of INMUN 2026 — the placard, the caucus, the moment a resolution passes." },
  { n:"10", key:"wp-caricaturists", name:"World Press — Caricaturists", short:"WPC",
    agenda:"International Press · Caricature", doc:"Editorial cartoons",
    logo:`${BASE}/assets/logos/world-press.svg`, cartoon:`${BASE}/assets/cartoons/wp-caricaturists.webp`,
    eb:"press.inmun@ryangroup.org", track:"World Press",
    blurb:"Draw the debate. Editorial cartoons judged on how sharply they capture the committee's arguments." },
];

const MARKKEY = { icj:"icj", disec:"disec", cd:"cd", "ai-impact-summit":"ai-impact-summit", inc:"inc", wef:"wef", g77:"g77", interpol:"interpol", brics:"brics", "wp-journalists":"wp-journalists", "wp-photographers":"wp-photographers", "wp-caricaturists":"wp-caricaturists" };

/* Every document linked from the portal, per committee */
const DOCS = COMMITTEES.flatMap(c => {
  const base = [];
  if (!c.key.startsWith("wp-")) {
    base.push(
      { c:c.short, t:"Background Guide", k:"guide", u:`${BASE}/committees/${c.key}-guide`, f:"page" },
      { c:c.short, t:"Delegate Prep Worksheet", k:"worksheet", u:`${BASE}/worksheets/${c.key}-worksheet.pdf`, f:"pdf" },
      { c:c.short, t:"Interactive Quiz", k:"quiz", u:`${BASE}/quiz?c=${c.key}`, f:"page" }
    );
  }
  base.push(
    { c:c.short, t:"Recognition Sheet (marks)", k:"marksheet", u:`${BASE}/assets/marksheets/${MARKKEY[c.key]}.pdf`, f:"pdf" },
    { c:c.short, t:"Live Recognition Tally", k:"tally", u:`${BASE}/submissions?c=${c.key}`, f:"page" },
    { c:c.short, t:"Chit Log", k:"chits", u:`${BASE}/chits?c=${c.key}`, f:"page" }
  );
  if (c.key === "icj") base.push(
    { c:c.short, t:"Notification by the Registrar", k:"notification", u:`${BASE}/docs/icj-notification-by-registrar.pdf`, f:"pdf" },
    { c:c.short, t:"Fact Sheet — Palestine v. United States", k:"factsheet", u:`${BASE}/docs/icj-factsheet.pdf`, f:"pdf" }
  );
  return base;
});

DOCS.push(
  { c:"All", t:"Delegate Handbook (PDF)", k:"handbook", u:`${BASE}/guides-pdf/handbook.pdf`, f:"pdf" },
  { c:"All", t:"Best Country Profile Marksheet", k:"marksheet", u:`${BASE}/assets/marksheets/country-profile.pdf`, f:"pdf" }
);

/* ---------------- Training ---------------- */
const TRAINING = [
  { n:"1", title:"Mastering Rules of Procedure", date:"Mon 17 Aug", day:17,
    time:"6:00 – 7:30 PM IST", hosts:"Vansh Nagpal · Chair, AI Impact Summit  ·  Sara Sharma · Chair, Conference on Disarmament",
    focus:"Quorum, GSL, caucuses, motions and points — the language of the dais." },
  { n:"2", title:"The Art of Argumentation & Foreign Policy", date:"Tue 18 Aug", day:18,
    time:"6:00 – 7:30 PM IST", hosts:"Abhiraj Mehsempuri · Chair, DISEC  ·  Pradyun Pandey · Chair, INC",
    focus:"How to build a case, challenge one, and stay in character while doing it." },
  { n:"3", title:"The Documentation Workshop", date:"Wed 19 Aug", day:19,
    time:"6:00 – 7:30 PM IST", hosts:"Ruhani Beri · Chair, ICJ  ·  Daksh Gupta · Chair, WEF",
    focus:"Position papers, working papers, press releases and the anatomy of an end document." },
  { n:"4", title:"Meet the Executive Board", date:"20 – 22 Aug", day:20,
    time:"6:00 – 7:30 PM IST", hosts:"The Executive Boards of every committee",
    focus:"One evening per committee — questions, paperwork and your board, face to face.",
    table:[["ICJ","Thu 20 Aug"],["DISEC","Thu 20 Aug"],["AI Impact Summit","Thu 20 Aug"],["World Press · Journalists","Thu 20 Aug"],["Conference on Disarmament","Fri 21 Aug"],["INTERPOL","Fri 21 Aug"],["World Economic Forum","Fri 21 Aug"],["BRICS","Fri 21 Aug"],["Group of 77","Sat 22 Aug"],["Intergovernmental Negotiating Committee","Sat 22 Aug"],["World Press · Photographers","Sat 22 Aug"],["World Press · Caricaturists","Sat 22 Aug"]] },
  { n:"5", title:"MUN 101 · Optional doubt-solving session", date:"Thu 27 Aug", day:27,
    time:"6:00 – 7:30 PM IST", hosts:"Hemanshi Dedhia · MUN Head, Ryan Group  ·  Vishrut Mishra · Secretary-General, INMUN'26",
    focus:"Open floor. Bring every question you have not asked in committee yet." },
];

/* ---------------- Awards (flat, fully normalised) ---------------- */
/* tier: best | hc | sm | bestdelegation | profile   ·   oos = outstation */
const AWARDS = [];
const A = (c, tier, name, country, school, oos) => AWARDS.push({ c, tier, name, country, school:school||"", oos:!!oos });
const CM = {
  icj:"International Court of Justice", disec:"UN General Assembly (DISEC)", cd:"Conference on Disarmament",
  ai:"AI Impact Summit", inc:"Intergovernmental Negotiating Committee", wef:"World Economic Forum",
  g77:"Group of 77", interpol:"INTERPOL", brics:"BRICS", wpj:"World Press — Journalists",
  wpp:"World Press — Photographers", wpc:"World Press — Caricaturists"
};

/* Best School Delegation */
A("Delegation","bestdelegation","RIS Vasant Kunj","India","RIS Vasant Kunj");
A("Delegation","bestdelegation","RIS Greater Noida","Brazil","RIS Greater Noida");
A("Delegation","bestdelegation","RIS Noida","Iran","RIS Noida");
A("Delegation","bestdelegation","RIS Rohini","Saudi Arabia","RIS Rohini");
A("Delegation","bestdelegation","RIS Mayur Vihar","South Africa","RIS Mayur Vihar");
A("Delegation","bestdelegation","RIS Bavdhan, Pune","Slovakia","RIS Bavdhan, Pune",1);

/* Best Country Profile */
[["Brazil","Ryan International School (ICSE), Malad"],["India","Ryan International School, Vasant Kunj"],["Indonesia","Ryan International School, Faridabad"],["Iran","Ryan International School, Noida"],["Myanmar","St. Xavier's High School, Goregaon East"],["Panama","St. Lawrence High School, Borivali"],["Portugal & Sweden","Ryan International School, G-2 Sector 11, Rohini"],["Singapore","Ryan International School, H-3, Sector-11, Rohini"],["South Africa","Ryan International School, Mayur Vihar"],["Uruguay & Peru","Ryan International School, Masdar"]]
  .forEach(([c,s]) => A("Country Profile","profile",c,c,s));

/* ICJ */
A("icj","best","Hrishi","Brazil 1","RIS Greater Noida");
A("icj","best","Divyanshi Malhotra","Iran","RIS Noida");
A("icj","best","Keshav Dawar","Saudi Arabia","RIS Rohini");
A("icj","hc","Aditya Dutta","United States","Cambridge Kandivali");
A("icj","hc","Aarav Verma","Belgium","RIS Ghaziabad");
A("icj","hc","Aayush Jindal","Singapore","RIS Rohini H3");
A("icj","hc","Diya Jasra","Jordan","RIS Ludhiana",1);
A("icj","sm","Tanmay Kumar","South Africa","RIS Mayur Vihar");
A("icj","sm","Ashutosh Singh","Malaysia","RIS Sohna Road");
A("icj","sm","Preksha Sharma","Indonesia","RIS Faridabad");
A("icj","sm","Isahnvi Releekar","Slovakia","RIS Bavdhan, Pune",1);
A("icj","sm","Gunreet Kaur","Romania","RIS Patiala",1);

/* DISEC */
A("disec","best","Akshat & Inoday","Israel","RIS Ghaziabad");
A("disec","best","Anubhab Singha Roy","Indonesia","RIS Faridabad");
A("disec","best","Soumya","Iran","RIS Noida");
A("disec","best","Viraj Lamba & Aayush Chakraborty","Malaysia","RIS Sohna Road");
A("disec","best","Sarthak & Jatin","South Africa","RIS Mayur Vihar");
A("disec","best","Hardik Singhal & Aarush Verma","Saudi Arabia","RIS Rohini");
A("disec","hc","Shaurya Pratap Singh & Suvir Thakur","Qatar","RIS Greater Noida");
A("disec","hc","Viraaj Singh & Zoya Naaz","Brazil 1","RIS Greater Noida");
A("disec","hc","Aanya Rai & Eris Tamang","India","RIS Vasant Kunj");
A("disec","hc","Mahika Singhal","Singapore","RIS Rohini H3");
A("disec","hc","Arjun Kirsur & Niel Shetty","Iraq","Cambridge Kandivali",1);
A("disec","sm","Shashwat","Chad","RIS Sohna Road");
A("disec","sm","Diva & Dishita","Morocco","RIS Faridabad");
A("disec","sm","Kshitish & Aahana","Belgium","RIS Ghaziabad");
A("disec","sm","Manya Agarwal & Kashvi Gulyani","Spain","RIS Rohini H3");
A("disec","sm","Mrigank & Jagrit","Mexico","RIS Faridabad");
A("disec","sm","Suryanshi Singh","Uganda","RIS Ghaziabad");
A("disec","sm","Pratyush Kale & Ameya Kale","Slovakia","RIS Bavdhan, Pune",1);
A("disec","sm","Susweta Behera & Aditya Angane","United States","RIS Kandivali",1);

/* CD */
A("cd","best","Shresth Jha","South Africa","RIS Mayur Vihar");
A("cd","best","Saanvi Bajaj","India","RIS Vasant Kunj");
A("cd","best","Arohi Yadav","Iran","RIS Noida");
A("cd","best","Devansh Siwach","Brazil 1","RIS Greater Noida");
A("cd","hc","Atulya Pandey","Saudi Arabia","RIS Rohini");
A("cd","hc","Arshit Aggarwal","Ghana","RIS Rohini G2");
A("cd","hc","Aarav Shukla","Indonesia","RIS Faridabad");
A("cd","hc","Navya N Ratudi","United Arab Emirates","RIS Kandivali",1);
A("cd","sm","Sraghvi Dutta","Russia","RIS Vasant Kunj");
A("cd","sm","Devansh Yadav","Mexico","RIS Faridabad");
A("cd","sm","Aarav Nautiyal","United States","RIS Kandivali",1);
A("cd","sm","Aaradhya Singh","United Kingdom","RIS Malad ICSE",1);

/* AI Impact Summit */
A("ai","best","Shreya Choudhary","Saudi Arabia","RIS Rohini");
A("ai","best","Saransh Sharma","India","RIS Vasant Kunj");
A("ai","best","Shaurya Kakkar","South Africa","RIS Mayur Vihar");
A("ai","best","Aditya Mishra","Brazil 1","RIS Greater Noida");
A("ai","hc","Swayyam Balyan","Malaysia","RIS Sohna Road");
A("ai","hc","Aydin Khan","Indonesia","RIS Faridabad");
A("ai","hc","Amishi Sinha","Australia","RIS Rohini");
A("ai","hc","Prabhav Khanduri","China","RIS Noida");
A("ai","hc","Aaditya Saxena","Slovakia","RIS Bavdhan, Pune",1);
A("ai","sm","Bhavya","Ukraine","RIS Noida");
A("ai","sm","Jeetanshika Kaushik","Kenya","RIS Ghaziabad");
A("ai","sm","Daksh Goyal","Iran","RIS Noida");
A("ai","sm","Aradhya Gupta","Israel","RIS Ghaziabad");
A("ai","sm","Gaurang Sharma","Hungary","RIS Mayur Vihar");
A("ai","sm","Simar Kaur","Mexico","RIS Faridabad");
A("ai","sm","Jehann Silwal","Jamaica","");
A("ai","sm","Ahad Khan","United States","",1);
A("ai","sm","Mst. Mahender K","Liechtenstein","RIS Bannerghatta ICSE",1);

/* INC */
A("inc","best","Pihu","Iran","RIS Noida");
A("inc","best","Mysha Saifi","Bangladesh","RIS Faridabad");
A("inc","best","Namish Garg","India","RIS Vasant Kunj");
A("inc","hc","Manan Gupta","Brazil 1","RIS Greater Noida");
A("inc","hc","Divyansh Singh","Israel","RIS Ghaziabad");
A("inc","hc","Aarav Bhavesh Chauhan","United States","Cambridge Kandivali",1);
A("inc","hc","Sanvi Latey","United Kingdom","RIS Bavdhan, Pune",1);
A("inc","sm","Peehu Mishra","Ireland","");
A("inc","sm","Agamya Sharma","Saudi Arabia","RIS Rohini");
A("inc","sm","Ananya Belwal","South Africa","RIS Mayur Vihar");
A("inc","sm","Diya Gupta","Pakistan","");
A("inc","sm","Rupender Singh","Malaysia","RIS Sohna Road");
A("inc","sm","Khyati Parashar","Kenya","RIS Ghaziabad");
A("inc","sm","Khanak Chawla","Singapore","RIS Rohini H3");
A("inc","sm","Vaishnavi Baluni","Indonesia","RIS Faridabad");
A("inc","sm","Rishi Arjun","Iraq","Cambridge Kandivali",1);

/* WEF */
A("wef","best","Ananya Rana","India","RIS Vasant Kunj");
A("wef","best","Angelica Vivek Raj","Malaysia","RIS Sohna Road");
A("wef","best","Aryan Tejas Bonde","South Africa","RIS Mayur Vihar");
A("wef","hc","Agrima Singh","Indonesia","RIS Faridabad");
A("wef","hc","Aaron S Pratheep","Mexico","RIS Faridabad");
A("wef","hc","Aarush Paskanti","Iceland","SJHS Panvel",1);
A("wef","sm","Mahika Lakhmara","Iran","RIS Noida");
A("wef","sm","Suyash Choudhary","Saudi Arabia","RIS Rohini");
A("wef","sm","Deepanshu Singh","Belgium","RIS Ghaziabad");
A("wef","sm","Kabeer Kaaliyaan","Switzerland","RIS Ojhar",1);
A("wef","sm","Abhinav Pathania","France","RIS Ludhiana",1);

/* Group of 77 */
A("g77","best","Akshat Kumar Mishra","South Africa","RIS Mayur Vihar");
A("g77","best","Ritisha","Saudi Arabia","RIS Rohini");
A("g77","best","Pulkit","Indonesia","RIS Faridabad");
A("g77","best","Parimita Raheja","India","RIS Vasant Kunj");
A("g77","hc","Manhar Sharma","Iran","RIS Noida");
A("g77","hc","Saransh Dubey","New Zealand","RIS Mansarovar Jaipur",1);
A("g77","sm","Rudra Pratap Singh","Brazil 1","RIS Greater Noida");
A("g77","sm","Agria Agarwal","Singapore","RIS Rohini H3");
A("g77","sm","Soubhik Biswas","Kuwait","RIS Bannerghatta ICSE",1);

/* INTERPOL */
A("interpol","best","Ansh Bhakuni","South Africa","RIS Mayur Vihar");
A("interpol","best","Tanish Khanna","Brazil 1","RIS Greater Noida");
A("interpol","hc","Janvi Malhan","Malaysia","RIS Sohna Road");
A("interpol","hc","Shashanth","Iran","RIS Noida");
A("interpol","hc","Agrim Goel","Singapore","RIS Rohini H3");
A("interpol","hc","Ayanna Garg","Saudi Arabia","RIS Rohini");
A("interpol","hc","Atharv Saraf","United Kingdom","RIS Bavdhan, Pune",1);
A("interpol","sm","Rishi Ozha","China","");
A("interpol","sm","Arnav Sharma","Belgium","");
A("interpol","sm","Manveer Singh","Indonesia","");
A("interpol","sm","Parth Saini","Panama","RIS Shahjahanpur",1);
A("interpol","sm","Siya Pareek","France","",1);

/* BRICS */
A("brics","best","Rableen Beri","Saudi Arabia","RIS Rohini");
A("brics","best","Devansh","Brazil 1","RIS Greater Noida");
A("brics","hc","Prakul Kumar Jain","Malaysia","RIS Sohna Road");
A("brics","hc","Swapnoneel Roy Chowdhury","Indonesia","RIS Faridabad");
A("brics","hc","Soham Rahul Thombare","Belarus","SJHS Kalamboli",1);
A("brics","sm","Anandha Vishnu","Mexico","RIS Faridabad");
A("brics","sm","Tannmay Jain","South Africa","RIS Mayur Vihar");
A("brics","sm","Chahat Chettri","China","RIS Greater Noida");
A("brics","sm","Aradhya Ranjan","Nigeria","RIS Mayur Vihar");
A("brics","sm","Ananya","Bangladesh","RIS Faridabad");
A("brics","sm","Shravani Babasaheb Tadakhe","Cuba","RIS Nerul",1);
A("brics","sm","Ishayu Ghosh","Vietnam","RIS Goregaon",1);

/* World Press — Journalists */
A("wpj","best","Avika Singh","Journalist","RIS Mayur Vihar");
A("wpj","hc","Raghav Singh Tanwar","Journalist","RIS Vasant Kunj");
A("wpj","hc","Aarna Narang","Journalist","RIS Rohini");
A("wpj","sm","Diya Rustagi","Journalist","RIS Mayur Vihar");
A("wpj","sm","Prachita Sehgal","Journalist","RIS Mayur Vihar");
A("wpj","sm","Anahad Kaur","Journalist","RIS Amritsar");
A("wpj","sm","Hriday Telang","Journalist","RIS Noida");

/* World Press — Photographers */
A("wpp","best","Enam Abel Gordon","Photographer","RIS Noida");
A("wpp","hc","Maira Rajpoot","Photographer","RIS Rohini");
A("wpp","hc","Vaibhav Kumar","Photographer","RIS Vasant Kunj");
A("wpp","sm","Parthavi Banerjee","Photographer","RIS Faridabad");
A("wpp","sm","Naman Singh","Photographer","RIS Mayur Vihar");

/* World Press — Caricaturists */
A("wpc","best","Karishma Pahuja","Caricaturist","RIS Mayur Vihar");
A("wpc","hc","Saesha Choudhary","Caricaturist","RIS Rohini");
A("wpc","hc","Mysha Haider","Caricaturist","RIS Mayur Vihar");
A("wpc","sm","Manshi Chauhan","Caricaturist","RIS Mayur Vihar");
A("wpc","sm","Ishita Bansal","Caricaturist","RIS Mayur Vihar");

const TIER_LABEL = {
  best:"Best Delegate", hc:"High Commendation", sm:"Special Mention",
  bestdelegation:"Best School Delegation", profile:"Best Country Profile"
};
const TIER_RANK = { best:0, hc:1, sm:2, bestdelegation:3, profile:4 };
const COMMITTEE_LABEL = { Delegation:"Delegation", CountryProfile:"Country Profile", ...CM };