'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import '@/styles/glass.css'

interface GlassButtonProps {
    href?: string
    onClick?: () => void
    children: React.ReactNode
    className?: string
    disabled?: boolean
    variant?: 'default' | 'nav' | 'secondary'
    type?: 'button' | 'submit' | 'reset'
}

export default function GlassButton({
    href,
    onClick,
    children,
    className = '',
    disabled = false,
    variant = 'default',
    type = 'button'
}: GlassButtonProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const buttonClasses = `
        ${variant === 'nav' ? 'nav-button' : variant === 'secondary' ? 'glass-button-secondary' : 'glass-button'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
    `.trim()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (disabled) return
        if (onClick) onClick()
    }

    const commonProps = {
        className: buttonClasses,
        onClick: handleClick,
        'aria-disabled': disabled,
        suppressHydrationWarning: true
    }

    if (href && !disabled) {
        return (
            <Link
                href={href}
                {...commonProps}
                suppressHydrationWarning={true}
            >
                {children}
            </Link>
        )
    }

    return (
        <button
            {...commonProps}
            type={type}
            disabled={disabled}
            suppressHydrationWarning={true}
        >
            {children}
        </button>
    )
}