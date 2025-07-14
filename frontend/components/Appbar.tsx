"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LinkButton from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButtons";

const ZapierLogo = () => (
    <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-orange-500"
    >
        <path 
            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.79 0-10.5-4.71-10.5-10.5S6.21 1.5 12 1.5 22.5 6.21 22.5 12 17.79 22.5 12 22.5z" 
            fill="currentColor"
        />
        <path 
            d="M12 3.75c-4.55 0-8.25 3.7-8.25 8.25s3.7 8.25 8.25 8.25 8.25-3.7 8.25-8.25S16.55 3.75 12 3.75zm0 15c-3.72 0-6.75-3.03-6.75-6.75S8.28 5.25 12 5.25s6.75 3.03 6.75 6.75-3.03 6.75-6.75 6.75z" 
            fill="currentColor"
        />
        <path 
            d="M12 6.75c-2.9 0-5.25 2.35-5.25 5.25S9.1 17.25 12 17.25 17.25 14.9 17.25 12 14.9 6.75 12 6.75zm0 9c-2.07 0-3.75-1.68-3.75-3.75S9.93 8.25 12 8.25s3.75 1.68 3.75 3.75-1.68 3.75-3.75 3.75z" 
            fill="currentColor"
        />
    </svg>
);

export const Appbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            router.push('/login');
        }
    };
    
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center space-x-2">
                        <ZapierLogo />
                        <span className="text-2xl font-bold text-gray-900">Zapier</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <button 
                                    onClick={handleLogout}
                                    className="text-sm cursor-pointer border border-slate-300 shadow-xl rounded-full font-medium text-slate-700 hover:text-slate-900 px-3 py-2"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-6">
                                <LinkButton 
                                    onClick={() => router.push("/login")}
                                    className="px-3 py-2 cursor-pointer"
                                >
                                    Log In
                                </LinkButton>
                                <div className="ml-1 border-l border-gray-200 h-6"></div>
                                <PrimaryButton 
                                    onClick={() => router.push("/signup")} 
                                    size="small"
                                    className="cursor-pointer"
                                >
                                    Sign Up
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 w-full"></div>
        </div>
    );
};
export default Appbar;