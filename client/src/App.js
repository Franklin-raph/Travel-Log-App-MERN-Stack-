import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard';
import TravelExperiences from './pages/TravelExperiences';
import Post_travel from './pages/Post_travel';
import ImageUpload from './components/ImageUpload';

function App() {

  // const fetchInfo = () => {
  //   console.log("Hello")
  //   axios.get('/travel/exps/allexp')
  //     .then(res => {
  //       console.log(res)
  //     })
  // } 

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/signin' element={ <Signin /> } />
        <Route path='/Signup' element={ <Signup /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/travels' element={ <TravelExperiences /> } />
        <Route path='/addtravel' element={ <Post_travel /> } />
        <Route path='/imgupload' element={ <ImageUpload /> } />
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
