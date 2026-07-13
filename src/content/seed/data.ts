export const seedData = {
  siteSettings: {
    name: 'Iyaz Ibrahim',
    roleLine: 'System Engineer | Infrastructure · Network · Cloud · DevOps',
    tagline:
      "I'm a system engineer who keeps networks, ICT, and internal systems stable and secure across our main office and four digital library sites — and I also build and deploy the platforms behind them.",
    supportingStatement:
      'I design, manage, and improve reliable digital infrastructure across networks, cloud platforms, Microsoft 365, cybersecurity, and internal business systems.',
    valueProposition:
      'I manage office and multi-site ICT operations, deploy internal platforms, modernise infrastructure, and turn technical requirements into dependable business solutions.',
    availability:
      'Open to System Engineering, Infrastructure, Cloud, Network, and DevOps opportunities.',
    profileSummary:
      "I'm a system engineer with hands-on experience managing office and multi-site ICT and network operations, Microsoft 365 cloud administration, self-hosted platforms, cybersecurity, technical support, and internal application development. I translate operational needs into practical, secure, and maintainable technical solutions.",
    aboutParagraphs: [
      {
        text: "I manage infrastructure for Digital Penang's main office and four digital library sites — PDL Phase 1 & 2 (Jln Masjid Negeri), Butterworth Digital Library, and Batu Maung Digital Library. My focus is keeping each location's network and ICT environment stable, secure, and well documented.",
      },
      {
        text: 'Day to day, I install and troubleshoot ICT and network equipment, coordinate with vendors when something is under warranty or beyond my scope, and work closely with the person in charge at each site — sharing technical guidance and applying cybersecurity best practices along the way.',
      },
      {
        text: "I also wear a DevOps hat: building websites and internal systems, running CI/CD through GitHub Actions on a local runner, deploying to VPS and Docker hosts, and using Cloudflare for analytics and secure access. When things need watching, I set up Zabbix monitoring to alert us before small issues become outages.",
      },
    ],
    currentlyExploring: [
      { text: 'Extending Zabbix across library sites' },
      { text: 'Infrastructure automation' },
      { text: 'Internal platform development' },
      { text: 'DevOps' },
      { text: 'Infrastructure planning & execution' },
    ],
    locations: [
      {
        name: 'Digital Penang Main Office',
        type: 'Office',
        lat: 5.4164,
        lng: 100.3327,
        mapX: 48,
        mapY: 42,
      },
      {
        name: 'PDL Phase 1',
        type: '135, Jln Masjid Negeri, Taman Guan Joo Seng, 11600 George Town',
        lat: 5.4049527,
        lng: 100.3039317,
        mapX: 46,
        mapY: 50,
      },
      {
        name: 'PDL Phase 2',
        type: '123, Jln Masjid Negeri, Taman Guan Joo Seng, 11600 George Town',
        lat: 5.4057053,
        lng: 100.3038011,
        mapX: 48,
        mapY: 48,
      },
      {
        name: 'Butterworth Digital Library',
        type: 'Library site',
        lat: 5.3991,
        lng: 100.3638,
        mapX: 58,
        mapY: 28,
      },
      {
        name: 'Batu Maung Digital Library',
        type: 'Library site',
        lat: 5.2852,
        lng: 100.2901,
        mapX: 40,
        mapY: 72,
      },
    ],
    email: 'iyazbrhm@gmail.com',
    phone: '0197644874',
    linkedin: 'https://www.linkedin.com/in/iyazibrahim',
    github: 'https://github.com/iyazibrahim',
    location: 'Penang, Malaysia',
    seoTitle: 'Iyaz Ibrahim | System Engineer',
    seoDescription:
      'Infrastructure-focused System Engineer with DevOps capability across networking, cloud, Microsoft 365 administration, Zabbix monitoring, and internal platforms.',
    principles: [
      {
        title: 'Reliability First',
        description:
          'Infrastructure should be stable, documented, monitored, and recoverable.',
      },
      {
        title: 'Practical Security',
        description:
          'Security controls should reduce risk without unnecessarily blocking business operations.',
      },
      {
        title: 'Automate Repetitive Work',
        description:
          'Use automation to reduce manual effort, avoid configuration mistakes, and improve consistency.',
      },
    ],
    stackCategories: [
      {
        category: 'Networking',
        items: [
          { name: 'Cisco' },
          { name: 'Fortinet' },
          { name: 'Extreme Networks' },
          { name: 'Ubiquiti' },
          { name: 'VLAN' },
          { name: 'SNMP' },
        ],
      },
      {
        category: 'Microsoft 365',
        items: [
          { name: 'User onboarding' },
          { name: 'Account provisioning' },
          { name: 'Entra ID' },
          { name: 'Exchange Online' },
          { name: 'SharePoint permissions' },
          { name: 'Licensing' },
          { name: 'MFA' },
        ],
      },
      {
        category: 'Cloud',
        items: [
          { name: 'Azure' },
          { name: 'Cloudflare' },
          { name: 'Linux VPS' },
          { name: 'Docker' },
        ],
      },
      {
        category: 'Security',
        items: [
          { name: 'Access management' },
          { name: 'MFA' },
          { name: 'Vulnerability assessment' },
          { name: 'Network segmentation' },
        ],
      },
      {
        category: 'DevOps',
        items: [
          { name: 'GitHub Actions' },
          { name: 'CI/CD' },
          { name: 'Dokploy' },
          { name: 'Staging environments' },
        ],
      },
      {
        category: 'Monitoring',
        items: [
          { name: 'Zabbix' },
          { name: 'Website monitoring' },
          { name: 'Office infrastructure monitoring' },
          { name: 'Multi-site monitoring (planned)' },
        ],
      },
      {
        category: 'Development',
        items: [
          { name: 'React' },
          { name: 'Flask' },
          { name: 'Node.js' },
          { name: 'Laravel' },
          { name: 'Python' },
        ],
      },
      {
        category: 'Servers and operating systems',
        items: [
          { name: 'Windows Server' },
          { name: 'Linux' },
          { name: 'IIS' },
          { name: 'VMware' },
        ],
      },
    ],
  },
  metrics: [
    {
      label: 'Locations Supported',
      value: '5',
      description: 'Main office plus four digital library sites across Penang',
      sort: 1,
    },
    {
      label: 'Applications Deployed',
      value: '5',
      description: 'Internal systems and workflow automation platforms',
      sort: 2,
    },
    {
      label: 'ICT Assets Documented',
      value: '~100',
      description: 'Infrastructure and asset records across multiple locations',
      sort: 3,
    },
    {
      label: 'Migration Downtime',
      value: '15 min',
      description: 'Digital Library internet migration with minimal disruption',
      sort: 4,
    },
  ],
  capabilities: [
    {
      group: 'infrastructure',
      sort: 1,
      items: [
        { name: 'Multi-site ICT operations' },
        { name: 'Network design' },
        { name: 'Switching and VLANs' },
        { name: 'Wi-Fi deployment' },
        { name: 'CCTV' },
        { name: 'Firewall and router planning' },
        { name: 'Internet migration' },
        { name: 'Asset documentation' },
      ],
    },
    {
      group: 'devops',
      sort: 2,
      items: [
        { name: 'GitHub Actions' },
        { name: 'CI/CD' },
        { name: 'Zabbix deployment' },
        { name: 'Website monitoring' },
        { name: 'Office infra monitoring' },
        { name: 'Staging environments' },
        { name: 'Cloud backups' },
      ],
    },
    {
      group: 'cloud',
      sort: 3,
      items: [
        { name: 'Microsoft 365 administration' },
        { name: 'User onboarding' },
        { name: 'Account provisioning' },
        { name: 'Microsoft Entra ID' },
        { name: 'Email and licensing' },
        { name: 'Azure administration' },
        { name: 'Linux' },
        { name: 'VPS' },
        { name: 'Cloudflare' },
        { name: 'Docker' },
        { name: 'Dokploy' },
      ],
    },
    {
      group: 'security',
      sort: 4,
      items: [
        { name: 'Access management' },
        { name: 'MFA' },
        { name: 'Vulnerability assessment' },
        { name: 'Website security' },
        { name: 'Network segmentation' },
        { name: 'Security administration' },
      ],
    },
    {
      group: 'development',
      sort: 5,
      items: [
        { name: 'React' },
        { name: 'Flask' },
        { name: 'Node.js' },
        { name: 'Laravel' },
        { name: 'Python' },
        { name: 'MQTT' },
        { name: 'MySQL' },
      ],
    },
  ],
  experience: [
    {
      title: 'System Engineer',
      company: 'Digital Penang',
      location: 'Penang, Malaysia',
      startDate: 'March 2026',
      endDate: 'Present',
      sort: 1,
      bullets: [
        {
          text: 'Manage ICT and network infrastructure for Digital Penang’s main office and four digital library sites (PDL Phase 1 & 2 at Jln Masjid Negeri, Butterworth Digital Library, Batu Maung Digital Library) as appointed ICT service provider.',
        },
        {
          text: 'Install, troubleshoot, repair, and document network and ICT systems per location — including switching, VLANs, wireless, internet connectivity, CCTV, and asset records (~100 devices).',
        },
        {
          text: 'Collaborate with site person-in-charge on technical decisions, vendor coordination, and cybersecurity best practices across all managed locations.',
        },
        {
          text: 'Deploy and maintain Zabbix monitoring for websites and office infrastructure, with alerting to catch issues early; extending coverage to library sites is in progress.',
        },
        {
          text: 'Build and deploy internal applications and websites using React, Flask, Node.js, and Docker — with CI/CD via GitHub Actions runners, VPS hosting, and Cloudflare for analytics and secure access.',
        },
        {
          text: 'Administer Microsoft 365, Microsoft Entra ID, and Azure — user onboarding, provisioning, licensing, MFA, and account troubleshooting.',
        },
        {
          text: 'Migrated a Digital Library internet service with approximately 15 minutes of operational downtime.',
        },
        {
          text: 'Developed and deployed five internal applications and automation solutions on self-hosted Linux, Docker, Dokploy, and Cloudflare Tunnel infrastructure.',
        },
        {
          text: 'Documented approximately 100 ICT assets and coordinated with vendors, ISPs, contractors, and internal stakeholders.',
        },
      ],
      techTags: [
        { tag: 'Fortinet' },
        { tag: 'Cisco' },
        { tag: 'Microsoft 365' },
        { tag: 'Azure' },
        { tag: 'Docker' },
        { tag: 'Zabbix' },
        { tag: 'Dokploy' },
      ],
    },
    {
      title: 'IT Support and Junior Systems Intern',
      company: 'SCHOTT Glass Sdn Bhd',
      location: 'Kulim, Malaysia',
      startDate: 'September 2025',
      endDate: 'December 2025',
      sort: 2,
      bullets: [
        {
          text: 'Delivered IT support across office, production, and cleanroom environments.',
        },
        {
          text: 'Performed asset lifecycle management and workstation deployment.',
        },
        {
          text: 'Supported infrastructure checks, AP verification, device reimaging, and vendor coordination.',
        },
        {
          text: 'Developed and deployed a Machine Monitoring Platform using Laravel, Python, MQTT, and MySQL.',
        },
        {
          text: 'Deployed the platform on Windows Server using IIS.',
        },
      ],
      techTags: [
        { tag: 'Laravel' },
        { tag: 'Python' },
        { tag: 'MQTT' },
        { tag: 'MySQL' },
        { tag: 'Windows Server' },
        { tag: 'IIS' },
      ],
    },
    {
      title: 'Network Infrastructure Intern',
      company: 'V-Network Sdn Bhd',
      location: 'Malaysia',
      startDate: 'March 2023',
      endDate: 'September 2023',
      sort: 3,
      bullets: [
        {
          text: 'Supported network projects for SME and government clients.',
        },
        {
          text: 'Configured and troubleshot Cisco and Extreme Networks equipment.',
        },
        {
          text: 'Conducted site surveys, infrastructure assessments, and wireless planning.',
        },
        {
          text: 'Prepared technical documentation and network diagrams.',
        },
        {
          text: 'Assisted with network troubleshooting and security assessments.',
        },
      ],
      techTags: [
        { tag: 'Cisco' },
        { tag: 'Extreme Networks' },
        { tag: 'VLAN' },
        { tag: 'Wireless planning' },
      ],
    },
    {
      title: 'Freelance IT Support Technician',
      company: 'Self-Employed',
      location: 'Penang, Malaysia',
      startDate: 'January 2021',
      endDate: 'September 2025',
      sort: 4,
      bullets: [
        {
          text: 'Delivered remote and on-site support for individuals and small businesses.',
        },
        {
          text: 'Resolved Windows, Linux, software, malware, hardware, and performance issues.',
        },
        {
          text: 'Performed hardware replacement, operating-system deployment, data migration, and network troubleshooting.',
        },
        {
          text: 'Managed customer issues independently from diagnosis to resolution.',
        },
      ],
      techTags: [
        { tag: 'Windows' },
        { tag: 'Linux' },
        { tag: 'Hardware support' },
        { tag: 'Networking' },
      ],
    },
  ],
  projects: [
    {
      title: 'Eventree',
      slug: 'eventree',
      projectType: 'build',
      projectUrl: 'https://eventree.online',
      summary:
        'A platform that brings Penang events into one place — search, browse by district, calendar view, and map.',
      longDescription:
        "Events are often scattered across social media, posters, and different websites, making it hard to know what's happening and where. Eventree aggregates listings so users can search events, browse by district, view upcoming activities on a calendar, and explore locations on a map.\n\nThe platform is live at eventree.online.",
      technologies: [
        { name: 'React' },
        { name: 'Node.js' },
        { name: 'Maps' },
        { name: 'Calendar' },
        { name: 'Search' },
      ],
      featured: true,
      sort: 1,
    },
    {
      title: 'Internal Application Ecosystem',
      slug: 'internal-application-ecosystem',
      projectType: 'build',
      summary:
        'Five internal apps — IT service management, secure video streaming, LHDN e-Stamping bulk processing, and more.',
      longDescription:
        'Operational teams needed secure internal platforms for service management, media delivery, and compliance workflows. I developed and deployed five internal applications on self-hosted Docker and Dokploy infrastructure with controlled access and operational monitoring.',
      technologies: [
        { name: 'React' },
        { name: 'Flask' },
        { name: 'Node.js' },
        { name: 'Docker' },
        { name: 'Cloudflare' },
        { name: 'GitHub Actions' },
        { name: 'Dokploy' },
      ],
      featured: true,
      sort: 2,
    },
    {
      title: 'Machine Monitoring Platform',
      slug: 'machine-monitoring-platform',
      projectType: 'build',
      summary: 'Laravel + Python + MQTT dashboard for real-time machine data at Schott Glass.',
      longDescription:
        'Built a monitoring platform using Laravel, Python, MQTT, and MySQL to collect, process, store, and display machine data. Deployed on Windows Server with IIS for production teams who needed visibility into manufacturing environments.',
      technologies: [
        { name: 'Laravel' },
        { name: 'Python' },
        { name: 'MQTT' },
        { name: 'MySQL' },
        { name: 'Windows Server' },
        { name: 'IIS' },
      ],
      featured: true,
      sort: 3,
    },
    {
      title: 'Kedai MASMED E-commerce Platform',
      slug: 'kedai-masmed-ecommerce',
      projectType: 'build',
      summary:
        'Full-stack Laravel e-commerce on cPanel with SSL, 8 domains, and 99.5% uptime.',
      longDescription:
        'Developed a full-stack e-commerce solution using Laravel, MySQL, JavaScript, HTML5, and CSS3. Deployed on cPanel shared hosting with SSL, responsive design, database optimisation, and management of 8 additional domains on shared infrastructure.',
      technologies: [
        { name: 'Laravel' },
        { name: 'MySQL' },
        { name: 'JavaScript' },
        { name: 'cPanel' },
        { name: 'SSL' },
      ],
      featured: true,
      sort: 4,
    },
    {
      title: 'Multi-Site Infrastructure Management',
      slug: 'multi-site-infrastructure',
      projectType: 'delivery',
      problem:
        'Digital Penang needed stable and secure ICT and network operations across its main office and four digital library sites — each with its own infrastructure, person-in-charge, and day-to-day support needs.',
      solution:
        'Manage network and ICT infrastructure at each location: installation, switching, VLANs, wireless, internet connectivity, CCTV, troubleshooting, repairs, asset documentation, vendor coordination, and cybersecurity best practices in collaboration with site leads.',
      role: 'System Engineer / ICT service provider',
      outcome:
        'Reliable multi-site ICT and network operations with documented infrastructure across all five locations. Zabbix monitoring deployed for websites and office infrastructure, with library site coverage being extended.',
      technologies: [
        { name: 'Fortinet' },
        { name: 'Cisco' },
        { name: 'HPE' },
        { name: 'Ubiquiti' },
        { name: 'VLAN' },
        { name: 'Zabbix' },
        { name: 'Microsoft 365' },
      ],
      architectureNotes:
        'Main office plus PDL Phase 1 (135) and Phase 2 (123) on Jln Masjid Negeri, Butterworth Digital Library, and Batu Maung Digital Library — each supported with local ICT and network operations, monitoring, and vendor coordination.',
      diagramType: 'multisite',
      featured: true,
      sort: 1,
    },
    {
      title: 'Digital Library Internet Migration',
      slug: 'digital-library-migration',
      projectType: 'delivery',
      problem:
        'Upgrade or migrate the internet service while minimising operational disruption to a public-facing digital library site.',
      solution:
        'Planned migration windows, configured new connectivity, tested failover paths, and executed a controlled cutover with post-migration verification.',
      role: 'System Engineer',
      outcome:
        'Migration completed with approximately 15 minutes of downtime, followed by connectivity and performance verification.',
      technologies: [
        { name: 'Routing' },
        { name: 'Firewall' },
        { name: 'ISP coordination' },
        { name: 'Network testing' },
      ],
      architectureNotes: 'Controlled service cutover with pre-migration testing and post-cutover validation.',
      diagramType: 'none',
      featured: true,
      sort: 2,
    },
    {
      title: 'Zabbix Monitoring Deployment',
      slug: 'zabbix-monitoring-deployment',
      projectType: 'delivery',
      problem:
        'Websites and office infrastructure needed proactive monitoring — alerts before issues escalate into downtime for staff and library visitors.',
      solution:
        'Deployed Zabbix to monitor website availability and office infrastructure health, with alerting configured to catch problems early. Library site monitoring is being rolled out next.',
      role: 'System Engineer',
      outcome:
        'Monitoring and alerting in place for websites and office infrastructure. Library sites are next in the rollout plan.',
      technologies: [
        { name: 'Zabbix' },
        { name: 'SNMP' },
        { name: 'Website monitoring' },
        { name: 'Linux' },
      ],
      architectureNotes:
        'Zabbix watches websites and office infrastructure today. Coverage is expanding to the four digital library sites.',
      diagramType: 'zabbix',
      featured: true,
      sort: 3,
    },
    {
      title: 'Self-Hosted DevOps Platform',
      slug: 'self-hosted-devops-platform',
      projectType: 'delivery',
      problem:
        'Internal applications and websites needed a dependable deployment pipeline — from code to production — without relying entirely on external hosting.',
      solution:
        'Built a self-hosted DevOps workflow using GitHub Actions runners on local infrastructure, Docker builds, VPS and Dokploy deployments, Cloudflare Tunnel for secure access, and Cloudflare analytics for traffic insight.',
      role: 'System Engineer / DevOps',
      outcome:
        'Consistent CI/CD from GitHub to staging and production, with Docker-based deployments, secure remote access, and operational visibility.',
      technologies: [
        { name: 'GitHub Actions' },
        { name: 'Docker' },
        { name: 'Dokploy' },
        { name: 'Cloudflare Tunnel' },
        { name: 'Cloudflare Analytics' },
        { name: 'VPS' },
      ],
      architectureNotes:
        'Source in GitHub → self-hosted runner → Docker build → staging → production via Dokploy, with tunnelled access.',
      diagramType: 'devops',
      featured: true,
      sort: 4,
    },
    {
      title: 'Zakat Pulau Pinang Network Infrastructure Upgrade',
      slug: 'zakat-network-upgrade',
      projectType: 'delivery',
      problem:
        'Zakat Pulau Pinang needed modernised network infrastructure across four offices with improved security and structured cabling.',
      solution:
        'Led end-to-end project management including vendor coordination, hardware upgrades, structured cabling, security protocols, and zero-downtime migration planning across all sites.',
      role: 'Project Manager',
      outcome:
        'Network infrastructure modernised across 4 offices within a RM 150,000+ budget, delivered 2 weeks ahead of schedule with enhanced security and cabling standards.',
      technologies: [
        { name: 'Project management' },
        { name: 'Structured cabling' },
        { name: 'Network hardware' },
        { name: 'Security protocols' },
        { name: 'Vendor coordination' },
      ],
      architectureNotes:
        'Coordinated cross-functional teams including vendors, IT personnel, and stakeholders for a multi-office network modernisation.',
      diagramType: 'none',
      featured: true,
      sort: 5,
    },
  ],
  education: [
    {
      institution: 'Universiti Teknologi MARA (UiTM), Cawangan Perlis',
      degree: 'Bachelor of Computer Science (Hons.) — Netcentric Computing',
      dates: '2023 – 2026',
      highlights: [
        { text: 'CGPA: 3.50' },
        { text: "Dean's List: Semester 5, 6" },
      ],
      sort: 1,
    },
    {
      institution: 'Universiti Teknologi MARA (UiTM), Cawangan Perlis',
      degree: 'Diploma in Computer Science',
      dates: 'Completed 2023',
      highlights: [
        { text: 'CGPA: 3.39' },
        { text: "Dean's List: Semester 2" },
      ],
      sort: 2,
    },
  ],
  certifications: [
    { title: 'Ruijie Certified Network Associate – WLAN', category: 'networking', sort: 1 },
    { title: 'Netgear Certified Engineer', category: 'networking', sort: 2 },
    { title: 'Cisco networking training', category: 'networking', sort: 3 },
    { title: 'ExtremeCloud IQ Associate', category: 'networking', sort: 4 },
    { title: 'Fortinet NSE 1–3', category: 'cybersecurity', sort: 5 },
    { title: 'Google Cybersecurity Professional Certificate', category: 'cybersecurity', sort: 6 },
    { title: 'Dante Level 1', category: 'av', sort: 7 },
    { title: 'Dante Level 2', category: 'av', sort: 8 },
    { title: 'Dante AV', category: 'av', sort: 9 },
    { title: 'Hikvision Professional CCTV', category: 'av', sort: 10 },
  ],
}
