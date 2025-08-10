import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Play, Trophy, Settings, Info } from 'lucide-react';

const GameMenu = ({ onStartGame, onShowLevels, onShowSettings, onShowHelp }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Water Sort
          </h1>
          <p className="text-xl text-purple-200">Puzzle Game</p>
          <div className="mt-4 animate-bounce">
            <div className="w-16 h-20 mx-auto border-2 border-white rounded-b-lg relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-blue-400 h-1/4"></div>
              <div className="absolute bottom-1/4 left-0 right-0 bg-red-400 h-1/4"></div>
              <div className="absolute bottom-2/4 left-0 right-0 bg-yellow-400 h-1/4"></div>
              <div className="absolute bottom-3/4 left-0 right-0 bg-green-400 h-1/4"></div>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <Card className="p-6 bg-black/30 backdrop-blur-sm border-purple-500/30">
          <div className="space-y-4">
            <Button 
              onClick={onStartGame}
              className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Game
            </Button>
            
            <Button 
              onClick={onShowLevels}
              variant="outline"
              className="w-full py-4 text-lg font-semibold border-purple-400 text-purple-300 hover:bg-purple-600/20 transition-all duration-300"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Select Level
            </Button>
            
            <Button 
              onClick={onShowSettings}
              variant="outline"
              className="w-full py-4 text-lg font-semibold border-purple-400 text-purple-300 hover:bg-purple-600/20 transition-all duration-300"
            >
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </Button>
            
            <Button 
              onClick={onShowHelp}
              variant="outline"
              className="w-full py-4 text-lg font-semibold border-purple-400 text-purple-300 hover:bg-purple-600/20 transition-all duration-300"
            >
              <Info className="w-5 h-5 mr-2" />
              How to Play
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-purple-200">
          <p className="text-sm">Challenge your mind with colorful puzzles!</p>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;