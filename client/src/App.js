import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/signin' element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
