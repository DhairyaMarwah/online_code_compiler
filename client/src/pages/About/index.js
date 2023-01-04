import React from "react";
import Lottie from "lottie-react"; 
import * as animationData from "../../animation/121585-computer-programming (1).json";
function About() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
  return (
    <div className="about-page">
      <h1>About Codeops</h1>
      <div className="about-lottie">
          <Lottie animationData={animationData} />
        </div>
      <p>
        There have been a number of online code compilers developed in the past,
        and they have been widely used by developers and students as a
        convenient and efficient tool for writing and testing code. <br /> <br /> These
        compilers often support a range of programming languages and offer
        features such as syntax highlighting, error reporting, and code
        completion.There is a strong demand for online code compilers, and my
        online code compiler web app is well-suited to meet this demand. <br /> <br /> One of
        the main advantages of my app is its wide range of supported programming
        languages. By supporting a variety of languages, the app is able to
        cater to a diverse audience of developers and students, and is able to
        support a wide range of use cases. Another key strength of the app is
        its simplicity and ease of use. <br /> <br /> The app has a user-friendly interface
        that allows users to quickly input and submit their code, and includes
        helpful features such as syntax highlighting and error reporting to
        assist users in writing and syntaxing their code. In addition, the app
        is fast and efficient, and is able to compile and execute code quickly
        and with minimal latency. This makes it a convenient and efficient tool
        for testing and developing code.
      </p>
    </div>
  );
}
export default About;
