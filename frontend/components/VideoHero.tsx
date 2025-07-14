"use client";

import Image from "next/image";
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
                
                <div className="mt-12 rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto bg-gradient-to-br border border-gray-100">
                    <div className="p-12 text-center">
                        <div className="mb-6">
                            <Image
                                src="/images/2002.i039.010_chatbot_messenger_ai_isometric_set-05.jpg" 
                                alt="Automation demo" 
                                className="mx-auto max-w-full h-auto max-h-72"
                                width={300}
                                height={300}
                            />
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
