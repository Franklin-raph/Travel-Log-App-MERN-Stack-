import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  const historyRoute = useNavigate()
  const [error, setError] = useState("")

  const getTravels = async () => {
    try {
      const res = await axios.get('/travel/exps/allexp')
      historyRoute(`/travels`)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
    
  }

  const addExp = () => {
    const localStorageItem = localStorage.getItem("jwt")
    if(localStorageItem) {
      historyRoute(`/addtravel`)
    } else {
      historyRoute(`/`)
      setError("Please signin in order to add a travel experience")
    }

  }

  return (
    <>
        {/* <!-- ======= Hero Section ======= --> */}
  <section id="hero" className="d-flex justify-cntent-center align-items-center">
    <div id="heroCarousel" className="container carousel carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
      {/* <!-- Slide 1 --> */}
      <div className="carousel-item active">
        <div className="carousel-container">
          <p className='bg-danger'>{error}</p>
          <h2 className="animate__animated animate__fadeInDown">Share your travel experiences</h2>
          {/* <p className="animate__animated animate__fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p> */}
          <button className="btn-get-started animate__animated animate__fadeInUp" onClick={ getTravels } >View people's tarvel Experience</button>
          <button className="btn-get-started animate__animated animate__fadeInUp" onClick={ addExp } >Add tarvel Experience</button>
        </div>
      </div>

      {/* <!-- Slide 2 --> */}
      <div className="carousel-item">
        <div className="carousel-container">
          <h2 className="animate__animated animate__fadeInDown">Lorem Ipsum Dolor</h2>
          <p className="animate__animated animate__fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
          <a href="" className="btn-get-started animate__animated animate__fadeInUp">Read More</a>
        </div>
      </div>

      {/* <!-- Slide 3 --> */}
      <div className="carousel-item">
        <div className="carousel-container">
          <h2 className="animate__animated animate__fadeInDown">Sequi ea ut et est quaerat</h2>
          <p className="animate__animated animate__fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
          <a href="" className="btn-get-started animate__animated animate__fadeInUp">Read More</a>
        </div>
      </div>

      <a className="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon bx bx-chevron-left" aria-hidden="true"></span>
      </a>

      <a className="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon bx bx-chevron-right" aria-hidden="true"></span>
      </a>

    </div>
  </section>
  {/* <!-- End Hero --> */}
    </>
  )
}

export default Home