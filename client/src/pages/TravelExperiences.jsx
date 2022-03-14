import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

  

const TravelExperiences = () => {

    const [datas, setdata] = useState([]);

    useEffect( async () => {
        try {
            const res = await axios.get('/travel/exps/allexp')
            setdata(res.data)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
      },[]);

  return (
      < div className='container mt-5'>
        {datas.length !== 0 ? 
          datas.map(data => 
          <div className="services">
            <div className="row">
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up" key={data._id}>
                <div className="icon-box icon-box-pink">
                  <img src="/logo192.png" alt="" />
                    <h4 className="title"><a href="">{data.location}</a></h4>
                  <p className="description">Cost of travel: {data.cost}</p>
                  <p className="description">Post by: {data.user.name}</p>
                </div>
              </div>
            </div>
          </div>
            )
          : 
          <Backdrop sx={{ color: '#002141', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        }
    </div>
  )
}

export default TravelExperiences