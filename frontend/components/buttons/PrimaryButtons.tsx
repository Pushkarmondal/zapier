import { ReactNode } from "react"

interface PrimaryButtonProps {
    children: ReactNode;
    onClick: () => void;
    size: "small" | "large";
    className?: string;
}

export const PrimaryButton = ({
    children, 
    onClick, 
    size,
    className = ''
}: PrimaryButtonProps) => {
    return (
        <button 
            onClick={onClick} 
            className={
                `bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full
                ${size === "small" ? 'py-1.5 px-4 text-sm' : 'py-2.5 px-6'}
                transition-colors duration-200 ${className}`.trim()
            }
        >
            {children}
        </button>
    )
}