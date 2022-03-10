import React,{ useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { useCookies } from 'react-cookie';

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const historyRoute = useNavigate()

    

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const body = {email, password}
            const res = await axios.post('/auth/signin', body)
            const data = await res.data
            localStorage.setItem('jwt', JSON.stringify(data))
            console.log(data)
            historyRoute(`/dashboard`)
        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <>
    <div className="container formWidth" style={{marginTop: '3rem'}}>
        <div className="card card-body">
            <div className="text-center">
                <h3>Login</h3>
                <i className="fas fa-user-circle" style={{fontSize: '3rem'}}></i>
            </div>
        <form  onSubmit={handleLogin}>
            <div className="form-group">
                
                <label className="mt-3">Email</label>
                <input type="email" 
                    placeholder="test@test.com" 
                    className="form-control" 
                    name="email" 
                    required 
                    onChange={e => setEmail(e.target.value)}
                    />
    
                <label className="mt-3">Password</label>
                <input type="password" 
                    placeholder="****" 
                    className="form-control" 
                    name="password"  
                    required 
                    onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="form-control btn-dark mt-3" onClick={ handleLogin } disabled={loading}>
                        {loading && (
                            <span 
                            className='spinner-border spinner-border-sm'
                            role='status'
                            aria-hidden='true'
                            />
                        )}
                        Login
                    </button>
                    {/* { loading ? "" : <ReactBootstrap.Spinner animation="border" />  } */}
                    {/* <input  onClick={() => setLoading(true)}/> */}
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default Signin