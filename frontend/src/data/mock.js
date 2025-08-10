// Mock data for Water Sort Puzzle game

export const mockGameData = {
  levels: [
    {
      level: 1,
      difficulty: 1, // 1-3 stars
      tubes: [
        ['red', 'blue'],
        ['blue', 'red'],
        [],
        []
      ]
    },
    {
      level: 2,
      difficulty: 1,
      tubes: [
        ['red', 'blue', 'green'],
        ['green', 'red', 'blue'],
        ['blue', 'green', 'red'],
        [],
        []
      ]
    },
    {
      level: 3,
      difficulty: 2,
      tubes: [
        ['red', 'blue', 'green', 'yellow'],
        ['yellow', 'red', 'blue', 'green'],
        ['green', 'yellow', 'red', 'blue'],
        ['blue', 'green', 'yellow', 'red'],
        [],
        []
      ]
    },
    {
      level: 4,
      difficulty: 2,
      tubes: [
        ['red', 'blue', 'green', 'yellow'],
        ['purple', 'red', 'blue', 'green'],
        ['yellow', 'purple', 'red', 'blue'],
        ['green', 'yellow', 'purple', 'red'],
        ['blue', 'green', 'yellow', 'purple'],
        [],
        []
      ]
    },
    {
      level: 5,
      difficulty: 3,
      tubes: [
        ['red', 'blue', 'green', 'yellow'],
        ['purple', 'orange', 'red', 'blue'],
        ['green', 'yellow', 'purple', 'orange'],
        ['red', 'blue', 'green', 'yellow'],
        ['purple', 'orange', 'red', 'blue'],
        ['green', 'yellow', 'purple', 'orange'],
        [],
        []
      ]
    },
    {
      level: 6,
      difficulty: 3,
      tubes: [
        ['cyan', 'pink', 'brown', 'lime'],
        ['lime', 'cyan', 'pink', 'brown'],
        ['brown', 'lime', 'cyan', 'pink'],
        ['pink', 'brown', 'lime', 'cyan'],
        ['cyan', 'pink', 'brown', 'lime'],
        ['lime', 'cyan', 'pink', 'brown'],
        [],
        [],
        []
      ]
    }
  ],
  
  gameSettings: {
    soundEnabled: true,
    musicEnabled: true,
    vibrationEnabled: true,
    showHints: true
  },

  playerStats: {
    levelsCompleted: 0,
    totalMoves: 0,
    bestMoves: {},
    totalPlayTime: 0
  }
};

// Color definitions for consistent rendering
export const colorMap = {
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

// Game rules and validation functions
export const gameRules = {
  maxTubeCapacity: 4,
  minEmptyTubes: 2,
  
  canPour: (fromTube, toTube) => {
    if (fromTube.length === 0) return false;
    if (toTube.length >= 4) return false;
    if (toTube.length === 0) return true;
    
    const fromColor = fromTube[fromTube.length - 1];
    const toColor = toTube[toTube.length - 1];
    return fromColor === toColor;
  },
  
  getTopColorCount: (tube) => {
    if (tube.length === 0) return 0;
    const topColor = tube[tube.length - 1];
    let count = 0;
    for (let i = tube.length - 1; i >= 0; i--) {
      if (tube[i] === topColor) count++;
      else break;
    }
    return count;
  },
  
  isLevelComplete: (tubes) => {
    return tubes.every(tube => {
      if (tube.length === 0) return true;
      if (tube.length === 4) {
        return tube.every(color => color === tube[0]);
      }
      return false;
    });
  }
};