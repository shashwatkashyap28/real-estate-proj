import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import About from './pages/About';
import Profile from './pages/profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import FloatingEnquiry from './components/FloatingEnquiry'
import Chatbot from "./components/Chatbot"
import Footer from './components/Footer';
import Properties from './pages/properties';
import Dashboard from './pages/Dashboard';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <FloatingEnquiry/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/properties' element={<Properties/>}/>
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
        
      </Routes>
      <Chatbot/>
      <Footer/>


    </BrowserRouter>
  );
}