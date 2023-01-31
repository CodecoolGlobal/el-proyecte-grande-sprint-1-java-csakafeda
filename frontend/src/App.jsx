
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from "./Pages/HomePage/HomePage.jsx"
import Layout from './Pages/Layout'

function App() {

  return (
    <div className="App">
    <Router>
      <Routes>

        <Route element={<Layout />}>

          <Route path='/' element={<HomePage />} />
        </Route>

      </Routes>
    </Router>

    </div>
  )
}

export default App
