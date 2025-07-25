import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ProblemTracker from './Components/ProblemTracker'

function App() {
  
  const counterNumber = [1,1,1];
  return (
    <>
    <ProblemTracker/>
    </>
  )
}

export default App
