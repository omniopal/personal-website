import './App.css'
import { Route, Routes } from 'react-router'
import { Homepage } from './components/homepage/Homepage'
import { GameCollection } from './components/game-collection/GameCollection'
import { Mazes } from './components/mazes/Mazes'
import { Draftlocke } from './components/draftlocke/Draftlocke'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/collection" element={<GameCollection />} />
      <Route path="/mazes" element={<Mazes />} />
      <Route path="/draftlocke" element={<Draftlocke />} />
    </Routes>
  )
}

export default App
