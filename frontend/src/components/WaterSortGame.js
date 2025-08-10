import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Pause, Play, RotateCcw, Undo, Home } from 'lucide-react';
import { mockGameData } from '../data/mock';

const WaterSortGame = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameState, setGameState] = useState(null);
  const [selectedTube, setSelectedTube] = useState(null);
  const [moves, setMoves] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [pouringAnimation, setPouringAnimation] = useState(null);

  useEffect(() => {
    initializeLevel(currentLevel);
  }, [currentLevel]);

  const initializeLevel = (level) => {
    const levelData = mockGameData.levels.find(l => l.level === level);
    if (levelData) {
      setGameState({ tubes: JSON.parse(JSON.stringify(levelData.tubes)) });
      setMoves(0);
      setGameHistory([]);
      setIsGameWon(false);
      setSelectedTube(null);
    }
  };

  const checkWinCondition = (tubes) => {
    return tubes.every(tube => {
      if (tube.length === 0) return true;
      if (tube.length === 4) {
        return tube.every(color => color === tube[0]);
      }
      return false;
    });
  };

  const canPour = (fromTube, toTube) => {
    if (fromTube.length === 0) return false;
    if (toTube.length === 4) return false;
    if (toTube.length === 0) return true;
    
    const fromColor = fromTube[fromTube.length - 1];
    const toColor = toTube[toTube.length - 1];
    return fromColor === toColor;
  };

  const getTopColorCount = (tube) => {
    if (tube.length === 0) return 0;
    const topColor = tube[tube.length - 1];
    let count = 0;
    for (let i = tube.length - 1; i >= 0; i--) {
      if (tube[i] === topColor) count++;
      else break;
    }
    return count;
  };

  const handleTubeClick = (tubeIndex) => {
    if (isPaused || isGameWon) return;

    if (selectedTube === null) {
      if (gameState.tubes[tubeIndex].length > 0) {
        setSelectedTube(tubeIndex);
      }
    } else {
      if (selectedTube === tubeIndex) {
        setSelectedTube(null);
        return;
      }

      const fromTube = gameState.tubes[selectedTube];
      const toTube = gameState.tubes[tubeIndex];

      if (canPour(fromTube, toTube)) {
        // Save current state to history
        setGameHistory(prev => [...prev, { 
          tubes: JSON.parse(JSON.stringify(gameState.tubes)),
          moves: moves
        }]);

        // Animate pouring
        setPouringAnimation({ from: selectedTube, to: tubeIndex });
        
        setTimeout(() => {
          const newTubes = [...gameState.tubes];
          const topColorCount = getTopColorCount(fromTube);
          const spaceInToTube = 4 - toTube.length;
          const colorsToPour = Math.min(topColorCount, spaceInToTube);

          // Move colors
          for (let i = 0; i < colorsToPour; i++) {
            const color = newTubes[selectedTube].pop();
            newTubes[tubeIndex].push(color);
          }

          setGameState({ tubes: newTubes });
          setMoves(moves + 1);
          
          // Check win condition
          if (checkWinCondition(newTubes)) {
            setIsGameWon(true);
          }
          
          setPouringAnimation(null);
        }, 500);
      }
      
      setSelectedTube(null);
    }
  };

  const handleUndo = () => {
    if (gameHistory.length > 0) {
      const lastState = gameHistory[gameHistory.length - 1];
      setGameState({ tubes: lastState.tubes });
      setMoves(lastState.moves);
      setGameHistory(prev => prev.slice(0, -1));
    }
  };

  const handleRestart = () => {
    initializeLevel(currentLevel);
  };

  const handleNextLevel = () => {
    if (currentLevel < mockGameData.levels.length) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const getTubeColor = (colors, index) => {
    const colorMap = {
      'red': '#ff4444',
      'blue': '#4444ff',
      'green': '#44ff44',
      'yellow': '#ffff44',
      'purple': '#ff44ff',
      'orange': '#ff8844',
      'cyan': '#44ffff',
      'pink': '#ff88ff',
      'brown': '#8B4513',
      'lime': '#32CD32'
    };
    return colorMap[colors] || '#888888';
  };

  if (!gameState) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500">
          <Home className="w-4 h-4 mr-1" />
          Menu
        </Button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-300">LEVEL{currentLevel}</h2>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
          <div className="bg-purple-600 px-3 py-1 rounded text-sm font-bold">
            {moves}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={handleUndo}
          disabled={gameHistory.length === 0}
          className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500 disabled:opacity-50"
        >
          <Undo className="w-4 h-4 mr-1" />
          Undo
        </Button>
        <Button 
          variant="outline" 
          onClick={handleRestart}
          className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Restart
        </Button>
      </div>

      {/* Game Board */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {gameState.tubes.map((tube, index) => (
          <div key={index} className="relative">
            <div 
              className={`w-16 h-32 border-2 border-gray-300 rounded-b-lg cursor-pointer transition-all duration-200 ${
                selectedTube === index ? 'ring-4 ring-yellow-400 scale-105' : ''
              } ${pouringAnimation?.from === index ? 'animate-pulse' : ''}`}
              onClick={() => handleTubeClick(index)}
              style={{ 
                background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.1) 100%)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Liquid layers */}
              {tube.map((color, colorIndex) => (
                <div
                  key={`${index}-${colorIndex}`}
                  className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                  style={{
                    backgroundColor: getTubeColor(color),
                    height: `${(100 / 4) * 0.9}%`,
                    bottom: `${colorIndex * 25}%`,
                    borderRadius: colorIndex === 0 ? '0 0 4px 4px' : '0',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
              ))}
              
              {/* Pouring animation */}
              {pouringAnimation?.from === index && (
                <div 
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 bg-current animate-bounce"
                  style={{ 
                    height: '20px',
                    backgroundColor: tube.length > 0 ? getTubeColor(tube[tube.length - 1]) : 'transparent'
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Game Status */}
      <div className="text-center mb-4">
        <h3 className="text-3xl font-bold text-blue-300 mb-2">Sort Colors</h3>
        <p className="text-gray-300">Tap tubes to pour liquid. Sort all colors into separate tubes!</p>
      </div>

      {/* Win Modal */}
      {isGameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 text-center bg-gray-800 border-purple-500">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Level Complete!</h2>
            <p className="text-gray-300 mb-4">Moves: {moves}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart} variant="outline" className="bg-purple-600 hover:bg-purple-700">
                Restart Level
              </Button>
              {currentLevel < mockGameData.levels.length && (
                <Button onClick={handleNextLevel} className="bg-green-600 hover:bg-green-700">
                  Next Level
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Pause Overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-300 mb-4">PAUSED</h2>
            <Button 
              onClick={() => setIsPaused(false)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterSortGame;