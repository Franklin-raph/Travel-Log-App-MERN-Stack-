import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [error, setError] = useState("")

    const [loading, setLoading] = useState(false)

    const historyRoute = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        },5000)

        if(email === "" && name === "" && password === "" && password1 === ""){
            setError("Please fill up all fields")
        }else if (password !== password1){
            setError("Passwords do not match")
        }else if(password.length < 6){
            setError("Password length should be at least 6 characters long")
        }else {
            setLoading(true)
            try {
                const body = {name, email, password}
                const res = await axios.post('/auth/signup', body)
                console.log(res)
                const data = await res.data
                localStorage.setItem('jwt', JSON.stringify(data))
                console.log(data)
                historyRoute(`/dashboard`)
            } catch (error) {
                setError("Email or Username already exists")
                console.log(error)
            }
        }
    }

  return (
    <>
    <div className="container formWidth" style={{marginTop:'3rem'}}>
        <div className="card card-body">
            <div className="text-center">
                <h3>Sign Up</h3>
                <i className="fas fa-user-circle" style={{fontSize: '3rem'}}></i>
                <p className='bg-danger text-light mt-2'>{error}</p>
            </div>
        <form  onSubmit={ handleSignup }>
            <div className="form-group">
                
                <label className="mt-3">Username</label>
                <input type="text" 
                    placeholder="test@test.com" 
                    className="form-control" 
                    name="name" 
                    required 
                    onChange={e => setName(e.target.value)}
                    />

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

                <label className="mt-3">Password</label>
                <input type="password" 
                    placeholder="****" 
                    className="form-control" 
                    name="password1"  
                    required 
                    onChange={e => setPassword1(e.target.value)}
                    />
                    <button type="submit" className="form-control mt-3" id='loginBtn' onClick={ handleSignup } disabled={loading}>
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

export default Signup