import React from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Descriptions from "../components/Descriptions";
import Testimonials from "../components/Testimonials";
import GenerateBtn from "../components/GenerateBtn";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Descriptions />
      <Testimonials />
      <GenerateBtn />
    </div>
  );
};

export default Home;
