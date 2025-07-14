
const features = [
  {
    title: "Connect Your Apps",
    description: "Easily connect your favorite apps and services to automate workflows without writing any code.",
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Automate Repetitive Tasks",
    description: "Set up Zaps to automatically handle repetitive tasks between your apps, saving you time and effort.",
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  },
  {
    title: "Multi-Step Workflows",
    description: "Create complex workflows with multiple steps and conditions to handle even the most sophisticated processes.",
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: "Real-time Monitoring",
    description: "Monitor your automations in real-time and get alerts when something needs your attention.",
    icon: (
      <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header with back button and title */}
        <div className="flex items-center justify-between mb-16">
          <Link 
            href="/" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors whitespace-nowrap"
          >
            <svg 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
            Powerful Features for Seamless Automation
          </h1>
          <div className="w-24"></div> {/* Empty div for balancing the flex layout */}
        </div>

        {/* Subtitle */}
        <p className="text-center text-xl text-gray-500 mb-12">
          Discover how our platform can transform your workflow with these powerful features
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
