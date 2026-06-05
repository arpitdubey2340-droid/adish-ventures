'use client';

import { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string | string[];
  list?: string[];
}

export default function FAQ() {
  const [expanded, setExpanded] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const faqData: FAQItem[] = [
    {
      question: 'What is Cordyceps Militaris?',
      answer: [
        'Cordyceps Militaris is a parasitic fungus with over 2,000 years of documented use in Himalayan and Eastern medicine — revered for its ability to deliver sustained energy, mental clarity, and systemic vitality without the dependence or crash associated with synthetic stimulants.',
        'Modern science has validated what traditional practitioners long observed. The fungus contains a precise architecture of bioactive compounds — Cordycepin, which drives ATP synthesis at the mitochondrial level; Beta-D-Glucans, which modulate immune function bidirectionally; Adenosine, which supports respiratory efficiency and oxygen utilisation; and Ergosterol, a Vitamin D2 precursor with potent antioxidant properties.'
      ]
    },
    {
      question: "What's the difference between the Powder and the Tincture?",
      answer: 'Both products contain 100% Cordyceps Militaris fruiting body extract. The difference lies in delivery mechanism and absorption speed.',
      list: [
        'Potency Powder — Mixed into water, coffee, or a smoothie. Absorbs in 20–45 minutes. Gradual, sustained release — ideal for daily baseline supplementation.',
        'Endurance Tincture — Administered sublingually (under the tongue). Absorbs in 2–5 minutes via dual-extraction. Ideal for performance on demand — pre-workout, pre-meeting, or any high-output moment.'
      ]
    },
    {
      question: 'How often should I take these products?',
      answer: 'Cordyceps is an adaptogen — its benefits build cumulatively with consistent daily use, rather than delivering a one-time effect.',
      list: [
        'Powder: 1–2 teaspoons daily with your morning beverage or meals. Start with 1 teaspoon for the first week.',
        'Tincture: 10–20 drops under the tongue daily, or 30 minutes before physical or cognitive exertion. Hold for 30–60 seconds before swallowing.'
      ]
    },
    {
      question: 'Are there any side effects?',
      answer: [
        'Cordyceps Militaris has a well-established safety profile across centuries of traditional use and modern clinical observation. For most healthy adults, it is very well tolerated.',
        'A small number of first-time users may notice mild digestive sensitivity during the initial few days — this typically resolves as the body adjusts. Starting with a lower dose minimises this.'
      ]
    },
    {
      question: 'Is this suitable for athletes and high-performance individuals?',
      answer: 'Yes — and this is precisely the population our formulations are engineered for. Cordycepin facilitates ATP synthesis at the mitochondrial level — the same energy currency your muscles demand during sustained exertion.',
      list: [
        'Improved oxygen utilisation and reduced lactic acid buildup.',
        'Faster recovery between training sessions.',
        'Free from prohibited substances as classified by WADA (World Anti-Doping Agency).',
        'No synthetic additives, stimulants, or performance-enhancing drugs.'
      ]
    },
    {
      question: 'How should I store these products?',
      answer: '',
      list: [
        'Potency Powder: Cool, dry location away from direct sunlight. Seal tightly after each use. Shelf life: 6–12 months.',
        'Endurance Tincture: Store upright at room temperature, away from heat and sunlight. Shelf life: 3–5 years.'
      ]
    },
    {
      question: 'What is your 30-day money-back guarantee?',
      answer: 'We stand behind our formulations with an unconditional 30-day money-back guarantee. If you do not experience a measurable improvement in energy, endurance, or clarity within 30 days of consistent use — contact us and we will issue a full refund, no questions asked.'
    },
    {
      question: 'How long does delivery take, and is COD available?',
      answer: 'Orders are dispatched within 1 business day. Standard delivery across India takes 3–5 business days.',
      list: [
        'We ship Pan-India.',
        'Cash on Delivery (COD) available on all orders.',
        'Tracking link sent via SMS/email once your order ships.',
        'Queries: mailus@adishventures.com or +91 9560300777.'
      ]
    }
  ];

  const toggleExpanded = (questionId: string) => {
    setExpanded(expanded === questionId ? '' : questionId);
  };

  // Filter FAQ items based on search query
  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof item.answer === 'string' ? item.answer.toLowerCase().includes(searchQuery.toLowerCase()) : false)
  );

  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* White Card Container */}
        <div className="bg-white rounded-lg shadow-md border-2 border-adish-gold p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-serif font-bold text-adish-dark mb-3">Frequently Asked Questions</h1>
            <p className="text-adish-green text-lg">Find answers to common questions about our products</p>
          </div>

          {/* Search Box */}
          <div className="mb-10 relative">
            <Search size={22} className="absolute left-4 top-4 text-adish-green" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-3.5 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-adish-gold focus:border-transparent"
            />
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((item, idx) => {
                const itemId = `faq-${idx}`;
                const isOpen = expanded === itemId;

                return (
                  <div key={idx} className="border-2 border-gray-300 rounded-lg mb-4 overflow-hidden last:mb-0">
                    <button
                      onClick={() => toggleExpanded(itemId)}
                      className="w-full px-6 py-6 flex items-start justify-between gap-4 hover:bg-yellow-50 transition-colors group"
                    >
                      <h3 className="text-left text-adish-dark font-semibold text-xl group-hover:text-adish-green transition-colors">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0 mt-0.5">
                        {isOpen ? (
                          <X size={18} className="text-adish-dark" />
                        ) : (
                          <Plus size={18} className="text-adish-dark" />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    {isOpen && (
                      <div className="px-6 py-6 bg-yellow-50 border-t-2 border-gray-300">
                        <div className="text-adish-dark text-lg leading-relaxed space-y-4">
                          {typeof item.answer === 'string' ? (
                            item.answer && <p>{item.answer}</p>
                          ) : (
                            item.answer.map((paragraph, pIdx) => (
                              <p key={pIdx}>{paragraph}</p>
                            ))
                          )}

                          {item.list && (
                            <ul className="space-y-3 mt-5">
                              {item.list.map((listItem, lIdx) => (
                                <li key={lIdx} className="flex gap-3 text-adish-dark text-lg">
                                  <span className="text-adish-green flex-shrink-0 mt-1 font-bold">•</span>
                                  <span>{listItem}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <p className="text-adish-dark text-xl">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="mt-12 -mx-8 -mb-8 px-8 py-12 bg-white rounded-b-lg text-center border-t-2 border-gray-300">
            <p className="text-2xl mb-8 font-bold leading-relaxed px-6 py-4 rounded-lg" style={{backgroundColor: '#2d5a45', color: '#ffffff'}}>
              Still have questions? Get in touch with us.
            </p>
            <a
              href="mailto:mailus@adishventures.com"
              className="inline-block px-12 py-4 bg-adish-gold text-white font-bold text-xl rounded-lg hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
