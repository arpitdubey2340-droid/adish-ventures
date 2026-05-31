'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles = 'font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Size variants
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 sm:py-5 text-base sm:text-lg min-h-[50px]', // Mobile: 50px, Desktop: auto
  };

  // Color variants
  const variantStyles = {
    primary: 'bg-adish-gold text-white hover:bg-yellow-600 active:bg-yellow-700 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-adish-green border-2 border-adish-green hover:bg-adish-beige active:bg-gray-100',
    ghost: 'text-adish-green hover:underline',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const finalClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  return (
    <button
      className={finalClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}
