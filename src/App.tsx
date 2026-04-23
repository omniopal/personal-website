import './App.css'
import '@mantine/core/styles.css';
import { Route, Routes } from 'react-router';
import { Homepage } from './components/homepage/Homepage';
import { GameCollection } from './components/game-collection/GameCollection';
import { Mazes } from './components/mazes/Mazes';
import { Draftlocke } from './components/draftlocke/Draftlocke';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/collection" element={<GameCollection />} />
        <Route path="/mazes" element={<Mazes />} />
        <Route path="/draftlocke" element={<Draftlocke />} />
      </Routes>
    </MantineProvider>
  )
}

export default App
