import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Play, Trophy, HelpCircle, Settings, Star } from 'lucide-react';
import './animations.css';

const LandingPage = ({ onStartGame, onShowLevels, onShowHelp, onShowSettings }) => {
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentAnimation(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const FloatingTube = ({ colors, delay = 0, size = 'normal' }) => (
    <div 
      className={`floating-tube ${size === 'small' ? 'scale-75' : size === 'large' ? 'scale-125' : ''}`}
      style={{
        animationDelay: `${delay}s`,
        position: 'absolute',
        zIndex: 1
      }}
    >
      <div className="tube-3d">
        {colors.map((color, index) => (
          <div
            key={index}
            className="liquid-layer-3d"
            style={{
              backgroundColor: color,
              bottom: `${index * 25}%`,
              height: '25%',
              animationDelay: `${delay + index * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
      </div>

      {/* Floating Tubes Animation */}
      <div className="floating-tubes-container">
        <FloatingTube 
          colors={['#ff4444', '#4444ff', '#44ff44', '#ffff44']} 
          delay={0}
          size="large"
        />
        <FloatingTube 
          colors={['#ff44ff', '#44ffff', '#ff8844']} 
          delay={1}
          size="normal"
        />
        <FloatingTube 
          colors={['#ff88ff', '#32CD32']} 
          delay={2}
          size="small"
        />
      </div>

      {/* Main Content */}
      <div className={`main-content ${isLoaded ? 'loaded' : ''}`}>
        
        {/* Logo and Title */}
        <div className="logo-section">
          <div className="logo-container">
            <div className="logo-tube-3d">
              <div className="liquid-flow-animation">
                <div className="flow-1"></div>
                <div className="flow-2"></div>
                <div className="flow-3"></div>
              </div>
            </div>
          </div>
          
          <h1 className="main-title">
            <span className="title-word water-text">Water</span>
            <span className="title-word sort-text">Sort</span>
          </h1>
          
          <p className="subtitle">
            The Ultimate 3D Puzzle Experience
          </p>
          
          <div className="features-badges">
            <span className="feature-badge">
              <Star className="w-4 h-4" />
              Unlimited Levels
            </span>
            <span className="feature-badge">
              <Star className="w-4 h-4" />
              Works Offline
            </span>
            <span className="feature-badge">
              <Star className="w-4 h-4" />
              3D Animations
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button 
            onClick={onStartGame}
            className="primary-action-btn"
          >
            <Play className="w-6 h-6 mr-2" />
            Start Playing
            <div className="btn-glow"></div>
          </Button>

          <div className="secondary-buttons">
            <Button 
              onClick={onShowLevels}
              variant="outline"
              className="secondary-action-btn"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Select Level
            </Button>
            
            <Button 
              onClick={onShowHelp}
              variant="outline"
              className="secondary-action-btn"
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              How to Play
            </Button>
            
            <Button 
              onClick={onShowSettings}
              variant="outline"
              className="secondary-action-btn"
            >
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Game Preview Animation */}
        <div className="game-preview">
          <div className="preview-title">Quick Preview</div>
          <div className="preview-tubes">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="preview-tube">
                <div className={`preview-liquid preview-liquid-${i}`}></div>
              </div>
            ))}
          </div>
          <div className="pouring-animation"></div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">∞</div>
            <div className="stat-label">Levels</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4</div>
            <div className="stat-label">Game Modes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">18</div>
            <div className="stat-label">Colors</div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;