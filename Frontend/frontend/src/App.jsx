import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import StylicPostForm from './pages/StylicPostForm'
import Feed from './pages/Feed'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StylicPostForm />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  )
}

export default App