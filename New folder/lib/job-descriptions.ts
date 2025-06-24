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
      "1+ years of professional frontend development experience",
      "Proficiency in React, and modern JavaScript",
    ],
    skills: ["JavaScript", "HTML", "CSS", "React", "Modern JavaScript"],
    experience: "1+ years in frontend development",
    education: "Bachelor's degree in Computer Science, Software Engineering, or equivalent practical experience",
    responsibilities: [
      "Develop and maintain high-performance, scalable frontend applications",
      "Collaborate with UX/UI designers to implement pixel-perfect, responsive designs",
      "Write clean, maintainable, and well-documented code following best practices",
      "Optimize applications for maximum speed, scalability, and accessibility",
      "Mentor junior developers and conduct code reviews",
      "Participate in architectural decisions and technical planning",
      "Stay updated with latest frontend technologies and industry trends",
      "Work closely with backend developers to integrate APIs and services",
      "Contribute to the improvement of development processes and tools",
    ],
    benefits: [
      "Competitive salary ($120,000 - $160,000)",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Flexible work arrangements (remote/hybrid options)",
      "Professional development budget ($3,000/year)",
      "Unlimited PTO policy",
      "Stock options/equity participation",
      "Top-tier equipment and home office setup allowance",
    ],
    minScore: 6,
    salaryRange: { min: 120000, max: 160000, currency: "USD" },
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
      "1-2 years of backend development experience",
      "Strong proficiency in Node.js, Python, or Java",
      "Experience with relational databases (PostgreSQL, MySQL) and NoSQL databases (MongoDB, Redis)",
      "Knowledge of RESTful API design and GraphQL",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Understanding of microservices architecture and distributed systems",
      "Experience with containerization (Docker) and orchestration (Kubernetes)",
      "Knowledge of CI/CD pipelines and DevOps practices",
      "Understanding of security best practices and authentication methods",
      "Experience with monitoring and logging tools",
    ],
    skills: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "GraphQL",
      "AWS",
      "Docker",
      "Kubernetes",
      "Git",
      "Redis",
      "Microservices",
      "CI/CD",
      "Authentication",
    ],
    experience: "1-2 years in backend development",
    education: "Bachelor's degree in Computer Science, Software Engineering, or related field",
    responsibilities: [
      "Design and develop scalable backend services and APIs",
      "Build and maintain microservices architecture",
      "Optimize database queries and improve system performance",
      "Implement security measures and authentication systems",
      "Collaborate with frontend developers on API integration",
      "Write comprehensive tests and maintain code quality",
      "Monitor system performance and troubleshoot issues",
      "Participate in on-call rotation for production support",
      "Document technical specifications and API endpoints",
    ],
    benefits: [
      "Competitive salary ($90,000 - $120,000)",
      "Health, dental, and vision insurance",
      "401(k) retirement plan",
      "Flexible working hours",
      "Learning and development stipend ($2,000/year)",
      "Paid time off and sick leave",
      "Company-sponsored conferences and training",
      "Modern office with free snacks and beverages",
    ],
    minScore: 6,
    salaryRange: { min: 90000, max: 120000, currency: "USD" },
    companySize: "Mid-size Company (500-1000 employees)",
    industry: "Fintech",
  },
  {
    id: "data-scientist-senior",
    title: "Senior Data Scientist",
    department: "Data & Analytics",
    level: "Senior",
    location: "New York, NY / Hybrid",
    employmentType: "Full-time",
    description:
      "Lead data science initiatives to drive business insights and build machine learning models that impact millions of users. You'll work with large datasets, develop predictive models, and collaborate with cross-functional teams to solve complex business problems.",
    requirements: [
      "2+ years of data science and machine learning experience",
      "Advanced proficiency in Python, R, or Scala",
      "Strong experience with ML frameworks (TensorFlow, PyTorch, Scikit-learn)",
      "Expertise in statistical analysis, hypothesis testing, and experimental design",
      "Experience with big data technologies (Spark, Hadoop, Databricks)",
      "Knowledge of cloud ML platforms (AWS SageMaker, Google AI Platform, Azure ML)",
      "Strong SQL skills and experience with data warehouses (Snowflake, BigQuery)",
      "Experience with data visualization tools (Tableau, Power BI, or similar)",
      "PhD or Master's degree in Data Science, Statistics, Mathematics, or related field preferred",
      "Strong business acumen and ability to translate data insights into actionable recommendations",
    ],
    skills: [
      "Python",
      "R",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "SQL",
      "Spark",
      "Statistics",
      "Machine Learning",
      "AWS",
      "Tableau",
      "A/B Testing",
      "Deep Learning",
      "NLP",
    ],
    experience: "2+ years in data science",
    education:
      "Master's or PhD in Data Science, Statistics, Mathematics, Computer Science, or related quantitative field",
    responsibilities: [
      "Develop and deploy machine learning models for business applications",
      "Analyze large, complex datasets to extract meaningful business insights",
      "Design and execute A/B tests and statistical experiments",
      "Collaborate with product managers and engineers to implement data-driven solutions",
      "Build automated reporting and monitoring systems for key business metrics",
      "Mentor junior data scientists and establish best practices",
      "Present findings and recommendations to executive leadership",
      "Stay current with latest developments in machine learning and data science",
      "Lead cross-functional projects involving multiple stakeholders",
    ],
    benefits: [
      "Highly competitive salary ($140,000 - $180,000)",
      "Annual performance bonus (10-20% of base salary)",
      "Comprehensive health benefits package",
      "Stock options with high growth potential",
      "Conference attendance and research publication support",
      "Sabbatical program after 5 years",
      "Flexible work arrangements",
      "State-of-the-art computing resources and tools",
    ],
    minScore: 8,
    salaryRange: { min: 140000, max: 180000, currency: "USD" },
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
      "Drive product strategy and execution for our core platform features. You'll work cross-functionally with engineering, design, and business teams to deliver products that delight customers and drive business growth.",
    requirements: [
      "3+ years of product management experience in tech companies",
      "Strong experience with agile development methodologies (Scrum, Kanban)",
      "Proven track record of launching successful products or features",
      "Experience with product analytics tools (Mixpanel, Amplitude, Google Analytics)",
      "Excellent analytical and problem-solving skills",
      "Strong communication and presentation skills",
      "Understanding of user experience design principles",
      "Experience with roadmapping and prioritization frameworks",
      "Technical background or ability to work closely with engineering teams",
      "Customer-centric mindset with experience in user research",
    ],
    skills: [
      "Product Strategy",
      "Agile/Scrum",
      "Product Analytics",
      "User Research",
      "Roadmapping",
      "Stakeholder Management",
      "A/B Testing",
      "Wireframing",
      "SQL",
      "Data Analysis",
      "Market Research",
      "Competitive Analysis",
    ],
    experience: "3+ years in product management",
    education: "Bachelor's degree in Business, Engineering, Computer Science, or related field; MBA preferred",
    responsibilities: [
      "Define and execute product roadmap aligned with business objectives",
      "Gather and prioritize product requirements from stakeholders and customers",
      "Work closely with engineering teams to deliver features on time and within scope",
      "Conduct market research and competitive analysis",
      "Analyze user behavior and product metrics to inform decision-making",
      "Collaborate with design team to create intuitive user experiences",
      "Manage product launches and go-to-market strategies",
      "Communicate product vision and updates to leadership and stakeholders",
      "Conduct user interviews and gather customer feedback",
    ],
    benefits: [
      "Competitive salary ($100,000 - $130,000)",
      "Equity package with growth potential",
      "Comprehensive health and wellness benefits",
      "Flexible PTO and work-from-home options",
      "Professional development and conference budget",
      "Product management certification support",
      "Team building and company retreats",
      "Commuter benefits and gym membership",
    ],
    minScore: 6,
    salaryRange: { min: 100000, max: 130000, currency: "USD" },
    companySize: "Growth Stage Startup (200-500 employees)",
    industry: "B2B SaaS",
  },
  {
    id: "marketing-manager-senior",
    title: "Senior Marketing Manager",
    department: "Marketing",
    level: "Senior",
    location: "Los Angeles, CA / Hybrid",
    employmentType: "Full-time",
    description:
      "Lead comprehensive marketing campaigns and strategies to drive brand awareness, customer acquisition, and revenue growth. You'll manage multiple channels and work with creative teams to execute high-impact marketing initiatives.",
    requirements: [
      "5+ years of marketing experience with focus on digital marketing",
      "Proven track record in B2B or B2C marketing campaigns",
      "Strong knowledge of digital marketing channels (SEO, SEM, social media, email)",
      "Experience with marketing automation platforms (HubSpot, Marketo, Pardot)",
      "Proficiency in marketing analytics and reporting tools",
      "Excellent written and verbal communication skills",
      "Leadership experience managing marketing teams or projects",
      "Understanding of customer journey mapping and conversion optimization",
      "Experience with content marketing and brand management",
      "Knowledge of marketing attribution and ROI measurement",
    ],
    skills: [
      "Digital Marketing",
      "SEO/SEM",
      "Content Marketing",
      "Marketing Analytics",
      "Marketing Automation",
      "Social Media Marketing",
      "Email Marketing",
      "Leadership",
      "Brand Management",
      "Campaign Management",
      "A/B Testing",
      "Customer Segmentation",
    ],
    experience: "5+ years in marketing with leadership experience",
    education: "Bachelor's degree in Marketing, Business, Communications, or related field; MBA preferred",
    responsibilities: [
      "Develop and execute integrated marketing strategies across multiple channels",
      "Manage marketing campaigns from conception to completion and analysis",
      "Lead and mentor a team of marketing specialists and coordinators",
      "Analyze campaign performance and optimize for better ROI",
      "Collaborate with sales team to align marketing and sales objectives",
      "Manage marketing budget and allocate resources effectively",
      "Oversee content creation and brand messaging consistency",
      "Conduct market research and competitive analysis",
      "Report on marketing metrics and KPIs to executive leadership",
    ],
    benefits: [
      "Competitive salary ($110,000 - $140,000)",
      "Performance-based bonuses (up to 25% of base salary)",
      "Comprehensive benefits package",
      "Stock options and profit sharing",
      "Creative freedom and autonomy",
      "Marketing conference and networking events",
      "Flexible work schedule",
      "Professional development opportunities",
    ],
    minScore: 7,
    salaryRange: { min: 110000, max: 140000, currency: "USD" },
    companySize: "Mid-size Company (300-800 employees)",
    industry: "Consumer Goods",
  },
  {
    id: "devops-engineer-senior",
    title: "Senior DevOps Engineer",
    department: "Engineering",
    level: "Senior",
    location: "Denver, CO / Remote",
    employmentType: "Full-time",
    description:
      "Build and maintain robust infrastructure and deployment pipelines that enable our engineering teams to deliver software efficiently and reliably. You'll work with cloud technologies, automation tools, and monitoring systems.",
    requirements: [
      "5+ years of DevOps or Site Reliability Engineering experience",
      "Strong experience with cloud platforms (AWS, GCP, or Azure)",
      "Proficiency in Infrastructure as Code (Terraform, CloudFormation, Pulumi)",
      "Experience with containerization and orchestration (Docker, Kubernetes)",
      "Knowledge of CI/CD tools (Jenkins, GitLab CI, GitHub Actions)",
      "Scripting skills in Python, Bash, or PowerShell",
      "Experience with monitoring and logging tools (Prometheus, Grafana, ELK stack)",
      "Understanding of networking, security, and database administration",
      "Experience with configuration management tools (Ansible, Chef, Puppet)",
      "Strong troubleshooting and problem-solving skills",
    ],
    skills: [
      "AWS",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Jenkins",
      "Python",
      "Bash",
      "Prometheus",
      "Grafana",
      "Ansible",
      "Git",
      "Linux",
      "Networking",
      "Security",
    ],
    experience: "3+ years in DevOps, SRE, or Infrastructure Engineering",
    education: "Bachelor's degree in Computer Science, Engineering, or equivalent experience",
    responsibilities: [
      "Design and implement scalable cloud infrastructure",
      "Build and maintain CI/CD pipelines for automated deployments",
      "Monitor system performance and implement alerting mechanisms",
      "Automate infrastructure provisioning and configuration management",
      "Ensure security best practices across all systems and processes",
      "Collaborate with development teams to optimize application performance",
      "Manage disaster recovery and backup strategies",
      "Participate in on-call rotation for production support",
      "Document infrastructure and processes for team knowledge sharing",
    ],
    benefits: [
      "Competitive salary ($125,000 - $155,000)",
      "Comprehensive health and dental coverage",
      "401(k) with generous company matching",
      "Remote work flexibility",
      "Professional certification reimbursement",
      "Home office equipment allowance",
      "Unlimited PTO policy",
      "Annual team retreats and conferences",
    ],
    minScore: 7,
    salaryRange: { min: 125000, max: 155000, currency: "USD" },
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
      "Create intuitive and engaging user experiences for our digital products. You'll conduct user research, design wireframes and prototypes, and collaborate with product and engineering teams to bring designs to life.",
    requirements: [
      "3+ years of UX design experience",
      "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
      "Strong portfolio demonstrating UX design process and outcomes",
      "Experience with user research methods and usability testing",
      "Knowledge of interaction design and information architecture",
      "Understanding of accessibility standards and inclusive design",
      "Experience working in agile development environments",
      "Strong communication and presentation skills",
      "Basic understanding of HTML/CSS and design systems",
      "Experience with prototyping tools and techniques",
    ],
    skills: [
      "UX Design",
      "User Research",
      "Figma",
      "Sketch",
      "Prototyping",
      "Wireframing",
      "Usability Testing",
      "Information Architecture",
      "Interaction Design",
      "Design Systems",
      "Accessibility",
      "HTML/CSS",
    ],
    experience: "3+ years in UX design",
    education: "Bachelor's degree in Design, HCI, Psychology, or related field",
    responsibilities: [
      "Conduct user research and analyze user behavior data",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Design and conduct usability tests to validate design decisions",
      "Collaborate with product managers to define user requirements",
      "Work closely with developers to ensure design implementation",
      "Maintain and contribute to design system and style guides",
      "Present design concepts and rationale to stakeholders",
      "Stay updated with UX trends and best practices",
      "Advocate for user-centered design throughout the organization",
    ],
    benefits: [
      "Competitive salary ($85,000 - $110,000)",
      "Health, dental, and vision insurance",
      "Creative software and tool allowances",
      "Flexible work arrangements",
      "Professional development budget",
      "Design conference attendance",
      "Collaborative and creative work environment",
      "Ergonomic workspace setup",
    ],
    minScore: 6,
    salaryRange: { min: 85000, max: 110000, currency: "USD" },
    companySize: "Design-focused Startup (100-300 employees)",
    industry: "Design/Creative Services",
  },
  {
    id: "sales-director-senior",
    title: "Sales Director",
    department: "Sales",
    level: "Senior",
    location: "Chicago, IL / Hybrid",
    employmentType: "Full-time",
    description:
      "Lead and scale our sales organization to drive revenue growth and market expansion. You'll build high-performing sales teams, develop sales strategies, and work closely with leadership to achieve ambitious growth targets.",
    requirements: [
      "7+ years of B2B sales experience with 3+ years in leadership roles",
      "Proven track record of exceeding sales targets and quotas",
      "Experience building and managing high-performing sales teams",
      "Strong knowledge of sales methodologies (MEDDIC, Challenger, Solution Selling)",
      "Experience with CRM systems (Salesforce, HubSpot) and sales analytics",
      "Excellent communication, negotiation, and presentation skills",
      "Experience in SaaS or technology sales preferred",
      "Strong analytical skills and data-driven decision making",
      "Leadership experience with team sizes of 10+ people",
      "Bachelor's degree in Business, Marketing, or related field",
    ],
    skills: [
      "B2B Sales",
      "Sales Leadership",
      "Team Management",
      "Salesforce",
      "Sales Strategy",
      "Negotiation",
      "Pipeline Management",
      "Sales Analytics",
      "Customer Relationship Management",
      "Revenue Operations",
      "Sales Training",
      "Market Analysis",
    ],
    experience: "7+ years in B2B sales with leadership experience",
    education: "Bachelor's degree in Business, Marketing, or related field; MBA preferred",
    responsibilities: [
      "Lead and manage a team of 15+ sales representatives and managers",
      "Develop and execute sales strategies to achieve revenue targets",
      "Build and optimize sales processes and methodologies",
      "Recruit, hire, and onboard top sales talent",
      "Provide coaching and mentorship to sales team members",
      "Collaborate with marketing on lead generation and qualification",
      "Analyze sales metrics and provide regular reporting to executive team",
      "Manage key enterprise accounts and strategic partnerships",
      "Represent company at industry events and conferences",
    ],
    benefits: [
      "Base salary ($150,000 - $180,000) + commission (OTE $250,000+)",
      "Equity package with significant upside potential",
      "Comprehensive benefits and executive perks",
      "Car allowance and travel expenses",
      "President's Club and sales incentive trips",
      "Leadership development programs",
      "Flexible work arrangements",
      "Executive coaching and mentorship",
    ],
    minScore: 8,
    salaryRange: { min: 200000, max: 300000, currency: "USD" },
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

// Helper function to get jobs by salary range
export function getJobsBySalaryRange(minSalary: number, maxSalary: number): JobDescription[] {
  return jobDescriptions.filter((job) => job.salaryRange.min >= minSalary && job.salaryRange.max <= maxSalary)
}

// Helper function to search jobs by keywords
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
