import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import BannerSlider from '../shared/BannerSlider';
import Volunteer from '../../section/Volunteer';
import VolunteerNeedsNow from '../../section/VolunteerNeedsNow';


const Home = () => {
    return (
        <div>
            < Navbar>
            </Navbar>
            < BannerSlider>
            </BannerSlider>
            < VolunteerNeedsNow></VolunteerNeedsNow>
           
            < Volunteer></Volunteer>
            < Footer>
            </Footer>
        </div>
    );
};

export default Home;