import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameMenu from "./components/GameMenu";
import GameModeSelector from "./components/GameModeSelector";
import WaterSortGame from "./components/WaterSortGame";
import LevelSelect from "./components/LevelSelect";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [currentView, setCurrentView] = useState('menu');
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedMode, setSelectedMode] = useState('normal');
  const [unlockedLevel, setUnlockedLevel] = useState(1);

  const handleStartGame = () => {
    setCurrentView('modeSelector');
  };

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    setCurrentView('game');
    setSelectedLevel(1);
  };

  const handleShowLevels = () => {
    setCurrentView('levels');
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    setSelectedMode('normal');
    setCurrentView('game');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const handleBackToModeSelector = () => {
    setCurrentView('modeSelector');
  };

  const handleShowSettings = () => {
    // TODO: Implement settings view
    console.log('Settings clicked');
  };

  const handleShowHelp = () => {
    // TODO: Implement help view
    console.log('Help clicked');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'menu':
        return (
          <GameMenu 
            onStartGame={handleStartGame}
            onShowLevels={handleShowLevels}
            onShowSettings={handleShowSettings}
            onShowHelp={handleShowHelp}
          />
        );
      case 'modeSelector':
        return (
          <GameModeSelector 
            onBack={handleBackToMenu}
            onSelectMode={handleSelectMode}
          />
        );
      case 'game':
        return (
          <WaterSortGame 
            initialLevel={selectedLevel}
            gameMode={selectedMode}
            onBackToMenu={selectedMode === 'normal' ? handleBackToMenu : handleBackToModeSelector}
            onUnlockLevel={(level) => setUnlockedLevel(Math.max(unlockedLevel, level))}
          />
        );
      case 'levels':
        return (
          <LevelSelect 
            onBack={handleBackToMenu}
            onSelectLevel={handleSelectLevel}
            unlockedLevel={unlockedLevel}
          />
        );
      default:
        return (
          <GameMenu 
            onStartGame={handleStartGame}
            onShowLevels={handleShowLevels}
            onShowSettings={handleShowSettings}
            onShowHelp={handleShowHelp}
          />
        );
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={renderCurrentView()} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;