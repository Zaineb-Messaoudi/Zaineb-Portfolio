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
} from "lucide-react";

export const personal = {
  name: "Zaineb Messaoudi",
  title: "3rd Year Software Engineering Student",
  focus:
    "Full Stack & AI · building accessible, measurable, production-minded digital products.",
  location: "Tunis, TN",
  email: "zaineb.messaoudi@esprit.tn",
  linkedin: "https://www.linkedin.com/in/zaineb-messaoudi-ab7b61252/",
  github: "https://github.com/Zaineb-Messaoudi",
  availability:
    "Seeking a 6-month or longer end-of-studies / PFE internship starting in January 2027.",
  highlights: [
    "Full-stack delivery",
    "Applied AI / ML",
    "Accessible products",
    "Secure backend systems",
  ],
  profileImage: "/assets/Zainzb.jpeg",
  logoLight: "/assets/zaineb-logo-light.png",
  logoDark: "/assets/zaineb-logo-dark.png",
};

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const heroStats = [
  { label: "Full-stack internships", value: "4" },
  { label: "Product domains", value: "3" },
  { label: "Core projects", value: "3" },
  { label: "PFE availability", value: "Jan 2027" },
];

export const summaryPoints = [
  "Third-year Software Engineering student at ESPRIT (TWIN — Web & Internet Technologies) with hands-on full-stack delivery experience.",
  "Built products across fintech, health, and edtech: secure internal platforms, healthcare workflows, accessibility tooling, and AI-enabled learning systems.",
  "Comfortable moving from interface design and backend architecture to deployment, real-time updates, authentication, and data-driven features.",
  "Brings a practical AI/ML foundation with a product mindset: explainable models, useful automation, and interfaces that remain clear and inclusive.",
];

export const impactStats = [
  { value: "40%", label: "faster collaboration cycle at BCT" },
  { value: "60%", label: "less processing time per file at I-Way" },
  { value: "0.88", label: "R² salary regression with TalentLens" },
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
      "Delivered full-stack QCM and challenge features for a health platform, improving resident progress visibility and administrator workflows.",
    bullets: [
      "Built React and NestJS features with richer question attributes and granular resident progress tracking.",
      "Developed a Node.js REST API for answer statistics using MongoDB aggregations and synchronized the admin dashboard in real time with WebSockets.",
      "Improved partial-answer scoring and integrated AWS SES notification workflows for residents and administrators.",
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
      "Delivered HIKMALEARN, a full-stack accessibility platform for students with disabilities, from interface design through production deployment.",
    bullets: [
      "Designed the React frontend and Django REST backend and passed a WCAG 2.1 audit after a two-month delivery.",
      "Integrated automated video captioning, screen reader support, keyboard navigation, and AI-generated image descriptions.",
      "Collaborated with a six-developer team through code reviews and two-week Agile sprints.",
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
    items: ["Python", "Java", "JavaScript", "TypeScript", "PHP", "C", "C++"],
  },
  {
    title: "Frameworks & Platforms",
    icon: MonitorSmartphone,
    items: ["React", "Angular", "NestJS", "Node.js", "Spring Boot", "Django", "FastAPI", "Symfony", "FlutterFlow", "JavaFX", "Odoo"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
  },
  {
    title: "AI / ML",
    icon: Microscope,
    items: ["scikit-learn", "XGBoost", "LightGBM", "SHAP", "Pandas", "NumPy", "NLP", "Artificial Intelligence"],
  },
  {
    title: "Design / UX",
    icon: Sparkles,
    items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Canva"],
  },
  {
    title: "DevOps & Delivery",
    icon: ShieldCheck,
    items: ["Git", "GitHub", "Jenkins", "Docker", "Kubernetes", "Agile", "Scrum"],
  },
];

export const projects = [
  {
    slug: "oralis",
    title: "Oralis",
    subtitle: "AI-Assisted Oral Performance Assessment Platform",
    period: "Jan 2025 – Jan 2026",
    organization: "Team project · Full Stack Developer",
    icon: AudioLines,
    image: "/assets/projects/oralis-preview.png",
    overview:
      "Architected and developed a full-stack oral assessment platform that transforms student audio and video submissions into structured speaking insights for instructors.",
    features: [
      "Speech-to-text transcription pipeline for audio and video submissions",
      "Filler-word detection, pause analysis, pronunciation scoring, and confidence evaluation",
      "Secure JWT authentication and RBAC authorization for students and instructors",
      "File upload validation, scalable REST APIs, and deployment-ready backend architecture",
      "Dockerized CI/CD workflows with automated testing and Kubernetes-ready pipelines",
    ],
    stack: ["React", "NestJS", "MongoDB", "FastAPI", "Python", "JWT", "Docker", "Kubernetes"],
    emphasis: ["AI/Speech Analysis", "Secure Architecture", "CI/CD"],
    impact: "Speech insights for clearer, more actionable feedback",
    role: "Full Stack Developer",
    outcome: "Connected speech analysis, secure access, and deployment-ready services into one product.",
  },
  {
    slug: "talentlens",
    title: "TalentLens",
    subtitle: "HR Intelligence Platform",
    period: "Jan 2025 – Jan 2026",
    organization: "Team project · Machine Learning Lead",
    icon: BrainCircuit,
    image: "/assets/projects/talentlens-preview.png",
    overview:
      "Led the Career Optimisation module inside a five-person academic team and turned structured HR datasets into explainable hiring and career intelligence.",
    features: [
      "Built a multi-output ML pipeline using XGBoost and LightGBM to predict salary ranges and job demand",
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
  },
  {
    slug: "maternity-tracking",
    title: "Pregnancy & Maternity Tracking",
    subtitle: "Synchronized Multi-Platform Delivery",
    period: "Jan 2024 – Jan 2025",
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
  },
];

export const languageItems = ["Arabic · Native", "French · Fluent", "English · Intermediate"];

export const certifications = [
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
    title: "A project workbench for seeing how I think and build",
    description: "Select a build to explore the problem, your role, the outcome, and the architecture behind the work.",
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
