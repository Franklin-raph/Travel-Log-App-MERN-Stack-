import React, { useState } from 'react'
import axios from 'axios'

const Post_travel = () => {

    const [location, setLocation] = useState("")
    const [places, setPlaces] = useState("")
    const [heritage, setHeritage] = useState("")
    const [communityAccess, setCommunity] = useState("")
    const [cost, setCost] = useState("")

    const [error, setError] = useState("")

    const [loading, setLoading] = useState(false)

    const submitTravel = async (e) => {
        e.preventDefault()
        try{
            if(location === "" && places === "" && heritage === "" && communityAccess === "" && cost === ""){
                setError("Please fill up all fields")
            }else{
                const body = { location, places, heritage, communityAccess, cost }
                await axios.post('/travel/exps/add', body)
            }

        }catch(error){
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
            <form>
                <div className="form-group">
                    
                    <label className="mt-3">Location</label>
                    <input type="text" 
                        placeholder="Washinton DC" 
                        className="form-control" 
                        name="location" 
                        required 
                        onChange={e => setLocation(e.target.value)}
                        />
        
                    <label className="mt-3">Places</label>
                    <input type="text" 
                        placeholder="America, England" 
                        className="form-control" 
                        name="places"  
                        required 
                        onChange={e => setPlaces(e.target.value)}
                        />

                    <label className="mt-3">Heritage</label>
                    <input type="text" 
                        placeholder="heritage" 
                        className="form-control" 
                        name="places"  
                        required 
                        onChange={e => setHeritage(e.target.value)}
                        />

                    <label className="mt-3">Community Access</label>
                    <input type="text" 
                        placeholder="Free" 
                        className="form-control" 
                        name="communityAccess"  
                        required 
                        onChange={e => setCommunity(e.target.value)}
                        />

                    <label className="mt-3">Cost</label>
                    <input type="text" 
                        placeholder="$1000" 
                        className="form-control" 
                        name="cost"  
                        required 
                        onChange={e => setCost(e.target.value)}
                        />
                        <button type="submit" id='loginBtn' className="form-control mt-3" onClick={ submitTravel } disabled={loading}>
                            {loading && (
                                <span 
                                className='spinner-border spinner-border-sm'
                                role='status'
                                aria-hidden='true'
                                />
                            )}
                            Add<i className='fa fa-plus'></i>
                        </button>
                </div>
            </form>
            </div>
        </div>
    </>
  )
}

export default Post_travel