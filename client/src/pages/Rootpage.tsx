import "../css/rootpage.css"
import React from "react";
import { Link } from "react-router-dom";
import TopHeroSection from "../components/rootpage/heroSection/HeroSection";
import StudioSection from "../components/rootpage/studioSection/StudioSection";
import WorkSection from "../components/rootpage/workSection/WorkSection";
import SliderSection from "../components/rootpage/sliderSection/SliderSection";
import DiscoverSection from "../components/rootpage/discoverSection/DiscoverSection";
import BottomHeroSection from "../components/rootpage/bottomHeroSection/BottomHeroSection";
import Partnership from "../components/rootpage/partnership/Partnership";

const RootPage: React.FC = () => {

    return (
        <>
            <div className="blank-space-container" style={{ height: "54px", width: "100%" }}></div>
            <TopHeroSection/>
            <StudioSection />
            <div className="findout">
                <Link to={"/"} className="findout-link">
                    <h4>Find out more about what we do for writers  →</h4>
                </Link>
            </div>
            <WorkSection />
            <SliderSection />
            <DiscoverSection />
            <Partnership />
            <BottomHeroSection />
            <div className="blank-space"></div>
        </>
    )
}

export default RootPage;