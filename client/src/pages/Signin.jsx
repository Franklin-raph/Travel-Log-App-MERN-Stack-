import React,{ useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { useCookies } from 'react-cookie';

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("")

    const historyRoute = useNavigate()

    

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        },7000)

        if(email === "" && password === ""){
            setError("Please fill in all fields")
        }

        try {
            const body = {email, password}
            const res = await axios.post('/auth/signin', body)
            const data = await res.data
            localStorage.setItem('jwt', JSON.stringify(data))
            console.log(data)
            historyRoute(`/dashboard`)
        } catch (error) {
            setError("Incorrect Credentials")
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
                    <p className='bg-danger text-light'>{error}</p>
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
                        <button type="submit" id='loginBtn' className="form-control mt-3" onClick={ handleLogin } disabled={loading}>
                            {loading && (
                                <span 
                                className='spinner-border spinner-border-sm'
                                role='status'
                                aria-hidden='true'
                                />
                            )}
                            Login
                        </button>
                </div>
            </form>
            </div>
        </div>
    </>
  )
}

export default Signin