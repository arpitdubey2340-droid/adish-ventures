'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Certification {
  name: string;
  fullName: string;
  icon: string;
  description: string;
  certDate: string;
  validUntil: string;
  authority: string;
  labReportUrl?: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  badgeColor: string;
  iconBg: string;
}

const certifications: Certification[] = [
  {
    name: 'FDA',
    fullName: 'FDA Approved',
    icon: '🏛️',
    description: 'Food & Drug Administration',
    certDate: '2023-06-15',
    validUntil: '2026-06-15',
    authority: 'US Food & Drug Administration',
    labReportUrl: '#',
    bgColor: 'bg-white',
    textColor: 'text-adish-dark',
    borderColor: 'border-gray-200 hover:border-adish-gold',
    badgeColor: 'bg-adish-gold',
    iconBg: 'from-yellow-100 to-yellow-50'
  },
  {
    name: 'HACCP',
    fullName: 'HACCP Certified',
    icon: '✓',
    description: 'Hazard Analysis Critical Control Point',
    certDate: '2023-08-20',
    validUntil: '2025-08-20',
    authority: 'International HACCP Alliance',
    labReportUrl: '#',
    bgColor: 'bg-white',
    textColor: 'text-adish-dark',
    borderColor: 'border-gray-200 hover:border-adish-gold',
    badgeColor: 'bg-adish-gold',
    iconBg: 'from-yellow-100 to-yellow-50'
  },
  {
    name: 'GMP',
    fullName: 'GMP Certified',
    icon: '⚙️',
    description: 'Good Manufacturing Practice',
    certDate: '2023-05-10',
    validUntil: '2026-05-10',
    authority: 'ISO Certified Facility',
    labReportUrl: '#',
    bgColor: 'bg-white',
    textColor: 'text-adish-dark',
    borderColor: 'border-gray-200 hover:border-adish-gold',
    badgeColor: 'bg-adish-gold',
    iconBg: 'from-yellow-100 to-yellow-50'
  },
  {
    name: 'ISO',
    fullName: 'ISO 9001:2015',
    icon: '🌍',
    description: 'Quality Management Standard',
    certDate: '2023-03-01',
    validUntil: '2026-03-01',
    authority: 'ISO Quality Standards',
    labReportUrl: '#',
    bgColor: 'bg-white',
    textColor: 'text-adish-dark',
    borderColor: 'border-gray-200 hover:border-adish-gold',
    badgeColor: 'bg-adish-gold',
    iconBg: 'from-yellow-100 to-yellow-50'
  },
  {
    name: 'FSSAI',
    fullName: 'FSSAI Licensed',
    icon: '📋',
    description: 'Food Safety & Standards Authority',
    certDate: '2023-07-15',
    validUntil: '2025-07-15',
    authority: 'Food Safety & Standards Authority of India',
    labReportUrl: '#',
    bgColor: 'bg-white',
    textColor: 'text-adish-dark',
    borderColor: 'border-gray-200 hover:border-adish-gold',
    badgeColor: 'bg-adish-gold',
    iconBg: 'from-yellow-100 to-yellow-50'
  },
  {
    name: 'NON-GMO',
    fullName: 'Non-GMO Verified',
    icon: '🌿',
    description: 'Non-Genetically Modified',
    certDate: '2023-04-12',
    validUntil: '2026-04-12',
    authority: 'Non-GMO Project Verified',
    labReportUrl: '#',
    bgColor: 'bg-white',
    textColor: 'text-adish-dark',
    borderColor: 'border-gray-200 hover:border-adish-gold',
    badgeColor: 'bg-adish-gold',
    iconBg: 'from-yellow-100 to-yellow-50'
  }
];

export default function CertificationsSection() {
  const [expandedCert, setExpandedCert] = useState<string | null>(null);

  return (
    <div className="py-12 px-6 sm:px-8 rounded-lg bg-adish-beige border-t-2 border-gray-200 -mx-6 sm:-mx-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif font-bold text-adish-dark mb-4">
            Certifications & Compliance
          </h2>
          <p className="text-lg text-adish-green max-w-2xl mx-auto">
            Our products meet the highest standards of quality, safety, and purity
          </p>
        </div>

        {/* Scrolling Certification Belt */}
        <style>{`
          @keyframes scrollBelt {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .belt-scroll {
            animation: scrollBelt 20s linear infinite;
          }
          @keyframes iconPulse {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
          }
          .icon-pulse:hover {
            animation: iconPulse 0.6s ease-in-out;
          }
        `}</style>

        <div className="mb-10 h-14 rounded-full overflow-hidden relative"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,250,205,0.6) 20%, rgba(255,250,205,0.8) 50%, rgba(255,250,205,0.6) 80%, transparent 100%)',
            boxShadow: '0 4px 16px rgba(201, 168, 76, 0.08), inset 0 -1px 4px rgba(201, 168, 76, 0.1)'
          }}
        >
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white to-transparent z-20 pointer-events-none"></div>

          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white to-transparent z-20 pointer-events-none"></div>

          {/* Scrolling Content */}
          <div className="belt-scroll flex items-center whitespace-nowrap h-full">
            {/* Message Set 1 */}
            <div className="flex items-center gap-12 px-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-sm font-bold text-adish-dark">6 Certifications</span>
              </div>
              <div className="w-1 h-4 bg-adish-gold"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔬</span>
                <span className="text-sm font-bold text-adish-dark">Lab Tested</span>
              </div>
              <div className="w-1 h-4 bg-adish-gold"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-sm font-bold text-adish-dark">100% Verified</span>
              </div>
              <div className="w-1 h-4 bg-adish-gold"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <span className="text-sm font-bold text-adish-dark">98/100 Quality Score</span>
              </div>
              <div className="w-1 h-4 bg-adish-gold"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <span className="text-sm font-bold text-adish-dark">Overall Compliance: 98%</span>
              </div>
            </div>

            {/* Message Set 2 (Duplicate for continuous scroll) */}
            <div className="flex items-center gap-12 px-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-sm font-bold text-adish-dark">6 Certifications</span>
              </div>
              <div className="w-1 h-4 bg-adish-gold"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔬</span>
                <span className="text-sm font-bold text-adish-dark">Lab Tested</span>
              </div>
              <div className="w-1 h-4 bg-adish-gold"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-sm font-bold text-adish-dark">100% Verified</span>
              </div>
              <div className="w-1 h-4 bg-adish-gold"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <span className="text-sm font-bold text-adish-dark">98/100 Quality Score</span>
              </div>
              <div className="w-1 h-4 bg-adish-gold"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <span className="text-sm font-bold text-adish-dark">Overall Compliance: 98%</span>
              </div>
            </div>
          </div>
        </div>


        {/* Certifications Container - Single Box */}
        <div className="bg-white rounded-lg p-6 sm:p-8 mb-12" style={{
          boxShadow: '0 4px 16px rgba(201, 168, 76, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setExpandedCert(expandedCert === cert.name ? null : cert.name)}
                className="relative cursor-pointer text-center group"
              >
                {/* Icon */}
                <div className="text-4xl sm:text-5xl mb-3 leading-none">
                  {cert.icon}
                </div>

                {/* Full Name */}
                <h3 className="text-xs sm:text-sm font-semibold text-adish-dark mb-1 leading-tight">
                  {cert.fullName}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-tight">
                  {cert.description}
                </p>

                {/* Expandable Details */}
                {expandedCert === cert.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border border-gray-300 rounded-lg p-2.5 z-20 text-left w-44 text-xs shadow-md"
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="h-0.5 bg-adish-gold rounded-full mb-2"></div>
                    <p className="text-adish-dark mb-1 font-semibold text-xs">
                      Issued: {cert.certDate}
                    </p>
                    <p className="text-adish-dark mb-1 font-semibold text-xs">
                      Valid: {cert.validUntil}
                    </p>
                    <p className="text-gray-600 mb-2 text-xs">
                      {cert.authority}
                    </p>
                    <a
                      href={cert.labReportUrl}
                      className="bg-adish-gold text-white hover:opacity-90 font-semibold text-xs px-2 py-1 rounded text-center block transition-all"
                    >
                      View Report <span className="text-green-300">→</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Message - Transparent & Seamless */}
        <div className="p-4 text-center overflow-hidden relative -mx-6 sm:-mx-8 px-6 sm:px-8"
          style={{
            background: 'transparent'
          }}
        >
          <div className="relative z-10">
            <p className="text-base font-semibold text-adish-dark mb-2">🔬 Laboratory Tested & Verified</p>
            <p className="text-xs text-adish-green leading-relaxed max-w-2xl mx-auto">
              Every batch independently lab tested for purity & potency in certified facilities with strict quality control standards.
            </p>
            <div className="mt-3 h-0.5 w-10 bg-gradient-to-r from-adish-gold to-yellow-500 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
