// import { useState } from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import AnimatedRoutes from './components/AnimatedRoutes/AnimatedRoutes';
import SlideRoutes from "react-slide-routes";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Goal from "./pages/Goal/Goal";
import Infos from "./pages/Infos/Infos";
import Download from "./pages/Download/Download";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <SlideRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/objectives' element={<Goal />} />
        <Route path='/simplifions' element={<Infos />} />
        <Route path='/download' element={<Download />} />
      </SlideRoutes>
    </BrowserRouter>
  )
}

export default App
