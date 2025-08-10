import React from "react";

import BannerSlider from "../shared/BannerSlider";
import Volunteer from "../../section/Volunteer";
import VolunteerNeedsNow from "../../section/VolunteerNeedsNow";
import Section2 from "../../section/Section2";

const Home = () => {
  return (
    <div>
      <BannerSlider></BannerSlider>
      <VolunteerNeedsNow></VolunteerNeedsNow>

      <Volunteer></Volunteer>
      <Section2></Section2>
    </div>
  );
};

export default Home;
