import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard';

function App() {

  const fetchInfo = () => {
    console.log("Hello")
    axios.get('/travel/exps/allexp')
      .then(res => {
        console.log(res)
      })
  } 

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/signin' element={ <Signin /> } />
        <Route path='/Signup' element={ <Signup /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
