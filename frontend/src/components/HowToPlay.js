import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Play, RotateCcw, Target, Trophy } from 'lucide-react';
import './animations.css';

const HowToPlay = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      id: 1,
      title: "Welcome to Water Sort!",
      description: "Learn how to play this addictive puzzle game with beautiful 3D animations.",
      animation: "welcome",
      tips: [
        "Sort all colors into separate tubes",
        "Use strategy to solve puzzles efficiently", 
        "Enjoy unlimited levels that get progressively harder"
      ],
      visual: (
        <div className="tutorial-visual welcome-visual">
          <div className="demo-tubes-container">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="demo-tube">
                <div className="demo-liquid" style={{ 
                  backgroundColor: ['#ff4444', '#4444ff', '#44ff44', '#ffff44'][i],
                  height: '100%',
                  animation: `liquidPulse ${1 + i * 0.2}s ease-in-out infinite`
                }}></div>
              </div>
            ))}
          </div>
          <div className="welcome-title">🎮 Ready to Play?</div>
        </div>
      )
    },
    {
      id: 2,
      title: "Basic Rules",
      description: "Understanding the core mechanics of the game.",
      animation: "rules",
      tips: [
        "Click a tube to select it (it will glow)",
        "Click another tube to pour liquid",
        "Only same colors can be poured together",
        "Tubes can hold maximum 4 liquid layers"
      ],
      visual: (
        <div className="tutorial-visual rules-visual">
          <div className="rule-demo">
            <div className="demo-tube selected">
              <div className="demo-liquid red" style={{ height: '25%', bottom: '0%' }}></div>
              <div className="demo-liquid blue" style={{ height: '25%', bottom: '25%' }}></div>
              <div className="glow-effect"></div>
            </div>
            <div className="arrow-animation">→</div>
            <div className="demo-tube">
              <div className="demo-liquid red" style={{ height: '50%', bottom: '0%' }}></div>
            </div>
          </div>
          <div className="rule-text">✅ Red can pour onto red!</div>
        </div>
      )
    },
    {
      id: 3,
      title: "Pouring Animation",
      description: "Watch the beautiful 3D pouring effects in action.",
      animation: "pouring",
      tips: [
        "Liquids pour with realistic 3D animations",
        "Multiple layers of same color pour together",
        "Animations are optimized for smooth gameplay",
        "Visual feedback helps track your moves"
      ],
      visual: (
        <div className="tutorial-visual pouring-visual">
          <div className="pouring-demo">
            <div className="demo-tube source-tube">
              <div className="demo-liquid yellow" style={{ height: '50%', bottom: '0%' }}></div>
              <div className="demo-liquid blue" style={{ height: '25%', bottom: '50%' }}></div>
              <div className="pouring-stream-demo"></div>
            </div>
            <div className="demo-tube target-tube">
              <div className="demo-liquid yellow" style={{ height: '25%', bottom: '0%' }}></div>
              <div className="receiving-effect"></div>
            </div>
          </div>
          <div className="pouring-text">🌊 Beautiful 3D Liquid Physics!</div>
        </div>
      )
    },
    {
      id: 4,
      title: "Game Modes",
      description: "Choose your preferred way to play.",
      animation: "modes",
      tips: [
        "Quick Play: Fast puzzles with more empty tubes",
        "Strategic: Complex challenges for puzzle experts",
        "Endless: Unlimited procedurally generated levels",
        "Tournament: Compete for best scores and times"
      ],
      visual: (
        <div className="tutorial-visual modes-visual">
          <div className="modes-grid">
            <div className="mode-card quick">
              <Play className="mode-icon" />
              <div>Quick Play</div>
            </div>
            <div className="mode-card strategic">
              <Target className="mode-icon" />
              <div>Strategic</div>
            </div>
            <div className="mode-card endless">
              <RotateCcw className="mode-icon" />
              <div>Endless</div>
            </div>
            <div className="mode-card tournament">
              <Trophy className="mode-icon" />
              <div>Tournament</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Winning Strategy",
      description: "Master these techniques to become a Water Sort expert.",
      animation: "strategy",
      tips: [
        "Plan several moves ahead",
        "Use empty tubes strategically as temporary storage",
        "Focus on completing one color at a time",
        "Don't rush - think through each move carefully"
      ],
      visual: (
        <div className="tutorial-visual strategy-visual">
          <div className="strategy-demo">
            <div className="step-indicator">Step 1: Plan</div>
            <div className="demo-tubes-row">
              <div className="demo-tube">
                <div className="demo-liquid red" style={{ height: '25%', bottom: '0%' }}></div>
                <div className="demo-liquid blue" style={{ height: '25%', bottom: '25%' }}></div>
                <div className="demo-liquid red" style={{ height: '25%', bottom: '50%' }}></div>
              </div>
              <div className="demo-tube empty-tube">
                <div className="empty-indicator">Empty</div>
              </div>
              <div className="demo-tube">
                <div className="demo-liquid blue" style={{ height: '50%', bottom: '0%' }}></div>
                <div className="demo-liquid red" style={{ height: '25%', bottom: '50%' }}></div>
              </div>
            </div>
            <div className="strategy-arrows">
              <div className="strategy-arrow">Move red to empty tube first</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Pro Tips & Tricks",
      description: "Advanced techniques to maximize your score.",
      animation: "tips",
      tips: [
        "Undo button saves you from mistakes",
        "Timer tracks your solving speed",
        "Best scores are saved locally for each level",
        "Game works completely offline once loaded"
      ],
      visual: (
        <div className="tutorial-visual tips-visual">
          <div className="tips-showcase">
            <div className="tip-item">
              <div className="tip-icon">⏰</div>
              <div>Beat your best time</div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">🏆</div>
              <div>Track high scores</div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">📱</div>
              <div>Play offline anywhere</div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">🎯</div>
              <div>Minimize your moves</div>
            </div>
          </div>
          <div className="final-message">
            <div className="trophy-animation">🏆</div>
            <div>Now you're ready to become a Water Sort master!</div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="how-to-play-container">
      {/* Header */}
      <div className="tutorial-header">
        <Button 
          onClick={onBack}
          variant="outline"
          className="back-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>
        <h1 className="tutorial-title">How to Play</h1>
        <div className="step-counter">
          {currentStep + 1} / {tutorialSteps.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Tutorial Content */}
      <div className="tutorial-content">
        <Card className="tutorial-card">
          {/* Visual Demo */}
          <div className="tutorial-visual-container">
            {currentTutorial.visual}
          </div>

          {/* Text Content */}
          <div className="tutorial-text-content">
            <h2 className="step-title">{currentTutorial.title}</h2>
            <p className="step-description">{currentTutorial.description}</p>
            
            <div className="tips-list">
              {currentTutorial.tips.map((tip, index) => (
                <div key={index} className="tip-item-detailed">
                  <div className="tip-bullet">•</div>
                  <div className="tip-text">{tip}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <div className="tutorial-navigation">
        <Button 
          onClick={prevStep}
          disabled={currentStep === 0}
          variant="outline"
          className="nav-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <div className="step-dots">
          {tutorialSteps.map((_, index) => (
            <button
              key={index}
              className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              {index < currentStep ? '✓' : index + 1}
            </button>
          ))}
        </div>

        {currentStep < tutorialSteps.length - 1 ? (
          <Button 
            onClick={nextStep}
            className="nav-btn primary"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={onBack}
            className="nav-btn primary"
          >
            Start Playing!
            <Play className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Additional Styles for Tutorial */}
      <style jsx>{`
        .how-to-play-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
        }

        .tutorial-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .tutorial-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: white;
          text-align: center;
          flex: 1;
          margin: 0;
        }

        .step-counter {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          color: white;
          font-weight: 600;
        }

        .progress-container {
          max-width: 1200px;
          margin: 0 auto 3rem auto;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffd700, #ffed4e);
          transition: width 0.5s ease;
          border-radius: 3px;
        }

        .tutorial-content {
          max-width: 1200px;
          margin: 0 auto 3rem auto;
        }

        .tutorial-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 3rem;
          border-radius: 20px;
          color: white;
        }

        .tutorial-visual-container {
          margin-bottom: 3rem;
          text-align: center;
        }

        .step-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: #ffd700;
        }

        .step-description {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .tips-list {
          space-y: 1rem;
        }

        .tip-item-detailed {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          border-left: 4px solid #ffd700;
        }

        .tip-bullet {
          color: #ffd700;
          font-size: 1.5rem;
          margin-right: 1rem;
          line-height: 1;
        }

        .tip-text {
          flex: 1;
          font-size: 1rem;
          line-height: 1.5;
        }

        .tutorial-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          gap: 2rem;
        }

        .nav-btn {
          padding: 1rem 2rem;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .nav-btn.primary {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
        }

        .step-dots {
          display: flex;
          gap: 0.5rem;
        }

        .step-dot {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: transparent;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .step-dot.active {
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-color: #ffd700;
          transform: scale(1.1);
        }

        .step-dot.completed {
          background: #10b981;
          border-color: #10b981;
          color: white;
        }

        /* Visual Demo Styles */
        .demo-tubes-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .demo-tube {
          width: 60px;
          height: 120px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 0 0 30px 30px;
          position: relative;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
        }

        .demo-tube.selected {
          border-color: #ffd700;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        .demo-tube.empty-tube {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
        }

        .demo-liquid {
          position: absolute;
          width: 100%;
          border-radius: 0 0 25px 25px;
        }

        .demo-liquid.red { background: #ff4444; }
        .demo-liquid.blue { background: #4444ff; }
        .demo-liquid.yellow { background: #ffff44; }

        @keyframes liquidPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.8; }
          50% { transform: scaleY(1.1); opacity: 1; }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .tutorial-header {
            flex-direction: column;
            gap: 1rem;
          }
          
          .tutorial-title {
            font-size: 2rem;
          }
          
          .tutorial-card {
            padding: 2rem 1rem;
          }
          
          .tutorial-navigation {
            flex-direction: column;
            gap: 1rem;
          }
          
          .step-dots {
            order: -1;
          }
        }
      `}</style>
    </div>
  );
};

export default HowToPlay;