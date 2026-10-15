import { Article, CrosswordClue, RecipeData, WirecutterPick, LiveUpdateEntry } from '../types/news';

export const ARTICLES_DATA: Article[] = [
  // --- COLUMN 1 (LEFT LEAD) ---
  {
    id: 'women-trump-admin',
    title: 'High-Ranking Women Are Leaving the Trump Administration',
    summary: "As the president's second term looms, those heading for the exits are female officials pointing to conflicting internal policies.",
    category: 'U.S. Politics',
    readTime: '3 MIN READ',
    byline: 'By Maggie Haberman, Jonathan Swan and Katie Rogers',
    authorRole: 'White House Correspondents',
    date: 'Wednesday, October 14, 2026',
    sectionKey: 'left',
    tags: ['Washington', 'White House', 'Federal Agencies', 'Personnel'],
    pullQuote: {
      text: 'The departures represent not merely a staff turnover, but a sharp pivot in how executive priorities are being contested from within.',
      attribution: 'Senior Administration Official'
    },
    paragraphs: [
      'WASHINGTON — In the quiet corridors of the Eisenhower Executive Office Building, a steady exodus has gained momentum over the past three weeks. A cadre of senior female aides and agency deputy chiefs who guided high-profile initiatives through turbulent legislative cycles have tendered their resignations.',
      'Interviews with more than a dozen current and former administration officials portray a workplace increasingly dominated by an insular circle of transition strategists whose priorities frequently clash with established departmental directives.',
      'Among those departing are key figures in budget management, domestic policy coordination, and legal counsel. Several individuals spoke on condition of anonymity, citing non-disclosure agreements and personal professional relationships.',
      '“It became untenable to reconcile what was being directed in morning strategy briefs with the statutory realities of our regulatory mandates,” said one deputy administrator who stepped down on Monday.',
      'White House spokespeople pushed back firmly on characterizations of institutional friction, maintaining that natural transitions are routine during presidential cycles and praising the dedicated service of outgoing personnel.'
    ]
  },
  {
    id: 'kimberly-guilfoyle',
    title: 'The Steep Rise and Sudden Fall of Kimberly Guilfoyle',
    summary: 'Once a key fixture in the inner circle, her trajectory shift signals evolving alliances within the primary campaign trail.',
    category: 'Campaign 2026',
    readTime: '5 MIN READ',
    byline: 'By Shane Goldmacher and Maggie Haberman',
    authorRole: 'Political Analysts',
    date: 'Wednesday, October 14, 2026',
    sectionKey: 'left',
    tags: ['Elections', 'Fundraising', 'G.O.P.', 'Strategy'],
    pullQuote: {
      text: 'Her rapid rise as a prime-time fundraiser showed how quickly celebrity and politics could fuse; her retreat shows how fast the tide can recede.',
      attribution: 'Campaign Finance Historian'
    },
    paragraphs: [
      'For nearly a decade, Kimberly Guilfoyle commanded attention across convention floors, donor ballrooms, and televised campaign rallies with an unmistakably fiery cadence that galvanized grassroots donors.',
      'Yet over recent weeks, her presence at key donor summits has noticeably diminished. Party insiders point to restructured finance committees and new advisory councils that have systematically realigned the campaign’s center of gravity.',
      'Financial disclosure records filed earlier this week indicate shifts in vendor disbursements and fundraising consultancies, underscoring how operational changes behind the scenes reflect the ruthless mechanics of national political campaigns.',
      'Longtime associates insist Guilfoyle remains committed to conservative causes, though colleagues acknowledge the sharp turn in her proximity to day-to-day decision making.'
    ]
  },
  {
    id: 'fed-pivot-analysis',
    title: 'Why the Federal Reserve Is Prepared to Pivot Faster Than Expected',
    summary: 'A cooling labor market and recalibrated inflation expectations are driving central bankers toward unexpected rate adjustments.',
    category: 'Analysis',
    isAnalysis: true,
    readTime: '4 MIN READ',
    byline: 'By Jeanna Smialek',
    authorRole: 'Federal Reserve Reporter',
    date: 'Wednesday, October 14, 2026',
    sectionKey: 'left',
    tags: ['Economy', 'Federal Reserve', 'Interest Rates', 'Inflation'],
    pullQuote: {
      text: 'The dual mandate is no longer a matter of balancing risks — policymakers now see clear danger in delaying monetary easing.',
      attribution: 'Jeanna Smialek, Chief Economics Correspondent'
    },
    paragraphs: [
      'WASHINGTON — When Federal Reserve officials gathered for their annual Jackson Hole colloquium late this summer, the consensus signaled a measured, glacial path toward interest rate normalization.',
      'Now, with fresh unemployment data and revised wage figures in hand, central bankers appear poised to pivot at a velocity that few Wall Street forecasters anticipated even a month ago.',
      'Behind closed doors at the Marriner S. Eccles Building, discussions have pivoted from inflation persistence to shielding employment gains. Chair Jerome Powell noted in recent remarks that waiting until economic fissures widen is a luxury the central bank cannot afford.',
      'Market futures surged this morning, with traders pricing in a 75 percent probability of a 50-basis-point reduction at the upcoming Federal Open Market Committee meeting.'
    ]
  },

  // --- COLUMN 2 (CENTER HERO & SUB-STORIES) ---
  {
    id: 'trump-press-secretary',
    title: 'Trump’s New Press Secretary: Not Quite Attorney at Law',
    summary: 'Robin Carleone told The New York Times that dire confusion over bar credentials is the result of one big misunderstanding.',
    category: 'White House',
    readTime: '4 MIN READ',
    byline: 'By Michael S. Schmidt, Maggie Haberman and Alan Feuer',
    authorRole: 'Investigative Reporters',
    date: 'Wednesday, October 14, 2026',
    photoUrl: '/src/assets/images/nyt_hero_press_secretary_1792031945882.jpg',
    placeholderUrl: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    photoCaption: 'Robin Carleone arriving for a transition briefing on Capitol Hill on Tuesday morning.',
    photoCredit: 'Doug Mills/The New York Times',
    sectionKey: 'hero',
    liveUpdatesBadge: {
      text: '• Live Updates: Cabinet Hearings',
      subtext: 'Lawmakers question selections for critical homeland and diplomatic posts.'
    },
    tags: ['White House', 'Legal', 'Press Office', 'Congress'],
    pullQuote: {
      text: 'I never claimed to hold an active trial bar license in the Southern District. The biography on the briefing document conflated compliance counsel with courtroom litigator.',
      attribution: 'Robin Carleone'
    },
    paragraphs: [
      'WASHINGTON — The incoming White House press secretary, Robin Carleone, confronted widespread scrutiny on Wednesday regarding credentials listed in official transition documents that described her as an experienced federal litigator.',
      'State licensing records in Virginia, Florida, and the District of Columbia reveal that Ms. Carleone completed legal coursework and held clerkships but was never formally admitted to the practice of law in any jurisdiction.',
      'In a 45-minute phone interview with The New York Times on Tuesday evening, Ms. Carleone characterized the controversy as a bureaucratic drafting error by junior communications staffers preparing preliminary press packets.',
      '“I have spent my entire adult life navigating public policy and regulatory communication,” Ms. Carleone said. “I never represented clients in courtroom trials, and anyone who actually knows my work understands that my role has always been strategic, not jurisdictional.”',
      'The revelation has nevertheless provided fresh ammunition for Senate committee members gearing up for contentious confirmation hearings across several related cabinet nominations scheduled for later this week.'
    ]
  },
  {
    id: 'europe-geopolitics',
    title: 'Europe Prepares for Shifting Geopolitical Alliances Under New U.S. Leadership',
    summary: 'Diplomats gathered in Brussels expressed guarded optimism despite looming tariff warnings and security questions.',
    category: 'World',
    readTime: '4 MIN READ',
    byline: 'By Steven Erlanger and Matina Stevis-Gridneff',
    authorRole: 'European Bureau',
    date: 'Wednesday, October 14, 2026',
    sectionKey: 'center-sub',
    tags: ['Europe', 'NATO', 'Diplomacy', 'Trade'],
    paragraphs: [
      'BRUSSELS — European Union envoys and NATO defense ministers huddled in emergency sessions throughout Wednesday, seeking common ground on collective deterrence and transatlantic trade negotiations.',
      'While public remarks emphasized unity and continuity, private conversations revealed widespread anxiety over the prospect of unilateral trade tariffs and renegotiated defense spending thresholds.',
      'Several Nordic and Baltic leaders urged immediate ratification of expanded joint procurement contracts, signaling that the continent is preparing to shoulder an unprecedented share of its own conventional security.'
    ]
  },
  {
    id: 'housing-affordability',
    title: 'Housing Affordability Remains Tight Across Major Metropolitan Corridors',
    summary: 'A slight decline in benchmark interest rates failed to ignite significant homebuyer optimism this autumn.',
    category: 'Business',
    readTime: '3 MIN READ',
    byline: 'By Conor Dougherty and Peter Eavis',
    authorRole: 'Real Estate & Urban Economics',
    date: 'Wednesday, October 14, 2026',
    sectionKey: 'center-sub',
    tags: ['Housing', 'Mortgages', 'Urban Living', 'Economy'],
    paragraphs: [
      'NEW YORK — Despite modest reductions in average 30-year fixed mortgage rates, home sales across the nation’s largest metropolitan areas dropped 2.4 percent last month, according to the National Association of Realtors.',
      'Economists point to the persistent "lock-in effect," wherein existing homeowners who secured sub-3 percent loans during 2020 and 2021 refuse to list their properties, choking off inventory and keeping median sales prices near record peaks.',
      'For young prospective buyers in cities like Atlanta, Denver, and Seattle, starter homes remain largely out of reach without substantial familial assistance.'
    ]
  },

  // --- COLUMN 3 (OPINION & WIRECUTTER) ---
  {
    id: 'friedman-world-complicated',
    title: 'The World Is Getting More Complicated, Not Simpler',
    summary: 'Why simple slogans fail when confronted with shifting Middle East realities and multipolar tensions.',
    category: 'Opinion',
    readTime: '5 MIN READ',
    byline: 'By Thomas L. Friedman',
    authorRole: 'Foreign Affairs Columnist',
    date: 'Wednesday, October 14, 2026',
    sectionKey: 'opinion',
    tags: ['Opinion', 'Foreign Affairs', 'Geopolitics'],
    pullQuote: {
      text: 'Whenever you hear a politician propose a bumper-sticker solution to a five-variable diplomatic equation, run in the other direction.',
      attribution: 'Thomas L. Friedman'
    },
    paragraphs: [
      'If you have been listening to the campaign trail rhetoric over the past six months, you might conclude that international statecraft is merely a contest of willpower between bold leaders and timid bureaucrats.',
      'Having just returned from visits to Riyadh, Tel Aviv, and Doha, I can report that the actual geopolitical terrain resembles less a chessboard and more a multi-dimensional kaleidoscope.',
      'Every major regional actor is concurrently hedging their security bets, expanding technological pacts with Asian capitals, and negotiating energy transition blueprints that defy traditional partisan pigeonholes.',
      'Until our political class acknowledges that 21st-century diplomacy is about managing friction rather than decreeing total triumph, we will remain perpetually astonished by the next foreseeable crisis.'
    ]
  },
  {
    id: 'krugman-tariff-mirage',
    title: 'The Mirage of a 19th-Century Tariff Revival',
    summary: 'Protectionism sounds appealing in rallies, but modern supply chains don’t bend to nostalgic economic fantasies.',
    category: 'Opinion',
    readTime: '4 MIN READ',
    byline: 'By Paul Krugman',
    authorRole: 'Economics Columnist',
    date: 'Wednesday, October 14, 2026',
    sectionKey: 'opinion',
    tags: ['Opinion', 'Economics', 'Trade Policy'],
    pullQuote: {
      text: 'You cannot protect a domestic manufacturing process by imposing punitive duties on the specialized subcomponents that make the factory run in the first place.',
      attribution: 'Paul Krugman'
    },
    paragraphs: [
      'There is a persistent romantic myth in American politics that the late 19th-century Gilded Age was an era of unvarnished prosperity powered entirely by high import tariffs.',
      'This narrative conveniently ignores the catastrophic bank panics of 1873 and 1893, the grinding agricultural depressions that spurred the Populist revolt, and the fundamental differences between a resource-rich agrarian continent and today’s globally integrated technological economy.',
      'Modern finished goods are not produced in a single domestic facility; they represent thousands of specialized components crossing international borders multiple times.',
      'Taxing those intermediate inputs does not revive lost manufacturing jobs; it raises costs for domestic businesses, sparks reciprocal countermeasures abroad, and punishes consumer wallets.'
    ]
  },
  {
    id: 'pamela-paul-screen-childhood',
    title: 'What Happens When the Screen Takes Over Childhood Completely?',
    summary: 'A compelling examination of schools reconsidering digital-first instruction in favor of tactile learning and quiet attention.',
    category: 'Opinion',
    readTime: '4 MIN READ',
    byline: 'By Pamela Paul',
    authorRole: 'Opinion Columnist',
    date: 'Wednesday, October 14, 2026',
    sectionKey: 'opinion',
    tags: ['Opinion', 'Education', 'Parenting', 'Technology'],
    paragraphs: [
      'For fifteen years, school districts across the country raced to equip every student with personal touchscreens and algorithmic learning software, promised as the great democratic equalizer in modern pedagogy.',
      'Today, that experiment is yielding a sobering reckoning. Across test scores, reading stamina, and social-emotional resilience, the results are unambiguous: continuous digital mediation erodes deep contemplation.',
      'A growing coalition of public and independent educators is now enacting cell phone prohibitions and returning to physical notebooks, open-ended library browsing, and face-to-face peer discussions.',
      'The most radical educational luxury of the coming decade will not be the newest AI interface, but the human capacity to sit quietly with an undivided mind.'
    ]
  },

  // --- ARTS & LEISURE SECTION ---
  {
    id: 'tv-shows-season',
    title: 'The Best TV Shows of the Season You Might Have Missed',
    summary: 'From quiet British police procedurals to vibrant workplace comedies, here is what deserves your queue this autumn.',
    category: 'Television',
    readTime: '6 MIN READ',
    byline: 'By James Poniewozik and Mike Hale',
    authorRole: 'Television Critics',
    date: 'Wednesday, October 14, 2026',
    photoUrl: '/src/assets/images/nyt_tv_prestige_drama_1792031947181.jpg',
    placeholderUrl: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    photoCaption: 'A look at the most inventive television narratives streaming this season.',
    sectionKey: 'arts',
    tags: ['Television', 'Streaming', 'Culture', 'Reviews'],
    paragraphs: [
      'In an era overflowing with multi-million-dollar fantasy epics and formulaic true-crime miniseries, some of the most captivating narrative work is happening quietly on the margins of streaming libraries.',
      'This season’s standouts include an understated six-episode Welsh mystery that turns on community memory rather than forensic pyrotechnics, alongside a brilliant culinary mockumentary set in an unheralded Cleveland catering company.',
      'What ties these disparate productions together is a welcome faith in viewer patience and sharply observed character study.'
    ]
  },
  {
    id: 'new-books-recommend',
    title: '10 New Books We Recommend This Week',
    summary: 'A breathtaking biography of an forgotten explorer leads this week’s selections across fiction, history, and poetry.',
    category: 'Books',
    readTime: '5 MIN READ',
    byline: 'By Gregory Cowles and Joumana Khatib',
    authorRole: 'Book Reviewers',
    date: 'Wednesday, October 14, 2026',
    photoUrl: '/src/assets/images/nyt_books_recommendation_1792031948425.jpg',
    placeholderUrl: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    photoCaption: 'Notable releases selected by editors of The New York Times Book Review.',
    sectionKey: 'arts',
    tags: ['Books', 'Literature', 'History', 'Fiction'],
    paragraphs: [
      'This week’s curated recommendations traverse the forgotten maritime expeditions of the late 18th century, a luminous debut novel set amidst the textile mills of Northern Portugal, and an incisive history of algorithmic antitrust.',
      'Leading our list is “The Navigator’s Ghost,” an extraordinary biographical feat that reconstructs the fraught circumnavigations of Jeanne Baret, the first woman to sail around the globe.',
      'Each work reflects meticulous prose craftsmanship and a profound curiosity about how past decisions continue to cast shadows across our present moment.'
    ]
  },
  {
    id: 'braised-chicken-thighs',
    title: 'Crispy Braised Chicken Thighs With Leeks and Mustard',
    summary: 'A rich, comforting one-pan dinner that feels fancy without the fussy preparation.',
    category: 'Cooking',
    readTime: '4 MIN READ',
    byline: 'By Melissa Clark',
    authorRole: 'Food Columnist & Cookbook Author',
    date: 'Wednesday, October 14, 2026',
    photoUrl: '/src/assets/images/nyt_crispy_braised_chicken_1792031948025.jpg',
    placeholderUrl: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    photoCaption: 'Golden chicken thighs nestled in a tender mustard and white wine leek reduction.',
    sectionKey: 'arts',
    tags: ['Cooking', 'Recipes', 'Dinner', 'Autumn'],
    paragraphs: [
      'When October days grow brisk and darkness falls before dinner is on the table, few dishes deliver as much solace per minute of effort as bone-in, skin-on chicken thighs seared until amber-crisp.',
      'In this recipe, meltingly soft leeks and whole-grain Dijon mustard build an unctuous, aromatic bed in the same skillet, deglazed with a splash of dry vermouth or Riesling.',
      'The result is a restaurant-caliber braise where the chicken skin remains crackling above the surface while the savory meat underneath becomes fork-tender.'
    ]
  },
  {
    id: 'crossword-connections-game',
    title: 'Play Today’s Mini Crossword and Connections',
    summary: 'Challenge your vocabulary and pattern-finding intuition in minutes.',
    category: 'Games',
    readTime: '2 MIN READ',
    byline: 'By Joel Fagliano and Wyna Liu',
    authorRole: 'NYT Games Editors',
    date: 'Wednesday, October 14, 2026',
    photoUrl: '/src/assets/images/nyt_games_mini_crossword_1792031948603.jpg',
    placeholderUrl: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    photoCaption: 'Today’s daily Mini Crossword puzzle 5x5 board.',
    sectionKey: 'arts',
    tags: ['Games', 'Crossword', 'Puzzles', 'Word Games'],
    paragraphs: [
      'Every morning, millions of word enthusiasts begin their daily routine with the NYT Mini Crossword. Designed to be solved in under two minutes, the 5x5 grid combines classic crossword misdirection with accessible wordplay.',
      'Click the button below to launch today’s interactive puzzle board, test your speed on the timer, and compete against the clock!'
    ]
  }
];

export const RECIPE_DETAILS: RecipeData = {
  title: 'Crispy Braised Chicken Thighs With Leeks and Mustard',
  author: 'Melissa Clark',
  yieldInfo: '4 servings',
  timeInfo: '45 minutes (15 min active)',
  rating: 4.9,
  ratingCount: 1420,
  summary: 'A rich, comforting one-pan dinner where chicken thighs are seared until deeply golden, then nestled in tender, braised leeks steeped in dry white wine, whole-grain Dijon, and fresh thyme.',
  ingredients: [
    { item: 'Bone-in, skin-on chicken thighs, patted very dry', amount: '2 pounds (4 to 6 thighs)' },
    { item: 'Kosher salt and freshly cracked black pepper', amount: 'To taste' },
    { item: 'Extra-virgin olive oil', amount: '1 tablespoon' },
    { item: 'Large leeks (white and pale green parts), halved and sliced', amount: '3 cups' },
    { item: 'Garlic cloves, thinly sliced', amount: '3 cloves' },
    { item: 'Dry white wine or dry vermouth', amount: '½ cup' },
    { item: 'Low-sodium chicken broth', amount: '½ cup' },
    { item: 'Whole-grain Dijon mustard', amount: '2 tablespoons' },
    { item: 'Smooth Dijon mustard', amount: '1 tablespoon' },
    { item: 'Fresh thyme sprigs', amount: '4 sprigs' },
    { item: 'Fresh flat-leaf parsley, chopped for garnish', amount: '2 tablespoons' }
  ],
  steps: [
    'Season the chicken generously on both sides with kosher salt and pepper. Heat olive oil in a wide, heavy-bottomed skillet or Dutch oven over medium-high heat.',
    'Add chicken thighs skin-side down in a single layer. Cook without moving until the skin is deep golden brown and crisp, 9 to 11 minutes. Flip and brown the other side for 2 minutes. Transfer chicken to a warm plate (it will finish cooking later).',
    'Pour off all but 2 tablespoons of fat from the skillet. Reduce heat to medium. Add leeks and a pinch of salt. Cook, stirring occasionally, until soft and translucent, about 6 minutes. Add garlic and cook 1 minute more.',
    'Pour in white wine, scraping up any browned bits from the bottom. Simmer until reduced by half, about 2 minutes. Whisk in chicken broth, whole-grain mustard, smooth Dijon, and thyme sprigs.',
    'Nestle the chicken thighs back into the pan, skin-side UP, ensuring the crispy skin remains above the liquid line. Reduce heat to medium-low, cover partially, and simmer until the internal temperature reaches 175°F, about 15 to 18 minutes.',
    'Garnish with chopped fresh parsley. Serve immediately with crusty sourdough or buttered egg noodles.'
  ]
};

export const WIRECUTTER_COATS: WirecutterPick = {
  category: 'Wirecutter Recommends',
  title: 'The Best Winter Coats for Bitter Temperatures',
  subtitle: 'Tested through blizzard conditions, mountain gusts, and sub-zero wind chills.',
  author: 'By Liam McCabe and Anna Perling',
  updatedDate: 'Updated October 14, 2026',
  topPick: {
    name: 'The North Face McMurdo Parka / Arctic Down Parka',
    price: '$400',
    rating: '9.8 / 10',
    summary: 'The ultimate shield against polar vortex freezes, combining 600-fill recycled down with a waterproof, windproof DryVent membrane and storm-flapped zip seals.',
    pros: [
      'Genuinely warm down to -20°F with thermal neck baffles',
      'Completely impenetrable wind resistance during blizzard tests',
      'Durable exterior shell shrugs off sleet and freezing rain',
      'Generous fleece-lined handwarmer pockets'
    ],
    cons: [
      'Heavier and bulkier than ultralight packable alternatives',
      'Hood faux-fur trim should be removed before laundering'
    ]
  },
  budgetPick: {
    name: 'Columbia Marquam Peak Fusion Parka',
    price: '$180',
    summary: 'Thermally reflective Omni-Heat lining delivers remarkable warmth at less than half the cost of premium heritage parkas.'
  },
  howWeTested: 'We spent three consecutive winters testing 28 high-insulation winter coats in sub-zero Vermont, Minneapolis, and Fairbanks temperatures. Each coat underwent wind-tunnel resistance checks, water-repellency showers, zipper durability cycling, and real-world urban commuting.'
};

export const MINI_CROSSWORD_DATA = {
  size: 5,
  grid: [
    ['P', 'A', 'P', 'E', 'R'],
    ['A', 'B', 'O', 'V', 'E'],
    ['P', 'O', 'L', 'A', 'R'],
    ['E', 'V', 'A', 'D', 'E'],
    ['R', 'E', 'E', 'D', 'S']
  ],
  numbers: [
    [1, 2, 3, 4, 5],
    [6, null, null, null, null],
    [7, null, null, null, null],
    [8, null, null, null, null],
    [9, null, null, null, null]
  ],
  clues: {
    across: [
      { number: 1, direction: 'across', clue: 'What this historic broadsheet is printed on', answer: 'PAPER' },
      { number: 6, direction: 'across', clue: 'Higher in altitude or rank', answer: 'ABOVE' },
      { number: 7, direction: 'across', clue: 'Opposite of equatorial, or a white bear', answer: 'POLAR' },
      { number: 8, direction: 'across', clue: 'Elude or skillfully sidestep', answer: 'EVADE' },
      { number: 9, direction: 'across', clue: 'Marsh plants used in woodwind mouthpieces', answer: 'REEDS' }
    ],
    down: [
      { number: 1, direction: 'down', clue: 'Daily news publication format', answer: 'PAPER' },
      { number: 2, direction: 'down', clue: 'Directly overhead; in the sky', answer: 'ABOVE' },
      { number: 3, direction: 'down', clue: 'Arctic or Antarctic cap descriptor', answer: 'POLAR' },
      { number: 4, direction: 'down', clue: 'Escape or bypass questioning', answer: 'EVADE' },
      { number: 5, direction: 'down', clue: 'Slender stalks along wetlands', answer: 'REEDS' }
    ]
  }
};

export const LIVE_UPDATES_DATA: LiveUpdateEntry[] = [
  {
    id: 'up-1',
    time: '2:15 PM ET',
    author: 'Luke Broadwater',
    title: 'Senate Judiciary Committee opens questioning on judicial nominees',
    content: 'Chairman Durbin commenced the afternoon session with inquiries focused on statutory review standards, noting that several committee members submitted written questions regarding recent appellate decisions.',
    isBreaking: true
  },
  {
    id: 'up-2',
    time: '1:42 PM ET',
    author: 'Catie Edmondson',
    title: 'House leaders announce bipartisan agreement on emergency disaster relief funding',
    content: 'Speaker and minority leadership confirmed that a $24 billion supplemental funding bill will hit the floor by Thursday evening, addressing storm damage across southeastern states.',
    isBreaking: false
  },
  {
    id: 'up-3',
    time: '12:30 PM ET',
    author: 'Jonathan Weisman',
    title: 'Defense nominees questioned on NATO supply stockpiles',
    content: 'Lawmakers questioned the proposed undersecretary of defense for policy regarding ongoing munitions replenishment and industrial base capacity in Pennsylvania and Ohio.',
    isBreaking: false
  }
];
