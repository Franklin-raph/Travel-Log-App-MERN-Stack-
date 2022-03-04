import React, { useState } from 'react'
import axios from 'axios'

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();

        try{
          const newUser = { email, password }
          console.log(newUser)
          // const config = {
          //   headers: {
          //     "Content-Type": 'application/json'
          //   }
          // }
  
          const body = JSON.stringify(newUser)
  
          const res = await axios.post('/auth/signin', body);
          console.log(res)

        }catch(err){
          console.log(err)
          console.log(err.message)
        }
    }

    const show = async () => {
      try {
        const res = await axios.get('http://localhost:9000/travel/exps/allexp')
        console.log(res)
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
      <form onSubmit={ handleSignIn }>
        <input type="text" name="" id="" value={ email } 
        onChange={e => setEmail(e.target.value)}/>
        <input type="password" name="" id="" value={ password } 
        onChange={e => setPassword(e.target.value)}/>
        <button type='submit'>sigin</button>
      </form>
      <button onClick={ show }>Show travels</button>
    </div>
    
  )
}

export default SignIn