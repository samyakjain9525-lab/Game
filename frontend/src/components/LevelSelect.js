import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Lock, Star } from 'lucide-react';
import { mockGameData } from '../data/mock';

const LevelSelect = ({ onBack, onSelectLevel, unlockedLevel = 1 }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button 
          onClick={onBack}
          variant="outline"
          className="border-purple-400 text-purple-300 hover:bg-purple-600/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-white ml-4">Select Level</h1>
      </div>

      {/* Level Grid */}
      <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
        {mockGameData.levels.map((level) => {
          const isUnlocked = level.level <= unlockedLevel;
          const difficulty = level.difficulty;
          
          return (
            <Card 
              key={level.level}
              className={`aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                isUnlocked 
                  ? 'bg-gradient-to-br from-purple-600/30 to-blue-600/30 hover:from-purple-500/40 hover:to-blue-500/40 border-purple-400/50' 
                  : 'bg-gray-800/50 border-gray-600/50 cursor-not-allowed'
              }`}
              onClick={() => isUnlocked && onSelectLevel(level.level)}
            >
              {isUnlocked ? (
                <>
                  <div className="text-2xl font-bold text-white mb-1">
                    {level.level}
                  </div>
                  
                  {/* Difficulty Stars */}
                  <div className="flex mb-2">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${
                          i < difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                        }`} 
                      />
                    ))}
                  </div>
                  
                  {/* Mini preview of tubes */}
                  <div className="flex gap-1">
                    {level.tubes.slice(0, 4).map((tube, index) => (
                      <div key={index} className="w-2 h-4 border border-gray-400 rounded-sm bg-black/20">
                        {tube.length > 0 && (
                          <div 
                            className="w-full h-1 rounded-sm"
                            style={{ backgroundColor: tube[0] === 'red' ? '#ff4444' : tube[0] === 'blue' ? '#4444ff' : '#44ff44' }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <Lock className="w-8 h-8 text-gray-500 mb-2" />
                  <div className="text-lg font-bold text-gray-500">
                    {level.level}
                  </div>
                </>
              )}
            </Card>
          );
        })}
      </div>

      {/* Progress Info */}
      <div className="text-center mt-8">
        <Card className="inline-block p-4 bg-black/30 backdrop-blur-sm border-purple-500/30">
          <p className="text-purple-200">
            Progress: {unlockedLevel} / {mockGameData.levels.length} levels unlocked
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LevelSelect;