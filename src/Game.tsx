import { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./Game.module.scss";
import GameBoard from "./gameBoard";

const Game = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 999000000) + 1000000);
  const [running, setRunning] = useState<boolean>(false);

  const handleChangeSeed = (e: ChangeEvent<HTMLInputElement>): void => {
    setSeed((prev) => prev = Number(e.target.value));
  };

  const handleStart = (e: MouseEvent<HTMLButtonElement>): void => {
    setRunning(prev => !prev)
  }

  return (
    <div className={styles.game}>
      <div className={styles.controls}>
        <input
          type="range"
          value={seed}
          min={1_000_000}
          max={999_999_999}
          onChange={handleChangeSeed}
          disabled={running}
        />
        <p>Seed: {seed}</p>
        <button
          onClick={() =>
            setSeed(Math.floor(Math.random() * 999000000) + 1000000)
          }
          disabled={running}
        >
          New Seed
        </button>
        <button onClick={handleStart}>{running ? "Stop": "Start"}</button>
      </div>
      <GameBoard gridSize={20} seed={seed} />
    </div>
  );
};

export default Game;
