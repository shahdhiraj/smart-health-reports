import React from 'react';
import { cn } from './Button';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'success' | 'warning' | 'critical' | 'info' | 'neutral';
}

export const Badge = ({ className, variant = 'neutral', children, ...props }: BadgeProps) => {
    const variants = {
        success: 'bg-green-100 text-green-800',
        warning: 'bg-amber-100 text-amber-800',
        critical: 'bg-red-100 text-red-800 animate-pulse',
        info: 'bg-blue-100 text-blue-800',
        neutral: 'bg-gray-100 text-gray-800'
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};
