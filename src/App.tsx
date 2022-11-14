import Header from "./Components/Header/Header"
import './App.scss'
import Homepage from "./pages/homePage/Homepage"
import {BrowserRouter , Route ,Routes} from 'react-router-dom'
import CoinPage from "./pages/CoinPage/CoinPage"

function App() {

  return (
    <BrowserRouter>
    <div className="App">
     <Header/>
     <Routes>
     <Route path="/" element={<Homepage />}></Route>
     <Route path='/:id' element={<CoinPage />}></Route>
     </Routes>
     
    </div>
    </BrowserRouter>
  )
}

export default App
