// Builds every page of the KCC website from src/content.mjs.
// Run:  node build.mjs      (no dependencies)
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site, gatherings, specialEvents, theme, vision, principles, ministries, faqs, beliefs, giving, notes, notesAreSamples } from "./src/content.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtDate = (iso) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
const tel = `tel:+${site.phoneIntl}`;
const ext = `target="_blank" rel="noopener"`;

const NAV = [
  ["", "Home"], ["about/", "About"], ["visit/", "I’m New"], ["ministries/", "Ministries"],
  ["events/", "Events"], ["notes/", "Church Notes"], ["prayer/", "Prayer"], ["contact/", "Contact"],
];

const ICON = {
  fb: `<svg viewBox="0 0 24 24"><path d="M14 8V6c0-1 .3-1.500 1.600-1.500H18V1h-3c-3.300 0-5 2-5 5v2H7v3.500h3V23h4V11.500h3.200L18 8z"/></svg>`,
  ig: `<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.200a3.200 3.200 0 1 1 0-6.400 3.200 3.200 0 0 1 0 6.400zM17.300 5.500a1.200 1.200 0 1 0 0 2.400 1.200 1.200 0 0 0 0-2.400zM17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zm3.200 15a3.200 3.200 0 0 1-3.200 3.200H7A3.200 3.200 0 0 1 3.800 17V7A3.200 3.200 0 0 1 7 3.800h10A3.200 3.200 0 0 1 20.200 7z"/></svg>`,
  yt: `<svg viewBox="0 0 24 24"><path d="M22 8s-.2-1.500-.8-2.100c-.800-.800-1.700-.800-2.100-.900C16.200 4.800 12 4.800 12 4.800s-4.200 0-7.100.2c-.4.100-1.300.100-2.100.9C2.200 6.500 2 8 2 8s-.2 1.700-.2 3.400v1.200C1.800 14.300 2 16 2 16s.2 1.500.8 2.100c.800.800 1.800.800 2.300.9 1.600.2 6.900.2 6.900.2s4.200 0 7.100-.2c.4-.100 1.300-.100 2.100-.900.600-.600.800-2.100.800-2.100s.2-1.700.2-3.400v-1.200C22.200 9.700 22 8 22 8zM10 14.700V9.300l5.200 2.700z"/></svg>`,
};

// ───────────── shared layout ─────────────
function layout({ path, title, desc, hero, body, p, abs }) {
  // p = relative prefix back to the site root ("" | "../" | "../../"); abs = use full URLs (404 page)
  const r = abs ? site.url + "/" : p;
  const cur = "/" + path;
  const nav = NAV.map(([href, label]) => {
    const on = href === "" ? path === "" : cur.startsWith("/" + href);
    return `<li><a href="${r}${href || (abs ? "" : "./")}"${on ? ' class="cur" aria-current="page"' : ""}>${label}</a></li>`;
  }).join("\n  ");
  const full = title ? `${title} | ${site.name} (KCC)` : `${site.name} (KCC) | Faith Ministries`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${site.url}/${path}">
<meta property="og:image" content="${site.url}/assets/photos/fellowship.jpg">
<link rel="icon" href="${r}assets/favicon.png">
<link rel="apple-touch-icon" href="${r}assets/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;500;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/site.css">
</head>
<body id="top" data-wa="${site.phoneIntl}" data-email="${site.email}" data-sun-start="${site.sunday.start}" data-sun-end="${site.sunday.end}" data-sun-label="${site.sunday.label}">
<a class="skip" href="#main">Skip to content</a>
<div class="progress" id="pg"></div>
<div class="livebar" id="live" hidden><i></i><span></span><a href="${r}visit/">Plan your visit</a></div>

<div class="mast">
<header>
 <div class="top">
  <a class="logo" href="${r}${abs ? "" : "./"}"><img src="${r}assets/faith-ministries-logo.png" alt="Faith Ministries: Discipleship Through Relationships"></a>
  <a class="btn orange" href="${r}give/">Giving</a>
  <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="nl"><span></span><span></span><span></span></button>
 </div>
 <nav aria-label="Main"><ul id="nl">
  ${nav}
 </ul></nav>
</header>
${hero}
</div>

<main id="main">
${body}
</main>

<footer>
 <div class="wrap fg">
  <div><span class="flogo"><img src="${r}assets/faith-ministries-logo.png" alt="Faith Ministries" loading="lazy"></span></div>
  <div><h6>Office</h6><ul><li>${esc(site.address)};<br>${esc(site.city)}</li><li><a href="mailto:${site.email}">${site.email}</a></li><li><a href="${tel}">${site.phone}</a></li><li>Sunday Service: ${site.sunday.label}</li></ul></div>
  <div><h6>Links</h6><ul><li><a href="${r}about/">About Us</a></li><li><a href="${r}visit/">Plan Your Visit</a></li><li><a href="${r}give/">Giving</a></li><li><a href="${r}notes/">Church Notes</a></li></ul></div>
  <div><h6>Get in Touch</h6><p>Follow KCC for news, photos and announcements.</p>
   <div class="social">
    <a href="${site.facebook}" ${ext} aria-label="Facebook">${ICON.fb}</a>
    <a href="${site.instagram}" ${ext} aria-label="Instagram">${ICON.ig}</a>
   </div>
  </div>
 </div>
 <div class="copy">${site.name} © ${new Date().getFullYear()}. A Faith Ministries church.</div>
</footer>
<a class="totop" id="tt" href="#top" aria-label="Back to top">↑</a>
<script src="${r}assets/site.js"></script>
</body>
</html>
`;
}

const phero = (p, img, crumb, title, pos = "center 30%") =>
  `<div class="phero" style="background-image:url(${p}assets/photos/${img});background-position:${pos}"><div class="tag"><small><a href="${p}./">Home</a> &nbsp;/&nbsp; ${crumb}</small><h1>${title}</h1></div></div>`;

const cta = (p, text = "Find out How, Where and When We Worship. We Hope to See You Soon!", btn = "Plan Your Visit", href = "visit/") =>
  `<section class="band"><div class="wrap">
 <h3>${text}</h3>
 <div class="stack"><a class="btn pale" href="${p}${href}">${btn}</a></div>
</div></section>`;

// ───────────── reusable sections ─────────────
const themeSec = (p, more) => `<section class="sp" id="theme"><div class="wrap two">
 <div class="overlap">
  <img src="${p}assets/photos/singer.jpg" alt="Praise and worship at KCC" loading="lazy">
  <img src="${p}assets/photos/speaker.jpg" alt="Sharing the Word at KCC" loading="lazy">
 </div>
 <div>
  <p class="eyebrow">${theme.eyebrow}</p>
  <h2>${theme.title}<br>${theme.subtitle}</h2>
  <p class="ref">${theme.ref}</p>
  <p>${theme.quote}</p>
  <p>${more}</p>
  ${p === "" ? `<a class="btn" href="about/">Learn More</a>` : `<a class="btn" href="${site.faithMinistries}" ${ext}>Faith Ministries Website</a>`}
 </div>
</div></section>`;

const principlesSec = () => `<section class="lightbg sp" id="principles"><div class="wrap center">
 <div class="mission">
  <p class="eyebrow">Our Mission</p>
  <h2>${vision.mission} <small>(${vision.missionRef})</small></h2>
 </div>
 <p class="eyebrow">Principles Of Ministry</p>
 <h2>Our Principles</h2>
 <div class="cols4 cols5">
  ${principles.map((x) => `<div><svg viewBox="0 0 64 64"><path d="${x.icon}"/></svg><h4>${x.title}</h4><p>${esc(x.text)}</p><span class="ref">${x.ref}</span></div>`).join("\n  ")}
 </div>
</div></section>`;

const pastorSec = (cls = "") => `<section class="sp ${cls}" id="pastor"><div class="wrap pastor">
 <div class="frame"><b>KCC</b></div>
 <div>
  <p class="eyebrow">Our Pastor</p>
  <h2>${site.pastor}</h2>
  <p>${site.pastor} is the main pastor of Kuwadzana Community Church, leading our church family in worship, the Word and discipleship through relationships.</p>
 </div>
</div></section>`;

const evRow = (g) => `<div class="ev"><div class="d"><b>${g.day}</b><small>${g.when}</small></div><div><h5>${esc(g.name)}</h5><p>${esc(g.text)}</p></div></div>`;

const noteCard = (p, n) => `<article class="post" data-note data-series="${esc(n.series)}" data-search="${esc([n.title, n.series, n.scripture, n.preacher, n.bigIdea].join(" ").toLowerCase())}">
   <a href="${p}notes/${n.slug}/"><div class="ph"><img src="${p}assets/photos/${n.img}" alt="" loading="lazy" style="object-position:center 25%"><em>${esc(n.series)}</em></div></a>
   <small>${notesAreSamples ? "Sample · " : ""}${fmtDate(n.date)} · ${esc(n.scripture)}</small>
   <h5><a href="${p}notes/${n.slug}/">${esc(n.title)}</a></h5>
   <p>${esc(n.bigIdea)}</p>
   <a class="more" href="${p}notes/${n.slug}/">Read the notes →</a>
  </article>`;

const sendRow = `<div class="sendrow"><button class="btn" type="submit" data-via="wa">Send on WhatsApp</button><button class="btn line" type="submit" data-via="mail">Send by Email</button></div>
  <p class="hint">Nothing is stored on this website. Your message opens in WhatsApp or your email app, ready to send to the church office.</p>
  <div class="ok" role="status"></div>`;

const contactForm = `<form data-msg="Hello KCC!">
  <label class="f">Your name<input name="name" data-label="My name" required autocomplete="name"></label>
  <label class="f">Phone number (optional)<input name="phone" data-label="My number" type="tel" autocomplete="tel"></label>
  <div><p class="eyebrow" style="margin-bottom:10px">I’m interested in</p>
   <div class="checks">
    ${["Visiting this Sunday", "Joining a cell group", "Raising Champions (kids football)", "Serving in a ministry", "Giving", "Speaking to a pastor"].map((x) => `<label><input type="checkbox" name="interest" value="${x}">${x}</label>`).join("\n    ")}
   </div></div>
  <label class="f">Your message<textarea name="message" data-label="Message" rows="5"></textarea></label>
  ${sendRow}
 </form>`;

const details = (p) => `<dl>
   <dt>Sunday Service</dt><dd>Every Sunday, ${site.sunday.label}</dd>
   <dt>Address</dt><dd>${esc(site.address)}, ${esc(site.city)}<br><a href="${maps}" ${ext}>Get directions →</a></dd>
   <dt>Phone / WhatsApp</dt><dd><a href="${tel}">${site.phone}</a></dd>
   <dt>Email</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd>
  </dl>`;

const mapBox = `<div class="map"><button type="button" data-map="${mapEmbed}">Show the map<small>Tap to load Google Maps (uses a little data)</small></button></div>`;

// ───────────── pages ─────────────
const pages = [];
const add = (path, o) => pages.push({ path, p: "../".repeat(path.split("/").filter(Boolean).length), ...o });

// HOME — same flow as before: hero, vision band, theme, principles, mosaic, pastor, events, notes, prayer, call to action
{
  const p = "";
  add("", {
    title: "", desc: "Kuwadzana Community Church (KCC), Faith Ministries, Kuwadzana 6, Harare. Sunday service 08:30 AM. Reach people and turn them into fully devoted followers of Christ.",
    hero: `<div class="hero">
 <div class="slide on" style="background-image:url(assets/photos/fellowship.jpg);background-position:center 35%"></div>
 <div class="slide" style="background-image:url(assets/photos/worship.jpg);background-position:center 25%"></div>
 <div class="slide" style="background-image:url(assets/photos/gathering.jpg);background-position:center 40%"></div>
 <div class="tag"><small>Faith Ministries · Kuwadzana 6, Harare</small><h1>${site.name}</h1><a class="pill" id="next" href="visit/"><b>Sundays</b> · ${site.sunday.label}</a></div>
 <div class="dots" id="dots"></div>
</div>`,
    body: `<section class="band"><div class="wrap">
 <h3><span>Our Vision:</span>${vision.vision}</h3>
 <div class="stack">
  <a class="btn pale" href="visit/">Join Us Sunday · ${site.sunday.label}</a>
 </div>
</div></section>

${themeSec(p, "Kuwadzana Community Church (KCC) is the Faith Ministries church in Kuwadzana, Harare. We are one family with our sister churches, growing together in worship, the Word and genuine relationships.")}

${principlesSec()}

<section class="mosaic" id="ministries">
 <a class="tile big" href="visit/"><i style="background-image:url(assets/photos/fellowship.jpg)"></i><div><h5>${site.name}</h5><span>Church Service · Sundays ${site.sunday.label}</span></div></a>
 <a class="tile" href="prayer/"><i style="background-image:url(assets/photos/worship.jpg);background-position:center 20%"></i><div><h5>Prayer</h5><span>Send a prayer request</span></div></a>
 <a class="tile" href="ministries/#champions"><i style="background-image:url(assets/photos/sports.jpg)"></i><div><h5>Children &amp; Youth</h5><span>Raising Champions</span></div></a>
 <a class="tile" href="ministries/#ladies"><i style="background-image:url(assets/photos/ladies2.jpg);background-position:center 25%"></i><div><h5>Ladies Ministry</h5><span>Ministry</span></div></a>
 <a class="tile" href="ministries/#worship"><i style="background-image:url(assets/photos/singer.jpg);background-position:center 20%"></i><div><h5>Praise and Worship</h5><span>Ministry</span></div></a>
</section>

${pastorSec()}

<section class="lightbg sp" id="events"><div class="wrap events">
 <div>
  <p class="eyebrow">Calendar</p>
  <h2>Our Events</h2>
  <p>This week at Kuwadzana Community Church, where faith meets fellowship. Join us for worship, and follow our Facebook page for the latest announcements.</p>
  <a class="btn" style="margin-top:28px" href="events/">View More Events</a>
 </div>
 <div>
  ${gatherings.slice(0, 3).map(evRow).join("\n  ")}
 </div>
</div></section>

<section class="sp" id="notes"><div class="wrap center">
 <p class="eyebrow">From The Pulpit</p>
 <h2>Church Notes</h2>
 <div class="cards">
  ${notes.slice(0, 3).map((n) => noteCard(p, n)).join("\n  ")}
 </div>
 <a class="btn" style="margin-top:56px" href="notes/">All Church Notes</a>
</div></section>

<section class="give sp"><div class="wrap">
 <div>
  <p class="eyebrow">Prayer</p>
  <h2>How can we pray for you?</h2>
  <p>Whatever you are facing, you don’t have to carry it alone. Send us your prayer request and our pastors and prayer team will stand with you.</p>
  <a class="btn orange" style="margin-top:28px" href="prayer/">Request Prayer</a>
 </div>
 <div class="box">
  <h5>Church Office</h5>
  <ul>
   <li><b>Phone</b> &nbsp; <a href="${tel}">${site.phone}</a></li>
   <li><b>Email</b> &nbsp; <a href="mailto:${site.email}">${site.email}</a></li>
   <li><b>Address</b> &nbsp; ${esc(site.address)}</li>
  </ul>
 </div>
</div></section>

${cta(p)}`,
  });
}

// ABOUT
add("about/", {
  title: "About", desc: "About Kuwadzana Community Church: our story, vision, mission, values, principles of ministry, what we believe and our pastor.",
  heroArgs: ["speaker.jpg", "About", "About KCC", "center 30%"],
  body: (p) => `<section class="sp"><div class="wrap feature" style="grid-template-columns:1.2fr .8fr">
 <div>
  <p class="eyebrow">Who We Are</p>
  <h2>A Faith Ministries family in Kuwadzana</h2>
  <p>Kuwadzana Community Church (KCC) is the Faith Ministries church in Kuwadzana 6, Harare. Since ${site.founded} we have been a home for worship, the Word and genuine relationships, one family with our sister churches across Zimbabwe.</p>
  <p>${theme.note}</p>
  <div class="stat"><div><b>${site.founded}</b><span>Founded</span></div><div><b>${new Date().getFullYear() - site.founded}</b><span>Years of grace</span></div><div><b>08:30</b><span>Every Sunday</span></div></div>
 </div>
 <img src="${p}assets/photos/fellowship.jpg" alt="The KCC choir in orange at a church gathering" loading="lazy" style="aspect-ratio:1;object-fit:cover">
</div></section>

<section class="band"><div class="wrap">
 <h3><span>Our Vision:</span>${vision.vision}</h3>
 <div class="stack"><a class="btn pale" href="${p}visit/">Join Us Sunday · ${site.sunday.label}</a></div>
</div></section>

${themeSec(p, "The theme is shared by every Faith Ministries assembly this year, KCC included.")}

<section class="lightbg sp"><div class="wrap">
 <p class="eyebrow">Our Mission</p>
 <h2>${vision.mission}</h2>
 <p class="lead">${vision.missionLong} <b style="color:var(--dark)">(${vision.missionRef})</b></p>
 <p class="eyebrow" style="margin-top:50px">Our Values</p>
 <div class="vals">${vision.values.map((v) => `<span>${v}</span>`).join("")}</div>
</div></section>

${principlesSec().replace('class="lightbg sp"', 'class="sp"').replace(/<div class="mission">[\s\S]*?<\/div>\n/, "")}

<section class="lightbg sp" id="beliefs"><div class="wrap">
 <p class="eyebrow">Statement Of Faith</p>
 <h2>What We Believe</h2>
 <div class="grid2">
  ${beliefs.map(([t, x]) => `<div class="belief"><h5>${esc(t)}</h5><p>${esc(x)}</p></div>`).join("\n  ")}
 </div>
</div></section>

${pastorSec()}

<section class="lightbg sp" id="life"><div class="wrap center">
 <p class="eyebrow">From Our Church Family</p>
 <h2>Life At KCC</h2>
 <div class="cards">
  <article class="post"><div class="ph"><img src="${p}assets/photos/ladies3.jpg" alt="A KCC member holding a plant at a church gathering" loading="lazy"><em>Fellowship</em></div><h5>Growing together</h5><p>Sharing life with one another beyond the Sunday service.</p></article>
  <article class="post"><div class="ph"><img src="${p}assets/photos/children.jpg" alt="Children and youth gathered under a tree" loading="lazy" style="object-position:center 20%"><em>Community</em></div><h5>Reaching the next generation</h5><p>Meeting the children and young people of Kuwadzana where they are.</p></article>
  <article class="post"><div class="ph"><img src="${p}assets/photos/ladies.jpg" alt="A KCC member smiling at a church gathering" loading="lazy" style="object-position:center 20%"><em>Family</em></div><h5>A place to belong</h5><p>Wherever you are on your journey, there is a seat for you at KCC.</p></article>
 </div>
</div></section>

${cta(p)}`,
});

// VISIT (I'm new)
add("visit/", {
  title: "I’m New", desc: "Planning your first visit to Kuwadzana Community Church: service time, what to expect, directions and answers to common questions.",
  heroArgs: ["fellowship.jpg", "I’m New", "Come as you are", "center 35%"],
  body: (p) => `<section class="sp"><div class="wrap events">
 <div>
  <p class="eyebrow">Plan Your Visit</p>
  <h2>We’d love to welcome you</h2>
  <p>Whether you are exploring faith or looking for a church home, there is a seat for you at KCC. Join us this Sunday at ${site.sunday.label}.</p>
  ${details(p).replace("<dl>", '<dl style="margin-top:26px" class="vdl">')}
 </div>
 <div>
  ${gatherings.map(evRow).join("\n  ")}
 </div>
</div></section>

<section class="lightbg sp"><div class="wrap narrow">
 <div class="center"><p class="eyebrow">Good To Know</p><h2>Your Questions</h2></div>
 <div class="faq">
  ${faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n  ")}
 </div>
</div></section>

<section class="sp"><div class="wrap">
 <p class="eyebrow">Find Us</p>
 <h2>${esc(site.address)}</h2>
 <p class="lead">${esc(site.city)}. <a href="${maps}" ${ext} style="color:var(--red);font-weight:700">Get directions →</a></p>
 ${mapBox}
</div></section>

${cta(p, "Let us know you’re coming and we’ll look out for you on Sunday.", "Say Hello", "contact/")}`,
});

// MINISTRIES
add("ministries/", {
  title: "Ministries", desc: "Ministries at Kuwadzana Community Church: Raising Champions kids football, children, youth, cell groups, ladies, men, praise and worship and more.",
  heroArgs: ["sports.jpg", "Ministries", "Find your place", "center 40%"],
  body: (p) => `<section class="sp" id="champions"><div class="wrap feature">
 <img src="${p}assets/photos/champions-poster.jpg" alt="Raising Champions for Christ poster: child evangelism through sport, every Saturday with football legend Cheetah Antonio" loading="lazy">
 <div>
  <p class="eyebrow">Kids Sport Ministry</p>
  <h2>Raising Champions for Christ</h2>
  <p>Every Saturday our grounds fill with children playing football, learning God’s love and dreaming big, coached by football legend Cheetah Antonio.</p>
  <p>Bring your child. All children are welcome.</p>
  <div class="tags"><span>Football</span><span>Faith</span><span>Friendship</span><span>Fun</span></div>
  <a class="btn" style="margin-top:20px" href="${p}contact/">Ask About Saturdays</a>
 </div>
</div></section>

<section class="lightbg sp"><div class="wrap center">
 <p class="eyebrow">Discipleship Through Relationships</p>
 <h2>Our Ministries</h2>
 <div class="cards">
  ${ministries.filter((m) => m.img).map((m) => `<article class="post" id="${m.id}"><div class="ph"><img src="${p}assets/photos/${m.img}" alt="" loading="lazy" style="object-position:${m.pos || "center"}"><em>${esc(m.kicker)}</em></div><h5>${esc(m.name)}</h5><p>${esc(m.text)}</p></article>`).join("\n  ")}
 </div>
</div></section>

<section class="sp"><div class="wrap center">
 <p class="eyebrow">Serve With Us</p>
 <h2>More Ways To Belong</h2>
 <div class="grid3">
  ${ministries.filter((m) => !m.img).map((m) => `<div class="tcard" id="${m.id}" style="background:var(--light)"><small>${esc(m.kicker)}</small><h5>${esc(m.name)}</h5><p>${esc(m.text)}</p></div>`).join("\n  ")}
  <div class="tcard" style="background:var(--dark)"><small style="color:var(--gold)">Get involved</small><h5 style="color:#fff">Not sure where you fit?</h5><p style="color:#c9c9cc">Tell us what you love doing and we’ll help you find your place.</p><a class="btn orange" style="margin-top:18px;animation:none" href="${p}contact/">Talk To Us</a></div>
 </div>
</div></section>

${cta(p)}`,
});

// EVENTS
add("events/", {
  title: "Events", desc: "What’s on at Kuwadzana Community Church: Sunday service at 08:30 AM, Raising Champions on Saturdays, cell groups and special events.",
  heroArgs: ["gathering.jpg", "Events", "What’s on at KCC", "center 40%"],
  body: (p) => `<section class="sp"><div class="wrap events">
 <div>
  <p class="eyebrow">Every Week</p>
  <h2>Our Weekly Rhythm</h2>
  <p>This week at Kuwadzana Community Church, where faith meets fellowship. Follow our Facebook page for the latest announcements.</p>
  <a class="btn" style="margin-top:28px" href="${site.facebook}" ${ext}>KCC On Facebook</a>
 </div>
 <div>
  ${gatherings.map(evRow).join("\n  ")}
 </div>
</div></section>

${specialEvents.map((e) => `<section class="lightbg sp"><div class="wrap feature">
 <img src="${p}assets/photos/${e.img}" alt="${esc(e.title)} poster" loading="lazy">
 <div>
  <p class="eyebrow">Coming Up</p>
  <h2>${esc(e.title)}</h2>
  <div class="tags"><span>${esc(e.when)}</span></div>
  <p>${esc(e.text)}</p>
  <a class="btn" style="margin-top:14px" href="${p}contact/">Ask For Details</a>
 </div>
</div></section>`).join("\n")}

${cta(p)}`,
});

// CHURCH NOTES (index)
{
  const series = [...new Set(notes.map((n) => n.series))];
  add("notes/", {
    title: "Church Notes", desc: "Sermon notes from Kuwadzana Community Church: key scripture, the big idea, main points, questions for cell group and a prayer.",
    heroArgs: ["bible-page.jpg", "Church Notes", "Church Notes", "center"],
    body: (p) => `<section class="sp"><div class="wrap center">
 <p class="eyebrow">From The Pulpit</p>
 <h2>Take the Word home</h2>
 <p class="lead">Notes from our Sunday messages: the key scripture, the big idea, the main points, and questions to talk through in your cell group.</p>
 <div class="tools">
  <input id="nsearch" type="search" placeholder="Search notes" aria-label="Search notes">
  <button class="chip" type="button" data-series="" aria-pressed="true">All</button>
  ${series.map((s) => `<button class="chip" type="button" data-series="${esc(s)}" aria-pressed="false">${esc(s)}</button>`).join("\n  ")}
 </div>
 <p class="count" id="ncount" aria-live="polite">${notes.length} notes</p>
 <div class="cards" style="margin-top:36px">
  ${notes.map((n) => noteCard(p, n)).join("\n  ")}
 </div>
 <p id="nempty" hidden style="margin-top:30px">No notes match your search.</p>
</div></section>

${cta(p)}`,
  });

  notes.forEach((n, i) => {
    const prev = notes[i + 1], next = notes[i - 1];
    add(`notes/${n.slug}/`, {
      title: n.title, desc: n.bigIdea,
      heroArgs: [n.img, `<a href="../">Church Notes</a>`, esc(n.title), "center 25%"],
      body: (p) => `<section class="sp"><article class="wrap narrow note">
 <p class="meta">${notesAreSamples ? `<span class="tags" style="display:inline-flex;margin:0 10px 0 0"><span>Sample note</span></span>` : ""}${fmtDate(n.date)} · ${esc(n.preacher)} · Series: ${esc(n.series)} · ${esc(n.scripture)}</p>
 <blockquote>“${esc(n.quote.text)}”<cite>${esc(n.quote.ref)} (KJV)</cite></blockquote>
 <div class="big"><p class="eyebrow">The Big Idea</p><p>${esc(n.bigIdea)}</p></div>
 ${n.sections.map((s, k) => `<h3><i>0${k + 1}</i>${esc(s.heading)}</h3>
 <p>${esc(s.text)}</p>
 <ul>${s.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`).join("\n ")}
 <div class="key"><small>Key Thought</small>${esc(n.keyThought)}</div>
 <h4>For your cell group</h4>
 <ul>${n.reflection.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
 <h4>Prayer</h4>
 <p class="pray">${esc(n.prayer)}</p>
 <div class="acts">
  <button class="btn" type="button" data-share>Share</button>
  <button class="btn line" type="button" data-print>Print</button>
  <a class="btn line" href="../">All Notes</a>
  ${prev ? `<a class="btn line" href="../${prev.slug}/">Older →</a>` : ""}
  ${next ? `<a class="btn line" href="../${next.slug}/">← Newer</a>` : ""}
 </div>
</article></section>

${cta(p)}`,
    });
  });
}

// PRAYER
add("prayer/", {
  title: "Prayer", desc: "Send a prayer request to Kuwadzana Community Church. Our pastors and prayer team will stand with you.",
  heroArgs: ["prayer-hands.jpg", "Prayer", "How can we pray for you?", "center 40%"],
  body: (p) => `<section class="sp"><div class="wrap contact">
 <div>
  <p class="eyebrow">Prayer Requests</p>
  <h2>You don’t have to carry it alone</h2>
  <p>Whatever you are facing, we would be honoured to pray with you. Share as much or as little as you like. You can stay anonymous.</p>
  <p style="margin-top:18px;font-family:'Kumbh Sans',sans-serif;font-weight:700;color:var(--dark);font-size:20px;line-height:1.4">“Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.”</p>
  <p class="eyebrow" style="margin-top:10px">Philippians 4:6 (KJV)</p>
  <p style="margin-top:24px">Prefer to talk? Call or WhatsApp the church office on <a href="${tel}" style="color:var(--red);font-weight:700">${site.phone}</a>.</p>
 </div>
 <form data-msg="Prayer request">
  <label class="f">Your name (optional)<input name="name" data-label="From" autocomplete="name"></label>
  <label class="f">How can we pray for you?<textarea name="request" data-label="Request" rows="6" required></textarea></label>
  <div class="checks" role="radiogroup" aria-label="Who may see this request">
   <label><input type="radio" name="share" data-label="Sharing" value="Keep this confidential to the pastors" checked>Keep it confidential to the pastors</label>
   <label><input type="radio" name="share" data-label="Sharing" value="You may share this with the prayer team">Share with the prayer team</label>
  </div>
  <div class="checks"><label><input type="checkbox" name="callback" value="I would like a pastor to call me">I’d like a pastor to call me</label></div>
  <label class="f">Phone number (optional)<input name="phone" data-label="My number" type="tel" autocomplete="tel"></label>
  ${sendRow}
 </form>
</div></section>

${cta(p)}`,
});

// GIVE
add("give/", {
  title: "Giving", desc: "Giving at Kuwadzana Community Church: partner with us in the work of the ministry in Kuwadzana and beyond.",
  heroArgs: ["bible-pew.jpg", "Giving", "Partner with us in the work", "center"],
  body: (p) => `<section class="sp"><div class="wrap center narrow">
 <p class="eyebrow">Giving Is Worship</p>
 <h2>“God loveth a cheerful giver”</h2>
 <p class="lead">Your generosity supports the ministry, outreach and care of our church family in Kuwadzana and beyond, from Saturday football to visits and prayer.</p>
 <p class="eyebrow" style="margin-top:22px">2 Corinthians 9:7 (KJV)</p>
</div>
<div class="wrap"><div class="grid3">
  ${giving.methods.map((m) => `<div class="tcard" style="background:var(--light)"><small>Ways to give</small><h5>${esc(m.name)}</h5><p>${m.detail ? `<b style="color:var(--dark)">${esc(m.detail)}.</b> ` : ""}${esc(m.note)}</p></div>`).join("\n  ")}
</div></div></section>

<section class="give sp"><div class="wrap">
 <div>
  <p class="eyebrow">Giving Details</p>
  <h2>Ask the church office</h2>
  <p>Online giving is not yet available on this site. For EcoCash and bank details, please contact the church office and we will send them to you directly.</p>
  <a class="btn orange" style="margin-top:28px" href="https://wa.me/${site.phoneIntl}?text=${encodeURIComponent("Hello KCC! Please send me the giving details.")}" ${ext}>Request Giving Details</a>
 </div>
 <div class="box">
  <h5>Church Office</h5>
  <ul>
   <li><b>Phone</b> &nbsp; <a href="${tel}">${site.phone}</a></li>
   <li><b>Email</b> &nbsp; <a href="mailto:${site.email}">${site.email}</a></li>
   <li><b>Address</b> &nbsp; ${esc(site.address)}</li>
  </ul>
 </div>
</div></section>

${cta(p)}`,
});

// CONTACT
add("contact/", {
  title: "Contact", desc: "Contact Kuwadzana Community Church: address, phone, WhatsApp, email and directions.",
  heroArgs: ["worship.jpg", "Contact", "Get in Touch", "center 25%"],
  body: (p) => `<section class="sp"><div class="wrap contact">
 <div>
  <p class="eyebrow">New To KCC?</p>
  <h2>Say hello</h2>
  <p>We would love to welcome you. Send us a message, call the office, or simply join us this Sunday.</p>
  ${details(p)}
  ${mapBox}
 </div>
 ${contactForm}
</div></section>

${cta(p)}`,
});

// ───────────── write files ─────────────
const out = (rel, text) => { const f = join(ROOT, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, text); };

for (const pg of pages) {
  const hero = pg.hero || phero(pg.p, ...pg.heroArgs);
  const body = typeof pg.body === "function" ? pg.body(pg.p) : pg.body;
  out(join(pg.path, "index.html"), layout({ ...pg, hero, body }));
}

out("404.html", layout({
  path: "404.html", p: "", abs: true, title: "Page not found", desc: "That page could not be found.",
  hero: phero(site.url + "/", "gathering.jpg", "Not found", "We couldn’t find that page").replace(`href="${site.url}/./"`, `href="${site.url}/"`),
  body: `<section class="sp"><div class="wrap center"><p class="eyebrow">Error 404</p><h2>Let’s get you back on track</h2><p class="lead">The page may have moved. Try the home page or plan your visit.</p><p style="margin-top:34px"><a class="btn" href="${site.url}/">Back To Home</a></p></div></section>`,
}));

out("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((x) => `  <url><loc>${site.url}/${x.path}</loc></url>`).join("\n")}\n</urlset>\n`);
out("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`Built ${pages.length} pages + 404, sitemap, robots`);
