import React from 'react';

interface DemoPlaceholderProps {
    title: string;
    className?: string;
}

export default function DemoPlaceholder({ title, className = '' }: DemoPlaceholderProps) {
    return (
        <div 
            className={`relative w-full h-full min-h-[128px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center ${className}`}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_70%)]" />
            <div className="text-sm text-gray-400 relative z-10">
                {title} Demo
            </div>
        </div>
    );
} 