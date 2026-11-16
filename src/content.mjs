// ─────────────────────────────────────────────────────────────
//  KCC website content. Edit this file, then run:  node build.mjs
//  Anything marked  // CONFIRM  should be checked by the church office.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Kuwadzana Community Church",
  short: "KCC",
  url: "https://ruerue123.github.io/kcc-website", // change when the church has its own domain
  founded: 1992,
  address: "104168 1st Street, Kuwadzana 6", // CONFIRM: KCC's logo card and Instagram say "10498 Kuwadzana 6"
  city: "Harare, Zimbabwe",
  mapsQuery: "Kuwadzana Community Church, Kuwadzana 6, Harare",
  phone: "078 430 2478",
  phoneIntl: "263784302478", // CONFIRM this number is on WhatsApp
  email: "faithministrieskcc25@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61572451777077",
  instagram: "https://www.instagram.com/kcc_faithministries",
  youtube: "https://www.youtube.com/@fmtv2053",
  faithMinistries: "https://faithmin.org/",
  bcc: "https://bccfm.org/",
  pastor: "Dr Chitanha",
  // Sunday service, Harare time. Also used by the countdown bar.
  sunday: { start: "08:30", end: "11:00", label: "08:30 AM" }, // CONFIRM end time
};

export const gatherings = [
  { day: "SUN", when: "08:30 AM", name: "Sunday Service", text: "Every Sunday at 104168 1st Street, Kuwadzana 6. Praise, prayer and the Word for the whole family." },
  { day: "SAT", when: "Weekly", name: "Raising Champions: Kids Football", text: "Child evangelism through sport with football legend Cheetah Antonio. All children are welcome. Contact us for the start time." }, // CONFIRM time
  { day: "TBC", when: "Weekly", name: "Cell Groups", text: "Small groups meeting in homes across Kuwadzana to pray, study and do life together. Contact us to find a group near you." }, // CONFIRM day and time
  { day: "TBC", when: "Weekly", name: "Prayer Meeting", text: "Day and time to be confirmed." }, // CONFIRM
];

export const specialEvents = [
  { title: "34th Anniversary Celebration", when: "Date to be announced", img: "anniversary.jpg", // CONFIRM date
    text: "Thirty-four years of God's grace, 1992 to 2026. All are welcome. Let's celebrate together!" },
];

export const theme = {
  eyebrow: "Our 2026 Theme",
  title: "Year of Jubilee:",
  subtitle: "Advancing to possess",
  ref: "Isaiah 61:1-3 NKJV",
  quote: "“The Spirit of the Lord God is upon Me, because the Lord has anointed Me to preach good tidings to the poor; He has sent Me to heal the brokenhearted, to proclaim liberty to the captives…”",
  note: "Faith Ministries celebrates 50 years since its founding in 1976: a Jubilee for every assembly, KCC included.",
};

export const vision = {
  vision: "Reach people and turn them into fully devoted followers of Christ",
  mission: "Discipleship Through Relationships",
  missionRef: "Matthew 28:19, Acts 2:42",
  missionLong: "Producing mature disciples of Christ who influence the spiritual, moral, social and economic fibre of the nation.",
  values: ["Intimacy with Christ", "Personal pastoring", "Servant leadership", "A commitment to integrity", "Emphasis on family", "Kingdom mentality"],
};

export const principles = [
  { icon: "M32 6v14M26 12h12M14 58V34l18-14 18 14v24zM26 58V44a6 6 0 0 1 12 0v14", title: "The Foundation Of Ministry Is Character", text: "Character is more important than ministry. Ministry is a gift from God whilst character is something you are responsible for.", ref: "Matthew 7:22-23" },
  { icon: "M10 38h44M14 38c0 9 8 16 18 16s18-7 18-16M32 8v20M24 20l8 8 8-8", title: "The Nature Of Ministry Is Service", text: "Jesus came not to be served but to serve. Greatness in the house of God is measured by service.", ref: "Matthew 20:26-28" },
  { icon: "M32 54S10 40 10 24a11 11 0 0 1 22-3 11 11 0 0 1 22 3c0 16-22 30-22 30z", title: "The Motive Of Ministry Is Love", text: "Everything God does flows from love, so everything we do must too: love the Lord, love the brethren, love the lost.", ref: "1 Corinthians 13" },
  { icon: "M8 16c8-4 16-4 24 2 8-6 16-6 24-2v34c-8-4-16-4-24 2-8-6-16-6-24-2zM32 18v34", title: "The Authority Of Ministry Is Submission", text: "Those who obey can be trusted with authority.", ref: "Hebrews 13:17" },
  { icon: "M32 8v48M18 22h28", title: "The Measure Of Ministry Is Sacrifice", text: "God has given to every person a measure of faith; we give ourselves fully in return.", ref: "Romans 12:1-3" },
];

// Ministries. Those with "img" show as photo cards; the rest as text cards.
// CONFIRM which of these KCC runs (several were assumed from the Faith Ministries pattern).
export const ministries = [
  { id: "children", name: "Children's Church", kicker: "Sundays", img: "children.jpg", pos: "center 20%",
    text: "Bible stories, worship and play in a safe, joyful space while parents attend the Sunday service." },
  { id: "youth", name: "Youth", kicker: "Teens & young adults", img: "sports.jpg",
    text: "A generation growing in Christ together: worship, mentoring, sport and service in the community." },
  { id: "cells", name: "Cell Groups", kicker: "Discipleship through relationships", img: "gathering.jpg", pos: "center 40%",
    text: "The heartbeat of Faith Ministries. Small groups in homes where everyone is known, prayed for and pastored." },
  { id: "ladies", name: "Ladies Ministry", kicker: "Women of virtue", img: "ladies2.jpg", pos: "center 25%",
    text: "Women encouraging women through prayer, teaching, mentorship and practical care." },
  { id: "worship", name: "Praise and Worship", kicker: "Music team", img: "singer.jpg", pos: "center 20%",
    text: "Leading the church into God's presence with excellence. Singers and musicians are welcome." },
  { id: "prayer", name: "Intercessors", kicker: "Prayer ministry", img: "worship.jpg", pos: "center 20%",
    text: "Standing in the gap for the church, our families and our nation." },
  { id: "men", name: "Men's Fellowship", kicker: "Iron sharpens iron",
    text: "Brotherhood, accountability and outings that build godly husbands, fathers and leaders." },
  { id: "couples", name: "Couples Ministry", kicker: "Marriage & family",
    text: "Strengthening marriages through teaching, counsel and fellowship between couples." },
  { id: "compassion", name: "Compassion", kicker: "Love in action",
    text: "Reaching the vulnerable in Kuwadzana with food, visits and prayer." },
  { id: "serve", name: "Ushers & Hospitality", kicker: "First impressions",
    text: "Welcoming every guest, caring for the house and making Sunday feel like family." },
  { id: "media", name: "Media", kicker: "Behind the scenes",
    text: "Sound, cameras and social media that carry the message beyond our walls." },
];

export const faqs = [
  ["What time should I arrive?", "The Sunday service starts at 08:30 AM. Come about 15 minutes early and our ushers will welcome you and help you find a seat."],
  ["What should I wear?", "Come as you are. You'll see everything from Sunday best to casual. What matters is that you're here."],
  ["What about my children?", "Children are welcome on Sundays, and every Saturday kids can join Raising Champions football on our grounds."],
  ["Where is the church?", "We meet at 104168 1st Street, Kuwadzana 6, Harare. Tap the map on this page for directions."],
  ["How do I get involved?", "Start with a cell group near you. From there you can serve in one of our ministries. Just tell us what you love doing."],
];

export const beliefs = [
  ["The Scriptures", "The Old and New Testaments are inspired by God — the infallible, authoritative rule of faith and conduct."],
  ["One God", "One true and living God, eternally existing as Father, Son and Holy Spirit."],
  ["Jesus Christ", "Fully God and fully man: born of a virgin, sinless, crucified for our sins, risen bodily, ascended and interceding for us."],
  ["Salvation", "By grace through faith in Christ — a new birth by the Holy Spirit into the family of God."],
  ["The Holy Spirit", "Present and active today: convicting, regenerating, sanctifying and empowering believers for ministry."],
  ["Divine healing", "Deliverance from sickness and affliction is provided for in the atonement."],
];

export const giving = {
  intro: "Giving is worship. Every tithe and offering helps us reach Kuwadzana with the gospel — from Saturday football to compassion visits.",
  verse: { text: "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.", ref: "2 Corinthians 9:7" },
  methods: [
    { name: "EcoCash", detail: null, note: "Merchant code available from the church office." }, // CONFIRM
    { name: "Bank transfer", detail: null, note: "Use your full name as the reference so we can acknowledge your gift." }, // CONFIRM
    { name: "In person", detail: "During any Sunday service", note: "Offering envelopes are available from the ushers." },
  ],
};

// ── Church notes ───────────────────────────────────────────────
// Structure mirrors how notes are taken in church: key scripture, big idea,
// numbered points, key thought, questions for cell group, and a prayer.
export const notes = [
  {
    slug: "advancing-to-possess", img: "worship.jpg",
    title: "Advancing to Possess",
    date: "2026-11-08",
    preacher: "KCC Teaching Team", // CONFIRM preacher names on real notes
    series: "Year of Jubilee",
    scripture: "Joshua 1:1–9",
    quote: { text: "Every place that the sole of your foot shall tread upon, that have I given unto you.", ref: "Joshua 1:3" },
    bigIdea: "God has already given the promise; our part is to rise, step forward in faith and take possession.",
    sections: [
      { heading: "The promise comes before the possession",
        text: "Before Israel crossed the Jordan, God spoke in the past tense: “I have given you.” Jubilee is a season of restoration, but restored things must still be walked into.",
        points: ["God's promises are settled in heaven before they are seen on earth.", "Delay is not denial — Moses died, but the promise did not.", "Ask: what has God already said over my life, family and work?"] },
      { heading: "Possession requires movement",
        text: "“Arise, go over this Jordan.” The land did not come to Joshua; Joshua had to go to the land.",
        points: ["Faith has feet: prayer must be followed by obedience.", "Your next step is usually small and specific.", "Comfort zones are the enemies of inheritance."] },
      { heading: "Courage is commanded, not felt",
        text: "Three times God tells Joshua to be strong and courageous. Courage is not the absence of fear but obedience in its presence.",
        points: ["Courage grows from meditating on the Word day and night.", "God's presence is the source: “I will be with thee.”", "Courage is contagious — leaders set the tone for families."] },
    ],
    keyThought: "Jubilee restores what was lost; advancing possesses what was promised.",
    reflection: ["Which promise of God are you still waiting on?", "What is one concrete step of obedience you can take this week?", "How can our cell group encourage you to be courageous?"],
    prayer: "Lord, thank You for every promise You have spoken. Give me courage to arise and walk into all You have prepared. Amen.",
  },
  {
    slug: "train-up-a-child", img: "children.jpg",
    title: "Raising Champions: Train Up a Child",
    date: "2026-11-01",
    preacher: "KCC Teaching Team",
    series: "Family",
    scripture: "Proverbs 22:6",
    quote: { text: "Train up a child in the way he should go: and when he is old, he will not depart from it.", ref: "Proverbs 22:6" },
    bigIdea: "Children are not the church of tomorrow — they are disciples today, and the whole church shares in raising them.",
    sections: [
      { heading: "Training is intentional",
        text: "“Train” speaks of dedication and direction. Godly children are not an accident; they are the fruit of consistent investment.",
        points: ["Model faith at home — children learn more by sight than by sound.", "Make the Word part of everyday life (Deuteronomy 6:6–7).", "Celebrate small wins and godly character."] },
      { heading: "Meet children where they are",
        text: "Jesus took children in His arms. Through Raising Champions we meet children on the football field and introduce them to the One who loves them.",
        points: ["Play opens doors that preaching alone cannot.", "Every child on the field is a soul we are responsible for.", "Volunteers: coaching, first aid, refreshments and prayer."] },
      { heading: "It takes a church",
        text: "Discipleship through relationships includes the next generation. Every adult can be a spiritual parent, uncle or aunt.",
        points: ["Know the names of the children in your row.", "Pray for a child by name this week.", "Invite a family to Saturday football."] },
    ],
    keyThought: "What we sow into children today, the nation will harvest tomorrow.",
    reflection: ["Who poured faith into you as a child?", "How can you practically invest in a child at KCC this month?", "What habits in our homes teach children about God?"],
    prayer: "Father, raise champions for Christ in Kuwadzana. Make our homes and our church places where children meet You. Amen.",
  },
  {
    slug: "hitherto-the-lord-hath-helped-us", img: "fellowship.jpg",
    title: "Hitherto the Lord Hath Helped Us",
    date: "2026-10-25",
    preacher: "KCC Teaching Team",
    series: "34 Years of Grace",
    scripture: "1 Samuel 7:7–14",
    quote: { text: "Then Samuel took a stone… and called the name of it Ebenezer, saying, Hitherto hath the Lord helped us.", ref: "1 Samuel 7:12" },
    bigIdea: "Remembering God's faithfulness in the past gives us confidence to trust Him with the future.",
    sections: [
      { heading: "Raise your Ebenezer",
        text: "Samuel set up a stone so Israel would never forget. Since 1992, KCC has its own stones of remembrance — prayers answered, lives changed, families restored.",
        points: ["Gratitude is a spiritual discipline, not just a feeling.", "Tell your testimony — it builds someone else's faith.", "Write down what God has done for you this year."] },
      { heading: "Help came after repentance",
        text: "Before victory, Israel put away their idols and returned to the Lord. Grace finds a people who return to Him with all their hearts.",
        points: ["Revival begins with surrender, not strategy.", "What “idols” compete for first place in our lives?"] },
      { heading: "“Hitherto” means the story continues",
        text: "Hitherto — up to this point. Thirty-four years are a testimony, not a finish line. The same God carries us forward.",
        points: ["Past faithfulness is a down payment on future faithfulness.", "Every generation must encounter God for itself."] },
    ],
    keyThought: "The God who helped us this far will not leave us now.",
    reflection: ["What is one “Ebenezer” moment in your life?", "How can we pass on KCC's story to new members and the next generation?"],
    prayer: "Lord, thank You for 34 years of grace at KCC. As You have helped us, so lead us into the years ahead. Amen.",
  },
  {
    slug: "discipleship-through-relationships", img: "gathering.jpg",
    title: "Discipleship Through Relationships",
    date: "2026-10-18",
    preacher: "KCC Teaching Team",
    series: "Foundations",
    scripture: "Acts 2:42–47",
    quote: { text: "And they continued stedfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers.", ref: "Acts 2:42" },
    bigIdea: "We grow best in the company of others — Christ makes disciples through people who walk with people.",
    sections: [
      { heading: "The early church was devoted",
        text: "Four commitments marked the first believers: the Word, fellowship, the breaking of bread and prayer. They are still our blueprint.",
        points: ["Teaching shapes what we believe.", "Fellowship shapes who we become.", "Prayer keeps us dependent on God."] },
      { heading: "Relationships are the delivery system",
        text: "Jesus chose twelve “that they should be with him.” Discipleship is caught as much as it is taught.",
        points: ["Everyone needs a Paul, a Barnabas and a Timothy.", "Cell groups are where relationships become real.", "Pastoring is personal at KCC."] },
      { heading: "Healthy community grows",
        text: "“The Lord added to the church daily.” Growth was the fruit of a loving, generous, praying community.",
        points: ["Open homes open hearts.", "Generosity is a witness to our neighbours."] },
    ],
    keyThought: "You cannot be a fully devoted follower of Christ alone.",
    reflection: ["Who is discipling you right now? Who are you discipling?", "What would make our cell group more like Acts 2?"],
    prayer: "Jesus, connect me with the people You will use to grow me, and make me a blessing in someone else's walk. Amen.",
  },
];

// The notes above are drafts written to show the format. While this is true,
// each one carries a "Sample" label. Set to false once real sermon notes replace them.
export const notesAreSamples = true;
