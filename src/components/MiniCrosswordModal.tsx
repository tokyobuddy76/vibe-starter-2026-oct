import React, { useState, useEffect, useRef } from 'react';
import { MINI_CROSSWORD_DATA } from '../data/newsData';
import {
  playKeyClick,
  playBackspaceClick,
  playErrorTone,
  playVictoryChime
} from '../utils/audioEffects';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Trophy,
  Share2,
  Sparkles,
  ArrowRight,
  Volume2,
  VolumeX
} from 'lucide-react';

interface MiniCrosswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MiniCrosswordModal: React.FC<MiniCrosswordModalProps> = ({ isOpen, onClose }) => {
  const size = 5;
  const [gridState, setGridState] = useState<string[][]>(() =>
    Array(size).fill('').map(() => Array(size).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number }>({ row: 0, col: 0 });
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [errorCells, setErrorCells] = useState<boolean[][]>(() =>
    Array(size).fill(false).map(() => Array(size).fill(false))
  );
  const [revealedCells, setRevealedCells] = useState<boolean[][]>(() =>
    Array(size).fill(false).map(() => Array(size).fill(false))
  );
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [activeMenu, setActiveMenu] = useState<'check' | 'reveal' | null>(null);

  // Timer interval
  useEffect(() => {
    let interval: any;
    if (isOpen && isTimerRunning && !isSolved) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning, isSolved]);

  // Check if solved
  useEffect(() => {
    if (isSolved) return;
    let complete = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (gridState[r][c] !== MINI_CROSSWORD_DATA.grid[r][c]) {
          complete = false;
          break;
        }
      }
      if (!complete) break;
    }
    if (complete) {
      setIsSolved(true);
      setIsTimerRunning(false);
      if (soundEnabled) playVictoryChime();
    }
  }, [gridState, isSolved, soundEnabled]);

  // Handle cell click
  const handleCellClick = (r: number, c: number) => {
    if (selectedCell.row === r && selectedCell.col === c) {
      // Toggle direction
      setDirection((prev) => (prev === 'across' ? 'down' : 'across'));
    } else {
      setSelectedCell({ row: r, col: c });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || isSolved) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Tab', ' '].includes(e.key)) {
        e.preventDefault();
        setDirection((prev) => (prev === 'across' ? 'down' : 'across'));
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedCell((prev) => ({ ...prev, col: Math.min(size - 1, prev.col + 1) }));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedCell((prev) => ({ ...prev, col: Math.max(0, prev.col - 1) }));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedCell((prev) => ({ ...prev, row: Math.min(size - 1, prev.row + 1) }));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedCell((prev) => ({ ...prev, row: Math.max(0, prev.row - 1) }));
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        if (soundEnabled) playBackspaceClick();
        // Clear current letter, move backwards
        const { row, col } = selectedCell;
        setGridState((prev) => {
          const next = prev.map((arr) => [...arr]);
          next[row][col] = '';
          return next;
        });
        setErrorCells((prev) => {
          const next = prev.map((arr) => [...arr]);
          next[row][col] = false;
          return next;
        });

        // Step back
        if (direction === 'across' && col > 0) {
          setSelectedCell({ row, col: col - 1 });
        } else if (direction === 'down' && row > 0) {
          setSelectedCell({ row: row - 1, col });
        }
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        if (soundEnabled) playKeyClick();
        const letter = e.key.toUpperCase();
        const { row, col } = selectedCell;

        setGridState((prev) => {
          const next = prev.map((arr) => [...arr]);
          next[row][col] = letter;
          return next;
        });
        setErrorCells((prev) => {
          const next = prev.map((arr) => [...arr]);
          next[row][col] = false;
          return next;
        });

        // Advance cursor
        if (direction === 'across') {
          if (col < size - 1) {
            setSelectedCell({ row, col: col + 1 });
          }
        } else {
          if (row < size - 1) {
            setSelectedCell({ row: row + 1, col });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedCell, direction, isSolved]);

  if (!isOpen) return null;

  // Active word detection
  const isCellInActiveWord = (r: number, c: number) => {
    if (direction === 'across') {
      return r === selectedCell.row;
    } else {
      return c === selectedCell.col;
    }
  };

  // Active clue detection
  const activeClue = direction === 'across'
    ? MINI_CROSSWORD_DATA.clues.across[selectedCell.row]
    : MINI_CROSSWORD_DATA.clues.down[selectedCell.col];

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Check functions
  const handleCheckLetter = () => {
    const { row, col } = selectedCell;
    const isCorrect = gridState[row][col] === MINI_CROSSWORD_DATA.grid[row][col];
    if (!isCorrect && gridState[row][col] !== '') {
      setErrorCells((prev) => {
        const next = prev.map((a) => [...a]);
        next[row][col] = true;
        return next;
      });
    }
    setActiveMenu(null);
  };

  const handleCheckPuzzle = () => {
    const newErrors = gridState.map((rArr, r) =>
      rArr.map((val, c) => val !== '' && val !== MINI_CROSSWORD_DATA.grid[r][c])
    );
    setErrorCells(newErrors);
    setActiveMenu(null);
  };

  const handleRevealLetter = () => {
    const { row, col } = selectedCell;
    setGridState((prev) => {
      const next = prev.map((a) => [...a]);
      next[row][col] = MINI_CROSSWORD_DATA.grid[row][col];
      return next;
    });
    setRevealedCells((prev) => {
      const next = prev.map((a) => [...a]);
      next[row][col] = true;
      return next;
    });
    setErrorCells((prev) => {
      const next = prev.map((a) => [...a]);
      next[row][col] = false;
      return next;
    });
    setActiveMenu(null);
  };

  const handleRevealPuzzle = () => {
    setGridState(MINI_CROSSWORD_DATA.grid);
    setRevealedCells(Array(size).fill(true).map(() => Array(size).fill(true)));
    setErrorCells(Array(size).fill(false).map(() => Array(size).fill(false)));
    setActiveMenu(null);
  };

  const handleReset = () => {
    setGridState(Array(size).fill('').map(() => Array(size).fill('')));
    setErrorCells(Array(size).fill(false).map(() => Array(size).fill(false)));
    setRevealedCells(Array(size).fill(false).map(() => Array(size).fill(false)));
    setTimerSeconds(0);
    setIsSolved(false);
    setIsTimerRunning(true);
    setSelectedCell({ row: 0, col: 0 });
    setDirection('across');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-[840px] rounded-sm shadow-2xl border border-nyt-border flex flex-col my-auto relative animate-fade-in overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-5 py-3 border-b border-nyt-border flex items-center justify-between bg-white font-sansText">
          <div className="flex items-center gap-3">
            <span className="font-headline font-bold text-lg text-nyt-black tracking-tight">
              The Mini Crossword
            </span>
            <span className="bg-neutral-100 text-nyt-grayDark text-[11px] font-semibold px-2 py-0.5 rounded-xs">
              Wednesday, Oct 14
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 text-xs">
            {/* Timer */}
            <div className="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1 rounded-xs font-mono font-bold text-nyt-black">
              <span>{formatTimer(timerSeconds)}</span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="hover:text-nyt-accent cursor-pointer"
                title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
            </div>

            {/* Check dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'check' ? null : 'check')}
                className="hover:bg-neutral-100 px-2 py-1 rounded-xs border border-neutral-200 font-medium cursor-pointer"
              >
                Check
              </button>
              {activeMenu === 'check' && (
                <div className="absolute right-0 mt-1 bg-white border border-neutral-200 shadow-lg rounded-xs z-20 py-1 w-32">
                  <button
                    onClick={handleCheckLetter}
                    className="w-full text-left px-3 py-1.5 hover:bg-neutral-100 text-xs cursor-pointer"
                  >
                    Check Cell
                  </button>
                  <button
                    onClick={handleCheckPuzzle}
                    className="w-full text-left px-3 py-1.5 hover:bg-neutral-100 text-xs cursor-pointer font-semibold"
                  >
                    Check Puzzle
                  </button>
                </div>
              )}
            </div>

            {/* Reveal dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'reveal' ? null : 'reveal')}
                className="hover:bg-neutral-100 px-2 py-1 rounded-xs border border-neutral-200 font-medium cursor-pointer"
              >
                Reveal
              </button>
              {activeMenu === 'reveal' && (
                <div className="absolute right-0 mt-1 bg-white border border-neutral-200 shadow-lg rounded-xs z-20 py-1 w-32">
                  <button
                    onClick={handleRevealLetter}
                    className="w-full text-left px-3 py-1.5 hover:bg-neutral-100 text-xs cursor-pointer"
                  >
                    Reveal Cell
                  </button>
                  <button
                    onClick={handleRevealPuzzle}
                    className="w-full text-left px-3 py-1.5 hover:bg-neutral-100 text-xs cursor-pointer font-semibold"
                  >
                    Reveal Puzzle
                  </button>
                </div>
              )}
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="p-1 hover:bg-neutral-100 rounded-xs text-nyt-grayMuted hover:text-black cursor-pointer"
              title="Reset puzzle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-100 rounded-xs text-nyt-grayMuted hover:text-black cursor-pointer ml-1"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Clue Ribbon */}
        <div className="bg-[#f2f7fc] border-b border-[#d1e3f8] px-5 py-2.5 flex items-center justify-between font-sansText text-sm">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-bold text-nyt-black shrink-0">
              {activeClue?.number} {direction.toUpperCase()}:
            </span>
            <span className="text-nyt-grayDark truncate">{activeClue?.clue}</span>
          </div>
          <button
            onClick={() => setDirection(direction === 'across' ? 'down' : 'across')}
            className="text-[11px] font-semibold text-nyt-accent hover:underline shrink-0 ml-3 cursor-pointer"
          >
            Switch to {direction === 'across' ? 'Down' : 'Across'} ⮂
          </button>
        </div>

        {/* Game Layout: Grid on left, Clue columns on right */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-sansText">
          
          {/* 5x5 Grid */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="inline-grid grid-cols-5 gap-0 border-2 border-black bg-black p-0 shadow-md">
              {gridState.map((row, r) =>
                row.map((cellLetter, c) => {
                  const isSelected = selectedCell.row === r && selectedCell.col === c;
                  const inWord = isCellInActiveWord(r, c);
                  const cellNum = MINI_CROSSWORD_DATA.numbers[r][c];
                  const hasError = errorCells[r][c];
                  const isRevealed = revealedCells[r][c];

                  let bgClass = 'bg-white';
                  if (isSelected) {
                    bgClass = 'bg-[#ffda00] text-black font-extrabold';
                  } else if (inWord) {
                    bgClass = 'bg-[#d8e8fa] text-black';
                  }

                  return (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 relative flex items-center justify-center border border-neutral-300 font-sansText text-2xl font-bold select-none cursor-pointer transition-colors ${bgClass}`}
                    >
                      {/* Cell number */}
                      {cellNum && (
                        <span className="absolute top-0.5 left-1 text-[10px] sm:text-[11px] font-semibold text-neutral-700 pointer-events-none">
                          {cellNum}
                        </span>
                      )}

                      {/* Cell letter */}
                      <span className={hasError ? 'text-red-600 line-through' : isRevealed ? 'text-blue-700' : ''}>
                        {cellLetter}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <p className="text-[11px] text-nyt-grayLight mt-3 text-center">
              Click any cell to type. Press Space or click again to toggle Across / Down.
            </p>
          </div>

          {/* Clues Pane */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-nyt-border pt-4 md:pt-0 md:pl-5 text-xs">
            {/* Across Clues */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-nyt-black border-b border-nyt-border pb-1 mb-2">
                Across
              </h4>
              <ul className="space-y-2">
                {MINI_CROSSWORD_DATA.clues.across.map((item, idx) => {
                  const isActive = direction === 'across' && selectedCell.row === idx;
                  return (
                    <li
                      key={item.number}
                      onClick={() => {
                        setSelectedCell({ row: idx, col: 0 });
                        setDirection('across');
                      }}
                      className={`p-1.5 rounded-xs cursor-pointer transition-colors leading-snug ${
                        isActive ? 'bg-[#d8e8fa] font-semibold text-black' : 'hover:bg-neutral-100 text-nyt-grayDark'
                      }`}
                    >
                      <span className="font-bold text-nyt-black mr-1">{item.number}</span>
                      {item.clue}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Down Clues */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-nyt-black border-b border-nyt-border pb-1 mb-2">
                Down
              </h4>
              <ul className="space-y-2">
                {MINI_CROSSWORD_DATA.clues.down.map((item, idx) => {
                  const isActive = direction === 'down' && selectedCell.col === idx;
                  return (
                    <li
                      key={item.number}
                      onClick={() => {
                        setSelectedCell({ row: 0, col: idx });
                        setDirection('down');
                      }}
                      className={`p-1.5 rounded-xs cursor-pointer transition-colors leading-snug ${
                        isActive ? 'bg-[#d8e8fa] font-semibold text-black' : 'hover:bg-neutral-100 text-nyt-grayDark'
                      }`}
                    >
                      <span className="font-bold text-nyt-black mr-1">{item.number}</span>
                      {item.clue}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Victory Screen Overlay */}
        {isSolved && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="font-headline text-3xl font-bold text-nyt-black mb-1">
              Congratulations!
            </h3>
            <p className="font-serifText text-lg text-nyt-grayDark mb-4">
              You solved today’s New York Times Mini Crossword in{' '}
              <strong className="text-black font-sansText">{formatTimer(timerSeconds)}</strong>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="bg-neutral-100 hover:bg-neutral-200 text-nyt-black font-sansText text-xs font-bold px-4 py-2 rounded-xs transition-colors cursor-pointer"
              >
                Play Again
              </button>
              <button
                onClick={onClose}
                className="bg-nyt-black hover:bg-neutral-800 text-white font-sansText text-xs font-bold px-5 py-2 rounded-xs transition-colors cursor-pointer"
              >
                Back to Front Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
