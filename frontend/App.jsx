
import { Box } from '@mui/material'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TaskForm from './components/TaskForm'
function App() {

//componente principal onde são criadas as rotas que serão usadas pela navbar
  return (
    <BrowserRouter>
      <Box >
        <Navbar />
        <Box sx={{display:"flex",width:"100%"}}>
          <Routes>
            <Route index element={<Home/>} path='/'/>
            <Route element={<TaskForm/>} path='/taskform'/>
          </Routes>
        </Box>

      </Box>
    </BrowserRouter>

  )
}

export default App
