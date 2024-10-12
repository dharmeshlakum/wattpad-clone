import "../../../css/rootpage.css";
import React from "react";
import device from "../../../assets/footer-devices.png"

const BottomHeroSection: React.FC = () => {

    return (
        <div className="bottom-hero-section">
            <div className="bottom-hero-inner-container">
                <h3>Take Wattpad With You</h3>
                <p>Read and write anywhere, even offline.</p>
                <div className="hero-btn-container">
                    <button>Start Reading</button>
                    <button>Start Writing</button>
                </div>
                <img src={device} alt="" />
            </div>
        </div>
    )
}

export default BottomHeroSection;