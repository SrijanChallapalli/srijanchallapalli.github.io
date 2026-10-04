/* =========================================================
   THE DRIVE — game engine
   You're the QB on a two-minute drill. Each completion moves
   the chains and reveals a layer. Reach the end zone and the
   full body of work unlocks as the touchdown.
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ----- field geometry (percent across the element) -----
  // playing area spans 10%..90%; own-25 sits at 30%, pay-dirt center at 95%.
  var LANES = [18, 40, 60, 82];          // vertical lanes for receivers
  var QB_BACK = 6;                        // QB lines up this far behind the LOS
  var DOWNS = [
    { nextX: 42, label: "SC 40" },
    { nextX: 55, label: "midfield" },
    { nextX: 68, label: "OPP 32" },
    { nextX: 80, label: "OPP 20 · RED ZONE" }
  ];

  // ----- the receivers === the facets of Srijan -----
  var RECEIVERS = [
    {
      id: "origin", no: "11", route: "GO", topic: "The Origin",
      hint: "Who's taking the snap?",
      tag: "Who", title: "Srijan Challapalli — QB #1",
      body: [
        "Studying <b>Artificial Intelligence at Purdue University</b>. I build and ship products — and the systems underneath them.",
        "Full-stack, AI, and systems. Open to SWE and product-engineering internships."
      ]
    },
    {
      id: "arsenal", no: "84", route: "POST", topic: "The Arsenal",
      hint: "What do you throw with?",
      tag: "Stack", title: "Works the whole stack",
      body: [
        "From native iOS down to a storage engine in Rust — I like being able to reach any layer the problem lives on.",
        "<span class=\"chips\"><span class=\"chip\">SwiftUI</span><span class=\"chip\">Next.js / TypeScript</span><span class=\"chip\">Rust</span><span class=\"chip\">Python</span><span class=\"chip\">Solidity</span><span class=\"chip\">PostgreSQL / Supabase</span><span class=\"chip\">FastAPI</span></span>"
      ]
    },
    {
      id: "film", no: "22", route: "SLANT", topic: "The Film",
      hint: "What have you actually shipped?",
      tag: "Tape", title: "Shipped — not just built",
      body: [
        "<b>Chityap</b>: a privacy-first iOS social app shipped to <b>300+ users</b> (~5,000 posts) on a realtime Postgres backend.",
        "<b>MergeWorks</b>: an M&amp;A due-diligence pipeline turning messy financial packets into source-cited, audit-ready analysis — all arithmetic in a deterministic sandbox, not the model.",
        "<b>Apply&nbsp;Pilot</b>: an AI workspace that ranks live internship postings with explainable scoring."
      ]
    },
    {
      id: "edge", no: "55", route: "WHEEL", topic: "The Edge",
      hint: "How do you think about the game?",
      tag: "Edge", title: "Built below the abstraction layer",
      body: [
        "I like understanding systems <i>below</i> the abstraction layer — WAL, memtables, SSTables, compaction — then moving software from an idea to something people actually use.",
        "When an LLM is in the loop, the math and the rules live in deterministic, tested code. The model explains; it doesn't decide the numbers."
      ]
    }
  ];

  // ----- the payoff: everything, unlocked in the end zone -----
  var PROJECTS = {
    Flagships: [
      ["Chityap", "Native iOS · Shipped", "Privacy-first social app — SwiftUI on realtime Postgres, on-device Vision rep-counter. 300+ users.", "https://chityap.com/"],
      ["Apply Pilot", "AI workspace", "Ranks live ATS postings with explainable scoring; prepares applications for human review — never auto-submits.", null],
      ["LSM Storage Engine", "Systems · Rust", "Persistent key-value DB from scratch — WAL, memtable, SSTables, bloom filters, compaction, crash recovery.", "https://github.com/SrijanChallapalli/LSM-Storage-Engine"]
    ],
    "On-Chain": [
      ["Secretariat", "ETHDenver", "Tokenized-asset marketplace — 17 Solidity contracts + off-chain XGBoost valuation.", "https://github.com/SrijanChallapalli/Secretariat"],
      ["Over-Collateralized Lending", "DeFi", "Lock collateral, draw loans, liquidate underwater positions.", "https://github.com/SrijanChallapalli/challenge-over-collateralized-lending"],
      ["Decentralized Oracles", "Oracles", "Whitelist, staking, and optimistic oracle designs.", "https://github.com/SrijanChallapalli/challenge-oracles"],
      ["DEX (AMM)", "DeFi", "Uniswap-v2-style constant-product exchange with LP shares.", "https://github.com/SrijanChallapalli/challenge-dex"],
      ["Token Vendor", "ERC-20", "ERC-20 plus an unstoppable vending-machine contract.", "https://github.com/SrijanChallapalli/challenge-token-vendor"],
      ["Crowdfunding dApp", "dApp", "Trustless group funding — release on goal, refundable otherwise.", "https://github.com/SrijanChallapalli/challenge-crowdfunding"],
      ["Dice Game & Exploit", "Security", "An attacker that predicts a block-hash roll — why on-chain randomness needs a VRF.", "https://github.com/SrijanChallapalli/challenge-dice-game"],
      ["Asset Tokenization", "RWA", "Issuing real-world value as transferable ERC tokens.", "https://github.com/SrijanChallapalli/challenge-tokenization"],
      ["MyUSD Stablecoin", "Stablecoin", "Crypto-backed $1 peg, single-collateral Dai — mint, interest, liquidation.", "https://github.com/SrijanChallapalli/challenge-stablecoins"]
    ],
    Archive: [
      ["DevGuard", "DevSecOps", "Zero-config scans on every push/PR — dedupes, ranks, opens auto-fix PRs.", "https://github.com/SrijanChallapalli/DevGuard"],
      ["RangeRunner", "Algo trading", "Opening-range-breakout assistant on an Alpaca paper account.", null],
      ["FrameAI", "AI / LLM", "Decomposes a prompt into facts, strategies, procedures, rationales.", "https://github.com/SrijanChallapalli/frameAI"],
      ["APEX Coach", "AI coach", "Deterministic engine does the programming/math; the LLM only coaches.", null],
      ["ResuMate AI", "AI / NLP", "Resume-to-job matcher with hybrid ATS-style scoring.", "https://github.com/SrijanChallapalli/ResuMate"],
      ["Assessment-First Tutor", "EdTech", "Diagnose → teach → verify adaptive tutoring loop.", "https://github.com/SrijanChallapalli/Assessment-First-Tutor"],
      ["Pulse of Profit", "Fintech", "RSI/MACD/OBV/Ichimoku as interactive Plotly charts.", "https://github.com/SrijanChallapalli/PulseOfProfit"]
    ]
  };

  // ----- DOM -----
  var $ = function (id) { return document.getElementById(id); };
  var field = $("field"), tokens = $("tokens"), routes = $("routes"),
      receiversEl = $("receivers"), revealEl = $("reveal"),
      announceEl = $("announce"), fieldmsg = $("fieldmsg"),
      downDist = $("downDist"), ballOn = $("ballOn"), toGo = $("toGo"),
      gameClock = $("gameClock"), homeScore = $("homeScore");

  if (!field) return; // nothing to drive

  var state = { down: 1, caught: 0, losX: 30, clock: 120, over: false, busy: false };
  var available = RECEIVERS.slice();
  var qbEl, ballEl, losMark, firstMark, wrEls = {};

  // ---------- helpers ----------
  function pos(el, x, y) { el.style.left = x + "%"; el.style.top = y + "%"; }
  function vb(n) { return n; } // percent maps linearly onto the 0..100 viewBox below

  function clockStr(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  }
  function setClock(s) {
    state.clock = Math.max(0, s);
    gameClock.textContent = clockStr(state.clock);
    gameClock.classList.toggle("hot", state.clock <= 30);
  }
  function say(t) { announceEl.innerHTML = t; }

  function flash(big, small, td) {
    fieldmsg.innerHTML = '<div><span class="big">' + big + "</span>" +
      (small ? '<span class="small">' + small + "</span>" : "") + "</div>";
    fieldmsg.className = "fieldmsg show" + (td ? " td" : "");
    if (!td) {
      setTimeout(function () { fieldmsg.className = "fieldmsg"; }, reduce ? 500 : 1100);
    }
  }

  // ---------- build the field ----------
  function buildTokens() {
    qbEl = document.createElement("div");
    qbEl.className = "token qb";
    qbEl.textContent = "QB";
    tokens.appendChild(qbEl);

    ballEl = document.createElement("div");
    ballEl.className = "ball";
    tokens.appendChild(ballEl);

    losMark = document.createElement("div");
    losMark.className = "marker los";
    field.insertBefore(losMark, tokens);

    firstMark = document.createElement("div");
    firstMark.className = "marker first";
    field.insertBefore(firstMark, tokens);

    RECEIVERS.forEach(function (r) {
      var el = document.createElement("div");
      el.className = "token wr";
      el.textContent = r.no;
      tokens.appendChild(el);
      wrEls[r.id] = el;
    });
  }

  function lineUp() {
    var d = DOWNS[Math.min(state.down - 1, DOWNS.length - 1)];
    losMark.style.left = state.losX + "%";
    firstMark.style.left = d.nextX + "%";
    pos(qbEl, state.losX - QB_BACK, 50);
    pos(ballEl, state.losX - QB_BACK, 50);
    ballEl.classList.add("carried");

    // place available receivers on their lanes at the LOS, draw their routes
    routes.innerHTML = "";
    available.forEach(function (r, i) {
      var lane = LANES[i % LANES.length];
      var el = wrEls[r.id];
      el.className = "token wr open";
      pos(el, state.losX, lane);
      r._lane = lane;
      r._endY = lane < 50 ? lane + 6 : lane - 6;
      addRoute(r, state.losX, lane, d.nextX, r._endY);
    });
  }

  function addRoute(r, x1, y1, x2, y2) {
    var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var midx = (x1 + x2) / 2 + 4;
    var d = "M" + vb(x1 * 10) + "," + vb(y1 * 5.62) +
            " Q" + vb(midx * 10) + "," + vb(y1 * 5.62) +
            " "  + vb(x2 * 10) + "," + vb(y2 * 5.62);
    p.setAttribute("d", d);
    p.classList.add("show");
    r._path = p;
    routes.appendChild(p);
  }

  // ---------- the play ----------
  function throwTo(r) {
    if (state.busy || state.over) return;
    state.busy = true;

    var d = DOWNS[Math.min(state.down - 1, DOWNS.length - 1)];
    available.forEach(function (o) {
      wrEls[o.id].classList.remove("open");
      if (o._path && o !== r) o._path.classList.remove("show");
    });
    if (r._path) r._path.classList.add("chosen");
    receiversEl.querySelectorAll("button").forEach(function (b) { b.disabled = true; });

    say("You drop back… fire the <b>" + r.route + "</b> to #" + r.no + "…");

    var flyTo = function () {
      pos(ballEl, d.nextX, r._endY);                 // ball flies to the catch point
      wrEls[r.id].classList.remove("open");
      setTimeout(complete, reduce ? 0 : 640);
    };

    var complete = function () {
      wrEls[r.id].classList.add("scored");
      flash("CAUGHT!", r.topic);
      say("Caught at the <b>" + d.label.replace(" · RED ZONE", "") +
          "</b> — first down, SC! " + r.hint);

      // move the chains
      state.losX = d.nextX;
      state.caught++;
      available = available.filter(function (o) { return o.id !== r.id; });
      wrEls[r.id].classList.add("covered");
      setClock(state.clock - 22 - Math.floor(Math.random() * 6));
      updateHUD(d);
      reveal(r);
      markCaught(r);

      setTimeout(function () {
        state.busy = false;
        if (state.caught >= RECEIVERS.length) enterRedZone();
        else { state.down++; renderPlaycall(); lineUp(); }
      }, reduce ? 150 : 900);
    };

    if (reduce) { flyTo(); } else { setTimeout(flyTo, 120); }
  }

  function updateHUD(d) {
    downDist.textContent = "1st & 10";
    ballOn.textContent = d.label.toLowerCase();
    toGo.textContent = state.caught >= 4 ? "punch it in" : (DOWNS.length - state.caught) + " more reads";
  }

  // ---------- reveal panels ----------
  function card(tag, title, bodyArr) {
    var c = document.createElement("div");
    c.className = "rev-card";
    c.innerHTML = '<span class="tag">' + tag + "</span><h3>" + title + "</h3>" +
      bodyArr.map(function (p) { return "<p>" + p + "</p>"; }).join("");
    revealEl.insertBefore(c, revealEl.firstChild);
    return c;
  }
  function reveal(r) { card(r.tag, r.title, r.body); }
  function markCaught(r) {
    var b = receiversEl.querySelector('[data-id="' + r.id + '"]');
    if (b) b.classList.add("caught");
  }

  // ---------- play-call UI ----------
  function renderPlaycall() {
    receiversEl.innerHTML = "";
    available.forEach(function (r) {
      var b = document.createElement("button");
      b.className = "wr-btn";
      b.type = "button";
      b.setAttribute("data-id", r.id);
      b.innerHTML =
        '<span class="route">' + r.route + " route</span>" +
        '<span class="yards">#' + r.no + "</span>" +
        '<span class="topic">' + r.topic + "</span>" +
        '<span class="hint">' + r.hint + "</span>";
      b.addEventListener("click", function () { throwTo(r); });
      receiversEl.appendChild(b);
    });
  }

  // ---------- red zone ----------
  function enterRedZone() {
    say("First and goal. The crowd's on its feet — <b>everything you came for is one play away.</b>");
    card("Red zone", "The flagships are in range",
      ["Three you'll want on tape: <b>Chityap</b> (shipped, 300+ users), <b>Apply&nbsp;Pilot</b> (AI workspace), and the <b>LSM Storage Engine</b> in Rust. Punch it in to see the whole board."]);
    var p = document.getElementById("playcall");
    p.querySelector(".playcall-head").textContent = "4th & goal";
    p.querySelector(".playcall-sub").textContent = "No more reads. Take it in yourself.";
    receiversEl.innerHTML = "";
    var go = document.createElement("button");
    go.className = "goforit";
    go.type = "button";
    go.textContent = "▶  Go for it — take it to the house";
    go.addEventListener("click", touchdown);
    receiversEl.appendChild(go);
  }

  // ---------- touchdown ----------
  function touchdown() {
    if (state.over) return;
    state.over = true;
    say("He's got it — <b>TOUCHDOWN, SC!</b> Ballgame.");
    pos(qbEl, 95, 50);
    pos(ballEl, 95, 50);
    setClock(0);
    homeScore.textContent = "28";
    downDist.textContent = "TOUCHDOWN";
    downDist.classList.remove("live");
    ballOn.textContent = "pay dirt";
    toGo.textContent = "SC wins";
    flash("TOUCHDOWN", "SC 28 — Recruiters 24", true);
    document.getElementById("playcall").style.display = "none";

    setTimeout(buildEndzone, reduce ? 100 : 1000);
  }

  function buildEndzone() {
    var wrap = document.createElement("div");
    wrap.className = "rev-card endzone-board";
    var html = '<span class="tag">The end zone</span>' +
      "<h3>The whole body of work</h3>" +
      "<p>You drove the field. Here's everything — flagships, on-chain, and the archive.</p>";

    Object.keys(PROJECTS).forEach(function (chapter) {
      html += '<div class="chapter-block"><h4>' + chapter + "</h4><ul class=\"proj-list\">";
      PROJECTS[chapter].forEach(function (p) {
        var name = p[3]
          ? '<a href="' + p[3] + '" target="_blank" rel="noopener">' + p[0] + " ↗</a>"
          : p[0] + ' <span class="priv">(private)</span>';
        html += "<li><span class=\"pn\">" + name + "</span>" +
          '<span class="pt">' + p[1] + "</span>" +
          '<span class="pl">' + p[2] + "</span></li>";
      });
      html += "</ul></div>";
    });

    html += '<div class="endzone-cta">' +
      '<a class="ez-link" href="/projects/">Full index →</a>' +
      '<a class="ez-link" href="/resume.pdf" target="_blank" rel="noopener">Résumé</a>' +
      '<a class="ez-link" href="https://github.com/SrijanChallapalli" target="_blank" rel="noopener">GitHub</a>' +
      '<a class="ez-link" href="https://linkedin.com/in/srijan-challapalli" target="_blank" rel="noopener">LinkedIn</a>' +
      '<a class="ez-link primary" href="mailto:srijanchallapalli@gmail.com">Let’s talk →</a>' +
      "</div>";

    wrap.innerHTML = html;
    revealEl.insertBefore(wrap, revealEl.firstChild);
    if (!reduce) wrap.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- boot ----------
  buildTokens();
  renderPlaycall();
  lineUp();
  updateHUD(DOWNS[0]);
  setClock(120);

  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
