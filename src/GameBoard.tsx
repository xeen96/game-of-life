// GameBoard.tsx
import styles from "./GameBoard.module.scss";

interface GameBoardProps {
  gridSize: number;
  grid: number[][];
  isRunning: boolean;
}

const GameBoard = ({ gridSize, grid, isRunning }: GameBoardProps) => {
  return (
    <div
    className={`${styles.board} ${isRunning ? styles.running : ""}`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {grid.flat().map((cell, index) => (
        <div
          key={index}
          className={`${styles.cell} ${cell === 1 ? styles.alive : ""}`}
        />
      ))}
    </div>
  );
};

export default GameBoard;