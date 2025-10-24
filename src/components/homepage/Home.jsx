import React from "react";

import BannerSlider from "../shared/BannerSlider";
import Volunteer from "../../section/Volunteer";
import VolunteerNeedsNow from "../../section/VolunteerNeedsNow";
import Section2 from "../../section/Section2";
import HowItWorks from "../utilities/HowItWorks";
import Statistics from "../utilities/Statistics";

const Home = () => {
  return (
    <div>
      <BannerSlider></BannerSlider>
      <VolunteerNeedsNow></VolunteerNeedsNow>
      <Section2></Section2>
      <HowItWorks></HowItWorks>
      <Statistics></Statistics>
      <Volunteer></Volunteer>
    </div>
  );
};

export default Home;
