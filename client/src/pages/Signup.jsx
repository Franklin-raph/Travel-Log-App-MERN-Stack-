import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { useCookies } from 'react-cookie';

const Signup = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")

    const historyRoute = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()

        if(password !== password1){
            console.log("Error")
        }else{
            try {
                const body = {name, email, password}
                const res = await axios.post('/auth/signup', body)
                const data = await res.data
                localStorage.setItem('jwt', JSON.stringify(data))
                console.log(data)
                historyRoute(`/dashboard`)
            } catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <>
    <div className="container formWidth" style={{marginTop:'3rem'}}>
        <div className="card card-body">
            <div className="text-center">
                <h3>Login</h3>
                <i className="fas fa-user-circle" style={{fontSize: '3rem'}}></i>
            </div>
        <form  onSubmit={ handleSignup }>
            <div className="form-group">
                
                <label className="mt-3">Name</label>
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
                    
                    <input type="submit" value="Login" className="form-control btn-dark mt-3"/>
                    {/* <button type="submit" onClick={ () => { dispatch(login(email,password)) } } className="formControl btn-dark mt-3">Login</button> */}
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default Signup