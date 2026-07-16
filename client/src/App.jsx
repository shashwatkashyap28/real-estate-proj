import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Profile from './pages/profile';
import About from './pages/about';
import FloatingEnquiry from "./components/FloatingEnquiry";
import Properties from './pages/properties';
import Chatbot from './components/Chatbot';



export default function App() { 
  return (
  <BrowserRouter>
    <Header/>
    <FloatingEnquiry/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/properties" element={<Properties />} />
      

    </Routes>  
    <Chatbot/>
    <Footer/>


  </BrowserRouter>
  )

}
