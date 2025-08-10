import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Trophy, Star, RotateCcw, Home, Play, Target, Clock, Zap } from 'lucide-react';
import './animations.css';

export const VictoryTemplate = ({ 
  moves, 
  time, 
  level, 
  gameMode, 
  isNewRecord, 
  onRestart, 
  onNextLevel, 
  onMainMenu,
  onRandomLevel,
  levelMetadata 
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    setShowConfetti(true);
    const phases = [0, 1, 2];
    let currentPhase = 0;
    
    const interval = setInterval(() => {
      currentPhase = (currentPhase + 1) % phases.length;
      setAnimationPhase(currentPhase);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreRating = () => {
    const estimatedMoves = levelMetadata?.estimatedMoves || moves * 2;
    const efficiency = estimatedMoves / moves;
    
    if (efficiency >= 1.5) return { rating: 'Perfect!', stars: 3, color: 'text-yellow-300' };
    if (efficiency >= 1.2) return { rating: 'Excellent!', stars: 3, color: 'text-yellow-400' };
    if (efficiency >= 1.0) return { rating: 'Great!', stars: 2, color: 'text-blue-300' };
    return { rating: 'Good!', stars: 1, color: 'text-green-400' };
  };

  const scoreRating = getScoreRating();

  return (
    <div className="victory-overlay">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 6)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="victory-modal victory-template">
        {/* Victory Header */}
        <div className="victory-header">
          <div className="trophy-container">
            <div className={`trophy-animation phase-${animationPhase}`}>
              <Trophy className="trophy-icon" />
              <div className="trophy-glow"></div>
            </div>
          </div>
          
          <h1 className="victory-title">
            🎉 Level Complete! 🎉
          </h1>
          
          <div className="victory-subtitle">
            {isNewRecord && (
              <div className="new-record-badge">
                <Star className="w-4 h-4" />
                New Best Score!
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="victory-stats">
          <div className="stat-row main-stats">
            <div className="stat-card moves-stat">
              <div className="stat-icon">
                <Target className="w-6 h-6" />
              </div>
              <div className="stat-value">{moves}</div>
              <div className="stat-label">Moves</div>
            </div>
            
            <div className="stat-card time-stat">
              <div className="stat-icon">
                <Clock className="w-6 h-6" />
              </div>
              <div className="stat-value">{formatTime(time)}</div>
              <div className="stat-label">Time</div>
            </div>
            
            <div className="stat-card level-stat">
              <div className="stat-icon">
                <Zap className="w-6 h-6" />
              </div>
              <div className="stat-value">{level}</div>
              <div className="stat-label">Level</div>
            </div>
          </div>

          {/* Rating */}
          <div className="rating-section">
            <div className={`rating-text ${scoreRating.color}`}>
              {scoreRating.rating}
            </div>
            <div className="stars-container">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className={`star ${i < scoreRating.stars ? 'filled' : 'empty'}`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* Level Info */}
          {levelMetadata && (
            <div className="level-info">
              <div className="info-row">
                <span>Pattern:</span>
                <span className="info-value">{levelMetadata.pattern || 'Classic'}</span>
              </div>
              <div className="info-row">
                <span>Colors:</span>
                <span className="info-value">{levelMetadata.colorCount}</span>
              </div>
              <div className="info-row">
                <span>Mode:</span>
                <span className="info-value capitalize">{gameMode}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="victory-actions">
          <div className="primary-actions">
            <Button 
              onClick={onNextLevel} 
              className="victory-btn primary-victory-btn"
            >
              <Play className="w-5 h-5 mr-2" />
              Next Level
            </Button>
            
            {(gameMode === 'endless' || gameMode === 'quick') && (
              <Button 
                onClick={onRandomLevel} 
                className="victory-btn secondary-victory-btn"
              >
                <Zap className="w-5 h-5 mr-2" />
                Random Level
              </Button>
            )}
          </div>
          
          <div className="secondary-actions">
            <Button 
              onClick={onRestart} 
              variant="outline"
              className="victory-btn outline-victory-btn"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            
            <Button 
              onClick={onMainMenu} 
              variant="outline"
              className="victory-btn outline-victory-btn"
            >
              <Home className="w-4 h-4 mr-2" />
              Main Menu
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .victory-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 1rem;
        }

        .confetti-container {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confettiFall linear infinite;
          transform-origin: center;
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .victory-template {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: 3px solid #ffd700;
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
          width: 100%;
          color: white;
          text-align: center;
          animation: victoryAppear 0.8s ease-out;
          box-shadow: 0 20px 60px rgba(255, 215, 0, 0.3);
        }

        @keyframes victoryAppear {
          0% {
            transform: scale(0.5) rotateY(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotateY(-90deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotateY(0deg);
            opacity: 1;
          }
        }

        .trophy-container {
          margin-bottom: 1.5rem;
        }

        .trophy-animation {
          position: relative;
          display: inline-block;
          transition: all 0.5s ease;
        }

        .trophy-animation.phase-0 {
          transform: scale(1) rotateY(0deg);
        }

        .trophy-animation.phase-1 {
          transform: scale(1.2) rotateY(180deg);
        }

        .trophy-animation.phase-2 {
          transform: scale(1.1) rotateY(360deg);
        }

        .trophy-icon {
          width: 4rem;
          height: 4rem;
          color: #ffd700;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
        }

        .trophy-glow {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent);
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0.8; }
        }

        .victory-title {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .new-record-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 215, 0, 0.2);
          border: 1px solid #ffd700;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          color: #ffd700;
          font-weight: 600;
          animation: badgePulse 1s ease-in-out infinite alternate;
        }

        @keyframes badgePulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }

        .victory-stats {
          margin: 2rem 0;
        }

        .main-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          padding: 1rem;
          text-align: center;
          min-width: 80px;
          animation: statAppear 0.6s ease-out forwards;
          opacity: 0;
        }

        .moves-stat { animation-delay: 0.2s; }
        .time-stat { animation-delay: 0.4s; }
        .level-stat { animation-delay: 0.6s; }

        @keyframes statAppear {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .stat-icon {
          margin-bottom: 0.5rem;
          color: #ffd700;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 900;
          color: white;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .rating-section {
          margin-bottom: 1.5rem;
        }

        .rating-text {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stars-container {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .star {
          width: 2rem;
          height: 2rem;
          animation: starFill 0.6s ease-out forwards;
        }

        .star.filled {
          color: #ffd700;
          fill: #ffd700;
        }

        .star.empty {
          color: rgba(255, 255, 255, 0.3);
          fill: none;
        }

        @keyframes starFill {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.3) rotate(-90deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .level-info {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          padding: 1rem;
          margin-top: 1rem;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .info-row:last-child {
          margin-bottom: 0;
        }

        .info-value {
          font-weight: 600;
          color: #ffd700;
        }

        .victory-actions {
          margin-top: 2rem;
        }

        .primary-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .secondary-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .victory-btn {
          font-weight: 600;
          border-radius: 25px;
          transition: all 0.3s ease;
          animation: buttonAppear 0.8s ease-out forwards;
          opacity: 0;
        }

        .primary-victory-btn {
          background: linear-gradient(45deg, #10b981, #059669);
          color: white;
          padding: 0.8rem 2rem;
          animation-delay: 0.8s;
        }

        .secondary-victory-btn {
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          color: white;
          padding: 0.8rem 2rem;
          animation-delay: 0.9s;
        }

        .outline-victory-btn {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.6rem 1.5rem;
          animation-delay: 1s;
        }

        .victory-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        @keyframes buttonAppear {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .capitalize {
          text-transform: capitalize;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .victory-template {
            padding: 1.5rem;
            margin: 1rem;
          }

          .victory-title {
            font-size: 1.5rem;
          }

          .main-stats {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }

          .stat-card {
            min-width: 200px;
          }

          .primary-actions, .secondary-actions {
            flex-direction: column;
            align-items: center;
          }

          .victory-btn {
            width: 100%;
            max-width: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export const DefeatTemplate = ({ 
  moves, 
  time, 
  level, 
  gameMode, 
  onRestart, 
  onHint, 
  onMainMenu,
  onEasierLevel 
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEncouragementMessage = () => {
    const messages = [
      "Don't give up! Every puzzle master started as a beginner.",
      "Sometimes the best strategy is to take a step back.",
      "This level is tricky, but you've got this!",
      "Try a different approach - there's always a way!",
      "Puzzle solving is about patience and practice.",
      "Even the toughest puzzles have elegant solutions."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="defeat-overlay">
      <div className="defeat-modal defeat-template">
        {/* Defeat Header */}
        <div className="defeat-header">
          <div className="puzzle-icon-container">
            <div className={`puzzle-animation phase-${animationPhase}`}>
              <div className="puzzle-pieces">
                <div className="puzzle-piece piece-1"></div>
                <div className="puzzle-piece piece-2"></div>
                <div className="puzzle-piece piece-3"></div>
                <div className="puzzle-piece piece-4"></div>
              </div>
              <div className="thinking-bubble">🤔</div>
            </div>
          </div>
          
          <h1 className="defeat-title">
            Puzzle Incomplete
          </h1>
          
          <p className="defeat-subtitle">
            {getEncouragementMessage()}
          </p>
        </div>

        {/* Stats Section */}
        <div className="defeat-stats">
          <div className="attempts-info">
            <div className="attempt-stat">
              <Target className="w-5 h-5" />
              <span>{moves} moves made</span>
            </div>
            <div className="attempt-stat">
              <Clock className="w-5 h-5" />
              <span>{formatTime(time)} spent</span>
            </div>
            <div className="attempt-stat">
              <Zap className="w-5 h-5" />
              <span>Level {level}</span>
            </div>
          </div>
          
          <div className="progress-hint">
            <div className="hint-text">
              💡 <strong>Hint:</strong> Try using empty tubes as temporary storage
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="defeat-actions">
          <div className="primary-actions">
            <Button 
              onClick={onRestart} 
              className="defeat-btn primary-defeat-btn"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            
            <Button 
              onClick={onHint} 
              className="defeat-btn secondary-defeat-btn"
            >
              <Target className="w-5 h-5 mr-2" />
              Show Hint
            </Button>
          </div>
          
          <div className="secondary-actions">
            {gameMode !== 'quick' && (
              <Button 
                onClick={onEasierLevel} 
                variant="outline"
                className="defeat-btn outline-defeat-btn"
              >
                <Zap className="w-4 h-4 mr-2" />
                Easier Level
              </Button>
            )}
            
            <Button 
              onClick={onMainMenu} 
              variant="outline"
              className="defeat-btn outline-defeat-btn"
            >
              <Home className="w-4 h-4 mr-2" />
              Main Menu
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .defeat-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 1rem;
        }

        .defeat-template {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
          border: 3px solid #ff4757;
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
          width: 100%;
          color: white;
          text-align: center;
          animation: defeatAppear 0.8s ease-out;
          box-shadow: 0 20px 60px rgba(255, 71, 87, 0.3);
        }

        @keyframes defeatAppear {
          0% {
            transform: scale(0.8) rotateX(-90deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) rotateX(-45deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
        }

        .puzzle-icon-container {
          margin-bottom: 1.5rem;
        }

        .puzzle-animation {
          position: relative;
          display: inline-block;
          width: 80px;
          height: 80px;
        }

        .puzzle-pieces {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .puzzle-piece {
          position: absolute;
          width: 35px;
          height: 35px;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.6);
          border-radius: 8px;
          transition: all 0.5s ease;
        }

        .piece-1 {
          top: 0;
          left: 0;
          transform-origin: center;
        }

        .piece-2 {
          top: 0;
          right: 0;
          transform-origin: center;
        }

        .piece-3 {
          bottom: 0;
          left: 0;
          transform-origin: center;
        }

        .piece-4 {
          bottom: 0;
          right: 0;
          transform-origin: center;
        }

        .puzzle-animation.phase-0 .piece-1 {
          transform: rotate(-15deg) translateX(-5px);
        }

        .puzzle-animation.phase-1 .piece-2 {
          transform: rotate(15deg) translateX(5px);
        }

        .puzzle-animation.phase-2 .piece-3 {
          transform: rotate(-10deg) translateY(5px);
        }

        .thinking-bubble {
          position: absolute;
          top: -30px;
          right: -20px;
          font-size: 1.5rem;
          animation: thinkingBounce 2s ease-in-out infinite;
        }

        @keyframes thinkingBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }

        .defeat-title {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, #ffffff, #ffe8e8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .defeat-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          line-height: 1.5;
          font-style: italic;
        }

        .defeat-stats {
          margin: 2rem 0;
        }

        .attempts-info {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 15px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .attempt-stat {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .attempt-stat:last-child {
          margin-bottom: 0;
        }

        .progress-hint {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          padding: 1rem;
        }

        .hint-text {
          color: #ffe8e8;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .defeat-actions {
          margin-top: 2rem;
        }

        .primary-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .secondary-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .defeat-btn {
          font-weight: 600;
          border-radius: 25px;
          transition: all 0.3s ease;
        }

        .primary-defeat-btn {
          background: linear-gradient(45deg, #ff9ff3, #f368e0);
          color: white;
          padding: 0.8rem 2rem;
          border: none;
        }

        .secondary-defeat-btn {
          background: linear-gradient(45deg, #74b9ff, #0984e3);
          color: white;
          padding: 0.8rem 2rem;
          border: none;
        }

        .outline-defeat-btn {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.6rem 1.5rem;
        }

        .defeat-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .defeat-template {
            padding: 1.5rem;
            margin: 1rem;
          }

          .defeat-title {
            font-size: 1.5rem;
          }

          .primary-actions, .secondary-actions {
            flex-direction: column;
            align-items: center;
          }

          .defeat-btn {
            width: 100%;
            max-width: 250px;
          }

          .attempts-info {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};