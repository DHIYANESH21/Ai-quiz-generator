import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Index from './components/Index'
import Signin from './components/Signin'
import Home from './components/Home'
import Viewquiz from './view-quiz/Viewquiz'
import History from './view-quiz/History'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/viewquiz/:docId' element={<Viewquiz/>}></Route>
          <Route path='/history/:userid' element={<History/>}></Route>
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App
