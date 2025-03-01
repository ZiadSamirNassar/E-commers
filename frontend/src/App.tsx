import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import MyAppBar from "./components/navBar"


function App() {


  return (
    <BrowserRouter>

      <MyAppBar/>

        <Routes>
          
          <Route path="/" element= {<HomePage/>}/>
          <Route path="/login" element= {<div>login page</div>}/>
          
        </Routes>
    </BrowserRouter>
  )

  
}

export default App
