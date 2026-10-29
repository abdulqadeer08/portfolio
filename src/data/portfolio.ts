/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT
 *  Every word, number and link on the site is read from this file.
 *  Edit it and the whole site updates.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "x"
  | "dribbble"
  | "instagram"
  | "behance";

export type IconName =
  | "palette"
  | "code"
  | "rocket"
  | "layers"
  | "gem"
  | "compass"
  | "sparkles"
  | "pen"
  | "server"
  | "smartphone"
  | "chart"
  | "shield"
  | "cpu"
  | "graduation";

/** The generated mock-up used when a project has no `image`. */
export type CoverVariant =
  | "dashboard"
  | "commerce"
  | "editorial"
  | "mobile"
  | "brand"
  | "landing";

/** Text shown inside a project's generated mock-up. Every field is optional. */
export type MockContent = {
  /** Small caption: dashboard label, phone greeting, landing pill, store eyebrow. */
  caption?: string;
  /** Main value on dashboards and title on phone screens. */
  title?: string;
  /** Headline on landing, store and editorial mock-ups, plus its highlighted part. */
  headline?: string;
  accent?: string;
  /** Card labels on dashboards, tiles on phones, list rows. */
  items?: string[];
  /** Placeholder text in a search or prompt box. */
  input?: string;
  /** Value and label in the ring on phone screens. */
  stat?: string;
  statLabel?: string;
  /** Button text on store and landing mock-ups. */
  button?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  role: string;
  client?: string;
  year?: string;
  timeline?: string;
  /** e.g. "In progress". Shown as a badge. */
  status?: string;
  /** One line shown on cards. */
  summary: string;
  /** Opening paragraph of the case study. */
  overview: string;
  challenge?: string;
  approach?: string;
  /** What was built, as bullet points. */
  highlights: string[];
  /** Big numbers or words on the case study. Numbers count up. */
  results?: { value: number | string; prefix?: string; suffix?: string; label: string }[];
  services: string[];
  stack: string[];
  /** Three colours: highlight, mid-tone, base. Drives the generated cover art. */
  palette: [string, string, string];
  cover: CoverVariant;
  /** Short name shown inside the generated mock-up. */
  coverLabel: string;
  mock?: MockContent;
  /** Extra mock-up styles for the case-study gallery. */
  gallery: CoverVariant[];
  /** Real screenshot in /public, e.g. "/images/projects/pos.jpg". Replaces the mock-up. */
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

// ─── Site & SEO ─────────────────────────────────────────────────────────────

/** Colour presets. Try them by changing `site.accent` below. */
export type Accent = "aurora" | "emerald" | "ember" | "gold";

export const site = {
  /** "aurora" (violet → rose → peach) · "emerald" · "ember" (crimson) · "gold" */
  accent: "aurora" as Accent,
  url: "https://your-domain.com",
  title: "Abdul Qadeer — AI & Full Stack Developer",
  description:
    "AI & Full Stack Developer at Aceva Technology and Software Engineering student at Sukkur IBA University. Building production systems with React, TypeScript, Python, Supabase, machine learning and NLP.",
  keywords: [
    "Abdul Qadeer",
    "AI developer",
    "full stack developer",
    "React developer",
    "TypeScript",
    "Python",
    "machine learning",
    "NLP",
    "Supabase",
    "Karachi",
    "Pakistan",
  ],
};

// ─── Profile ────────────────────────────────────────────────────────────────

export const profile = {
  firstName: "Abdul",
  lastName: "Qadeer",
  initials: "AQ",
  role: "AI & Full Stack Developer",
  shortRole: "AI & Full Stack Developer",
  location: "Karachi, Pakistan",
  timezone: "Asia/Karachi",
  timezoneLabel: "PKT",
  email: "abdulqadeermirjat@gmail.com",
  phone: "+92 313 6385048",
  /** Path to a file in /public, or an external link. */
  resumeUrl: "/Abdul_Qadeer_Resume.pdf",
  /** Optional portrait in /public, e.g. "/images/portrait.jpg". Leave empty for the monogram. */
  avatar: "",
  availability: {
    open: true,
    label: "Currently at Aceva Technology",
    detail: "AI & Full Stack Developer",
  },
  socials: [
    { platform: "github", label: "GitHub", handle: "@abdulqadeer08", url: "https://github.com/abdulqadeer08" },
    {
      platform: "linkedin",
      label: "LinkedIn",
      handle: "abdul-qadeer-mirjat",
      url: "https://www.linkedin.com/in/abdul-qadeer-mirjat-8ba57b385",
    },
  ] satisfies { platform: SocialPlatform; label: string; handle: string; url: string }[],
};

export const fullName = `${profile.firstName} ${profile.lastName}`;

// ─── Navigation ─────────────────────────────────────────────────────────────

export const navigation = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Work", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

// ─── Hero ───────────────────────────────────────────────────────────────────

export const hero = {
  titleTop: "Building intelligent",
  titleMiddle: "software that",
  /** The highlighted last line cycles through these. Keep them short. */
  titleAccents: ["ships to production.", "runs every day.", "thinks with AI.", "solves real problems."],
  intro:
    "AI & Full Stack Developer at Aceva Technology and Software Engineering student at Sukkur IBA University. I ship production systems people use daily, powered by React, TypeScript, Python and machine learning.",
  primaryCta: { label: "View my projects", target: "work" },
  secondaryCta: { label: "Download résumé" },
};

export const stats = [
  { value: 8, suffix: "", label: "Projects built" },
  { value: 2, suffix: "", label: "Systems in daily use" },
  { value: 50, suffix: "k+", label: "Reviews analysed with NLP" },
  { value: 3.4, suffix: "", label: "CGPA at Sukkur IBA" },
];

export const marquee = {
  primary: [
    "AI & Machine Learning",
    "Full Stack Development",
    "Natural Language Processing",
    "Enterprise Systems",
    "Data Science",
  ],
  secondary: [
    "Python",
    "TypeScript",
    "React.js",
    "Supabase",
    "Tailwind CSS",
    "Flask",
    "Streamlit",
    "Scikit-learn",
    "Pandas",
    "MySQL",
    "NLTK",
    "Git",
  ],
};

// ─── Section copy ───────────────────────────────────────────────────────────

export const sections = {
  about: { title: "The person behind", accent: "the code." },
  services: {
    title: "What I",
    accent: "build.",
    description:
      "From machine-learning models to production web apps, I take ideas from the first requirement to deployed, reliable software.",
  },
  work: {
    title: "Featured",
    accent: "projects.",
    description:
      "Production systems, AI products and machine-learning tools, each one designed, built and shipped end to end.",
  },
  experience: {
    title: "Experience &",
    accent: "education.",
    description:
      "Building AI and full stack products professionally while completing a BS in Software Engineering at Sukkur IBA University.",
  },
  toolkit: {
    title: "Technical",
    accent: "skills.",
    description: "The languages, frameworks and concepts I use to take products from idea to production.",
  },
  process: {
    title: "How I",
    accent: "work.",
    description: "A clear, dependable process, from understanding the problem to supporting the software in production.",
  },
  testimonials: { title: "Kind words from", accent: "people I've worked with." },
  awards: {
    title: "Leadership &",
    accent: "recognition.",
    description: "Programmes and recognition beyond the classroom.",
  },
  footer: { tagline: "Building intelligent software", accent: "that people rely on." },
};

// ─── About ──────────────────────────────────────────────────────────────────

export const about = {
  statement:
    "I'm an AI & Full Stack Developer who turns real-world problems into software people rely on every day, from enterprise point-of-sale systems to machine-learning tools that analyse legal judgments.",
  paragraphs: [
    "I work at Aceva Technology as an AI & Full Stack Developer, building AI products and web applications for real clients. Alongside that, I'm in the 7th semester of a BS in Software Engineering at Sukkur IBA University.",
    "Before Aceva, I completed a Data Science & AI internship at Arcana Info. On the product side I work with React, TypeScript, Python and Supabase; for machine learning and NLP, with Scikit-learn, Pandas and NLTK.",
  ],
  facts: [
    { label: "Role", value: "AI & Full Stack" },
    { label: "Based in", value: "Karachi, PK" },
    { label: "Studying", value: "BS Software Eng." },
    { label: "Focus", value: "AI · Web · Data" },
  ],
  badgeText: "AI developer • Full stack engineer • ",
};

// ─── Services ───────────────────────────────────────────────────────────────

export const services: {
  title: string;
  description: string;
  deliverables: string[];
  icon: IconName;
  /** Slug of a project shown as a floating preview when hovering this service. */
  preview?: string;
}[] = [
  {
    title: "AI & Machine Learning",
    description:
      "Machine-learning and NLP solutions, from text classification and prediction models to AI assistants, built with Python and Scikit-learn.",
    deliverables: ["ML models", "NLP pipelines", "AI assistants", "Predictions"],
    icon: "cpu",
    preview: "ai-receptionist",
  },
  {
    title: "Full Stack Development",
    description:
      "Type-safe web applications with React, TypeScript and Supabase, including real-time data, secure authentication and REST APIs.",
    deliverables: ["React & TypeScript", "Supabase", "REST APIs", "Real-time sync"],
    icon: "code",
    preview: "enterprise-pos",
  },
  {
    title: "Enterprise Systems",
    description:
      "Business software with role-based access control, ledgers, approval workflows and dashboards, built for teams who use it every day.",
    deliverables: ["RBAC", "Dashboards", "Approval workflows", "Relational schemas"],
    icon: "layers",
    preview: "inventory-management",
  },
  {
    title: "Data Science & Visualization",
    description:
      "Turning raw data into clear insight with Pandas, Matplotlib, Seaborn and interactive Streamlit dashboards.",
    deliverables: ["Data analysis", "Visualization", "Streamlit apps", "Insights"],
    icon: "chart",
    preview: "whatsapp-chat-analyzer",
  },
];

// ─── Projects ───────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "ai-receptionist",
    title: "AI Receptionist",
    client: "Aceva Technology",
    category: "AI Product",
    role: "AI & Full Stack Developer",
    year: "2026",
    status: "In progress",
    summary:
      "An AI phone receptionist that answers restaurant calls, takes pickup orders and sends each order to an owner dashboard.",
    overview:
      "Restaurants miss orders when calls go unanswered during busy hours. At Aceva Technology I'm building an AI phone receptionist that answers restaurant calls, takes pickup orders and sends each order straight to an owner dashboard.",
    challenge:
      "Phone orders have to be captured accurately while staff are busy serving customers, and every order needs to reach the restaurant owner reliably.",
    approach:
      "An AI receptionist handles the call and takes the pickup order, then delivers it to a dashboard where the owner can see every order. It is being developed for Aceva Technology's restaurant clients, with a public SaaS version planned.",
    highlights: [
      "Building an AI phone receptionist that answers restaurant calls and takes pickup orders.",
      "Sends each order to an owner dashboard.",
      "Developed for Aceva Technology's restaurant clients, with a public SaaS version planned.",
    ],
    results: [
      { value: "AI", label: "Receptionist answering restaurant calls" },
      { value: "Live", label: "Orders delivered to an owner dashboard" },
      { value: "SaaS", label: "Public version planned" },
    ],
    services: ["AI Development", "Voice Ordering", "Owner Dashboard"],
    stack: [],
    palette: ["#9b83ea", "#2a1b55", "#0c0a17"],
    cover: "mobile",
    coverLabel: "Receptionist",
    mock: {
      caption: "Incoming call",
      title: "Pickup order",
      stat: "AI",
      statLabel: "On the call",
      items: ["Order taken", "Sent to owner"],
      headline: "Never miss",
      accent: "an order",
      input: "Hi, I'd like to place a pickup order…",
    },
    gallery: ["landing"],
    repoUrl: "https://github.com/abdulqadeer08/ai-receptionist",
    featured: true,
  },
  {
    slug: "enterprise-pos",
    title: "Enterprise POS System",
    client: "Supermart chain",
    category: "Enterprise Software",
    role: "Full Stack Developer",
    summary:
      "A multi-branch point-of-sale platform for a supermart chain, with ledgers, role-based dashboards and real-time sync.",
    overview:
      "I designed and deployed a scalable point-of-sale solution for a supermart chain. It runs on local infrastructure across multiple branch locations and handles the day-to-day reality of retail: sales, customers, suppliers and staff.",
    challenge:
      "Each branch needed accurate customer and supplier balances and the right level of access for every member of staff, with data kept in sync across locations.",
    approach:
      "Customer and supplier ledger modules track live transaction history, outstanding balances and reconciliation per branch. Three-tier role-based access control gives Admins, Managers and Cashiers their own dashboards with scoped permissions through Supabase Auth, and a type-safe React and TypeScript front end stays in sync through Supabase Realtime.",
    highlights: [
      "Designed and deployed a scalable POS solution for a supermart chain, running on local infrastructure across multiple branch locations.",
      "Built customer and supplier ledger modules tracking live transaction history, outstanding balances and account reconciliation per branch.",
      "Implemented three-tier Role-Based Access Control (Admin, Manager, Cashier) with dedicated dashboards and scoped permissions via Supabase Auth.",
      "Delivered a type-safe React and TypeScript front end with real-time data sync using the Supabase Realtime engine.",
    ],
    results: [
      { value: "Live", label: "Running across multiple supermart branches" },
      { value: 3, label: "Access tiers: Admin, Manager and Cashier" },
      { value: "Realtime", label: "Data sync with Supabase Realtime" },
    ],
    services: ["System Design", "Full Stack Development", "Access Control", "Deployment"],
    stack: ["React", "TypeScript", "Supabase", "Supabase Auth", "Supabase Realtime"],
    palette: ["#5fb8e6", "#123048", "#081018"],
    cover: "dashboard",
    coverLabel: "POS",
    mock: {
      caption: "Branch overview",
      title: "Today's sales",
      items: ["Customers", "Suppliers", "Cashiers"],
    },
    gallery: [],
    featured: true,
  },
  {
    slug: "inventory-management",
    title: "Inventory Management System",
    client: "Sukkur IBA University",
    category: "Web Application",
    role: "Full Stack Developer",
    summary:
      "A centralised inventory and request system that replaced paper-based tracking at Sukkur IBA University, now in daily use.",
    overview:
      "Sukkur IBA University tracked equipment and requests on paper. I built a centralised inventory system that is deployed on campus infrastructure and in active daily use.",
    challenge:
      "Faculty had to submit equipment requests physically, approvals moved through several offices by hand, and there was no single record of who held which asset.",
    approach:
      "Faculty now submit equipment requests remotely, and a multi-level approval pipeline from the Director to the PVC updates each request's status automatically. A relational MySQL schema provides full asset traceability, including assignment history and the current holder of every item.",
    highlights: [
      "Replaced a manual paper-based tracking process with a centralised system deployed on campus infrastructure, in active daily use.",
      "Enabled faculty to submit equipment requests remotely, eliminating physical paperwork and reducing request processing time.",
      "Implemented a multi-level approval pipeline (Director to PVC) with automated status updates, accelerating resource allocation decisions.",
      "Delivered full asset traceability through a relational MySQL schema, including assignment history and current holder tracking.",
    ],
    results: [
      { value: "Daily", label: "In active use on campus infrastructure" },
      { value: 0, label: "Paper forms needed for equipment requests" },
      { value: "Full", label: "Asset traceability and assignment history" },
    ],
    services: ["Web Development", "Workflow Design", "Database Design", "Deployment"],
    stack: ["React.js", "Tailwind CSS", "MySQL"],
    palette: ["#86c49a", "#1d3526", "#09100c"],
    cover: "dashboard",
    coverLabel: "Inventory",
    mock: {
      caption: "Equipment requests",
      title: "Approval pipeline",
      items: ["Requested", "Director", "PVC"],
    },
    gallery: [],
    featured: true,
  },
  {
    slug: "legal-judgment-predictor",
    title: "AI Legal Judgment Predictor",
    category: "Machine Learning",
    role: "Machine Learning Developer",
    summary:
      "A machine-learning tool that predicts court decisions from case facts and cites the applicable law articles.",
    overview:
      "Legal research is slow and manual. I built a court-decision prediction tool, trained on curated historical judgments, that identifies the legal issues in a case and cites applicable law articles (for example CNSA 1997) in real time.",
    challenge:
      "Legal text is long and domain-specific. The model had to represent it well enough to surface relevant precedents from a description of the case facts alone.",
    approach:
      "TF-IDF vectorisation represents the legal text, and a Random Forest classifier surfaces relevant precedents from case facts. A Streamlit interface lets lawyers enter case details and receive a structured legal analysis.",
    highlights: [
      "Built a court-decision prediction tool trained on curated historical judgments, identifying legal issues and citing applicable law articles (e.g. CNSA 1997) in real time.",
      "Applied TF-IDF vectorisation for legal text representation and trained a Random Forest classifier to surface relevant precedents from case facts.",
      "Designed a Streamlit interface enabling lawyers to input case details and receive structured legal analysis, reducing manual research overhead.",
    ],
    services: ["Machine Learning", "NLP", "Interface Design"],
    stack: ["Python", "Scikit-learn", "Streamlit", "TF-IDF", "Random Forest"],
    palette: ["#d8b26a", "#4a3517", "#0f0c08"],
    cover: "landing",
    coverLabel: "Legal AI",
    mock: {
      caption: "AI legal analysis",
      headline: "Predict the",
      accent: "judgment",
      input: "Describe the facts of the case…",
    },
    gallery: [],
    featured: true,
  },
  {
    slug: "lawbridge",
    title: "LawBridge",
    category: "Web Platform",
    role: "Full Stack Developer",
    summary:
      "An attorney booking platform connecting clients with verified lawyers, with real-time appointments and an admin analytics dashboard.",
    overview:
      "LawBridge is a centralised portal that connects clients with verified attorneys, supporting attorney discovery, profile management and appointment booking.",
    highlights: [
      "Built a centralised portal connecting clients with verified attorneys, supporting attorney discovery, profile management and appointment booking.",
      "Implemented RBAC for three user types (Admin, Lawyer, Client) with dedicated interfaces and data-scoped permissions.",
      "Engineered a real-time appointment system with live status tracking and an Admin analytics dashboard for monitoring platform activity.",
      "Designed a normalised relational schema with strict referential integrity, keeping booking and billing data consistent.",
    ],
    results: [{ value: 3, label: "User roles: Admin, Lawyer and Client" }],
    services: ["Full Stack Development", "UI/UX Design", "Access Control"],
    stack: ["MySQL", "UI/UX", "RBAC"],
    palette: ["#c08aa0", "#3a1a26", "#0d090b"],
    cover: "commerce",
    coverLabel: "LawBridge",
    mock: {
      caption: "Verified attorneys",
      headline: "Find the right",
      accent: "attorney",
      button: "Book now",
    },
    gallery: [],
  },
  {
    slug: "sentiment-analysis",
    title: "Sentiment Analysis & Topic Modeling",
    category: "Natural Language Processing",
    role: "Machine Learning Developer",
    summary:
      "A Flask application for real-time sentiment classification and topic discovery across 50,000+ IMDB reviews.",
    overview:
      "A modular Flask application that classifies sentiment in real time and discovers the topics people talk about, processing more than 50,000 IMDB reviews.",
    highlights: [
      "Built a modular Flask application for real-time sentiment classification and topic discovery, processing 50,000+ IMDB reviews.",
      "Engineered a custom NLP preprocessing pipeline using Regex and NLTK: tokenization, stopword removal and lemmatization to normalise noisy input.",
      "Vectorized the corpus with CountVectorizer and trained a Logistic Regression model for binary sentiment classification.",
      "Built a results dashboard showing detected sentiment, per-review confidence scores and the top LDA topic keywords.",
    ],
    results: [{ value: 50, suffix: "k+", label: "IMDB reviews processed" }],
    services: ["NLP", "Machine Learning", "Dashboard"],
    stack: ["Python", "Flask", "SQLite", "NLTK", "LDA"],
    palette: ["#e8957a", "#4a1e14", "#120907"],
    cover: "dashboard",
    coverLabel: "Sentiment",
    mock: {
      caption: "Reviews analysed",
      title: "50,000+",
      items: ["Sentiment", "Confidence", "Topics"],
    },
    gallery: [],
  },
  {
    slug: "whatsapp-chat-analyzer",
    title: "WhatsApp Chat Analyzer",
    category: "Data Analysis",
    role: "Developer",
    summary:
      "Upload any WhatsApp export and get an instant breakdown of conversation patterns, most-used words and emoji usage.",
    overview:
      "A chat analysis tool that parses exported WhatsApp .txt files and generates a statistical breakdown of conversation patterns for every participant.",
    highlights: [
      "Parses exported WhatsApp .txt files and generates a statistical breakdown of conversation patterns per user.",
      "Text processing pipeline extracting message frequency, most-used words, word-count distribution and emoji usage ranked by frequency.",
      "Interactive visualizations with Matplotlib and Seaborn: bar charts, word clouds and emoji frequency graphs.",
      "File-upload interface that lets anyone import a WhatsApp export and get instant analysis, with no manual formatting.",
    ],
    services: ["Data Analysis", "Visualization", "Streamlit App"],
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn", "Streamlit"],
    palette: ["#5fd49a", "#123a2a", "#07120d"],
    cover: "mobile",
    coverLabel: "Chat",
    mock: {
      caption: "Chat insights",
      title: "Group chat",
      stat: "Top",
      statLabel: "Words",
      items: ["Messages", "Emojis"],
    },
    gallery: [],
  },
  {
    slug: "ai-study-chatbot",
    title: "AI Study Chatbot",
    category: "NLP · Group Project",
    role: "Group Project Contributor",
    summary:
      "A study assistant chatbot that uses TF-IDF and Logistic Regression to understand questions and predict helpful responses.",
    overview:
      "A study chatbot built as a group project. I contributed the chatbot's design logic and intent architecture, and the machine-learning model behind its responses.",
    highlights: [
      "Contributed chatbot design logic and intent architecture.",
      "Implemented TF-IDF vectorization with a Logistic Regression classifier for response prediction.",
      "Helped build the NLP preprocessing pipeline (tokenization, lemmatization and stopword filtering) to improve input understanding.",
    ],
    services: ["Chatbot Design", "NLP", "Machine Learning"],
    stack: ["Python", "NLTK", "Scikit-learn", "TF-IDF", "Tkinter"],
    palette: ["#7d9ae6", "#1a2550", "#0a0d19"],
    cover: "landing",
    coverLabel: "Study Bot",
    mock: {
      caption: "AI study assistant",
      headline: "Ask, learn,",
      accent: "repeat",
      input: "Ask a study question…",
    },
    gallery: [],
  },
];

// ─── Experience ─────────────────────────────────────────────────────────────

export const experience: {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  stack: string[];
}[] = [
  {
    period: "Sep 2026 — Present",
    role: "AI & Full Stack Developer",
    company: "Aceva Technology",
    location: "Pakistan",
    description:
      "Building AI products and full stack applications for Aceva Technology's clients.",
    highlights: [
      "Building an AI phone receptionist that answers restaurant calls, takes pickup orders and sends each order to an owner dashboard",
      "Developed for restaurant clients, with a public SaaS version planned",
    ],
    stack: ["AI", "Full Stack"],
  },
  {
    period: "Jun 2026 — Sep 2026",
    role: "Data Science & AI Intern",
    company: "Arcana Info (Pvt.) Ltd.",
    location: "Karachi, Pakistan",
    description: "Completed a Data Science & AI internship as part of the Technical Team.",
    highlights: [],
    stack: ["Data Science", "AI"],
  },
];

export const education = [
  {
    title: "BS Software Engineering",
    institution: "Sukkur IBA University",
    period: "Aug 2023 — Present",
    detail: "7th semester · CGPA 3.4",
  },
  {
    title: "Higher Secondary Certificate",
    institution: "Govt. Degree College Dadu",
    period: "2019 — Dec 2021",
    detail: "Score: 93.90%",
  },
];

// ─── Skills ─────────────────────────────────────────────────────────────────

export const skillGroups: {
  title: string;
  description: string;
  icon: IconName;
  items: string[];
}[] = [
  {
    title: "AI & Data",
    description: "Machine learning, NLP and data analysis in Python.",
    icon: "cpu",
    items: ["Python", "Scikit-learn", "Pandas", "NLTK", "TF-IDF", "Streamlit"],
  },
  {
    title: "Front-end",
    description: "Type-safe, responsive and accessible interfaces.",
    icon: "code",
    items: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Back-end & Databases",
    description: "APIs, databases and secure access control.",
    icon: "server",
    items: ["Flask", "Supabase", "SQL", "MySQL", "SQLite"],
  },
];

/** Shown as chips in the "Concepts & tools" card. */
export const concepts = [
  "Machine Learning",
  "NLP",
  "Role-Based Access Control",
  "REST API Design",
  "UI/UX Design",
  "Data Visualization",
  "Git",
];

/** Shown in the "Currently building" card. */
export const currentlyBuilding = ["AI phone receptionist", "Restaurant pickup ordering", "Owner order dashboard"];

// ─── Process ────────────────────────────────────────────────────────────────

export const workProcess = [
  {
    title: "Understand",
    duration: "Requirements",
    description:
      "Learn how the business works today, who will use the software and what success looks like, before writing any code.",
  },
  {
    title: "Plan",
    duration: "Architecture",
    description:
      "Design the data model, roles and permissions, and choose the right stack for the problem and the team.",
  },
  {
    title: "Build",
    duration: "Development",
    description:
      "Develop in small, testable steps with type-safe code, regular check-ins and working software at every stage.",
  },
  {
    title: "Ship",
    duration: "Deployment",
    description: "Deploy, train users and support the system in production, improving it as real usage comes in.",
  },
];

// ─── Social proof ───────────────────────────────────────────────────────────
// Add real quotes here and the testimonials section appears automatically.

export const clients: string[] = [];

export const testimonials: { quote: string; name: string; role: string; company: string }[] = [];

export const awards = [
  {
    year: "2025",
    title: "Semester Exchange Program",
    organization: "Sukkur IBA University",
    project: "Selected candidate · Italy",
  },
  {
    year: "2025",
    title: "Model United Nations (SIBAUMUN 4.0)",
    organization: "Sukkur IBA University",
    project: "Recognised for diplomacy and debate",
  },
];

// ─── Contact ────────────────────────────────────────────────────────────────

export const contact = {
  headingTop: "Let's build something",
  headingAccent: "great together.",
  intro:
    "Have a role, a project or an idea in mind? Send me a message and I'll get back to you as soon as I can.",
  /** Leave empty to hide the budget question. */
  budgets: [] as string[],
  interests: ["Job opportunity", "Freelance project", "AI / ML project", "Collaboration", "Other"],
};
