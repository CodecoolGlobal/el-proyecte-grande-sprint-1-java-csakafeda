import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from "./Pages/HomePage/HomePage.jsx"
import Layout from './Pages/Layout'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {themeOptions} from './Theme'
import QuestionPageSingle from './Pages/Question/QuestionPageSingle.jsx';
import QuestionPageMulti from './Pages/Question/QuestionPageMulti.jsx';

function App() {
    const theme = createTheme(themeOptions);

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Router>
                    <Routes>

                        <Route element={<Layout/>}>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path='/question-single' element={<QuestionPageSingle/>}/>
                            <Route path='/question-multi' element={<QuestionPageMulti/>}/>
                        </Route>

                    </Routes>
                </Router>

            </div>

        </ThemeProvider>
    )
}

export default App
