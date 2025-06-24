export interface JobDescription {
  id: string
  title: string
  department: string
  level: string
  location: string
  employmentType: string
  description: string
  requirements: string[]
  skills: string[]
  experience: string
  education: string
  responsibilities: string[]
  benefits: string[]
  minScore: number // Minimum score required for shortlisting
  salaryRange: {
    min: number
    max: number
    currency: string
  }
  companySize: string
  industry: string
}

export const jobDescriptions: JobDescription[] = [
  {
    id: "frontend-dev-senior",
    title: "Senior Frontend Developer",
    department: "Engineering",
    level: "Senior",
    location: "San Francisco, CA / Remote",
    employmentType: "Full-time",
    description:
      "Join our innovative engineering team to build next-generation web applications that serve millions of users worldwide. You'll work with cutting-edge technologies and collaborate with talented designers and engineers to create exceptional user experiences.",
    requirements: [
      "Some experience in frontend development (any level welcome)",
      "Basic knowledge of JavaScript and web technologies",
      "Willingness to learn React and modern frameworks",
    ],
    skills: ["JavaScript", "HTML", "CSS", "React", "Problem Solving"],
    experience: "Any level of frontend development experience",
    education: "Any degree or equivalent practical experience",
    responsibilities: [
      "Develop and maintain frontend applications",
      "Collaborate with UX/UI designers",
      "Write clean, maintainable code",
      "Learn and grow with the team",
      "Participate in code reviews",
      "Contribute to team knowledge sharing",
    ],
    benefits: [
      "Competitive salary ($80,000 - $120,000)",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Flexible work arrangements (remote/hybrid options)",
      "Professional development budget ($3,000/year)",
      "Unlimited PTO policy",
      "Stock options/equity participation",
      "Top-tier equipment and home office setup allowance",
    ],
    minScore: 3, // REDUCED from 6 to 3
    salaryRange: { min: 80000, max: 120000, currency: "USD" },
    companySize: "Series B Startup (100-500 employees)",
    industry: "Technology/SaaS",
  },
  {
    id: "backend-dev-mid",
    title: "Backend Developer",
    department: "Engineering",
    level: "Mid-Level",
    location: "Austin, TX / Remote",
    employmentType: "Full-time",
    description:
      "Build robust, scalable backend systems that power our platform serving thousands of businesses. You'll work on microservices architecture, API development, and database optimization in a fast-paced, collaborative environment.",
    requirements: [
      "Some programming experience (any language)",
      "Basic understanding of databases",
      "Interest in backend development",
      "Willingness to learn new technologies",
    ],
    skills: ["Programming", "Problem Solving", "Databases", "APIs", "Learning Agility"],
    experience: "Any programming experience welcome",
    education: "Any technical background or strong interest in technology",
    responsibilities: [
      "Learn and develop backend services and APIs",
      "Work with databases and data management",
      "Collaborate with frontend developers",
      "Write and maintain code with team support",
      "Participate in learning and development activities",
    ],
    benefits: [
      "Competitive salary ($70,000 - $100,000)",
      "Health, dental, and vision insurance",
      "401(k) retirement plan",
      "Flexible working hours",
      "Learning and development stipend ($2,000/year)",
      "Paid time off and sick leave",
      "Company-sponsored conferences and training",
      "Modern office with free snacks and beverages",
    ],
    minScore: 3, // REDUCED from 6 to 3
    salaryRange: { min: 70000, max: 100000, currency: "USD" },
    companySize: "Mid-size Company (500-1000 employees)",
    industry: "Fintech",
  },
  {
    id: "data-scientist-senior",
    title: "Data Scientist",
    department: "Data & Analytics",
    level: "Mid-Level", // REDUCED from Senior
    location: "New York, NY / Hybrid",
    employmentType: "Full-time",
    description:
      "Work with data to drive business insights and build analytical models. You'll work with datasets, develop reports, and collaborate with cross-functional teams to solve business problems.",
    requirements: [
      "Some experience with data analysis or statistics",
      "Basic programming knowledge (any language)",
      "Interest in working with data and analytics",
      "Strong analytical thinking skills",
    ],
    skills: ["Data Analysis", "Statistics", "Programming", "Problem Solving", "Communication"],
    experience: "Any analytical or technical experience",
    education: "Any degree with analytical components or strong self-taught skills",
    responsibilities: [
      "Analyze data to extract business insights",
      "Create reports and visualizations",
      "Learn and apply statistical methods",
      "Collaborate with business teams",
      "Present findings to stakeholders",
    ],
    benefits: [
      "Competitive salary ($80,000 - $110,000)",
      "Annual performance bonus (5-15% of base salary)",
      "Comprehensive health benefits package",
      "Stock options with growth potential",
      "Conference attendance and learning support",
      "Flexible work arrangements",
      "Modern computing resources and tools",
    ],
    minScore: 3, // REDUCED from 8 to 3
    salaryRange: { min: 80000, max: 110000, currency: "USD" },
    companySize: "Large Enterprise (1000+ employees)",
    industry: "E-commerce/Retail",
  },
  {
    id: "product-manager-mid",
    title: "Product Manager",
    department: "Product",
    level: "Mid-Level",
    location: "Seattle, WA / Remote",
    employmentType: "Full-time",
    description:
      "Help drive product strategy and execution for our platform features. You'll work with engineering, design, and business teams to deliver products that delight customers.",
    requirements: [
      "Some experience in product, project management, or related field",
      "Strong communication and organizational skills",
      "Interest in technology and user experience",
      "Analytical thinking and problem-solving abilities",
    ],
    skills: ["Communication", "Project Management", "Problem Solving", "User Focus", "Analytical Thinking"],
    experience: "Any relevant business or technical experience",
    education: "Any degree or equivalent experience",
    responsibilities: [
      "Support product roadmap development",
      "Gather requirements from stakeholders",
      "Work with engineering teams on feature delivery",
      "Analyze user feedback and product metrics",
      "Communicate updates to leadership",
    ],
    benefits: [
      "Competitive salary ($75,000 - $105,000)",
      "Equity package with growth potential",
      "Comprehensive health and wellness benefits",
      "Flexible PTO and work-from-home options",
      "Professional development and conference budget",
      "Product management training support",
      "Team building and company retreats",
    ],
    minScore: 3, // REDUCED from 6 to 3
    salaryRange: { min: 75000, max: 105000, currency: "USD" },
    companySize: "Growth Stage Startup (200-500 employees)",
    industry: "B2B SaaS",
  },
  {
    id: "marketing-manager-senior",
    title: "Marketing Manager",
    department: "Marketing",
    level: "Mid-Level", // REDUCED from Senior
    location: "Los Angeles, CA / Hybrid",
    employmentType: "Full-time",
    description:
      "Support marketing campaigns and strategies to drive brand awareness and customer acquisition. You'll work with creative teams and learn to execute marketing initiatives.",
    requirements: [
      "Some experience in marketing, communications, or related field",
      "Strong written and verbal communication skills",
      "Interest in digital marketing and social media",
      "Creative thinking and attention to detail",
    ],
    skills: ["Communication", "Creativity", "Social Media", "Writing", "Project Management"],
    experience: "Any marketing, communications, or creative experience",
    education: "Any degree or relevant experience",
    responsibilities: [
      "Support marketing campaign development",
      "Create and manage content for various channels",
      "Analyze campaign performance with guidance",
      "Collaborate with design and content teams",
      "Learn and apply marketing best practices",
    ],
    benefits: [
      "Competitive salary ($60,000 - $85,000)",
      "Performance-based bonuses",
      "Comprehensive benefits package",
      "Creative freedom and learning opportunities",
      "Marketing conference and networking events",
      "Flexible work schedule",
      "Professional development opportunities",
    ],
    minScore: 3, // REDUCED from 7 to 3
    salaryRange: { min: 60000, max: 85000, currency: "USD" },
    companySize: "Mid-size Company (300-800 employees)",
    industry: "Consumer Goods",
  },
  {
    id: "devops-engineer-senior",
    title: "DevOps Engineer",
    department: "Engineering",
    level: "Mid-Level", // REDUCED from Senior
    location: "Denver, CO / Remote",
    employmentType: "Full-time",
    description:
      "Learn to build and maintain infrastructure and deployment systems. You'll work with cloud technologies and automation tools with strong team support.",
    requirements: [
      "Some technical experience (any field)",
      "Interest in infrastructure and automation",
      "Basic understanding of Linux/command line",
      "Willingness to learn cloud technologies",
    ],
    skills: ["Technical Aptitude", "Problem Solving", "Linux Basics", "Learning Agility", "Attention to Detail"],
    experience: "Any technical experience or strong interest in infrastructure",
    education: "Any technical background or equivalent experience",
    responsibilities: [
      "Learn cloud infrastructure management",
      "Support deployment pipeline maintenance",
      "Monitor system performance with guidance",
      "Learn automation tools and practices",
      "Collaborate with development teams",
    ],
    benefits: [
      "Competitive salary ($70,000 - $95,000)",
      "Comprehensive health and dental coverage",
      "401(k) with company matching",
      "Remote work flexibility",
      "Professional certification reimbursement",
      "Home office equipment allowance",
      "Unlimited PTO policy",
    ],
    minScore: 3, // REDUCED from 7 to 3
    salaryRange: { min: 70000, max: 95000, currency: "USD" },
    companySize: "Series C Startup (500-1000 employees)",
    industry: "Cloud Infrastructure",
  },
  {
    id: "ux-designer-mid",
    title: "UX Designer",
    department: "Design",
    level: "Mid-Level",
    location: "Portland, OR / Hybrid",
    employmentType: "Full-time",
    description:
      "Create intuitive user experiences for our digital products. You'll learn design processes, create wireframes, and collaborate with product and engineering teams.",
    requirements: [
      "Some design experience or strong design interest",
      "Basic understanding of user experience principles",
      "Familiarity with design tools (any level)",
      "Creative problem-solving abilities",
    ],
    skills: ["Design Thinking", "Creativity", "User Empathy", "Visual Communication", "Problem Solving"],
    experience: "Any design experience or strong portfolio",
    education: "Any degree or design-related experience",
    responsibilities: [
      "Learn user research methods",
      "Create wireframes and basic prototypes",
      "Support usability testing activities",
      "Collaborate with product and engineering teams",
      "Contribute to design system development",
    ],
    benefits: [
      "Competitive salary ($60,000 - $85,000)",
      "Health, dental, and vision insurance",
      "Creative software and tool allowances",
      "Flexible work arrangements",
      "Professional development budget",
      "Design conference attendance",
      "Collaborative and creative work environment",
    ],
    minScore: 3, // REDUCED from 6 to 3
    salaryRange: { min: 60000, max: 85000, currency: "USD" },
    companySize: "Design-focused Startup (100-300 employees)",
    industry: "Design/Creative Services",
  },
  {
    id: "sales-director-senior",
    title: "Sales Representative",
    department: "Sales",
    level: "Mid-Level", // REDUCED from Senior Director
    location: "Chicago, IL / Hybrid",
    employmentType: "Full-time",
    description:
      "Join our sales team to help drive revenue growth. You'll learn sales processes, work with potential customers, and develop your sales skills with strong team support.",
    requirements: [
      "Some customer-facing experience (any field)",
      "Strong communication and interpersonal skills",
      "Interest in sales and business development",
      "Goal-oriented and motivated personality",
    ],
    skills: ["Communication", "Relationship Building", "Persuasion", "Goal Orientation", "Customer Service"],
    experience: "Any customer service or business experience",
    education: "Any degree or relevant experience",
    responsibilities: [
      "Learn sales processes and methodologies",
      "Engage with potential customers",
      "Support lead generation activities",
      "Maintain customer relationships",
      "Achieve individual sales targets with support",
    ],
    benefits: [
      "Base salary ($50,000 - $70,000) + commission (OTE $80,000+)",
      "Comprehensive benefits package",
      "Sales training and development programs",
      "Career advancement opportunities",
      "Flexible work arrangements",
      "Team incentives and recognition programs",
    ],
    minScore: 3, // REDUCED from 8 to 3
    salaryRange: { min: 60000, max: 100000, currency: "USD" },
    companySize: "Enterprise Company (1000+ employees)",
    industry: "Enterprise Software",
  },
]

export function getJobById(id: string): JobDescription | undefined {
  return jobDescriptions.find((job) => job.id === id)
}

export function getJobsByDepartment(department: string): JobDescription[] {
  return jobDescriptions.filter((job) => job.department === department)
}

export function getJobsByLevel(level: string): JobDescription[] {
  return jobDescriptions.filter((job) => job.level === level)
}

export function getJobsByIndustry(industry: string): JobDescription[] {
  return jobDescriptions.filter((job) => job.industry === industry)
}

export function getAllDepartments(): string[] {
  return [...new Set(jobDescriptions.map((job) => job.department))]
}

export function getAllLevels(): string[] {
  return [...new Set(jobDescriptions.map((job) => job.level))]
}

export function getAllIndustries(): string[] {
  return [...new Set(jobDescriptions.map((job) => job.industry))]
}

export function getJobsByLocation(location: string): JobDescription[] {
  return jobDescriptions.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
}

export function getRemoteJobs(): JobDescription[] {
  return jobDescriptions.filter((job) => job.location.toLowerCase().includes("remote"))
}

export function getJobsBySalaryRange(minSalary: number, maxSalary: number): JobDescription[] {
  return jobDescriptions.filter((job) => job.salaryRange.min >= minSalary && job.salaryRange.max <= maxSalary)
}

export function searchJobs(keyword: string): JobDescription[] {
  const searchTerm = keyword.toLowerCase()
  return jobDescriptions.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm)) ||
      job.requirements.some((req) => req.toLowerCase().includes(searchTerm)),
  )
}
