import React, { useState } from 'react';
import { Settings, Briefcase, FileText, BarChart3, AlertTriangle } from 'lucide-react';
import type { JobPlatform, Resume, ApplicationStats } from './types';

function App() {
  const [platforms, setPlatforms] = useState<JobPlatform[]>([
    { name: 'LinkedIn', apiKey: '', enabled: false },
    { name: 'Indeed', apiKey: '', enabled: false },
    { name: 'Glassdoor', apiKey: '', enabled: false }
  ]);
  
  const [stats, setStats] = useState<ApplicationStats>({
    total: 0,
    successful: 0,
    failed: 0,
    platforms: {}
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartDemo = () => {
    setIsProcessing(true);
    // Simulate processing
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 5),
        successful: prev.successful + Math.floor(Math.random() * 3),
        failed: prev.failed + Math.floor(Math.random() * 2),
        platforms: {
          ...prev.platforms,
          LinkedIn: (prev.platforms.LinkedIn || 0) + Math.floor(Math.random() * 2),
          Indeed: (prev.platforms.Indeed || 0) + Math.floor(Math.random() * 2),
          Glassdoor: (prev.platforms.Glassdoor || 0) + Math.floor(Math.random() * 1),
        }
      }));
    }, 1000);

    // Stop after 10 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsProcessing(false);
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Job Application Automation Demo</h1>
          <div className="inline-flex items-center bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-lg">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <p>Hackathon Demo Only - Not For Production Use</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform Configuration */}
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-semibold">Platform Configuration</h2>
            </div>
            {platforms.map((platform, index) => (
              <div key={platform.name} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={platform.enabled}
                      onChange={(e) => {
                        const newPlatforms = [...platforms];
                        newPlatforms[index].enabled = e.target.checked;
                        setPlatforms(newPlatforms);
                      }}
                      className="mr-2"
                    />
                    {platform.name}
                  </label>
                </div>
                <input
                  type="text"
                  placeholder={`${platform.name} API Key`}
                  value={platform.apiKey}
                  onChange={(e) => {
                    const newPlatforms = [...platforms];
                    newPlatforms[index].apiKey = e.target.value;
                    setPlatforms(newPlatforms);
                  }}
                  className="w-full bg-gray-700/50 rounded px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>

          {/* Stats Dashboard */}
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-semibold">Application Statistics</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-500/20 p-4 rounded-lg">
                <p className="text-sm text-blue-300">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-green-500/20 p-4 rounded-lg">
                <p className="text-sm text-green-300">Successful</p>
                <p className="text-2xl font-bold">{stats.successful}</p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-lg">
                <p className="text-sm text-red-300">Failed</p>
                <p className="text-2xl font-bold">{stats.failed}</p>
              </div>
            </div>
            <div className="space-y-2">
              {Object.entries(stats.platforms).map(([platform, count]) => (
                <div key={platform} className="flex justify-between items-center">
                  <span>{platform}</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleStartDemo}
            disabled={isProcessing}
            className={`
              px-6 py-3 rounded-lg font-semibold
              ${isProcessing 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}
              transition-colors
            `}
          >
            {isProcessing ? 'Processing...' : 'Start Demo'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;