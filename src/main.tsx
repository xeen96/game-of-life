import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import styles from "./main.module.scss"
import Game from './Game'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className={styles.content}>
    <div className={styles.title}><h1>Game of Life</h1></div>
    <Game/>
    </div>
  </StrictMode>
)
