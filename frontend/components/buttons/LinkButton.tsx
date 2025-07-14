"use client"

import { ReactNode } from "react"

export const LinkButton = ({ 
    children, 
    onClick, 
    className = '' 
}: { 
    children: ReactNode, 
    onClick: () => void,
    className?: string 
}) => {
    return (
        <button 
            onClick={onClick} 
            className={`
                text-gray-700 hover:text-orange-600 
                font-medium text-sm transition-colors duration-200
                ${className}
            `}
        >
            {children}
        </button>
    )
}

export default LinkButton