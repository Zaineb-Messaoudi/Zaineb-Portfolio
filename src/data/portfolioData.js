import {
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Database,
  Eye,
  FileCode2,
  Globe,
  GraduationCap,
  Languages,
  Layers3,
  Microscope,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const personal = {
  name: "Zaineb Messaoudi",
  title: "Software Engineering Student",
  focus:
    "Full-stack web development, applied AI systems, accessibility engineering, and scalable software platforms.",
  location: "Tunis, Tunisia",
  email: "Zaineb.Messaoudi@esprit.tn",
  phone: "+216 92 597 652",
  linkedin: "https://www.linkedin.com/in/zaineb-messaoudi-ab7b61252/",
  github: "https://github.com/Zaineb-Messaoudi",
  facebook: "https://www.facebook.com/zayneb.messaoudi.1",
  intro:
    "2nd year Software Engineering student at ESPRIT specializing in Web & Internet Technologies, building accessible digital products, AI-assisted systems, and modern full-stack platforms.",
  availability:
    "Seeking a Summer 2026 internship in Software Engineering or Applied AI.",
  highlights: [
    "AI-assisted platforms",
    "WCAG-oriented engineering",
    "Full-stack delivery",
    "Microservices & DevOps",
  ],
  profileImage: "/assets/Zainzb.jpeg",
};

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const heroStats = [
  { label: "Internships", value: "5" },
  { label: "Cross-disciplinary projects", value: "6+" },
  { label: "Platforms delivered at once", value: "3" },
  { label: "Primary focus areas", value: "4" },
];

export const summaryPoints = [
  "Built web platforms and AI-assisted applications using React, Spring Boot, Django, FastAPI, NestJS, MongoDB, and modern speech and NLP tooling.",
  "Hands-on delivery experience across fintech, accessibility, healthcare, and educational technology environments.",
  "Comfortable working from UX and product thinking through backend implementation, testing, and deployment-readiness.",
  "Combines technical depth in AI/ML and full-stack development with a strong focus on usability, inclusive design, and maintainable systems.",
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
    company: "Esprit Tech",
    role: "Web Developer Intern",
    period: "Jul 2025 – Aug 2025",
    location: "Tunis, Tunisia",
    logo: "/assets/esprit.png",
    accent: "var(--accent-cyan)",
    summary:
      "Built HIKMALEARN, an inclusive educational assistance platform for students with disabilities, as the sole developer across frontend and backend.",
    bullets: [
      "Designed and developed a full-stack accessibility platform using ReactJS and Django REST with WCAG 2.1 compliance in mind.",
      "Integrated cloud AI services for automated subtitle generation, alt-text and image descriptions, screen reader support, and robust keyboard navigation.",
      "Delivered sprint milestones on schedule while working within an Agile/Scrum internship flow.",
    ],
    stack: ["ReactJS", "Django", "Python", "REST API", "Cloud AI", "WCAG 2.1", "Git"],
  },
  {
    company: "Central Bank of Tunisia (BCT)",
    role: "Web Developer Intern",
    period: "Feb 2024 – May 2024",
    location: "Tunis, Tunisia",
    logo: "/assets/BCT.png",
    accent: "var(--accent-gold)",
    summary:
      "Replaced a manual Excel-based coordination workflow with a structured internal event management platform for bank teams.",
    bullets: [
      "Built an internal web application covering scheduling, logistics, and records management for bank staff.",
      "Implemented a Spring Boot backend with Thymeleaf UI to digitize operations in a secure, structured workflow.",
      "Integrated a relational SQL database to ensure reliable handling of sensitive event records.",
    ],
    stack: ["Spring Boot", "Java", "Thymeleaf", "SQL", "Figma", "Agile"],
  },
  {
    company: "Vivre Mieux",
    role: "Reception Agent",
    period: "May 2023 – Jul 2023",
    location: "Tunis, Tunisia",
    logo: "/assets/vivremieux.png",
    accent: "var(--accent-rose)",
    summary:
      "Worked in a client-facing healthcare environment supporting communication and day-to-day coordination.",
    bullets: [
      "Managed client communications and appointments in a fast-paced, service-oriented setting.",
      "Created social media content using Canva and Photoshop, strengthening visual communication skills.",
    ],
    stack: ["Customer Communication", "Appointment Coordination", "Canva", "Photoshop"],
  },
  {
    company: "I-Way",
    role: "Odoo Developer Intern",
    period: "Jul 2022 – Aug 2022",
    location: "Tunis, Tunisia",
    logo: "/assets/I-WAY.jpg",
    accent: "var(--accent-indigo)",
    summary:
      "Developed a custom Odoo module to automate patient appointment scheduling for healthcare operations.",
    bullets: [
      "Built patient appointment management features in Python and JavaScript, replacing a manual booking workflow.",
      "Analyzed Odoo's technical architecture and resolved integration issues while keeping the application responsive.",
    ],
    stack: ["Python", "JavaScript", "Odoo", "PostgreSQL"],
  },
  {
    company: "BH Bank",
    role: "Banking Intern",
    period: "Jul 2021 – Aug 2021",
    location: "Tunis, Tunisia",
    logo: "/assets/bhbank.png",
    accent: "var(--accent-orange)",
    summary:
      "Supported daily banking operations and gained exposure to regulated systems and financial processes.",
    bullets: [
      "Assisted with client transactions and supported customer-facing banking operations.",
      "Learned core banking software workflows, financial system usage, and regulated operational procedures.",
    ],
    stack: ["Banking Operations", "Client Service", "Financial Systems"],
  },
];

export const education = [
  {
    school: "ESPRIT School of Engineering",
    degree: "Software Engineering — TWIN (Web & Internet Technologies)",
    period: "2024 – Present",
    location: "Tunis, Tunisia",
    description:
      "2nd year Software Engineering student specializing in TWIN (Web & Internet Technologies).",
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
    items: [
      "React",
      "Angular",
      "NestJS",
      "Node.js",
      "Spring Boot",
      "Django",
      "FastAPI",
      "Symfony",
      "FlutterFlow",
      "JavaFX",
      "Odoo",
    ],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "H2"],
  },
  {
    title: "AI / ML",
    icon: Microscope,
    items: [
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "SHAP",
      "TF-IDF",
      "Pandas",
      "NumPy",
      "Isolation Forest",
      "KNN",
      "K-Means",
      "NLP",
      "Ollama",
      "Whisper",
      "Faster-Whisper",
      "MediaPipe",
    ],
  },
  {
    title: "Design / UX",
    icon: Sparkles,
    items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Canva"],
  },
  {
    title: "DevOps & Delivery",
    icon: ShieldCheck,
    items: ["Git", "GitHub", "Jenkins", "Docker", "Kubernetes", "Agile", "Scrum", "Postman"],
  },
];

export const projects = [
  {
    slug: "oralis",
    title: "Oralis",
    subtitle: "AI-Assisted Oral Performance Assessment Platform",
    period: "2025 – 2026",
    organization: "ESPRIT · BuildDream",
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
  },
  {
    slug: "talentlens",
    title: "TalentLens",
    subtitle: "HR Intelligence Platform",
    period: "2025 – 2026",
    organization: "ESPRIT · BuildDream · Machine Learning Module",
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
    stack: [
      "Python",
      "XGBoost",
      "LightGBM",
      "scikit-learn",
      "SHAP",
      "FastAPI",
      "React",
      "Pandas",
      "NumPy",
    ],
    emphasis: ["Explainable AI", "Predictive Modeling", "Team Leadership"],
  },
  {
    slug: "event-management",
    title: "Event Management Platform",
    subtitle: "Microservices Architecture",
    period: "2025 – 2026",
    organization: "ESPRIT · BuildDream",
    icon: Building2,
    image: "/assets/projects/event-platform-preview.png",
    overview:
      "Owned the Feedback & Reclamation microservice within a six-microservice event platform, focusing on ratings, complaints, analytics, and secure access control.",
    features: [
      "Implemented full CRUD for event ratings, complaints, and response management",
      "Computed real-time average scores with rating distribution and temporal trend analytics",
      "Integrated JWT-based Auth Service built with NestJS and MongoDB for secure access control",
      "Delivered Docker-ready service workflows with REST-first backend design",
    ],
    stack: ["Spring Boot", "Java 17", "H2 Database", "REST API", "JWT", "Docker", "Git"],
    emphasis: ["Microservices", "Analytics", "Secure APIs"],
  },
  {
    slug: "maternity-tracking",
    title: "Pregnancy & Maternity Tracking",
    subtitle: "Synchronized Multi-Platform Delivery",
    period: "2024 – 2025",
    organization: "ESPRIT · Hextech",
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
  },
  {
    slug: "virtual-museum",
    title: "Virtual Museum of Climate & Biodiversity",
    subtitle: "Interactive 3D Educational Experience",
    period: "2024 – 2025",
    organization: "Academic Project",
    icon: GraduationCap,
    image: "/assets/projects/museum-preview.png",
    overview:
      "Created an immersive 3D learning environment focused on climate change awareness and biodiversity education.",
    features: [
      "Built an interactive virtual museum in Unreal Engine",
      "Designed educational storytelling around climate and biodiversity topics",
      "Combined 3D design thinking with technical implementation",
    ],
    stack: ["Unreal Engine", "3D Design", "Game Development"],
    emphasis: ["Immersive Learning", "3D Design", "Interactive Systems"],
  },
];

export const languageItems = [
  "Arabic",
  "French",
  "English",
  "Amideast B2 Certification",
];

export const focusAreas = [
  { label: "Accessibility Engineering", icon: Eye },
  { label: "Applied AI / ML", icon: BrainCircuit },
  { label: "Modern Web Platforms", icon: BriefcaseBusiness },
  { label: "Scalable Backend Systems", icon: ArrowUpRight },
];

export const contactCards = [
  {
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    label: "Phone",
    value: personal.phone,
    href: `tel:${personal.phone.replace(/\s+/g, "")}`,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/zaineb-messaoudi-ab7b61252",
    href: personal.linkedin,
  },
  {
    label: "Facebook",
    value: "facebook.com/zayneb.messaoudi.1",
    href: personal.facebook,
  },
  {
    label: "GitHub",
    value: "github.com/Zaineb-Messaoudi",
    href: personal.github,
  },
  {
    label: "Location",
    value: personal.location,
    href: "https://maps.google.com/?q=Tunis,Tunisia",
  },
];

export const footerLinks = [
  { label: "LinkedIn", href: personal.linkedin },
  { label: "Facebook", href: personal.facebook },
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
    title: "Engineering with product sense, accessibility, and AI depth",
    description:
      "The portfolio centers the intersection of inclusive engineering, intelligent systems, and polished user-facing software delivery.",
  },
  projects: {
    eyebrow: "Selected Projects",
    title: "Projects that show range: AI, microservices, accessibility, and immersive systems",
    description:
      "Every project from the CV is represented here with its stack, core features, and the engineering emphasis behind the work.",
  },
  summary: {
    eyebrow: "Professional Summary",
    title: "A profile shaped by real delivery across multiple domains",
    description:
      "From internal banking tools to AI-enhanced education experiences, the through-line is practical engineering with measurable impact.",
  },
  experience: {
    eyebrow: "Professional Experience",
    title: "Internships and roles that expanded both technical and domain range",
    description:
      "Each experience strengthened a different layer of the engineering stack, from client-facing operations to secure internal systems and inclusive digital products.",
  },
  education: {
    eyebrow: "Education",
    title: "Academic foundation backed by ambitious collaborative builds",
    description:
      "Formal training in software engineering and computer science paired with large team-based projects in AI, microservices, and multi-platform delivery.",
  },
  skills: {
    eyebrow: "Technical Skills",
    title: "A stack spanning software engineering, AI, delivery, and design",
    description:
      "Breadth across languages, frameworks, databases, tooling, and UX platforms supports strong end-to-end product execution.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Open to software engineering and applied AI opportunities",
    description:
      "Reach out for internships, collaborations, or conversations around inclusive products, full-stack systems, and AI-enabled applications.",
  },
};
