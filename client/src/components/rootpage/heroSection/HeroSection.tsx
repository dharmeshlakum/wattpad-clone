import "../../../css/rootpage.css";
import React from "react";
import heroDevice from "../../../assets/hero-devices.png";

const TopHeroSection: React.FC = () => {

    return (
        <div className="top-hero-section">
            <div className="top-hero-content">
                <div className="hero-data-section">
                    <h2>Hi, we're Wattpad.</h2>
                    <h3>The world's largest storytelling community</h3>
                    <h4>Home to 97 million people¹ who spend over 26 billion minutes a month engaged in original stories, Wattpad has democratized storytelling for a new generation of diverse Gen Z writers and their fans.</h4>
                    <p>¹As of July 2023</p>
                    <div className="btn-container">
                        <button>Start Reading</button>
                        <button>Start Writing</button>
                    </div>
                </div>
                <div className="hero-img-section">
                    <img src={heroDevice} alt="" />
                </div>
            </div>
        </div>
    )
}

export default TopHeroSection;