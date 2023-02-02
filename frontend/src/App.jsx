
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from "./Pages/HomePage/HomePage.jsx"
import Layout from './Pages/Layout'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from './Theme'
import {StompSessionProvider} from "react-stomp-hooks";

function App() {
  const theme = createTheme(themeOptions);

  return (
      <StompSessionProvider url={"ws://localhost:8080/"}>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>

            <Route element={<Layout />}>

              <Route path='/' element={<HomePage />} />
            </Route>

          </Routes>
        </Router>

      </div>
    </ThemeProvider>
      </StompSessionProvider>
  )
}

export default App
