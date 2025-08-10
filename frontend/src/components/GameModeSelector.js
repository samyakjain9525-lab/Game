import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Zap, Brain, Shuffle, Trophy } from 'lucide-react';

const GameModeSelector = ({ onBack, onSelectMode }) => {
  const gameModes = [
    {
      id: 'quick',
      name: 'Quick Play',
      icon: <Zap className="w-8 h-8" />,
      description: 'Fast-paced puzzles with more empty tubes',
      features: ['Quick 2-5 minute levels', 'More empty tubes', 'Easier difficulty curve'],
      color: 'from-orange-500 to-red-500',
      hoverColor: 'from-orange-400 to-red-400'
    },
    {
      id: 'strategic',
      name: 'Strategic Mode',
      icon: <Brain className="w-8 h-8" />,
      description: 'Complex puzzles that challenge your mind',
      features: ['Deep thinking required', 'Fewer empty tubes', 'Advanced mechanics'],
      color: 'from-purple-500 to-blue-500',
      hoverColor: 'from-purple-400 to-blue-400'
    },
    {
      id: 'endless',
      name: 'Endless Challenge',
      icon: <Shuffle className="w-8 h-8" />,
      description: 'Unlimited levels with increasing difficulty',
      features: ['Infinite procedural levels', 'Progressive difficulty', 'Special challenges'],
      color: 'from-green-500 to-teal-500',
      hoverColor: 'from-green-400 to-teal-400'
    },
    {
      id: 'tournament',
      name: 'Tournament Mode',
      icon: <Trophy className="w-8 h-8" />,
      description: 'Compete for the best scores',
      features: ['Timed challenges', 'Leaderboards', 'Daily competitions'],
      color: 'from-yellow-500 to-orange-500',
      hoverColor: 'from-yellow-400 to-orange-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button 
          onClick={onBack}
          variant="outline"
          className="border-purple-400 text-purple-300 hover:bg-purple-600/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-white ml-6">Choose Your Challenge</h1>
      </div>

      {/* Mode Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {gameModes.map((mode) => (
          <Card 
            key={mode.id}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 bg-black/20 backdrop-blur-sm border-white/20 hover:border-white/40 overflow-hidden"
            onClick={() => onSelectMode(mode.id)}
          >
            {/* Mode Header */}
            <div className={`p-6 bg-gradient-to-r ${mode.color} group-hover:${mode.hoverColor} transition-all duration-300`}>
              <div className="flex items-center mb-3">
                <div className="p-3 bg-white/20 rounded-lg mr-4">
                  {mode.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{mode.name}</h3>
                  <p className="text-white/90">{mode.description}</p>
                </div>
              </div>
            </div>

            {/* Mode Features */}
            <div className="p-6">
              <ul className="space-y-3">
                {mode.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full mt-6 bg-gradient-to-r ${mode.color} hover:${mode.hoverColor} text-white font-semibold py-3 transition-all duration-300`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMode(mode.id);
                }}
              >
                Start {mode.name}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Info */}
      <div className="text-center mt-12">
        <Card className="inline-block p-6 bg-black/30 backdrop-blur-sm border-purple-500/30">
          <h3 className="text-lg font-semibold text-purple-300 mb-2">🎮 Pro Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <strong className="text-purple-300">Quick Play:</strong> Perfect for short breaks and casual gaming
            </div>
            <div>
              <strong className="text-purple-300">Strategic:</strong> Deep puzzles for serious puzzle solvers
            </div>
            <div>
              <strong className="text-purple-300">Endless:</strong> Never-ending challenges with unique levels
            </div>
            <div>
              <strong className="text-purple-300">Tournament:</strong> Compete with players worldwide
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GameModeSelector;