import React,{ useEffect, useState } from 'react'
import axios from 'axios'

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
      <>
        <ul>
            {
          datas.map(data => <li key={data._id}>{data.location}</li>)
            // <div className="container services">
            //     <div className="row">
            //     <div className="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up">
            //         <div className="icon-box icon-box-pink">
            //         <img src="/logo192.png" alt="" />
            //         <h4 className="title"><a href="">{data.location}</a></h4>
            //         <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
            //         </div>
            //     </div>


            //     </div>
            // </div>
            

                
            }
        </ul>
    </>
  )
}

export default TravelExperiences