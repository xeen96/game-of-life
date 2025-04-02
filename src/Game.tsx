// Game.tsx
import { ChangeEvent, useState, useEffect } from "react";
import styles from "./Game.module.scss";
import GameBoard from "./GameBoard";

const MIN_SEED = 1_000_000;
const MAX_SEED = 999_999_999;
const INTERVAL_DELAY = 1500;
const MIN_GRID_SIZE = 10;
const MAX_GRID_SIZE = 50;

const Game = () => {
  const [seed, setSeed] = useState(generateRandomSeed());
  const [isRunning, setIsRunning] = useState(false);
  const [gridSize, setGridSize] = useState(20);
  const [grid, setGrid] = useState<number[][]>(generateInitialGrid(seed, gridSize));

  function generateRandomSeed(): number {
    return Math.floor(Math.random() * (MAX_SEED - MIN_SEED)) + MIN_SEED;
  }

  function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function generateInitialGrid(seed: number, size: number): number[][] {
    return Array.from({ length: size }, (_, y) =>
      Array.from({ length: size }, (_, x) =>
        seededRandom(seed + x + y * size) < 0.3 ? 1 : 0
      )
    );
  }

  function countNeighbors(grid: number[][], x: number, y: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newY = y + i;
        const newX = x + j;
        if (newY >= 0 && newY < gridSize && newX >= 0 && newX < gridSize) {
          count += grid[newY][newX];
        }
      }
    }
    return count;
  }

  function nextGeneration(currentGrid: number[][]): number[][] {
    return currentGrid.map((row, y) =>
      row.map((cell, x) => {
        const neighbors = countNeighbors(currentGrid, x, y);
        return cell === 1
          ? neighbors === 2 || neighbors === 3
            ? 1
            : 0
          : neighbors === 3
          ? 1
          : 0;
      })
    );
  }

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setGrid((prevGrid) => nextGeneration(prevGrid));
    }, INTERVAL_DELAY);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSeed = Number(e.target.value);
    setSeed(newSeed);
    setGrid(generateInitialGrid(newSeed, gridSize));
  };

  const handleGridSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setGridSize(newSize);
    setGrid(generateInitialGrid(seed, newSize)); 
  };

  const handleToggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const handleRandomizeSeed = () => {
    const newSeed = generateRandomSeed();
    setSeed(newSeed);
    setGrid(generateInitialGrid(newSeed, gridSize));
  };

  return (
    <div className={styles.gameContainer}>
      <section className={styles.controls}>
        <div className={styles.seedControl}>
          <input
            type="range"
            value={seed}
            min={MIN_SEED}
            max={MAX_SEED}
            onChange={handleSeedChange}
            disabled={isRunning}
            aria-label="Seed value"
          />
          <span className={styles.seedValue}>Seed: {seed}</span>
        </div>
        <div className={styles.gridSizeControl}>
          <input
            type="range"
            value={gridSize}
            min={MIN_GRID_SIZE}
            max={MAX_GRID_SIZE}
            onChange={handleGridSizeChange}
            disabled={isRunning}
            aria-label="Grid size"
          />
          <span className={styles.gridSizeValue}>Grid Size: {gridSize}</span>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onClick={handleRandomizeSeed}
            disabled={isRunning}
            aria-label="Generate new random seed"
          >
            Set Random Seed
          </button>
          <button
            onClick={handleToggleRunning}
            aria-label={isRunning ? "Stop simulation" : "Start simulation"}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
        </div>
      </section>
      <GameBoard gridSize={gridSize} grid={grid} isRunning={isRunning}/>
    </div>
  );
};

export default Game;