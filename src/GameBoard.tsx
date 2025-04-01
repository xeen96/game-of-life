import styles from "./GameBoard.module.scss"

interface GameBoardProps {
  gridSize: number;
  seed: number;
}

const GameBoard = ({ gridSize, seed }: GameBoardProps) => {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

// Генерируем сетку с "живыми" клетками на основе seed
const grid = Array.from({ length: gridSize }, (_, y) =>
  Array.from({ length: gridSize }, (_, x) => {
    // Уникальное значение для каждой клетки на основе координат и seed
    const uniqueSeed = seed + x + y * gridSize;
    // Вероятность 0.3 (30%) что клетка будет жива
    return seededRandom(uniqueSeed) < 0.3 ? 1 : 0;
  })
);

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