'use client';

import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-adish-green to-adish-dark py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-adish-beige max-w-2xl">
            Have questions? We're here to help. Reach out to our team.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-adish-dark mb-8">
                Send us a Message
              </h2>

              {submitted && (
                <div className="mb-6 bg-adish-beige border-l-4 border-adish-gold p-4 rounded">
                  <p className="text-adish-dark font-bold">Thank you!</p>
                  <p className="text-adish-green text-sm">We'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-adish-dark font-bold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-adish-beige rounded-lg focus:border-adish-gold focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-adish-dark font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-adish-beige rounded-lg focus:border-adish-gold focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-adish-dark font-bold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-adish-beige rounded-lg focus:border-adish-gold focus:outline-none"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label className="block text-adish-dark font-bold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-adish-beige rounded-lg focus:border-adish-gold focus:outline-none resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-adish-green text-white px-8 py-4 rounded-lg font-bold hover:bg-adish-dark transition-colors text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-adish-dark mb-8">
                Other Ways to Connect
              </h2>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex gap-6 p-6 bg-adish-beige rounded-lg hover:border-adish-gold border-2 border-adish-beige transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-adish-green rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-adish-dark mb-1">Phone</h3>
                    <a href="tel:+919560300777" className="text-adish-green hover:text-adish-gold transition-colors">
                      +91 9560300777
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-6 p-6 bg-adish-beige rounded-lg hover:border-adish-gold border-2 border-adish-beige transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-adish-green rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-adish-dark mb-1">Email</h3>
                    <a href="mailto:mailus@adishventures.com" className="text-adish-green hover:text-adish-gold transition-colors">
                      mailus@adishventures.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-6 p-6 bg-adish-beige rounded-lg hover:border-adish-gold border-2 border-adish-beige transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-adish-green rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-adish-dark mb-1">WhatsApp</h3>
                    <a href="https://wa.me/919560300777" className="text-adish-green hover:text-adish-gold transition-colors">
                      +91 9560300777
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-6 p-6 bg-adish-beige rounded-lg hover:border-adish-gold border-2 border-adish-beige transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-adish-green rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-adish-dark mb-1">Location</h3>
                    <p className="text-adish-green">
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-8 p-6 bg-adish-beige border-l-4 border-adish-gold rounded-lg">
                <p className="text-adish-dark font-bold mb-2">Response Time</p>
                <p className="text-adish-green text-sm">
                  We typically respond within 24 hours. For urgent matters, reach out via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
