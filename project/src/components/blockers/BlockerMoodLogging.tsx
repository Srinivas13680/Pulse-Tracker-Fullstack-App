import React, { useState } from 'react';
import { AlertTriangle, Smile, Plus, Check, X } from 'lucide-react';
import { mockBlockers, mockMoods } from '../../utils/mockData';

const BlockerMoodLogging: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blockers' | 'mood'>('blockers');
  const [newBlocker, setNewBlocker] = useState({ description: '', tag: 'backend' });
  const [selectedMood, setSelectedMood] = useState('');
  const [blockers, setBlockers] = useState(mockBlockers);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moodOptions = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '🚀', label: 'Productive', value: 'productive' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
    { emoji: '🤔', label: 'Confused', value: 'confused' }
  ];

  const blockerTags = ['backend', 'frontend', 'devops', 'database', 'testing', 'design'];

  const handleBlockerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlocker.description.trim()) return;

    setIsSubmitting(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBlockerItem = {
      id: Date.now().toString(),
      description: newBlocker.description,
      tag: newBlocker.tag,
      userId: '1',
      createdAt: new Date().toISOString(),
      resolved: false
    };

    setBlockers([newBlockerItem, ...blockers]);
    setNewBlocker({ description: '', tag: 'backend' });
    setIsSubmitting(false);
  };

  const handleMoodSubmit = async (mood: string) => {
    if (!mood) return;

    setIsSubmitting(true);
    
    // Mock API call - POST to /api/activity/log
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSelectedMood(mood);
    setIsSubmitting(false);
  };

  const toggleBlockerResolved = async (blockerId: string) => {
    setBlockers(prev => 
      prev.map(blocker => 
        blocker.id === blockerId 
          ? { ...blocker, resolved: !blocker.resolved }
          : blocker
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blockers & Mood</h1>
        <p className="mt-2 text-gray-600">
          Log blockers and share how you're feeling today
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('blockers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'blockers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Blockers</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('mood')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'mood'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Smile className="h-4 w-4" />
                <span>Daily Mood</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'blockers' && (
        <div className="space-y-6">
          {/* Add New Blocker */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Report a Blocker</h2>
            <form onSubmit={handleBlockerSubmit} className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  What's blocking you?
                </label>
                <textarea
                  id="description"
                  value={newBlocker.description}
                  onChange={(e) => setNewBlocker(prev => ({ ...prev, description: e.target.value }))}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={3}
                  placeholder="Describe the blocker you're facing..."
                />
              </div>
              
              <div>
                <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="tag"
                  value={newBlocker.tag}
                  onChange={(e) => setNewBlocker(prev => ({ ...prev, tag: e.target.value }))}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {blockerTags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !newBlocker.description.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                <span>Report Blocker</span>
              </button>
            </form>
          </div>

          {/* Existing Blockers */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Blockers</h2>
            <div className="space-y-4">
              {blockers.map((blocker) => (
                <div
                  key={blocker.id}
                  className={`p-4 border rounded-lg ${
                    blocker.resolved ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          blocker.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {blocker.tag}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(blocker.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`text-sm ${blocker.resolved ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {blocker.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleBlockerResolved(blocker.id)}
                      className={`ml-4 p-2 rounded-full ${
                        blocker.resolved 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } transition-colors`}
                      title={blocker.resolved ? 'Mark as unresolved' : 'Mark as resolved'}
                    >
                      {blocker.resolved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mood' && (
        <div className="space-y-6">
          {/* Mood Selection */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling today?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSubmit(mood.value)}
                  disabled={isSubmitting}
                  className={`p-4 border-2 rounded-xl text-center transition-all ${
                    selectedMood === mood.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium text-gray-900">{mood.label}</div>
                </button>
              ))}
            </div>
            
            {selectedMood && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Thanks for sharing! Your mood has been logged for today.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Team Mood Overview */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Team Mood</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockMoods.map((mood) => (
                <div key={mood.id} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-sm font-medium text-gray-900">{mood.label}</div>
                  <div className="text-xs text-gray-500">Team Member</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockerMoodLogging;