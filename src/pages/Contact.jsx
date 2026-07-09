import { useState } from 'react';
import { MessageCircle, Mail, Globe, Send, MapPin } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function Contact() {
  const { settings } = useProducts();
  const [form, setForm] = useState({ name: '', message: '' });

  const waLink = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Hi FreeKey Store! 🙏\n\nName: ${form.name}\n\n${form.message}`)}`;

  return (
    <div style={{ position: 'relative' }}>
      <div className="bg-effects">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
      </div>

      {/* Header */}
      <div className="page-header" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="section-tag" style={{ margin: '0 auto 16px' }}>
            <MessageCircle size={12} /> Contact Us
          </div>
          <h1>Get in <span className="gradient-text">Touch</span></h1>
          <p>Have questions? We're here to help. Reach out via WhatsApp for the fastest response!</p>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 0, position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', marginBottom: 8 }}>
                We're Always Here 💬
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.7 }}>
                Order a product, ask a question, or get help with your subscription. We respond quickly on WhatsApp!
              </p>

              <div className="contact-info-item">
                <div className="contact-icon" style={{ background: 'rgba(37,211,102,0.15)' }}>💬</div>
                <div>
                  <div className="contact-info-title">WhatsApp (Fastest)</div>
                  <div className="contact-info-desc">
                    <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer"
                      style={{ color: '#34d399', textDecoration: 'none' }}>
                      +{settings.whatsappNumber}
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon" style={{ background: 'rgba(59,130,246,0.15)' }}>
                  <Globe size={20} color="var(--blue)" />
                </div>
                <div>
                  <div className="contact-info-title">Official Website</div>
                  <div className="contact-info-desc">
                    <a href="https://www.freekey.store/" target="_blank" rel="noreferrer"
                      style={{ color: 'var(--blue)', textDecoration: 'none' }}>
                      www.freekey.store
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon" style={{ background: 'rgba(139,92,246,0.15)' }}>
                  <MapPin size={20} color="var(--purple-light)" />
                </div>
                <div>
                  <div className="contact-info-title">Location</div>
                  <div className="contact-info-desc">Sri Lanka 🇱🇰</div>
                </div>
              </div>

              {/* Response time */}
              <div style={{
                marginTop: 20, padding: '16px 20px',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ fontSize: '1.5rem' }}>⚡</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#34d399' }}>Lightning Fast Response</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>We typically respond within 5-15 minutes via WhatsApp</div>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <div className="glass-card">
              <h3 style={{ fontFamily: 'var(--font-primary)', marginBottom: 6 }}>Send a Message</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 24 }}>
                This will open WhatsApp with your message pre-filled.
              </p>

              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  className="form-input"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="What product are you interested in? Any questions?"
                  style={{ minHeight: 140 }}
                />
              </div>

              <a
                href={waLink}
                target="_blank" rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '14px 28px' }}
              >
                <Send size={16} /> Send via WhatsApp
              </a>

              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 16 }}>
                Clicking the button will open WhatsApp automatically 📱
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 64 }}>
            <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-primary)', fontSize: '1.8rem', marginBottom: 32 }}>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {[
                { q: 'How do I receive my product?', a: 'After ordering via WhatsApp, we deliver your product credentials within 5-15 minutes.' },
                { q: 'Are these genuine products?', a: 'Yes! All our products are 100% genuine and verified. We guarantee satisfaction.' },
                { q: 'Can I renew my subscription?', a: 'Absolutely! Just message us on WhatsApp before your subscription expires to renew.' },
                { q: 'What payment methods do you accept?', a: 'We accept all popular Sri Lankan payment methods. Details shared via WhatsApp.' },
                { q: 'Is my data safe?', a: 'Yes, we take privacy seriously. We never share your personal information.' },
                { q: 'What if I have issues after purchase?', a: 'We provide full after-sales support. Just message us and we\'ll fix it fast!' },
              ].map((faq, i) => (
                <div key={i} className="glass-card" style={{ padding: '20px 24px' }}>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: 'var(--purple-light)', fontSize: '0.9rem' }}>
                    Q: {faq.q}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
