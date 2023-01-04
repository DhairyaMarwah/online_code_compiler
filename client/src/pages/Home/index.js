import React, { useState } from "react";
// import Lottie from "react-lottie";
import Lottie from "lottie-react";
import { Routes, Route,Navigate, useNavigate } from "react-router-dom"; 
import * as animationData from "../../animation/10801-deployment.json";
import * as animationData2 from "../../animation/109119-coding-slide.json";
const Home = () => {
    const navigate = useNavigate();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
  return (
    <>
    
      <div className="landing">
        <div className="landing-text">
          <h1>
            Say goodbye to setup headaches with our convenient online compiler
          </h1>
          <p>
            Our online compiler makes it easy to write, test, and debug code in
            any language, without the hassle of installing or setting up
            anything. Simply start coding and let our powerful platform handle
            the rest.
          </p>
          <div className="btns">
            <button onClick={()=>{ navigate("/compiler") }} className="primary-btn">Get Started</button>
            <button onClick={()=>{ navigate("/about") }} className="secondary-btn">Read More</button>
          </div>
        </div>
        <div className="lottie">
          <Lottie animationData={animationData} />
        </div>
      </div>
      <div className="features">
        <div className="features-text">

        <h1>Languages Supported</h1>
        <p>Our online code compiler supports a wide range of programming languages, including popular ones like C, C++, Java, Python, and Ruby. Whether you're working on a simple script or a complex application, our platform has everything you need to write, test, and debug code in any language</p>
        </div>
        <div className="features-lottie">
        <Lottie animationData={animationData2} />
        </div>
      </div>
    </>
  )
}

export default Home