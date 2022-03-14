import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const historyRoute = useNavigate();
  // location.reload()
  const addTravel = () => {
    historyRoute(`/addtravel`)
  }
  return (
    <div className='container'>
      <div style={{ display:'flex', justifyContent: 'space-between'}}>
        <div></div>
        <button onClick={ addTravel } className="btn btn-light mr-2" id='addBtn'>Add Travel Experience <i className='fa fa-plus'></i></button>
      </div>
      
    </div>
  )
}

export default Dashboard