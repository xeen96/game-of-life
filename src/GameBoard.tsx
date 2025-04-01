// GameBoard.tsx
import styles from "./GameBoard.module.scss";

interface GameBoardProps {
  gridSize: number;
  grid: number[][];
}

const GameBoard = ({ gridSize, grid }: GameBoardProps) => {
  return (
    <div
      className={styles.board}
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