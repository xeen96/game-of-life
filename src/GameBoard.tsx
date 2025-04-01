import styles from "./GameBoard.module.scss";

interface GameBoardProps {
  gridSize: number;
  grid: number[][];
}

const GameBoard = ({ gridSize, grid }: GameBoardProps) => {
  const cellSize = `${50 / gridSize}vmin`;

  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, ${cellSize})`,
        gridTemplateRows: `repeat(${gridSize}, ${cellSize})`,
      }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={styles["grid-cell"]}
            style={{
              width: cellSize,
              height: cellSize,
              backgroundColor: cell ? "darkgreen" : "inherit",
              border: "0.5px dashed darkgreen",
            }}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;