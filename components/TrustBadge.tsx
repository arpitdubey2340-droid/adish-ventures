'use client';

import React from 'react';
import { Check, Lock, Award, Truck } from 'lucide-react';

interface TrustBadgeProps {
  type: 'lab-tested' | 'pure' | 'certified' | 'shipping' | 'guarantee';
  size?: 'sm' | 'md' | 'lg';
  withLink?: string;
}

const badgeConfig = {
  'lab-tested': {
    icon: Award,
    label: 'Lab Tested',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  'pure': {
    icon: Check,
    label: '100% Pure',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  'certified': {
    icon: Award,
    label: 'Organic Certified',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  'shipping': {
    icon: Truck,
    label: 'Free Shipping',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  'guarantee': {
    icon: Lock,
    label: '30-Day Guarantee',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
};

export default function TrustBadge({ type, size = 'md', withLink }: TrustBadgeProps) {
  const config = badgeConfig[type];
  const IconComponent = config.icon;

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-2 text-sm gap-2',
    lg: 'px-4 py-3 text-base gap-2',
  };

  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  const badge = (
    <div className={`${config.bgColor} ${config.color} rounded-lg flex items-center ${sizeStyles[size]} font-semibold`}>
      <IconComponent size={iconSize[size]} />
      <span>{config.label}</span>
    </div>
  );

  if (withLink) {
    return (
      <a href={withLink} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
        {badge}
      </a>
    );
  }

  return badge;
}
