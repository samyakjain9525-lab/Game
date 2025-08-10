import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Pause, Play, RotateCcw, Undo, Home, Clock, Target } from 'lucide-react';
import { LevelGenerator } from '../utils/levelGenerator';

const WaterSortGame = ({ initialLevel = 1, gameMode = 'normal', onBackToMenu }) => {
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [gameState, setGameState] = useState(null);
  const [selectedTube, setSelectedTube] = useState(null);
  const [moves, setMoves] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [pouringAnimation, setPouringAnimation] = useState(null);
  const [gameTimer, setGameTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [bestScore, setBestScore] = useState(null);

  useEffect(() => {
    initializeLevel(currentLevel);
  }, [currentLevel, gameMode]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && !isPaused && !isGameWon) {
      interval = setInterval(() => {
        setGameTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isPaused, isGameWon]);

  const initializeLevel = (level) => {
    const levelData = LevelGenerator.generateLevel(level, gameMode);
    setGameState({ tubes: JSON.parse(JSON.stringify(levelData.tubes)) });
    setMoves(0);
    setGameHistory([]);
    setIsGameWon(false);
    setSelectedTube(null);
    setGameTimer(0);
    setIsTimerRunning(true);
    
    // Load best score for this level
    const savedScore = localStorage.getItem(`best_score_${gameMode}_${level}`);
    setBestScore(savedScore ? JSON.parse(savedScore) : null);
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

        // Animate pouring - much faster now
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
            setIsTimerRunning(false);
            
            // Save best score
            const currentScore = { moves, time: gameTimer };
            const isBestScore = !bestScore || 
              moves < bestScore.moves || 
              (moves === bestScore.moves && gameTimer < bestScore.time);
            
            if (isBestScore) {
              localStorage.setItem(`best_score_${gameMode}_${currentLevel}`, JSON.stringify(currentScore));
              setBestScore(currentScore);
            }
          }
          
          setPouringAnimation(null);
        }, 150); // Reduced from 500ms to 150ms for quicker animation
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
    setCurrentLevel(currentLevel + 1);
  };

  const handleRandomLevel = () => {
    const randomLevel = Math.floor(Math.random() * 1000) + 1;
    setCurrentLevel(randomLevel);
  };

  const getTubeColor = (color) => {
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
      'lime': '#32CD32',
      'magenta': '#ff1493',
      'indigo': '#4b0082',
      'maroon': '#800000',
      'navy': '#000080',
      'olive': '#808000',
      'teal': '#008080',
      'silver': '#c0c0c0',
      'coral': '#ff7f50'
    };
    return colorMap[color] || '#888888';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeInfo = () => {
    const modeConfig = {
      'quick': { name: 'Quick Play', color: 'text-orange-400', icon: <Clock className="w-4 h-4" /> },
      'strategic': { name: 'Strategic', color: 'text-purple-400', icon: <Target className="w-4 h-4" /> },
      'endless': { name: 'Endless', color: 'text-green-400', icon: <Target className="w-4 h-4" /> },
      'tournament': { name: 'Tournament', color: 'text-yellow-400', icon: <Target className="w-4 h-4" /> },
      'normal': { name: 'Classic', color: 'text-blue-400', icon: <Target className="w-4 h-4" /> }
    };
    return modeConfig[gameMode] || modeConfig['normal'];
  };

  if (!gameState) return <div>Loading...</div>;

  const modeInfo = getModeInfo();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBackToMenu}
          className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
        >
          <Home className="w-4 h-4 mr-1" />
          Menu
        </Button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-300">LEVEL{currentLevel}</h2>
          <div className={`flex items-center justify-center gap-1 ${modeInfo.color} text-sm`}>
            {modeInfo.icon}
            <span>{modeInfo.name}</span>
          </div>
        </div>
        
        <div className="flex gap-2 items-center">
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

      {/* Game Stats */}
      <div className="flex justify-center gap-4 mb-4">
        <div className="bg-gray-800 px-4 py-2 rounded-lg text-sm">
          <Clock className="w-4 h-4 inline mr-1" />
          {formatTime(gameTimer)}
        </div>
        {bestScore && (
          <div className="bg-green-800 px-4 py-2 rounded-lg text-sm">
            Best: {bestScore.moves} moves, {formatTime(bestScore.time)}
          </div>
        )}
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
        {(gameMode === 'endless' || gameMode === 'quick') && (
          <Button 
            variant="outline" 
            onClick={handleRandomLevel}
            className="bg-green-600 hover:bg-green-700 text-white border-green-500"
          >
            Random Level
          </Button>
        )}
      </div>

      {/* Game Board */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {gameState.tubes.map((tube, index) => (
          <div key={index} className="relative">
            <div 
              className={`w-16 h-32 border-2 border-gray-300 rounded-b-lg cursor-pointer transition-all duration-150 ${
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
                  className="absolute bottom-0 left-0 right-0 transition-all duration-200"
                  style={{
                    backgroundColor: getTubeColor(color),
                    height: `${(100 / 4) * 0.9}%`,
                    bottom: `${colorIndex * 25}%`,
                    borderRadius: colorIndex === 0 ? '0 0 4px 4px' : '0',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
              ))}
              
              {/* Pouring animation - much faster */}
              {pouringAnimation?.from === index && (
                <div 
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 animate-bounce"
                  style={{ 
                    height: '15px',
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
          <Card className="p-6 text-center bg-gray-800 border-purple-500 max-w-md">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Level Complete!</h2>
            <div className="space-y-2 mb-4">
              <p className="text-gray-300">Moves: <span className="text-white font-bold">{moves}</span></p>
              <p className="text-gray-300">Time: <span className="text-white font-bold">{formatTime(gameTimer)}</span></p>
              {bestScore && bestScore.moves === moves && bestScore.time === gameTimer && (
                <p className="text-yellow-400 font-bold">🏆 New Best Score!</p>
              )}
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={handleRestart} variant="outline" className="bg-purple-600 hover:bg-purple-700">
                Play Again
              </Button>
              <Button onClick={handleNextLevel} className="bg-green-600 hover:bg-green-700">
                Next Level
              </Button>
              {(gameMode === 'endless' || gameMode === 'quick') && (
                <Button onClick={handleRandomLevel} className="bg-blue-600 hover:bg-blue-700">
                  Random Level
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