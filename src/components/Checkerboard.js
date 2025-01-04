import React, { useState, useEffect, useCallback } from 'react';

// Configuration objects for different checkerboard versions
const CHECKERBOARD_VARIANTS = {
  global: {
    CELL_SIZE_REM: 3,
    DARK_CELLS_PERCENTAGE: 0.5,
    BASE_UPDATE_INTERVAL: 400,
    MAX_LAG_TIME: 1000,
    FADE_IN_DURATION: 300,
    FADE_OUT_DURATION: 500,
    FADE_TIMING_FUNCTION: 'cubic-bezier(0.4, 0, 0.2, 1)',
    CELL_DARK_OPACITY: 0.1,
    BASE_GRID_OPACITY: 0.0,
    BASE_GRID_COLOR: 'rgba(252, 225, 192, 0.95)',
    CELL_COLOR: 'rgb(0, 0, 0)',
    BACKGROUND_COLOR: '#0B192C'  // Nearly black
  },
  footer: {
    CELL_SIZE_REM: 3,
    DARK_CELLS_PERCENTAGE: 0.4,
    BASE_UPDATE_INTERVAL: 500,
    MAX_LAG_TIME: 600,
    FADE_IN_DURATION: 200,
    FADE_OUT_DURATION: 400,
    FADE_TIMING_FUNCTION: 'cubic-bezier(0.4, 0, 0.2, 1)',
    CELL_DARK_OPACITY: 0.2,
    BASE_GRID_OPACITY: 0.0,
    BASE_GRID_COLOR: 'rgba(252, 225, 192, 0.7)',
    CELL_COLOR: 'rgba(252, 225, 192, 0.7)',
    BACKGROUND_COLOR: '#0B192C'  // Dark indigo // Add background color for footer
  }
};

const Cell = ({ row, col, shouldBeDark, size, config }) => {
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    if (shouldBeDark) {
      const lagTime = Math.random() * config.MAX_LAG_TIME;
      const timer = setTimeout(() => {
        setOpacity(config.CELL_DARK_OPACITY);
      }, lagTime);
      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
    }
  }, [shouldBeDark, config]);
  
  return (
    <div
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        transition: `opacity ${shouldBeDark ? config.FADE_IN_DURATION : config.FADE_OUT_DURATION}ms ${config.FADE_TIMING_FUNCTION}`,
        backgroundColor: config.CELL_COLOR,
        opacity
      }}
    />
  );
};

const Checkerboard = ({ variant = 'hero', className = '' }) => {
  const config = CHECKERBOARD_VARIANTS[variant];
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const [darkCellsMap, setDarkCellsMap] = useState(new Map());
  
  const updateGridSize = useCallback(() => {
    const cellSizePx = config.CELL_SIZE_REM * 16;
    const cols = Math.ceil(window.innerWidth / cellSizePx);
    const rows = Math.ceil(window.innerHeight / cellSizePx);
    setGridSize({ rows, cols });
  }, [config.CELL_SIZE_REM]);
  
  useEffect(() => {
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, [updateGridSize]);
  
  useEffect(() => {
    const updateDarkCells = () => {
      const newDarkCells = new Map();
      const totalCells = gridSize.rows * gridSize.cols;
      const numDarkCells = Math.floor(totalCells * config.DARK_CELLS_PERCENTAGE);
      const cellPositions = [];
      
      for (let row = 0; row < gridSize.rows; row++) {
        for (let col = 0; col < gridSize.cols; col++) {
          cellPositions.push(`${row}-${col}`);
        }
      }
      
      for (let i = 0; i < numDarkCells; i++) {
        const randomIndex = Math.floor(Math.random() * cellPositions.length);
        const position = cellPositions.splice(randomIndex, 1)[0];
        newDarkCells.set(position, true);
      }
      
      setDarkCellsMap(newDarkCells);
    };
    
    const interval = setInterval(updateDarkCells, config.BASE_UPDATE_INTERVAL);
    updateDarkCells();
    
    return () => clearInterval(interval);
  }, [gridSize, config]);
  
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{ backgroundColor: config.BACKGROUND_COLOR }}
    >
      <div 
        className="absolute inset-0"
        style={{ 
          opacity: config.BASE_GRID_OPACITY,
          backgroundImage: `
            linear-gradient(to right, ${config.BASE_GRID_COLOR} 1px, transparent 1px),
            linear-gradient(to bottom, ${config.BASE_GRID_COLOR} 1px, transparent 1px)
          `,
          backgroundSize: `${config.CELL_SIZE_REM}rem ${config.CELL_SIZE_REM}rem`
        }}
      />
      
      <div className="absolute inset-0">
        {Array.from({ length: gridSize.rows }, (_, row) => (
          <div key={row} className="flex">
            {Array.from({ length: gridSize.cols }, (_, col) => (
              <Cell
                key={`${row}-${col}`}
                row={row}
                col={col}
                shouldBeDark={darkCellsMap.has(`${row}-${col}`)}
                size={config.CELL_SIZE_REM}
                config={config}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkerboard;