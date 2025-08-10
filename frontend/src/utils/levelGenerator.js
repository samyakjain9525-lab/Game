// Algorithmic Level Generator for Water Sort Puzzle
// Generates unlimited levels without needing AI/API

export class LevelGenerator {
  static colors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 
    'cyan', 'pink', 'brown', 'lime', 'magenta', 'indigo',
    'maroon', 'navy', 'olive', 'teal', 'silver', 'coral'
  ];

  static generateLevel(levelNumber, mode = 'normal') {
    const difficulty = this.calculateDifficulty(levelNumber, mode);
    const config = this.getLevelConfig(difficulty, mode);
    
    return this.createLevel(config, levelNumber);
  }

  static calculateDifficulty(levelNumber, mode) {
    let baseDifficulty = Math.min(Math.floor((levelNumber - 1) / 3) + 1, 10);
    
    // Mode modifiers
    if (mode === 'quick') {
      baseDifficulty = Math.max(1, baseDifficulty - 1); // Easier for quick play
    } else if (mode === 'strategic') {
      baseDifficulty = Math.min(10, baseDifficulty + 2); // Harder for strategic mode
    }
    
    return baseDifficulty;
  }

  static getLevelConfig(difficulty, mode) {
    const baseColors = Math.min(3 + difficulty, 8);
    const totalTubes = baseColors + Math.min(2 + Math.floor(difficulty / 2), 4);
    
    let config = {
      colorCount: baseColors,
      tubeCount: totalTubes,
      emptyTubes: Math.max(2, Math.floor(totalTubes * 0.25)),
      layersPerTube: 4,
      mixingComplexity: difficulty
    };

    // Mode-specific adjustments
    if (mode === 'quick') {
      config.emptyTubes = Math.max(config.emptyTubes, 3); // More empty tubes for faster solving
      config.mixingComplexity = Math.max(1, config.mixingComplexity - 1);
    } else if (mode === 'strategic') {
      config.emptyTubes = Math.max(2, config.emptyTubes - 1); // Fewer empty tubes for more challenge
      config.layersPerTube = Math.min(5, config.layersPerTube + Math.floor(difficulty / 5));
    }

    return config;
  }

  static createLevel(config, levelNumber) {
    const selectedColors = this.selectColors(config.colorCount, levelNumber);
    const tubes = this.generateTubes(selectedColors, config);
    
    return {
      level: levelNumber,
      difficulty: Math.min(Math.ceil(config.mixingComplexity / 2), 3),
      tubes: tubes,
      metadata: {
        colorCount: config.colorCount,
        tubeCount: config.tubeCount,
        emptyTubes: config.emptyTubes,
        estimatedMoves: this.estimateMinMoves(tubes)
      }
    };
  }

  static selectColors(count, levelNumber) {
    // Use level number as seed for consistent but varied color selection
    const seed = levelNumber;
    const shuffled = [...this.colors];
    
    // Simple seeded shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(((seed * (i + 1)) % 1000) / 1000 * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
  }

  static generateTubes(colors, config) {
    const tubes = [];
    const allLayers = [];

    // Create all color layers (4 of each color)
    colors.forEach(color => {
      for (let i = 0; i < config.layersPerTube; i++) {
        allLayers.push(color);
      }
    });

    // Shuffle layers with complexity-based mixing
    this.shuffleLayers(allLayers, config.mixingComplexity);

    // Distribute layers into tubes (excluding empty ones)
    const filledTubeCount = config.tubeCount - config.emptyTubes;
    const layersPerTube = Math.floor(allLayers.length / filledTubeCount);

    for (let i = 0; i < filledTubeCount; i++) {
      const tubeStart = i * layersPerTube;
      const tubeEnd = (i === filledTubeCount - 1) ? allLayers.length : (i + 1) * layersPerTube;
      tubes.push(allLayers.slice(tubeStart, tubeEnd));
    }

    // Add empty tubes
    for (let i = 0; i < config.emptyTubes; i++) {
      tubes.push([]);
    }

    // Ensure level is solvable
    return this.ensureSolvable(tubes, colors, config);
  }

  static shuffleLayers(layers, complexity) {
    const shuffleCount = Math.max(1, complexity);
    
    for (let shuffle = 0; shuffle < shuffleCount; shuffle++) {
      for (let i = layers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [layers[i], layers[j]] = [layers[j], layers[i]];
      }
    }
  }

  static ensureSolvable(tubes, colors, config) {
    // Basic solvability check: ensure no tube has too many different colors
    const maxColorsPerTube = Math.min(3, config.layersPerTube);
    
    tubes.forEach((tube, tubeIndex) => {
      if (tube.length === 0) return;
      
      const uniqueColors = [...new Set(tube)];
      if (uniqueColors.length > maxColorsPerTube) {
        // Redistribute to reduce complexity
        this.redistributeTubeColors(tubes, tubeIndex, maxColorsPerTube);
      }
    });

    return tubes;
  }

  static redistributeTubeColors(tubes, problemTubeIndex, maxColors) {
    const problemTube = tubes[problemTubeIndex];
    const colorCounts = {};
    
    problemTube.forEach(color => {
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    });

    // Find colors to move
    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => a[1] - b[1]); // Sort by count, ascending

    while (sortedColors.length > maxColors) {
      const [colorToMove] = sortedColors.shift();
      const moveCount = Math.min(colorCounts[colorToMove], 2);
      
      // Find empty tube or compatible tube
      const targetTube = this.findCompatibleTube(tubes, colorToMove, problemTubeIndex);
      
      if (targetTube !== -1) {
        // Move layers
        for (let i = 0; i < moveCount; i++) {
          const colorIndex = problemTube.indexOf(colorToMove);
          if (colorIndex !== -1) {
            problemTube.splice(colorIndex, 1);
            tubes[targetTube].push(colorToMove);
          }
        }
      }
    }
  }

  static findCompatibleTube(tubes, color, excludeIndex) {
    // First try to find empty tube
    for (let i = 0; i < tubes.length; i++) {
      if (i === excludeIndex) continue;
      if (tubes[i].length === 0) return i;
    }

    // Then try to find tube with same color on top
    for (let i = 0; i < tubes.length; i++) {
      if (i === excludeIndex) continue;
      if (tubes[i].length > 0 && tubes[i][tubes[i].length - 1] === color && tubes[i].length < 4) {
        return i;
      }
    }

    return -1;
  }

  static estimateMinMoves(tubes) {
    // Simple heuristic for minimum moves estimation
    let totalMisplacedLayers = 0;
    
    tubes.forEach(tube => {
      if (tube.length === 0) return;
      
      const colorCounts = {};
      tube.forEach(color => {
        colorCounts[color] = (colorCounts[color] || 0) + 1;
      });
      
      const uniqueColors = Object.keys(colorCounts).length;
      if (uniqueColors > 1) {
        totalMisplacedLayers += tube.length - Math.max(...Object.values(colorCounts));
      }
    });
    
    return Math.max(10, Math.floor(totalMisplacedLayers * 1.5));
  }

  // Special level generators for variety
  static generateSpecialLevel(levelNumber, type = 'rainbow') {
    switch (type) {
      case 'rainbow':
        return this.generateRainbowLevel(levelNumber);
      case 'monochrome':
        return this.generateMonochromeLevel(levelNumber);
      case 'cascade':
        return this.generateCascadeLevel(levelNumber);
      default:
        return this.generateLevel(levelNumber);
    }
  }

  static generateRainbowLevel(levelNumber) {
    // Use all available colors in rainbow patterns
    const colors = this.colors.slice(0, 8);
    const tubes = [];
    
    // Create gradient-like patterns
    colors.forEach((color, index) => {
      const tube = Array(4).fill(color);
      tubes.push(tube);
    });
    
    // Shuffle some tubes for challenge
    for (let i = 0; i < 4; i++) {
      const tube = [];
      for (let j = 0; j < 4; j++) {
        tube.push(colors[(i + j) % colors.length]);
      }
      tubes.push(tube);
    }
    
    // Add empty tubes
    tubes.push([], []);
    
    return {
      level: levelNumber,
      difficulty: 3,
      tubes: tubes,
      special: 'rainbow',
      metadata: {
        colorCount: colors.length,
        tubeCount: tubes.length,
        emptyTubes: 2,
        estimatedMoves: 50
      }
    };
  }
}