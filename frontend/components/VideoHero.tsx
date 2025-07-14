"use client";

import { useRouter } from "next/navigation";

const VideoHero = () => {
    const router = useRouter();

    return (
        <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                        Automate the work you do every day
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                        Connect your apps and automate workflows. It is easy, fast, and requires no code.
                    </p>
                </div>
                
                <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 mb-6">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-12 w-12 text-orange-500" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={1.5} 
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Automation Demo Coming Soon
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                            We&apos;re working on something amazing! Get notified when we launch our 
                            automation demo by signing up for early access.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={() => router.push("/features")}
                                className="px-6 py-3 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                Learn More About Our Features →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoHero;
