import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Profile from './pages/profile';
import About from './pages/about';


export default function App() { 
  return (<BrowserRouter>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>  


  </BrowserRouter>)
}
