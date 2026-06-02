import React, { useState, useEffect } from 'react';
import { store } from '../store';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const ANALYTICS_DATA = [
  { month: 'Jan', visits: 1200, leads: 8 },
  { month: 'Feb', visits: 1900, leads: 12 },
  { month: 'Mar', visits: 2400, leads: 18 },
  { month: 'Apr', visits: 2100, leads: 14 },
  { month: 'May', visits: 3200, leads: 24 },
  { month: 'Jun', visits: 2800, leads: 20 },
];

const PIE_DATA = [
  { name: 'Web Dev', value: 40, color: '#8B5CF6' },
  { name: 'UI/UX', value: 28, color: '#A855F7' },
  { name: 'Mobile', value: 20, color: '#C084FC' },
  { name: 'SEO', value: 12, color: '#DDD6FE' },
];

function StatCard({ icon, label, value, change, color = '#8B5CF6', bg = 'rgba(139,92,246,0.06)' }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      padding: '24px',
      border: '1px solid rgba(139,92,246,0.08)',
      boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(139,92,246,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
          {icon}
        </div>
        {change !== undefined && (
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.75rem', fontWeight: 600,
            color: change >= 0 ? '#10B981' : '#EF4444',
            background: change >= 0 ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
            padding: '4px 10px', borderRadius: 50,
          }}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
      <div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1E1B2E', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.82rem', color: '#9CA3AF', marginTop: 6, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

function ActivityFeed({ items }) {
  const icons = {
    Created: { bg: 'rgba(16,185,129,0.1)', color: '#10B981', symbol: '+' },
    Updated: { bg: 'rgba(59,130,246,0.1)', color: '#3B82F6', symbol: '✎' },
    Deleted: { bg: 'rgba(239,68,68,0.1)', color: '#EF4444', symbol: '×' },
    'Updated Lead': { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B', symbol: '◎' },
  };

  if (!items.length) return (
    <div style={{ textAlign: 'center', padding: '32px', color: '#9CA3AF', fontSize: '0.875rem' }}>
      No recent activity yet.
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {items.slice(0, 8).map((item, i) => {
        const ic = icons[item.action] || icons['Updated'];
        return (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 0',
            borderBottom: i < items.length - 1 ? '1px solid rgba(139,92,246,0.06)' : 'none',
          }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: ic.bg, color: ic.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, flexShrink: 0 }}>{ic.symbol}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.85rem', color: '#1E1B2E', fontWeight: 500 }}>
                <span style={{ color: ic.color }}>{item.action}</span> {item.entity} — <span style={{ fontWeight: 600 }}>{item.name}</span>
              </div>
              <div style={{ fontSize: '0.73rem', color: '#9CA3AF', marginTop: 2 }}>
                {new Date(item.time).toLocaleString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    setStats(store.getStats());
    setActivity(store.getActivity());
  }, []);

  const LEAD_STATUS = [
    { label: 'New', count: store.getLeads().filter(l => l.status === 'new').length, color: '#8B5CF6' },
    { label: 'Contacted', count: store.getLeads().filter(l => l.status === 'contacted').length, color: '#3B82F6' },
    { label: 'Converted', count: store.getLeads().filter(l => l.status === 'converted').length, color: '#10B981' },
    { label: 'Closed', count: store.getLeads().filter(l => l.status === 'closed').length, color: '#9CA3AF' },
  ];

  return (
    <div style={{ maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E1B2E', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#9CA3AF', marginTop: 6, fontSize: '0.9rem' }}>Welcome back! Here's your agency overview.</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 28 }}>
        <StatCard
          icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>}
          label="Total Projects"
          value={stats.projects || 0}
          change={12}
          color="#8B5CF6"
          bg="rgba(139,92,246,0.08)"
        />
        <StatCard
          icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>}
          label="Total Leads"
          value={stats.leads || 0}
          change={24}
          color="#A855F7"
          bg="rgba(168,85,247,0.08)"
        />
        <StatCard
          icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>}
          label="Testimonials"
          value={stats.testimonials || 0}
          change={8}
          color="#7C3AED"
          bg="rgba(124,58,237,0.08)"
        />
        <StatCard
          icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
          label="Services"
          value={stats.services || 0}
          change={0}
          color="#C084FC"
          bg="rgba(192,132,252,0.08)"
        />
        <StatCard
          icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
          label="Blog Posts"
          value={stats.blogs || 0}
          change={5}
          color="#6D28D9"
          bg="rgba(109,40,217,0.08)"
        />
        <StatCard
          icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
          label="New Leads"
          value={stats.newLeads || 0}
          change={18}
          color="#10B981"
          bg="rgba(16,185,129,0.08)"
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Traffic Chart */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '24px', border: '1px solid rgba(139,92,246,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E1B2E', margin: 0 }}>Website Traffic</h3>
              <p style={{ fontSize: '0.78rem', color: '#9CA3AF', margin: '4px 0 0' }}>Visitors & lead conversion</p>
            </div>
            <span style={{ fontSize: '0.75rem', padding: '5px 12px', borderRadius: 50, background: 'rgba(139,92,246,0.08)', color: '#8B5CF6', fontWeight: 600 }}>Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ANALYTICS_DATA}>
              <defs>
                <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C084FC" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#C084FC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(139,92,246,0.15)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontFamily: "'Outfit', sans-serif", fontSize: 12 }} />
              <Area type="monotone" dataKey="visits" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#visitGrad)" name="Visits" />
              <Area type="monotone" dataKey="leads" stroke="#C084FC" strokeWidth={2.5} fill="url(#leadGrad)" name="Leads" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Services Distribution */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '24px', border: '1px solid rgba(139,92,246,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E1B2E', margin: '0 0 4px' }}>Services Mix</h3>
          <p style={{ fontSize: '0.78rem', color: '#9CA3AF', margin: '0 0 16px' }}>Revenue distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(139,92,246,0.15)', fontFamily: "'Outfit', sans-serif", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {PIE_DATA.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color }} />
                  <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{d.name}</span>
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1E1B2E' }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Activity */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '24px', border: '1px solid rgba(139,92,246,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E1B2E', margin: '0 0 20px' }}>Recent Activity</h3>
          <ActivityFeed items={activity} />
        </div>

        {/* Lead Status */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '24px', border: '1px solid rgba(139,92,246,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E1B2E', margin: '0 0 20px' }}>Lead Pipeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {LEAD_STATUS.map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.84rem', color: '#6B7280', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1E1B2E' }}>{item.count}</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: 'rgba(139,92,246,0.08)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.max(5, (item.count / Math.max(1, stats.leads || 1)) * 100)}%`,
                    background: item.color,
                    borderRadius: 4,
                    transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, padding: '16px', background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(168,85,247,0.04))', borderRadius: 14, border: '1px solid rgba(139,92,246,0.1)' }}>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: 4 }}>Conversion Rate</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {stats.leads ? Math.round((store.getLeads().filter(l => l.status === 'converted').length / stats.leads) * 100) : 0}%
            </div>
            <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Leads → Clients</div>
          </div>
        </div>
      </div>
    </div>
  );
}
