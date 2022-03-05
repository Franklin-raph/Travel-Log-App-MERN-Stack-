import './App.css';
import axios from 'axios'

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
      <button onClick={ fetchInfo }>Fetch data</button>
      <div className="btn btn-secondary">Hello</div>
    </>
  );
}

export default App;
