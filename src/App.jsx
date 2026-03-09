import { useState } from 'react'
import './App.css'
import NavbarComp from './components/NavbarComp'
import SearchBarComp from './components/SearchBarComp'
import CardDayComp from './components/CardDayComp'

function App() {

  return (
    <>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #013fba, #ffffff)",
      }}>
        <div>
          <h1 className="text-4xl font-bold text-center text-white mb-10">English Dictionary for Better Vocabulary</h1>
          <SearchBarComp />
          <div className="mt-10">
            <CardDayComp />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
