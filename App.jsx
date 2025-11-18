import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from '.'
import Juegos from './juegos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/juegos" element={<Juegos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
