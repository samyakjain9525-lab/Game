// Enhanced Algorithmic Level Generator with Advanced Patterns
// Creates more interesting and challenging puzzles

export class EnhancedLevelGenerator {
  static colors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 
    'cyan', 'pink', 'brown', 'lime', 'magenta', 'indigo',
    'maroon', 'navy', 'olive', 'teal', 'silver', 'coral',
    'crimson', 'gold', 'plum', 'turquoise'
  ];

  static patterns = {
    ALTERNATING: 'alternating',
    GRADIENT: 'gradient', 
    CLUSTERED: 'clustered',
    RAINBOW: 'rainbow',
    MIRROR: 'mirror',
    SPIRAL: 'spiral',
    SYMMETRICAL: 'symmetrical'
  };

  static generateLevel(levelNumber, mode = 'normal') {
    const difficulty = this.calculateDifficulty(levelNumber, mode);
    const pattern = this.selectPattern(levelNumber, difficulty, mode);
    const config = this.getLevelConfig(difficulty, mode, pattern);
    
    return this.createEnhancedLevel(config, levelNumber, pattern);
  }

  static calculateDifficulty(levelNumber, mode) {
    let baseDifficulty = Math.min(Math.floor((levelNumber - 1) / 4) + 1, 12);
    
    // Add randomness to difficulty progression
    const variation = Math.sin(levelNumber * 0.1) * 0.5;
    baseDifficulty += Math.round(variation);
    
    // Mode modifiers
    switch (mode) {
      case 'quick':
        baseDifficulty = Math.max(1, baseDifficulty - 2);
        break;
      case 'strategic':
        baseDifficulty = Math.min(12, baseDifficulty + 3);
        break;
      case 'endless':
        baseDifficulty = Math.min(12, baseDifficulty + 1);
        break;
      case 'tournament':
        baseDifficulty = Math.min(10, baseDifficulty + 2);
        break;
    }
    
    return Math.max(1, Math.min(12, baseDifficulty));
  }

  static selectPattern(levelNumber, difficulty, mode) {
    const patternWeights = {
      [this.patterns.ALTERNATING]: difficulty < 4 ? 30 : 15,
      [this.patterns.GRADIENT]: difficulty < 6 ? 20 : 25,
      [this.patterns.CLUSTERED]: 20,
      [this.patterns.RAINBOW]: difficulty > 5 ? 15 : 5,
      [this.patterns.MIRROR]: difficulty > 7 ? 15 : 5,
      [this.patterns.SPIRAL]: difficulty > 8 ? 10 : 2,
      [this.patterns.SYMMETRICAL]: difficulty > 6 ? 15 : 8
    };

    // Add special patterns for certain levels
    if (levelNumber % 10 === 0) patternWeights[this.patterns.RAINBOW] += 20;
    if (levelNumber % 7 === 0) patternWeights[this.patterns.SPIRAL] += 15;
    if (levelNumber % 5 === 0) patternWeights[this.patterns.MIRROR] += 10;

    return this.weightedRandomSelect(patternWeights, levelNumber);
  }

  static weightedRandomSelect(weights, seed) {
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    let random = (Math.sin(seed * 12.9898) * 43758.5453) % 1;
    if (random < 0) random += 1;
    random *= totalWeight;
    
    let currentWeight = 0;
    for (const [pattern, weight] of Object.entries(weights)) {
      currentWeight += weight;
      if (random <= currentWeight) {
        return pattern;
      }
    }
    return this.patterns.ALTERNATING;
  }

  static getLevelConfig(difficulty, mode, pattern) {
    let baseColors = Math.min(4 + Math.floor(difficulty / 2), 10);
    let totalTubes = baseColors + Math.min(3 + Math.floor(difficulty / 3), 6);
    let emptyTubes = Math.max(2, Math.floor(totalTubes * 0.2));
    let layersPerTube = 4;

    // Pattern-specific adjustments
    switch (pattern) {
      case this.patterns.RAINBOW:
        baseColors = Math.min(baseColors + 2, 12);
        totalTubes += 2;
        emptyTubes = Math.max(3, emptyTubes);
        break;
      
      case this.patterns.SPIRAL:
        layersPerTube = Math.min(5, layersPerTube + 1);
        emptyTubes = Math.max(emptyTubes - 1, 2);
        break;
      
      case this.patterns.MIRROR:
        totalTubes = Math.max(8, totalTubes);
        if (totalTubes % 2 !== 0) totalTubes++;
        break;

      case this.patterns.CLUSTERED:
        baseColors = Math.max(baseColors - 1, 3);
        emptyTubes = Math.max(emptyTubes + 1, 3);
        break;
    }

    // Mode-specific final adjustments
    if (mode === 'quick') {
      emptyTubes = Math.max(emptyTubes + 1, 3);
      baseColors = Math.max(baseColors - 1, 3);
    } else if (mode === 'strategic') {
      emptyTubes = Math.max(emptyTubes - 1, 2);
      layersPerTube = Math.min(layersPerTube + Math.floor(difficulty / 4), 6);
    }

    return {
      colorCount: baseColors,
      tubeCount: totalTubes,
      emptyTubes: emptyTubes,
      layersPerTube: layersPerTube,
      mixingComplexity: difficulty,
      pattern: pattern
    };
  }

  static createEnhancedLevel(config, levelNumber, pattern) {
    const selectedColors = this.selectColors(config.colorCount, levelNumber);
    let tubes;

    switch (pattern) {
      case this.patterns.ALTERNATING:
        tubes = this.generateAlternatingPattern(selectedColors, config);
        break;
      case this.patterns.GRADIENT:
        tubes = this.generateGradientPattern(selectedColors, config);
        break;
      case this.patterns.CLUSTERED:
        tubes = this.generateClusteredPattern(selectedColors, config);
        break;
      case this.patterns.RAINBOW:
        tubes = this.generateRainbowPattern(selectedColors, config);
        break;
      case this.patterns.MIRROR:
        tubes = this.generateMirrorPattern(selectedColors, config);
        break;
      case this.patterns.SPIRAL:
        tubes = this.generateSpiralPattern(selectedColors, config);
        break;
      case this.patterns.SYMMETRICAL:
        tubes = this.generateSymmetricalPattern(selectedColors, config);
        break;
      default:
        tubes = this.generateDefaultPattern(selectedColors, config);
    }

    // Ensure solvability
    tubes = this.ensureAdvancedSolvability(tubes, selectedColors, config);

    return {
      level: levelNumber,
      difficulty: Math.min(Math.ceil(config.mixingComplexity / 3), 3),
      tubes: tubes,
      pattern: pattern,
      metadata: {
        colorCount: config.colorCount,
        tubeCount: config.tubeCount,
        emptyTubes: config.emptyTubes,
        estimatedMoves: this.estimateMinMoves(tubes),
        pattern: pattern,
        special: this.getSpecialFeatures(pattern, config.mixingComplexity)
      }
    };
  }

  static selectColors(count, levelNumber) {
    const availableColors = [...this.colors];
    const seed = levelNumber;
    
    // Fisher-Yates shuffle with seed
    for (let i = availableColors.length - 1; i > 0; i--) {
      const j = Math.floor(((seed * (i + 17)) * 9301 + 49297) % 233280) / 233280 * (i + 1);
      [availableColors[i], availableColors[Math.floor(j)]] = [availableColors[Math.floor(j)], availableColors[i]];
    }
    
    return availableColors.slice(0, count);
  }

  // Pattern Generation Methods
  static generateAlternatingPattern(colors, config) {
    const tubes = [];
    const allLayers = [];

    // Create alternating color patterns
    colors.forEach((color, colorIndex) => {
      for (let layer = 0; layer < config.layersPerTube; layer++) {
        allLayers.push(color);
      }
    });

    // Create alternating distribution
    const filledTubeCount = config.tubeCount - config.emptyTubes;
    for (let tubeIndex = 0; tubeIndex < filledTubeCount; tubeIndex++) {
      const tube = [];
      const layersInTube = Math.min(config.layersPerTube, 
        Math.ceil(allLayers.length / filledTubeCount));
      
      for (let layer = 0; layer < layersInTube; layer++) {
        const colorIndex = (tubeIndex + layer) % colors.length;
        if (allLayers.includes(colors[colorIndex])) {
          tube.push(colors[colorIndex]);
          const removeIndex = allLayers.indexOf(colors[colorIndex]);
          allLayers.splice(removeIndex, 1);
        }
      }
      tubes.push(tube);
    }

    // Add remaining layers to existing tubes
    let tubeIndex = 0;
    while (allLayers.length > 0 && tubeIndex < tubes.length) {
      if (tubes[tubeIndex].length < config.layersPerTube) {
        tubes[tubeIndex].push(allLayers.pop());
      }
      tubeIndex = (tubeIndex + 1) % tubes.length;
    }

    // Add empty tubes
    for (let i = 0; i < config.emptyTubes; i++) {
      tubes.push([]);
    }

    return tubes;
  }

  static generateRainbowPattern(colors, config) {
    const tubes = [];
    const sortedColors = [...colors].sort(); // Create consistent rainbow order
    
    // Create rainbow tubes
    const filledTubeCount = config.tubeCount - config.emptyTubes;
    const colorsPerTube = Math.ceil(colors.length * config.layersPerTube / filledTubeCount);
    
    for (let tubeIndex = 0; tubeIndex < filledTubeCount; tubeIndex++) {
      const tube = [];
      for (let layer = 0; layer < config.layersPerTube; layer++) {
        const colorIndex = (tubeIndex * 2 + layer) % sortedColors.length;
        tube.push(sortedColors[colorIndex]);
      }
      tubes.push(tube);
    }

    // Add empty tubes
    for (let i = 0; i < config.emptyTubes; i++) {
      tubes.push([]);
    }

    return tubes;
  }

  static generateMirrorPattern(colors, config) {
    const tubes = [];
    const halfTubes = Math.floor((config.tubeCount - config.emptyTubes) / 2);
    
    // Generate first half
    for (let i = 0; i < halfTubes; i++) {
      const tube = [];
      for (let layer = 0; layer < config.layersPerTube; layer++) {
        const colorIndex = (i + layer) % colors.length;
        tube.push(colors[colorIndex]);
      }
      tubes.push(tube);
    }
    
    // Mirror the tubes (reverse order)
    for (let i = halfTubes - 1; i >= 0; i--) {
      const mirroredTube = [...tubes[i]].reverse();
      tubes.push(mirroredTube);
    }
    
    // Add empty tubes
    for (let i = 0; i < config.emptyTubes; i++) {
      tubes.push([]);
    }

    return tubes;
  }

  static generateSpiralPattern(colors, config) {
    const tubes = [];
    const allLayers = [];
    
    // Create spiral distribution
    colors.forEach(color => {
      for (let i = 0; i < config.layersPerTube; i++) {
        allLayers.push(color);
      }
    });
    
    // Spiral shuffle
    const spiralOrder = [];
    let currentIndex = 0;
    let step = 1;
    const maxIndex = allLayers.length - 1;
    
    while (spiralOrder.length < allLayers.length) {
      if (!spiralOrder.includes(currentIndex)) {
        spiralOrder.push(currentIndex);
      }
      currentIndex = (currentIndex + step) % allLayers.length;
      if (spiralOrder.length % colors.length === 0) {
        step += 1;
      }
    }
    
    // Distribute according to spiral order
    const filledTubeCount = config.tubeCount - config.emptyTubes;
    for (let tubeIndex = 0; tubeIndex < filledTubeCount; tubeIndex++) {
      const tube = [];
      const startIndex = tubeIndex * Math.floor(allLayers.length / filledTubeCount);
      const endIndex = Math.min(startIndex + Math.ceil(allLayers.length / filledTubeCount), allLayers.length);
      
      for (let i = startIndex; i < endIndex && tube.length < config.layersPerTube; i++) {
        if (spiralOrder[i] < allLayers.length) {
          tube.push(allLayers[spiralOrder[i]]);
        }
      }
      tubes.push(tube);
    }
    
    // Add empty tubes
    for (let i = 0; i < config.emptyTubes; i++) {
      tubes.push([]);
    }

    return tubes;
  }

  static generateClusteredPattern(colors, config) {
    const tubes = [];
    const clusters = Math.ceil(colors.length / 2);
    const colorsPerCluster = Math.ceil(colors.length / clusters);
    
    for (let cluster = 0; cluster < clusters; cluster++) {
      const clusterColors = colors.slice(cluster * colorsPerCluster, (cluster + 1) * colorsPerCluster);
      
      for (let tubeInCluster = 0; tubeInCluster < 2 && tubes.length < (config.tubeCount - config.emptyTubes); tubeInCluster++) {
        const tube = [];
        for (let layer = 0; layer < config.layersPerTube; layer++) {
          const colorIndex = layer % clusterColors.length;
          if (clusterColors[colorIndex]) {
            tube.push(clusterColors[colorIndex]);
          }
        }
        if (tube.length > 0) {
          tubes.push(tube);
        }
      }
    }
    
    // Add empty tubes
    for (let i = 0; i < config.emptyTubes; i++) {
      tubes.push([]);
    }

    return tubes;
  }

  static generateGradientPattern(colors, config) {
    return this.generateDefaultPattern(colors, config); // Fallback for now
  }

  static generateSymmetricalPattern(colors, config) {
    return this.generateMirrorPattern(colors, config); // Similar to mirror
  }

  static generateDefaultPattern(colors, config) {
    const tubes = [];
    const allLayers = [];

    colors.forEach(color => {
      for (let i = 0; i < config.layersPerTube; i++) {
        allLayers.push(color);
      }
    });

    this.shuffleArray(allLayers, config.mixingComplexity);

    const filledTubeCount = config.tubeCount - config.emptyTubes;
    const layersPerTube = Math.floor(allLayers.length / filledTubeCount);

    for (let i = 0; i < filledTubeCount; i++) {
      const tubeStart = i * layersPerTube;
      const tubeEnd = (i === filledTubeCount - 1) ? allLayers.length : (i + 1) * layersPerTube;
      tubes.push(allLayers.slice(tubeStart, tubeEnd));
    }

    for (let i = 0; i < config.emptyTubes; i++) {
      tubes.push([]);
    }

    return tubes;
  }

  static shuffleArray(array, complexity) {
    const shuffleCount = Math.max(1, complexity);
    
    for (let shuffle = 0; shuffle < shuffleCount; shuffle++) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }

  static ensureAdvancedSolvability(tubes, colors, config) {
    // Advanced solvability checks
    const maxColorsPerTube = Math.min(3, config.layersPerTube);
    
    tubes.forEach((tube, tubeIndex) => {
      if (tube.length === 0) return;
      
      const uniqueColors = [...new Set(tube)];
      if (uniqueColors.length > maxColorsPerTube) {
        this.redistributeTubeColors(tubes, tubeIndex, maxColorsPerTube);
      }
    });

    // Ensure at least one easy move is available
    this.ensureInitialMoves(tubes, config.emptyTubes);

    return tubes;
  }

  static ensureInitialMoves(tubes, emptyTubes) {
    const nonEmptyTubes = tubes.filter(tube => tube.length > 0);
    
    // Ensure at least one tube has a moveable top layer
    let hasEasyMove = false;
    
    for (let i = 0; i < nonEmptyTubes.length && !hasEasyMove; i++) {
      const tube = nonEmptyTubes[i];
      if (tube.length > 0) {
        const topColor = tube[tube.length - 1];
        
        // Check if this color can be moved to another tube or empty tube
        for (let j = 0; j < tubes.length; j++) {
          if (i === j) continue;
          
          const targetTube = tubes[j];
          if (targetTube.length === 0 || 
              (targetTube.length < 4 && targetTube[targetTube.length - 1] === topColor)) {
            hasEasyMove = true;
            break;
          }
        }
      }
    }
    
    // If no easy move, create one
    if (!hasEasyMove && emptyTubes > 0) {
      // Find the first non-empty tube and ensure its top layer can be moved
      for (let i = 0; i < tubes.length; i++) {
        if (tubes[i].length > 1) {
          // Move one layer to create an easier starting position
          const topColor = tubes[i].pop();
          
          // Find an empty tube or matching color tube
          for (let j = 0; j < tubes.length; j++) {
            if (j !== i && (tubes[j].length === 0 || 
                (tubes[j].length < 4 && tubes[j][tubes[j].length - 1] === topColor))) {
              tubes[j].push(topColor);
              break;
            }
          }
          break;
        }
      }
    }
  }

  static redistributeTubeColors(tubes, problemTubeIndex, maxColors) {
    // Same as before but with improved logic
    const problemTube = tubes[problemTubeIndex];
    const colorCounts = {};
    
    problemTube.forEach(color => {
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    });

    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => a[1] - b[1]);

    while (sortedColors.length > maxColors) {
      const [colorToMove] = sortedColors.shift();
      const moveCount = Math.min(colorCounts[colorToMove], 2);
      
      const targetTube = this.findCompatibleTube(tubes, colorToMove, problemTubeIndex);
      
      if (targetTube !== -1) {
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
    for (let i = 0; i < tubes.length; i++) {
      if (i === excludeIndex) continue;
      if (tubes[i].length === 0) return i;
    }

    for (let i = 0; i < tubes.length; i++) {
      if (i === excludeIndex) continue;
      if (tubes[i].length > 0 && tubes[i][tubes[i].length - 1] === color && tubes[i].length < 4) {
        return i;
      }
    }

    return -1;
  }

  static estimateMinMoves(tubes) {
    let totalMisplacedLayers = 0;
    let emptyTubeCount = 0;
    
    tubes.forEach(tube => {
      if (tube.length === 0) {
        emptyTubeCount++;
        return;
      }
      
      const colorCounts = {};
      tube.forEach(color => {
        colorCounts[color] = (colorCounts[color] || 0) + 1;
      });
      
      const uniqueColors = Object.keys(colorCounts).length;
      if (uniqueColors > 1) {
        totalMisplacedLayers += tube.length - Math.max(...Object.values(colorCounts));
      }
    });
    
    // Factor in empty tubes for easier estimation
    const emptyTubeBonus = Math.max(0, emptyTubeCount - 2) * 5;
    const baseEstimate = Math.max(8, Math.floor(totalMisplacedLayers * 1.2));
    
    return Math.max(5, baseEstimate - emptyTubeBonus);
  }

  static getSpecialFeatures(pattern, complexity) {
    const features = [];
    
    switch (pattern) {
      case this.patterns.RAINBOW:
        features.push('Rainbow Pattern', 'Multiple Colors');
        break;
      case this.patterns.SPIRAL:
        features.push('Spiral Arrangement', 'Complex Layout');
        break;
      case this.patterns.MIRROR:
        features.push('Mirror Symmetry', 'Balanced Design');
        break;
      case this.patterns.CLUSTERED:
        features.push('Color Clusters', 'Strategic Challenge');
        break;
    }
    
    if (complexity > 8) features.push('Expert Level');
    if (complexity > 10) features.push('Master Challenge');
    
    return features;
  }
}