import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Checkerboard configuration
const CHECKERBOARD_CONFIG = {
  CELL_SIZE_REM: 5,
  DARK_CELLS_PERCENTAGE: 0.4,
  BASE_UPDATE_INTERVAL: 600,
  MAX_LAG_TIME: 800,
  FADE_IN_DURATION: 300,
  FADE_OUT_DURATION: 500,
  FADE_TIMING_FUNCTION: 'cubic-bezier(0.4, 0, 0.2, 1)',
  CELL_DARK_OPACITY: 0.9,
  BASE_GRID_OPACITY: 0.01,
  BASE_GRID_COLOR: '#c3c3e0'
};

// Robotic text configuration
const ROBOTIC_TEXT_CONFIG = {
  WORDS: [
    "PYTHON",
    "MACHINE LEARNING",
    "DEEP LEARNING",
    "STATISTICS",
    "DATA SCIENCE",
    "PYTORCH",
    "COMPUTER VISION",
    "KAGGLE",
    "SQL",
    "PLANT-DISEASE-DETECTION",
  ],
  WORDS_TO_DISPLAY: 4,
  POSITION: {
    RIGHT_OFFSET: {
      MOBILE: '1rem',
      DESKTOP: '3rem'
    },
    TOP_OFFSET: {
      MOBILE: '85%',
      DESKTOP: '75%'
    },
    TRANSFORM: 'translateY(-50%)',
    SPACING_BETWEEN_WORDS: '1.2rem'
  },
  FONT: {
    FAMILY: 'Space Mono, monospace',
    SIZE: {
      MOBILE: 'lg',
      DESKTOP: '2xl'
    },
    LETTER_SPACING: '0.1em',
    LINE_HEIGHT: '1.5',
    COLOR: 'rgba(252, 225, 192, 0.8)'
  },
  ANIMATION: {
    WORD_DURATION: 1200,
    GLITCH_DURATION: 180,
    CHAR_STAGGER_DELAY: 50,
    TRANSITION_SPRING: {
      STIFFNESS: 200,
      DAMPING: 20
    }
  },
  GLITCH: {
    SHADOW_COLOR_1: '#ff0080',
    SHADOW_COLOR_2: '#00ff80',
    SHADOW_OFFSET: '2px',
  },
  UNDERLINE: {
    HEIGHT: '2px',
    COLOR: 'rgba(255, 255, 255, 0.5)',
    MARGIN_TOP: '0.5rem'
  }
};

// Name configuration
const NAME_CONFIG = {
  FIRST_NAME: "MUHUMUZA",
  LAST_NAME: "DEUS",
  COLORS: {
    FIRST_NAME: 'rgba(255, 140, 0, 0.9)',  // Orange color for MUHUMUZA
    LAST_NAME: 'rgba(252, 225, 192, 0.95)'  // Lighter color for DEUS
  },
  POSITION: {
    TOP_OFFSET: {
      MOBILE: '-10%',
      DESKTOP: '0%'
    }
  },
  FONT: {
    SIZE: {
      MOBILE: {
        FIRST_NAME: '3.5rem',  // Smaller size for MUHUMUZA on mobile
        LAST_NAME: '6.5rem'    // Bigger size for DEUS on mobile
      },
      SM: {
        FIRST_NAME: '5rem',
        LAST_NAME: '6rem'
      },
      DEFAULT: {
        FIRST_NAME: '6rem',
        LAST_NAME: '7rem'
      },
      MD: {
        FIRST_NAME: '8rem',
        LAST_NAME: '10rem'
      }
    },
    WEIGHT: 'bold',
    LETTER_SPACING: '-0.05em'
  },
  GLITCH: {
    INTERVAL: 4000,
    DURATION: 200,
    BASE_SHADOW_COLOR_1: '#ff0080',
    BASE_SHADOW_COLOR_2: '#00ff80',
    SHADOW_OFFSET: '2px',
    PROBABILITY: 0.8,
    EFFECTS: {
      CHAR_REPLACE_POOL: '01アイウエオカキクケコサシスセソタチツテトナニヌネノ░█▓▒><}{/\\|=+-*&^%$#@!',
      CHAR_REPLACE_PROBABILITY: 0.4,
      SCAN_LINE_HEIGHT: '2px',
      SCAN_LINE_COLOR: 'rgba(255, 255, 255, 0.1)',
      NOISE_OPACITY: 0.03,
      RGB_SPLIT_OFFSET: '3px',
      FLICKER_INTENSITY: 0.8
    }
  },
  ANIMATION: {
    INITIAL_DELAY: 300,
    DURATION: 600,
    STAGGER_DELAY: 50
  }
};

// Gradient background configuration
const GRADIENT_BG_CONFIG = {
  COLORS: {
    PRIMARY: '#0f0f23',      // Deep dark blue
    SECONDARY: '#1a1b3c',    // Slightly lighter dark blue
    ACCENT: '#2a2a4a',       // Accent color
  },
  ANIMATION: {
    DURATION: '20s',
    TIMING: 'ease-in-out',
    DIRECTION: 'alternate',
    ITERATION: 'infinite'
  }
};

// Subtitle configuration
const SUBTITLE_CONFIG = {
  TEXT: "DATA SCIENTIST & ML ENGINEER",
  COLOR: "rgba(255, 140, 0, 0.9)",
  FONT_SIZE: {
    MOBILE: "sm",
    DESKTOP: "lg"
  },
  LETTER_SPACING: "0.25em",
  MARGIN_TOP: {
    MOBILE: "0.5rem",
    DESKTOP: "1rem"
  },
  ANIMATION: {
    DELAY: 1200,
    DURATION: 1000
  }
};

const Cell = ({ row, col, shouldBeDark, size }) => {
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    if (shouldBeDark) {
      const lagTime = Math.random() * CHECKERBOARD_CONFIG.MAX_LAG_TIME;
      const timer = setTimeout(() => {
        setOpacity(CHECKERBOARD_CONFIG.CELL_DARK_OPACITY);
      }, lagTime);
      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
    }
  }, [shouldBeDark]);
  
  return (
    <div
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        transition: `
          opacity ${shouldBeDark ? CHECKERBOARD_CONFIG.FADE_IN_DURATION : CHECKERBOARD_CONFIG.FADE_OUT_DURATION}ms ${CHECKERBOARD_CONFIG.FADE_TIMING_FUNCTION}
        `,
        backgroundColor: GRADIENT_BG_CONFIG.COLORS.ACCENT,
        opacity
      }}
    />
  );
};

const AnimatedCheckerboard = () => {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const [darkCellsMap, setDarkCellsMap] = useState(new Map());
  
  const updateGridSize = useCallback(() => {
    const cellSizePx = CHECKERBOARD_CONFIG.CELL_SIZE_REM * 16;
    const cols = Math.ceil(window.innerWidth / cellSizePx);
    const rows = Math.ceil(window.innerHeight / cellSizePx);
    setGridSize({ rows, cols });
  }, []);
  
  useEffect(() => {
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, [updateGridSize]);
  
  useEffect(() => {
    const updateDarkCells = () => {
      const newDarkCells = new Map();
      const totalCells = gridSize.rows * gridSize.cols;
      const numDarkCells = Math.floor(totalCells * CHECKERBOARD_CONFIG.DARK_CELLS_PERCENTAGE);
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
    
    const interval = setInterval(updateDarkCells, CHECKERBOARD_CONFIG.BASE_UPDATE_INTERVAL);
    updateDarkCells();
    
    return () => clearInterval(interval);
  }, [gridSize]);
  
  return (
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0"
        style={{ 
          opacity: CHECKERBOARD_CONFIG.BASE_GRID_OPACITY,
          backgroundImage: `
            linear-gradient(to right, ${CHECKERBOARD_CONFIG.BASE_GRID_COLOR} 1px, transparent 1px),
            linear-gradient(to bottom, ${CHECKERBOARD_CONFIG.BASE_GRID_COLOR} 1px, transparent 1px)
          `,
          backgroundSize: `${CHECKERBOARD_CONFIG.CELL_SIZE_REM}rem ${CHECKERBOARD_CONFIG.CELL_SIZE_REM}rem`
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
                size={CHECKERBOARD_CONFIG.CELL_SIZE_REM}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const RoboticText = () => {
  const [activeWords, setActiveWords] = useState([]);
  const [isGlitching, setIsGlitching] = useState(Array(ROBOTIC_TEXT_CONFIG.WORDS_TO_DISPLAY).fill(false));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setActiveWords(ROBOTIC_TEXT_CONFIG.WORDS.slice(0, ROBOTIC_TEXT_CONFIG.WORDS_TO_DISPLAY));

    const rotateWords = () => {
      setActiveWords(prev => {
        const newWords = [...prev];
        newWords.shift();
        const nextWordIndex = (ROBOTIC_TEXT_CONFIG.WORDS.indexOf(prev[prev.length - 1]) + 1) % ROBOTIC_TEXT_CONFIG.WORDS.length;
        newWords.push(ROBOTIC_TEXT_CONFIG.WORDS[nextWordIndex]);
        return newWords;
      });
    };

    const intervalId = setInterval(() => {
      setIsGlitching(prev => prev.map(() => true));
      setTimeout(() => {
        rotateWords();
        setIsGlitching(prev => prev.map(() => false));
      }, ROBOTIC_TEXT_CONFIG.ANIMATION.GLITCH_DURATION);
    }, ROBOTIC_TEXT_CONFIG.ANIMATION.WORD_DURATION);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      className="absolute flex flex-col items-end"
      style={{
        right: isMobile ? ROBOTIC_TEXT_CONFIG.POSITION.RIGHT_OFFSET.MOBILE : ROBOTIC_TEXT_CONFIG.POSITION.RIGHT_OFFSET.DESKTOP,
        top: isMobile ? ROBOTIC_TEXT_CONFIG.POSITION.TOP_OFFSET.MOBILE : ROBOTIC_TEXT_CONFIG.POSITION.TOP_OFFSET.DESKTOP,
        transform: ROBOTIC_TEXT_CONFIG.POSITION.TRANSFORM,
        gap: ROBOTIC_TEXT_CONFIG.POSITION.SPACING_BETWEEN_WORDS
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {activeWords.map((word, wordIndex) => (
        <div key={word} className="flex flex-col items-end">
          <div 
            className={`font-mono text-${isMobile ? ROBOTIC_TEXT_CONFIG.FONT.SIZE.MOBILE : ROBOTIC_TEXT_CONFIG.FONT.SIZE.DESKTOP} relative overflow-hidden`}
            style={{
              fontFamily: ROBOTIC_TEXT_CONFIG.FONT.FAMILY,
              letterSpacing: ROBOTIC_TEXT_CONFIG.FONT.LETTER_SPACING,
              lineHeight: ROBOTIC_TEXT_CONFIG.FONT.LINE_HEIGHT,
              color: ROBOTIC_TEXT_CONFIG.FONT.COLOR,
              textShadow: isGlitching[wordIndex] 
                ? `${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_OFFSET} ${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_OFFSET} ${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_COLOR_1}, -${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_OFFSET} -${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_OFFSET} ${ROBOTIC_TEXT_CONFIG.GLITCH.SHADOW_COLOR_2}`
                : 'none',
              transition: 'text-shadow 0.15s ease-in-out',
            }}
          >
            <motion.div
              key={word}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                type: "spring",
                ...ROBOTIC_TEXT_CONFIG.ANIMATION.TRANSITION_SPRING
              }}
            >
              {word.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: Math.random() * 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.1,
                    delay: index * (ROBOTIC_TEXT_CONFIG.ANIMATION.CHAR_STAGGER_DELAY / 1000),
                    type: "spring"
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>
          <div 
            style={{
              width: '100%',
              height: ROBOTIC_TEXT_CONFIG.UNDERLINE.HEIGHT,
              background: `linear-gradient(to right, transparent, ${ROBOTIC_TEXT_CONFIG.UNDERLINE.COLOR}, transparent)`,
              marginTop: ROBOTIC_TEXT_CONFIG.UNDERLINE.MARGIN_TOP,
              clipPath: isGlitching[wordIndex] ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              transition: 'clip-path 0.3s ease-in-out'
            }}
          />
        </div>
      ))}
    </motion.div>
  );
};

const CyberNoiseOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none mix-blend-overlay"
    style={{
      backgroundImage: `
        repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, ${NAME_CONFIG.GLITCH.EFFECTS.NOISE_OPACITY}),
          rgba(0, 0, 0, ${NAME_CONFIG.GLITCH.EFFECTS.NOISE_OPACITY}) ${NAME_CONFIG.GLITCH.EFFECTS.SCAN_LINE_HEIGHT},
          transparent ${NAME_CONFIG.GLITCH.EFFECTS.SCAN_LINE_HEIGHT},
          transparent calc(${NAME_CONFIG.GLITCH.EFFECTS.SCAN_LINE_HEIGHT} * 2)
        )
      `,
    }}
  />
);

const EnhancedGlitchingName = ({ text, isFirstName, isMobile }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchedText, setGlitchedText] = useState(text);
  const [rgbOffset, setRgbOffset] = useState({ x: 0, y: 0 });
  const [flicker, setFlicker] = useState(1);

  const generateGlitchedChar = useCallback((char) => {
    if (Math.random() < NAME_CONFIG.GLITCH.EFFECTS.CHAR_REPLACE_PROBABILITY) {
      const pool = NAME_CONFIG.GLITCH.EFFECTS.CHAR_REPLACE_POOL;
      return pool[Math.floor(Math.random() * pool.length)];
    }
    return char;
  }, []);

  useEffect(() => {
    const triggerGlitch = () => {
      if (Math.random() < NAME_CONFIG.GLITCH.PROBABILITY) {
        setIsGlitching(true);
        
        const newGlitchedText = text
          .split('')
          .map(char => generateGlitchedChar(char))
          .join('');
        setGlitchedText(newGlitchedText);
        
        setRgbOffset({
          x: (Math.random() - 0.5) * parseFloat(NAME_CONFIG.GLITCH.EFFECTS.RGB_SPLIT_OFFSET),
          y: (Math.random() - 0.5) * parseFloat(NAME_CONFIG.GLITCH.EFFECTS.RGB_SPLIT_OFFSET)
        });

        const flickerInterval = setInterval(() => {
          setFlicker(Math.random() * NAME_CONFIG.GLITCH.EFFECTS.FLICKER_INTENSITY + 
            (1 - NAME_CONFIG.GLITCH.EFFECTS.FLICKER_INTENSITY));
        }, 50);

        setTimeout(() => {
          setIsGlitching(false);
          setGlitchedText(text);
          setRgbOffset({ x: 0, y: 0 });
          setFlicker(1);
          clearInterval(flickerInterval);
        }, NAME_CONFIG.GLITCH.DURATION);
      }
    };

    const intervalId = setInterval(triggerGlitch, NAME_CONFIG.GLITCH.INTERVAL);
    return () => clearInterval(intervalId);
  }, [text, generateGlitchedChar]);

  const getFontSize = () => {
    if (isMobile) {
      return isFirstName ? NAME_CONFIG.FONT.SIZE.MOBILE.FIRST_NAME : NAME_CONFIG.FONT.SIZE.MOBILE.LAST_NAME;
    }
    return isFirstName ? NAME_CONFIG.FONT.SIZE.MD.FIRST_NAME : NAME_CONFIG.FONT.SIZE.MD.LAST_NAME;
  };

  return (
    <motion.span
      className="inline-block relative"
      style={{
        opacity: flicker,
        fontSize: getFontSize(),
        color: isFirstName ? NAME_CONFIG.COLORS.FIRST_NAME : NAME_CONFIG.COLORS.LAST_NAME
      }}
    >
      {isGlitching && (
        <>
          <motion.span
            className="absolute"
            style={{
              left: rgbOffset.x,
              top: rgbOffset.y,
              color: NAME_CONFIG.GLITCH.BASE_SHADOW_COLOR_1,
              mixBlendMode: 'multiply',
              clipPath: 'polygon(0 15%, 100% 15%, 100% 85%, 0 85%)'
            }}
          >
            {glitchedText}
          </motion.span>
          <motion.span
            className="absolute"
            style={{
              left: -rgbOffset.x,
              top: -rgbOffset.y,
              color: NAME_CONFIG.GLITCH.BASE_SHADOW_COLOR_2,
              mixBlendMode: 'multiply',
              clipPath: 'polygon(0 15%, 100% 15%, 100% 85%, 0 85%)'
            }}
          >
            {glitchedText}
          </motion.span>
        </>
      )}
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: NAME_CONFIG.ANIMATION.DURATION / 1000,
            delay: (NAME_CONFIG.ANIMATION.INITIAL_DELAY + (index * NAME_CONFIG.ANIMATION.STAGGER_DELAY)) / 1000
          }}
          className="inline-block relative"
        >
          {isGlitching ? glitchedText[index] : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Subtitle = ({ isMobile }) => (
  <motion.p
    className={`text-${isMobile ? SUBTITLE_CONFIG.FONT_SIZE.MOBILE : SUBTITLE_CONFIG.FONT_SIZE.DESKTOP} text-center tracking-widest`}
    style={{
      color: SUBTITLE_CONFIG.COLOR,
      letterSpacing: SUBTITLE_CONFIG.LETTER_SPACING,
      marginTop: isMobile ? SUBTITLE_CONFIG.MARGIN_TOP.MOBILE : SUBTITLE_CONFIG.MARGIN_TOP.DESKTOP
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: SUBTITLE_CONFIG.ANIMATION.DURATION / 1000,
      delay: SUBTITLE_CONFIG.ANIMATION.DELAY / 1000
    }}
  >
    {SUBTITLE_CONFIG.TEXT}
  </motion.p>
);

// Custom keyframes for animated gradient
const gradientKeyframes = `
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
`;

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <style>{gradientKeyframes}</style>
      
      {/* Checkerboard pattern */}
      <AnimatedCheckerboard />
      
      {/* Subtle scanline effect */}
      <CyberNoiseOverlay />

      <div 
        className="relative h-full flex flex-col items-center justify-center px-4"
        style={{
          transform: `translateY(${isMobile ? NAME_CONFIG.POSITION.TOP_OFFSET.MOBILE : NAME_CONFIG.POSITION.TOP_OFFSET.DESKTOP})`
        }}
      >
        <div className="w-full max-w-7xl mx-auto">
          <motion.h1 
            className="flex flex-col items-center justify-center leading-none font-bold tracking-tighter break-words text-center"
            style={{
              letterSpacing: NAME_CONFIG.FONT.LETTER_SPACING
            }}
          >
            <EnhancedGlitchingName 
              text={NAME_CONFIG.FIRST_NAME} 
              isFirstName={true}
              isMobile={isMobile}
            />
            <EnhancedGlitchingName 
              text={NAME_CONFIG.LAST_NAME} 
              isFirstName={false}
              isMobile={isMobile}
            />
          </motion.h1>
          
          {/* Added subtitle for better introduction */}
          <Subtitle isMobile={isMobile} />
        </div>

        <RoboticText />
      </div>
    </div>
  );
};

export default HeroSection;