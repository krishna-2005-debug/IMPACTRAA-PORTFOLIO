/* ── Admin Store (localStorage-based CMS) ── */
const KEYS = {
  projects: 'impactra_projects',
  services: 'impactra_services',
  testimonials: 'impactra_testimonials',
  leads: 'impactra_leads',
  blogs: 'impactra_blogs',
  settings: 'impactra_settings',
  activity: 'impactra_activity',
};

function getItem(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
function now() { return new Date().toISOString(); }

function logActivity(action, entity, name) {
  const logs = getItem(KEYS.activity, []);
  logs.unshift({ id: uid(), action, entity, name, time: now() });
  setItem(KEYS.activity, logs.slice(0, 50));
}

/* ── Default seed data ── */
const DEFAULT_PROJECTS = [
  { id: uid(), title: 'NeoBank Dashboard', category: 'Web App', technologies: ['React', 'Node.js', 'MongoDB'], description: 'Modern fintech dashboard with real-time analytics.', liveUrl: 'https://neobank.demo', imageUrl: '', featured: true, createdAt: now() },
  { id: uid(), title: 'AuraShop E-commerce', category: 'E-Commerce', technologies: ['Next.js', 'Stripe', 'PostgreSQL'], description: 'Full-stack e-commerce with seamless checkout.', liveUrl: '', imageUrl: '', featured: false, createdAt: now() },
  { id: uid(), title: 'FitTrack Mobile App', category: 'Mobile', technologies: ['React Native', 'Firebase'], description: 'Health & fitness tracking app for iOS & Android.', liveUrl: '', imageUrl: '', featured: true, createdAt: now() },
];

const DEFAULT_SERVICES = [
  { id: uid(), title: 'UI/UX Design', description: 'Premium, conversion-focused interfaces that delight users.', icon: '✦', price: '₹25,000', active: true, createdAt: now() },
  { id: uid(), title: 'Web Development', description: 'Blazing-fast full-stack applications built with modern frameworks.', icon: '⬡', price: '₹50,000', active: true, createdAt: now() },
  { id: uid(), title: 'Mobile Apps', description: 'Cross-platform mobile apps for iOS and Android.', icon: '◎', price: '₹75,000', active: true, createdAt: now() },
  { id: uid(), title: 'SEO & Growth', description: 'Data-driven strategies to grow your digital presence.', icon: '▲', price: '₹15,000', active: true, createdAt: now() },
];

const DEFAULT_TESTIMONIALS = [
  { id: uid(), name: 'Arjun Mehta', role: 'CEO, TechVentures', text: 'IMPACTRA transformed our online presence completely. The results exceeded all expectations.', rating: 5, imageUrl: '', approved: true, createdAt: now() },
  { id: uid(), name: 'Priya Sharma', role: 'Founder, StyleHouse', text: 'The team delivered an exceptional e-commerce platform that boosted our conversions by 340%.', rating: 5, imageUrl: '', approved: true, createdAt: now() },
];

const DEFAULT_LEADS = [
  { id: uid(), name: 'Vikram Nair', email: 'vikram@example.com', phone: '+91 9876543210', service: 'Web Development', message: 'Need a new website for my startup.', status: 'new', createdAt: now() },
  { id: uid(), name: 'Sunita Rao', email: 'sunita@example.com', phone: '+91 8765432109', service: 'UI/UX Design', message: 'Looking to redesign our app UI.', status: 'contacted', createdAt: now() },
  { id: uid(), name: 'Rahul Gupta', email: 'rahul@example.com', phone: '+91 7654321098', service: 'SEO & Growth', message: 'Want to improve our search rankings.', status: 'converted', createdAt: now() },
];

const DEFAULT_BLOGS = [
  { id: uid(), title: '10 UI Trends Dominating 2024', slug: '10-ui-trends-2024', content: 'Glassmorphism, bento grids, and bold typography are reshaping modern design...', tags: ['Design', 'Trends'], status: 'published', seoTitle: '', seoDescription: '', createdAt: now() },
];

const DEFAULT_SETTINGS = {
  agencyName: 'IMPACTRA',
  tagline: 'We Build Digital Excellence',
  email: 'hello@impactra.in',
  phone: '+91 93457 10960',
  address: 'Chennai, Tamil Nadu, India',
  instagram: 'https://instagram.com/impactra',
  linkedin: 'https://linkedin.com/company/impactra',
  twitter: 'https://twitter.com/impactra',
  behance: '',
  seoTitle: 'IMPACTRA – Premium Digital Agency',
  seoDescription: 'We craft exceptional digital experiences that drive growth.',
  logoUrl: '',
};

/* ── API ── */
export const store = {
  // Projects
  getProjects: () => getItem(KEYS.projects, DEFAULT_PROJECTS),
  saveProject: (project) => {
    const list = store.getProjects();
    const exists = list.findIndex(p => p.id === project.id);
    if (exists >= 0) {
      list[exists] = { ...project, updatedAt: now() };
      logActivity('Updated', 'Project', project.title);
    } else {
      list.unshift({ ...project, id: uid(), createdAt: now() });
      logActivity('Created', 'Project', project.title);
    }
    setItem(KEYS.projects, list);
    return list;
  },
  deleteProject: (id) => {
    const list = store.getProjects().filter(p => p.id !== id);
    setItem(KEYS.projects, list);
    logActivity('Deleted', 'Project', id);
    return list;
  },

  // Services
  getServices: () => getItem(KEYS.services, DEFAULT_SERVICES),
  saveService: (service) => {
    const list = store.getServices();
    const exists = list.findIndex(s => s.id === service.id);
    if (exists >= 0) {
      list[exists] = { ...service, updatedAt: now() };
      logActivity('Updated', 'Service', service.title);
    } else {
      list.unshift({ ...service, id: uid(), createdAt: now() });
      logActivity('Created', 'Service', service.title);
    }
    setItem(KEYS.services, list);
    return list;
  },
  deleteService: (id) => {
    const list = store.getServices().filter(s => s.id !== id);
    setItem(KEYS.services, list);
    return list;
  },

  // Testimonials
  getTestimonials: () => getItem(KEYS.testimonials, DEFAULT_TESTIMONIALS),
  saveTestimonial: (item) => {
    const list = store.getTestimonials();
    const exists = list.findIndex(t => t.id === item.id);
    if (exists >= 0) {
      list[exists] = { ...item, updatedAt: now() };
      logActivity('Updated', 'Testimonial', item.name);
    } else {
      list.unshift({ ...item, id: uid(), createdAt: now() });
      logActivity('Created', 'Testimonial', item.name);
    }
    setItem(KEYS.testimonials, list);
    return list;
  },
  deleteTestimonial: (id) => {
    const list = store.getTestimonials().filter(t => t.id !== id);
    setItem(KEYS.testimonials, list);
    return list;
  },

  // Leads
  getLeads: () => getItem(KEYS.leads, DEFAULT_LEADS),
  updateLeadStatus: (id, status) => {
    const list = store.getLeads();
    const idx = list.findIndex(l => l.id === id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], status, updatedAt: now() };
      logActivity('Updated Lead', 'Lead', list[idx].name);
    }
    setItem(KEYS.leads, list);
    return list;
  },
  deleteLead: (id) => {
    const list = store.getLeads().filter(l => l.id !== id);
    setItem(KEYS.leads, list);
    return list;
  },

  // Blogs
  getBlogs: () => getItem(KEYS.blogs, DEFAULT_BLOGS),
  saveBlog: (blog) => {
    const list = store.getBlogs();
    const exists = list.findIndex(b => b.id === blog.id);
    if (exists >= 0) {
      list[exists] = { ...blog, updatedAt: now() };
      logActivity('Updated', 'Blog', blog.title);
    } else {
      list.unshift({ ...blog, id: uid(), createdAt: now() });
      logActivity('Created', 'Blog', blog.title);
    }
    setItem(KEYS.blogs, list);
    return list;
  },
  deleteBlog: (id) => {
    const list = store.getBlogs().filter(b => b.id !== id);
    setItem(KEYS.blogs, list);
    return list;
  },

  // Settings
  getSettings: () => getItem(KEYS.settings, DEFAULT_SETTINGS),
  saveSettings: (settings) => {
    setItem(KEYS.settings, settings);
    logActivity('Updated', 'Settings', 'Website Settings');
    return settings;
  },

  // Activity
  getActivity: () => getItem(KEYS.activity, []),

  // Stats
  getStats: () => ({
    projects: store.getProjects().length,
    services: store.getServices().length,
    testimonials: store.getTestimonials().length,
    leads: store.getLeads().length,
    blogs: store.getBlogs().length,
    newLeads: store.getLeads().filter(l => l.status === 'new').length,
    featuredProjects: store.getProjects().filter(p => p.featured).length,
  }),
};
