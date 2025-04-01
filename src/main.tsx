import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import styles from "./main.module.scss"
import Game from './Game'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className={styles.content}>
    <h1>Game of Life</h1>
    <Game/>
    </div>
  </StrictMode>,
)
