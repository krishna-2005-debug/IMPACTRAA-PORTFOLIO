require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

// Models
const User = require('./models/User');
const Project = require('./models/Project');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const Lead = require('./models/Lead');
const Blog = require('./models/Blog');
const Setting = require('./models/Setting');

// Middleware
const auth = require('./middleware/auth');

const app = express();

// Security Headers & Logging
app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Atlas Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ MONGO_URI is missing from environment variables!');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas');
    await seedDatabase();
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });

// Health check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

/* ── AUTHENTICATION ROUTES ── */
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { email: user.email, name: user.name } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/* ── PROJECTS API ── */
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.post('/api/projects', auth, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.json(saved);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.put('/api/projects/:id', auth, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.delete('/api/projects/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

/* ── SERVICES API ── */
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.post('/api/services', auth, async (req, res) => {
  try {
    const newService = new Service(req.body);
    const saved = await newService.save();
    res.json(saved);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.put('/api/services/:id', auth, async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.delete('/api/services/:id', auth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Service removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

/* ── TESTIMONIALS API ── */
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.post('/api/testimonials', auth, async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    const saved = await newTestimonial.save();
    res.json(saved);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.put('/api/testimonials/:id', auth, async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.delete('/api/testimonials/:id', auth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Testimonial removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

/* ── LEADS API (Public Post for Contact Forms) ── */
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const saved = await newLead.save();
    res.json(saved);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.get('/api/leads', auth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.put('/api/leads/:id', auth, async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.delete('/api/leads/:id', auth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Lead removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

/* ── BLOGS API ── */
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.post('/api/blogs', auth, async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const saved = await newBlog.save();
    res.json(saved);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.put('/api/blogs/:id', auth, async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.delete('/api/blogs/:id', auth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Blog removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

/* ── SETTINGS API ── */
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting();
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.put('/api/settings', auth, async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (settings) {
      settings = await Setting.findByIdAndUpdate(settings._id, req.body, { new: true });
    } else {
      settings = new Setting(req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

/* ── SYSTEM SEEDING SCRIPT ── */
async function seedDatabase() {
  try {
    // 1. Seed Admin User
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      const defaultAdmin = new User({
        email: 'admin@impactra.in',
        password: 'Impactra@2024', // Automatically hashed by User model pre-save hook
        name: 'IMPACTRA Executive'
      });
      await defaultAdmin.save();
      console.log('🌱 Seeded default Administrator user.');
    }

    // 2. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        { title: 'NeoBank Dashboard', category: 'Web App', technologies: ['React', 'Node.js', 'MongoDB'], description: 'Modern fintech dashboard with real-time analytics.', liveUrl: 'https://neobank.demo', featured: true },
        { title: 'AuraShop E-commerce', category: 'E-Commerce', technologies: ['Next.js', 'Stripe', 'PostgreSQL'], description: 'Full-stack e-commerce with seamless checkout.', liveUrl: 'https://aurashop.demo', featured: false },
        { title: 'FitTrack Mobile App', category: 'Mobile', technologies: ['React Native', 'Firebase'], description: 'Health & fitness tracking app for iOS & Android.', liveUrl: 'https://fittrack.demo', featured: true }
      ]);
      console.log('🌱 Seeded default Portfolio projects.');
    }

    // 3. Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        { title: 'UI/UX Design', description: 'Premium, conversion-focused interfaces that delight users.', icon: '✦', price: '₹25,000', active: true },
        { title: 'Web Development', description: 'Blazing-fast full-stack applications built with modern frameworks.', icon: '⬡', price: '₹50,000', active: true },
        { title: 'Mobile Apps', description: 'Cross-platform mobile apps for iOS and Android.', icon: '◎', price: '₹75,000', active: true },
        { title: 'SEO & Growth', description: 'Data-driven strategies to grow your digital presence.', icon: '▲', price: '₹15,000', active: true }
      ]);
      console.log('🌱 Seeded default Services list.');
    }

    // 4. Seed Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany([
        { name: 'Arjun Mehta', role: 'CEO, TechVentures', text: 'IMPACTRA transformed our online presence completely. The results exceeded all expectations.', rating: 5, approved: true },
        { name: 'Priya Sharma', role: 'Founder, StyleHouse', text: 'The team delivered an exceptional e-commerce platform that boosted our conversions by 340%.', rating: 5, approved: true }
      ]);
      console.log('🌱 Seeded default Testimonials.');
    }

    // 5. Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany([
        { title: '10 UI Trends Dominating 2024', slug: '10-ui-trends-2024', content: 'Glassmorphism, bento grids, and bold typography are reshaping modern design...', tags: ['Design', 'Trends'], status: 'published' }
      ]);
      console.log('🌱 Seeded default Blog posts.');
    }

    // 6. Seed Settings
    const settingCount = await Setting.countDocuments();
    if (settingCount === 0) {
      const defaultSettings = new Setting({
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
        seoDescription: 'We craft exceptional digital experiences that drive growth.'
      });
      await defaultSettings.save();
      console.log('🌱 Seeded default Setting profile.');
    }
  } catch (err) {
    console.error('❌ Error during system database seeding:', err);
  }
}

// Port Binding
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 IMPACTRA Production Server running on port ${PORT}`);
});
