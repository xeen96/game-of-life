// Game.tsx
import { ChangeEvent, useState, useEffect } from "react";
import styles from "./Game.module.scss";
import GameBoard from "./gameBoard";

const GRID_SIZE = 20;
const MIN_SEED = 1_000_000;
const MAX_SEED = 999_999_999;
const INTERVAL_DELAY = 1500;

const Game = () => {
  const [seed, setSeed] = useState(generateRandomSeed());
  const [isRunning, setIsRunning] = useState(false);
  const [grid, setGrid] = useState<number[][]>(generateInitialGrid(seed));

  function generateRandomSeed(): number {
    return Math.floor(Math.random() * (MAX_SEED - MIN_SEED)) + MIN_SEED;
  }

  function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function generateInitialGrid(seed: number): number[][] {
    return Array.from({ length: GRID_SIZE }, (_, y) =>
      Array.from({ length: GRID_SIZE }, (_, x) => 
        seededRandom(seed + x + y * GRID_SIZE) < 0.3 ? 1 : 0
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
        if (
          newY >= 0 && 
          newY < GRID_SIZE && 
          newX >= 0 && 
          newX < GRID_SIZE
        ) {
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
          ? (neighbors === 2 || neighbors === 3 ? 1 : 0)
          : (neighbors === 3 ? 1 : 0);
      })
    );
  }

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setGrid(prevGrid => nextGeneration(prevGrid));
    }, INTERVAL_DELAY);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSeed = Number(e.target.value);
    setSeed(newSeed);
    setGrid(generateInitialGrid(newSeed));
  };

  const handleToggleRunning = () => {
    setIsRunning(prev => !prev);
  };

  const handleRandomizeSeed = () => {
    const newSeed = generateRandomSeed();
    setSeed(newSeed);
    setGrid(generateInitialGrid(newSeed));
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
        <div className={styles.buttonGroup}>
          <button 
            onClick={handleRandomizeSeed} 
            disabled={isRunning}
            aria-label="Generate new random seed"
          >
            New Seed
          </button>
          <button 
            onClick={handleToggleRunning}
            aria-label={isRunning ? "Stop simulation" : "Start simulation"}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
        </div>
      </section>
      <GameBoard gridSize={GRID_SIZE} grid={grid} />
    </div>
  );
};

export default Game;