import {
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  BriefcaseBusiness,
  Database,
  Eye,
  FileCode2,
  Globe,
  Layers3,
  Microscope,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const personal = {
  name: "Zaineb Messaoudi",
  title: "Final-year Software Engineering Student",
  focus:
    "Full Stack & AI · building accessible, measurable, production-minded digital products.",
  location: "Tunis, TN",
  email: "zaineb.messaoudi@esprit.tn",
  linkedin: "https://www.linkedin.com/in/zaineb-messaoudi-ab7b61252/",
  github: "https://github.com/Zaineb-Messaoudi",
  availability:
    "Seeking a 6+ months PFE internship starting from January 2027.",
  availabilitySecondary: "And Open to Junior & Freelance Opportunities.",
  highlights: [
    "Full-stack delivery",
    "Applied AI / ML",
    "Accessible products",
    "Secure backend systems",
  ],
  profileImage: "/assets/Zaineb.webp",
  cv: {
    en: "/assets/cv/cv-en.pdf",
    fr: "/assets/cv/cv-fr.pdf",
  },
  logoLight: "/assets/zaineb-logo-light.webp",
  logoDark: "/assets/zaineb-logo-dark.webp",
};

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "summary", label: "Story" },
  { id: "experience", label: "Internships" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const heroStats = [
  { label: "Full-stack internships", value: "4" },
  { label: "Product domains", value: "3" },
  { label: "Core projects", value: "6" },
  { label: "PFE availability", value: "Jan 2027" },
];

export const summaryPoints = [
  "Final-year Software Engineering student at ESPRIT (TWIN — Web & Internet Technologies), available for a six-month PFE internship from January 2027.",
  "Built products across fintech, health, and edtech: secure internal platforms, healthcare workflows, accessibility tooling, and AI-enabled learning systems.",
  "Comfortable moving from interface design and backend architecture to deployment, real-time updates, authentication, and data-driven features.",
  "Brings a practical AI/ML foundation with a product mindset: explainable models, useful automation, and interfaces that remain clear and inclusive.",
];

export const impactStats = [
  { value: "40%", label: "faster collaboration cycle at BCT" },
  { value: "60%", label: "less processing time per file at I-Way" },
  { value: "R² 0.88", label: "salary regression with TalentLens" },
  { value: "WCAG 2.1", label: "audit passed for HIKMALEARN" },
];

export const processSteps = [
  {
    number: "01",
    title: "Understand",
    text: "Translate the user, domain, and delivery constraints into a clear product direction.",
  },
  {
    number: "02",
    title: "Design",
    text: "Shape flows and interfaces that make complex systems easier to use and maintain.",
  },
  {
    number: "03",
    title: "Build",
    text: "Connect accessible interfaces, secure APIs, data models, and useful AI capabilities.",
  },
  {
    number: "04",
    title: "Ship",
    text: "Test, document, containerize, and communicate the work so teams can move forward.",
  },
];

export const creativeInterests = [
  {
    label: "Design",
    title: "Shape the feeling",
    text: "Visual systems, graphic design, and Figma help me make technical products feel intentional.",
  },
  {
    label: "AI",
    title: "Make ideas useful",
    text: "I enjoy turning machine learning and generative AI into features people can actually understand.",
  },
  {
    label: "Open source",
    title: "Learn in public",
    text: "I value shared tools, practical documentation, and the curiosity that keeps engineering moving.",
  },
  {
    label: "Reading",
    title: "Keep the perspective",
    text: "Reading gives me space to slow down, notice patterns, and bring better questions to the work.",
  },
];

export const personalMotto =
  "Good software should feel as thoughtful as it is functional — built to include, explain itself, and hold up in production.";

export const aboutCards = [
  {
    title: "Full-stack Product Builder",
    icon: Globe,
    text: "Builds end-to-end web experiences with modern frontend architecture, secure APIs, and production-minded backend services.",
  },
  {
    title: "Applied AI Engineer",
    icon: BrainCircuit,
    text: "Turns machine learning and speech analysis into usable features with explainability, measurable outcomes, and strong integration design.",
  },
  {
    title: "Accessibility Advocate",
    icon: Eye,
    text: "Designs inclusive experiences with semantic structure, keyboard support, screen-reader compatibility, and WCAG-oriented decisions.",
  },
  {
    title: "Systems Thinker",
    icon: Layers3,
    text: "Enjoys architecture decisions spanning microservices, authentication, CI/CD, Docker workflows, and scalable platform composition.",
  },
];

export const experience = [
  {
    company: "QCMed",
    role: "Full Stack Developer Intern",
    period: "Jun 2026 – Aug 2026",
    location: "Remote",
    logo: "/assets/qcmed.png",
    accent: "var(--accent-cyan)",
    summary:
      "Delivered full-stack quiz and challenge features for a health platform, expanding the exam bank to 294 sets across 18 specialties and improving resident progress visibility.",
    bullets: [
      "Built React and NestJS quiz and challenge modules with detailed question attributes and granular medical-resident progress tracking.",
      "Designed a Node.js REST API with MongoDB aggregations and synchronized the administrator dashboard over WebSockets.",
      "Improved partial-answer scoring; 60% of testers gave positive feedback on the change.",
    ],
    stack: ["React", "NestJS", "Node.js", "MongoDB", "WebSockets", "AWS SES"],
  },
  {
    company: "Esprit Tech",
    role: "Web Developer Intern",
    period: "Jul 2025 – Aug 2025",
    location: "Tunis, Tunisia",
    logo: "/assets/esprit.png",
    accent: "var(--accent-cyan)",
    summary:
      "Delivered HIKMALEARN, an accessibility platform for students with disabilities, in 1.5 months with a six-person team and production-ready accessibility features.",
    bullets: [
      "Built the React frontend and Django REST backend, shipping after a successful WCAG 2.1 audit with 100% unit-test coverage.",
      "Implemented automatic video captioning, screen-reader support, keyboard navigation, and AI-generated image descriptions.",
      "Collaborated in a six-person team through code reviews and two-week Agile sprints.",
    ],
    stack: ["React", "Django REST", "Python", "WCAG 2.1", "Cloud AI", "Agile"],
  },
  {
    company: "Central Bank of Tunisia (BCT)",
    role: "Web Developer Intern",
    period: "Feb 2024 – Jun 2024",
    location: "Tunis, Tunisia",
    logo: "/assets/BCT.png",
    accent: "var(--accent-gold)",
    summary:
      "Replaced a manual Excel process with a secure internal event coordination platform, reducing the collaboration cycle by 40%.",
    bullets: [
      "Implemented calendar, logistics, and archive management with authentication, role-based permissions, and a complete audit trail.",
      "Built the Spring Boot, Java, Thymeleaf, and SQL backend and prototyped the experience in Figma.",
      "Delivered features in two-week Agile sprints for a regulated fintech environment.",
    ],
    stack: ["Spring Boot", "Java", "Thymeleaf", "SQL", "Figma", "Agile"],
  },
  {
    company: "I-Way",
    role: "Odoo Developer Intern",
    period: "Jul 2022 – Aug 2022",
    location: "Tunis, Tunisia",
    logo: "/assets/I-WAY.jpg",
    accent: "var(--accent-indigo)",
    summary:
      "Automated patient appointment booking in Odoo, eliminating manual processing and reducing processing time per file by 60%.",
    bullets: [
      "Designed and deployed a Python and JavaScript Odoo module integrated with existing business processes.",
      "Tuned PostgreSQL queries and added application caching to stabilize P95 latency under 500ms under nominal load.",
      "Supported cross-team validation and production deployment.",
    ],
    stack: ["Python", "JavaScript", "Odoo", "PostgreSQL"],
  },
];

export const education = [
  {
    school: "ESPRIT School of Engineering",
    degree: "Software Engineering — TWIN (Web & Internet Technologies)",
    period: "2024 – 2027",
    location: "Tunis, Tunisia",
    description:
      "Engineering degree in progress, specializing in Web & Internet Technologies.",
    highlights: [
      "BuildDream team member delivering 3 cross-disciplinary large-scale academic projects spanning AI, microservices, and accessibility.",
      "Hextech team member delivering 3 synchronized platforms simultaneously across web, mobile, and desktop.",
    ],
  },
  {
    school: "ISAMM, Manouba",
    degree: "Bachelor's Degree in Computer Science & Multimedia",
    period: "2020 – 2024",
    location: "Manouba, Tunisia",
    description:
      "Built a foundation in computer science fundamentals, multimedia, software design, UX design, 2D work, and programming projects.",
    highlights: [
      "Developed strong visual communication and design awareness alongside technical coursework.",
      "Worked on multiple UX and programming projects across the degree.",
    ],
  },
];

export const skills = [
  {
    title: "Languages",
    icon: FileCode2,
    proficiency: 90,
    items: ["Python", "TypeScript", "JavaScript", "Java", "PHP", "C / C++", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Platforms",
    icon: MonitorSmartphone,
    proficiency: 88,
    items: ["React", "Angular", "NestJS", "Node.js", "Django", "FastAPI", "Spring Boot", "Laravel", "Odoo", "REST APIs", "JWT", "RBAC"],
  },
  {
    title: "Data & Real-Time",
    icon: Database,
    proficiency: 82,
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Meilisearch", "WebSockets", "Socket.IO", "WebRTC"],
  },
  {
    title: "AI / ML",
    icon: Microscope,
    proficiency: 85,
    items: ["LLMs", "RAG", "Ollama", "Hugging Face", "NLP", "Faster-Whisper", "OpenCV", "MediaPipe", "scikit-learn", "XGBoost", "LightGBM", "SHAP", "Pandas"],
  },
  {
    title: "Design / UX",
    icon: Sparkles,
    proficiency: 78,
    items: ["Figma", "Adobe Creative Suite", "Photoshop", "Illustrator", "Canva", "Graphic Design"],
  },
  {
    title: "DevOps & QA",
    icon: ShieldCheck,
    proficiency: 80,
    items: ["Docker", "Git / GitHub", "CI/CD", "Jenkins", "Kubernetes", "Jira / Xray", "SonarQube", "Agile / Scrum"],
  },
  {
    title: "UI/UX & Multimedia",
    icon: Users,
    proficiency: 75,
    items: ["Figma", "Canva", "Adobe Photoshop", "Adobe Illustrator"],
  },
];

export const projects = [
  {
    slug: "legalgraph",
    title: "LegalGraph",
    subtitle: "Semantic Legal Research & NLP Platform",
    period: "Updated Oct 2026",
    organization: "Public GitHub project",
    icon: Microscope,
    image: "/assets/projects/legalgraph-preview.png",
    overview:
      "A Python semantic web application with four legal NLP modules for contract analysis, case summarization, compliance classification, and entity extraction.",
    features: [
      "Analyzes contract clauses and identifies potential risks using French spaCy tokenization and pattern matching",
      "Summarizes case-law text and extracts key legal principles",
      "Classifies compliance requirements and flags urgency",
      "Extracts named entities, dates, obligations, and legal references",
      "Uses an RDF / OWL legal ontology to connect legal concepts",
    ],
    stack: ["Python", "Flask", "spaCy", "NLTK", "RDF / OWL", "NLP"],
    emphasis: ["Applied NLP", "Semantic Web", "Legal Technology"],
    impact: "Four specialized legal NLP workflows in one semantic platform",
    role: "Full Stack Developer",
    outcome: "Connects four distinct legal NLP workflows through a shared semantic model.",
    links: {
      github: "https://github.com/Zaineb-Messaoudi/legal-semantic-app",
    },
    problem:
      "Legal research combines distinct jobs—reading contracts, summarizing case law, classifying compliance requirements, and parsing documents—that otherwise require separate tools and repeated manual review.",
    decisions: [
      {
        title: "Specialist pipelines, one interface",
        text: "Each legal task routes to the NLP approach suited to it, from spaCy and pattern matching to extractive summarization and entity parsing.",
      },
      {
        title: "Ontology as shared context",
        text: "The RDF / OWL ontology gives the four modules a common vocabulary for legal concepts instead of treating every result as an isolated text response.",
      },
    ],
    constraint:
      "The platform uses local NLP processing rather than external LLM APIs; the README notes that model-dependent compliance classification can fall back to keyword rules when a trained model is unavailable.",
  },
  {
    slug: "learnwise",
    title: "Learnwise",
    subtitle: "Multimodal AI-Powered Learning Platform",
    period: "Updated Oct 2026",
    organization: "Public GitHub project",
    icon: BrainCircuit,
    image: "/assets/projects/learnwise-preview.png",
    overview:
      "A learning platform combining course management with source-grounded AI support, voice transcription, study resources, quizzes, and learning analytics.",
    features: [
      "Provides course and material management with role-based permissions, versioning, and rollback",
      "Handles prerequisite cycles, scheduled publishing, moderation, and ZIP export",
      "Offers a real-time classroom presence board with Django Channels and WebSockets",
      "Answers learning questions with cited sources and supports voice transcription",
      "Includes AI-generated study resources, quizzes, exercises, and learning analytics",
    ],
    stack: ["React", "Django REST", "Django Channels", "WebSockets", "MySQL", "Ollama", "Hugging Face"],
    emphasis: ["EdTech", "Multimodal AI", "Personalized Learning"],
    impact: "Course materials, voice tools, practice, and learning analytics in one platform",
    role: "Full Stack Developer",
    outcome: "Brings source-grounded assistance and active-learning tools into a course-centered experience.",
    links: {
      github: "https://github.com/Zaineb-Messaoudi/Learnwise-5twin7",
    },
    problem:
      "Students often need to switch between course material, revision tools, practice exercises, and learning progress. Learnwise brings these study activities together around the materials they already use.",
    decisions: [
      {
        title: "Keep learning material central",
        text: "The README describes AI assistance grounded in course sources, keeping responses connected to the learning material rather than presenting a disconnected chatbot.",
      },
      {
        title: "Mix modalities with active practice",
        text: "Voice transcription and generated resources sit alongside quizzes, exercises, and analytics, supporting different ways to study and review.",
      },
    ],
    constraint:
      "The repository contains separate React/Vite frontend and Django backend applications with a documented frontend/backend contract.",
  },
  {
    slug: "solarshare",
    title: "SolarShare",
    subtitle: "AI-Powered Equipment Rental Marketplace",
    period: "Sep 2026 – Oct 2026",
    organization: "Public GitHub project",
    icon: Sparkles,
    image: "/assets/projects/solarshare-preview.png",
    overview:
      "Built an equipment-rental marketplace combining a searchable catalogue and practical AI assistance, backed by a tested Laravel application and production-oriented Docker delivery.",
    features: [
      "Implemented a catalogue module covered by 70 tests and 1,007 assertions",
      "Added natural-language semantic search powered by Meilisearch",
      "Built a retrieval-augmented chatbot and AI-assisted price and description generation",
      "Added automatic catalogue categorization and image validation",
      "Prepared Docker CI/CD with PHP-FPM, Nginx, queue workers, health checks, and rollback",
    ],
    stack: ["Laravel 12", "MySQL", "Redis", "Meilisearch", "Ollama", "Docker"],
    emphasis: ["Applied AI", "Search & Discovery", "Production Readiness"],
    impact: "Seven AI-assisted marketplace features with a catalogue suite of 70 tests and 1,007 assertions",
    role: "Full Stack Developer",
    outcome: "Connects equipment discovery, rental catalogue workflows, and AI assistance in one marketplace.",
    links: {
      github: "https://github.com/Zaineb-Messaoudi/Esprit_5TWIN7_BuilDream",
    },
    problem:
      "Finding the right equipment to rent can require browsing large catalogues with inconsistent descriptions. SolarShare brings search, catalogue tools, and AI assistance into one marketplace.",
    decisions: [
      {
        title: "Natural-language search",
        text: "Meilisearch supports semantic catalogue discovery so visitors can describe the equipment they need instead of relying only on exact product wording.",
      },
      {
        title: "AI features around the catalogue",
        text: "The seven AI features include a RAG chatbot, generated prices and descriptions, automatic categorization, and image validation, alongside semantic search.",
      },
      {
        title: "Test and deployment discipline",
        text: "The catalogue module has 70 tests and 1,007 assertions. The Docker delivery includes PHP-FPM, Nginx, queue workers, health checks, and rollback.",
      },
    ],
    constraint:
      "AI features use Ollama; production delivery is containerized and includes background queue processing.",
  },
  {
    slug: "oralis",
    title: "Oralis",
    subtitle: "AI-Assisted Oral Performance Assessment Platform",
    period: "Jan 2026 – May 2026",
    organization: "Team project · Full Stack Developer",
    icon: AudioLines,
    image: "/assets/projects/oralis-preview.png",
    overview:
      "Built part of a five-person full-stack oral-assessment team, turning student audio and video submissions into structured speaking insights for instructors.",
    features: [
      "Speech-to-text transcription pipeline for audio and video submissions",
      "Filler-word detection, pause analysis, pronunciation scoring, and confidence evaluation",
      "Secure JWT authentication and RBAC authorization for students and instructors",
      "File upload validation, scalable REST APIs, and deployment-ready backend architecture",
      "Dockerized CI/CD workflows with automated testing and Kubernetes-ready pipelines",
    ],
    stack: ["React", "NestJS", "MongoDB", "FastAPI", "Python", "WebRTC", "Socket.IO", "JWT", "Docker"],
    emphasis: ["AI/Speech Analysis", "Secure Architecture", "CI/CD"],
    impact: "Speech and visual-delivery signals for clearer feedback on oral presentations",
    role: "Full Stack Developer",
    outcome: "Connected speech analysis, secure access, and deployment-ready services into one product.",
    links: {
      github: "https://github.com/Zaineb-Messaoudi/Esprit-PIWEB-4TWIN7-2026-AI-Web-Platform-for-Oral-Assessment",
      demo: "https://esprit-piweb-4-twin-7-2026-ai-web-p.vercel.app/",
    },
    problem:
      "Instructors grading oral presentations rely on memory and rough notes, so feedback arrives late, varies between graders, and rarely points to anything a student can concretely practise.",
    decisions: [
      {
        title: "Split the Node and Python layers",
        text: "Speech processing needs the Python ML ecosystem, but the product API needed NestJS conventions the rest of the team already knew. Rather than force one runtime, I ran NestJS for the product API and FastAPI for the audio pipeline, which kept slow inference work off the request path that serves the UI.",
      },
      {
        title: "Scoring signals over a single grade",
        text: "Returning one opaque number would have made the tool feel arbitrary to students. Reporting separate signals — filler words, pause distribution, pronunciation — costs more UI work but makes every score traceable to something the student can hear in their own recording.",
      },
      {
        title: "RBAC before features",
        text: "Student recordings are sensitive, so JWT auth and role-based access went in before the analysis features rather than being retrofitted. It slowed the first demo but meant instructor-only routes were never briefly public.",
      },
    ],
    constraint:
      "Five-person team, one semester, with the audio pipeline and the web product being built in parallel — the API contract had to be agreed early and kept stable.",
  },
  {
    slug: "talentlens",
    title: "TalentLens",
    subtitle: "HR Intelligence Platform",
    period: "Jan 2026 – May 2026",
    organization: "Team project · Machine Learning Lead",
    icon: BrainCircuit,
    image: "/assets/projects/talentlens-preview.png",
    overview:
      "Led the machine-learning module in a five-person team, applying explainable models to a dataset of 15,000 job postings.",
    features: [
      "Built a multi-output ML pipeline using XGBoost and LightGBM on 15,000 job postings",
      "Reached R2 = 0.88 on salary regression and AUC = 0.75 on career classification on held-out test data using CRISP-DM evaluation flow",
      "Added SHAP TreeExplainer for feature importance and what-if scenario explainability",
      "Contributed to anomaly detection with Isolation Forest, market segmentation with K-Means, and job recommendation with KNN",
      "Exposed models through a FastAPI REST API and integrated outputs with a React frontend",
    ],
    stack: ["Python", "XGBoost", "LightGBM", "scikit-learn", "SHAP", "FastAPI", "React", "Pandas", "NumPy"],
    emphasis: ["Explainable AI", "Predictive Modeling", "Team Leadership"],
    impact: "R² 0.88 salary regression · AUC 0.75 career classification",
    role: "Machine Learning Lead",
    outcome: "Turned HR data into explainable salary and career intelligence for decision-makers.",
    links: {
      github: "https://github.com/Zaineb-Messaoudi/TalentLens-BuildDream-ProjectML",
      demo: "https://talent-lens-build-dream-project-ml.vercel.app/",
    },
    problem:
      "HR teams sit on years of structured employee data but still set salary bands and career paths by intuition. A model that only outputs a number does not help — nobody will act on a recommendation they cannot justify to a candidate.",
    decisions: [
      {
        title: "Gradient boosting over deep learning",
        text: "The dataset was tabular and mid-sized, which is where XGBoost and LightGBM reliably beat neural networks while training in seconds. Fast training mattered more than squeezing out marginal accuracy: it let me iterate on features many times inside one semester.",
      },
      {
        title: "Explainability as a requirement, not a nice-to-have",
        text: "I added SHAP TreeExplainer so every prediction comes with its contributing factors and supports what-if scenarios. This was the deciding reason to stay with tree models — the same explanation quality would have been far harder to get from a black-box alternative.",
      },
      {
        title: "Reporting AUC 0.75 honestly",
        text: "Career classification scored noticeably lower than salary regression. Rather than hide it or tune on the test set, I kept the held-out evaluation intact and treated the gap as a finding: career trajectory depends on context the dataset simply does not capture.",
      },
    ],
    constraint:
      "Led the ML module for a five-person team, which meant agreeing the FastAPI contract early so frontend work could proceed against it before the models were finished.",
  },
  {
    slug: "maternity-tracking",
    title: "Pregnancy & Maternity Tracking",
    subtitle: "Synchronized Multi-Platform Delivery",
    period: "Jan 2025 – May 2025",
    organization: "Team project · Full Stack Developer",
    icon: MonitorSmartphone,
    image: "/assets/projects/maternity-preview.png",
    overview:
      "Delivered three synchronized product surfaces for the same domain: web, mobile, and desktop, aligning data and experiences across platforms.",
    features: [
      "Built a web platform with Symfony and PHP",
      "Created a mobile experience with FlutterFlow and Firebase",
      "Delivered a desktop application using JavaFX",
      "Maintained consistency across the three synchronized platforms",
    ],
    stack: ["Symfony", "PHP", "FlutterFlow", "Firebase", "JavaFX", "SQL"],
    emphasis: ["Cross-Platform Systems", "Product Consistency", "Delivery Coordination"],
    impact: "One product experience across web, mobile, and desktop",
    role: "Full Stack Developer",
    outcome: "Maintained a consistent data experience across three synchronized product surfaces.",
    links: {
      github: "https://github.com/Zaineb-Messaoudi/Motherise",
    },
    problem:
      "Pregnancy tracking is not a single-device activity: appointments get logged on a phone, reviewed on a laptop, and discussed at a desk. Three separate apps with three separate sources of truth would have been worse than no app at all.",
    decisions: [
      {
        title: "One data contract, three clients",
        text: "The hardest part was never any single client — it was keeping Symfony, FlutterFlow, and JavaFX agreeing on the same records. I treated the data model as the fixed contract and let each platform differ only in presentation.",
      },
      {
        title: "Firebase alongside SQL, not instead of it",
        text: "Relational SQL suited the structured medical records, while Firebase handled the sync and real-time paths the mobile client needed. Running both added integration overhead but avoided bending one store into a job it was poor at.",
      },
      {
        title: "Accepting unfamiliar stacks",
        text: "The stack was imposed by the coursework rather than chosen. Delivering JavaFX and FlutterFlow surfaces I had not used before was the real constraint, and it taught me more about reading unfamiliar framework docs quickly than a free technology choice would have.",
      },
    ],
    constraint:
      "Six-person team shipping three platforms simultaneously in one semester, with a stack fixed by the course rather than selected for the problem.",
  },
];

export const languageItems = ["Arabic · Native", "French · Fluent", "English · B2 (Amideast certified)"];

export const certifications = [
  { name: "Blockchain Certifications (HCF, HBF, HCDA)", issuer: "Hedora Association", date: "Oct 2026" },
  { name: "Associate Python Developer", issuer: "DataCamp", date: "Sep 2026" },
  { name: "MongoDB CRUD Operations", issuer: "MongoDB", date: "Dec 2025" },
  { name: "Prompt Engineering and Generative AI", issuer: "Coursera · ODC", date: "Jun 2025" },
  { name: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft Learn", date: "Jul 2024" },
  { name: "Full Stack Web Development", issuer: "freeCodeCamp", date: "Jul 2023" },
  { name: "Machine Learning with Python", issuer: "freeCodeCamp", date: "Jun 2023" },
];

export const focusAreas = [
  { label: "Accessibility Engineering", icon: Eye },
  { label: "Applied AI / ML", icon: BrainCircuit },
  { label: "Modern Web Platforms", icon: BriefcaseBusiness },
  { label: "Scalable Backend Systems", icon: ArrowUpRight },
];

export const contactCards = [
  { label: "Email", value: personal.email, href: `mailto:${personal.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/zaineb-messaoudi-ab7b61252", href: personal.linkedin },
  { label: "GitHub", value: "github.com/Zaineb-Messaoudi", href: personal.github },
  { label: "Location", value: personal.location, href: "https://maps.google.com/?q=Tunis,Tunisia" },
];

export const footerLinks = [
  { label: "LinkedIn", href: personal.linkedin },
  { label: "GitHub", href: personal.github },
  { label: "Email", href: `mailto:${personal.email}` },
];

export const footerNavLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const sectionMeta = {
  about: {
    eyebrow: "Identity",
    title: "Full-stack engineering with AI depth and inclusive product thinking",
    description: "Zaineb combines full-stack delivery, applied AI, and accessibility-minded interface design to build products that are useful in the real world.",
  },
  summary: {
    eyebrow: "Professional Summary",
    title: "A profile shaped by real delivery across multiple domains",
    description: "From internal banking tools to AI-enhanced education experiences, the through-line is practical engineering with measurable impact.",
  },
  experience: {
    eyebrow: "Professional Experience",
    title: "Four internships across health, fintech, edtech, and business automation",
    description: "A practical progression from workflow automation to accessible platforms, secure banking systems, and real-time health product features.",
  },
  education: {
    eyebrow: "Education",
    title: "Academic foundation backed by ambitious collaborative builds",
    description: "Software engineering studies at ESPRIT, grounded in Web & Internet Technologies and collaborative product development.",
  },
  projects: {
    eyebrow: "Selected Projects",
    title: "Every build has a story worth exploring",
    description: "Explore recent GitHub projects alongside the original portfolio work, including the problems, decisions, technologies, and outcomes behind each build.",
  },
  skills: {
    eyebrow: "Technical Skills",
    title: "A stack spanning software engineering, AI, delivery, and design",
    description: "Breadth across languages, frameworks, databases, tooling, and UX platforms supports strong end-to-end product execution.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Open to software engineering and applied AI opportunities",
    description: "Reach out for internships, collaborations, or conversations around inclusive products, full-stack systems, and AI-enabled applications.",
  },
};
