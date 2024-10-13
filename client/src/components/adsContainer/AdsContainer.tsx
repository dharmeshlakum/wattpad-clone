import "../../css/adsContainer.css";
import React from "react";
import { Link } from "react-router-dom";
import adsImage from "../../assets/ads01.png";

const AdsContainer: React.FC = () => {

    return (
        <div className="ads-container">
            <div className="ads-sticky">
                <div id="ads-container-wraper">
                    <div className="ads-item">
                        <Link to={"/"} className="link-class">
                            <img src={adsImage} alt="adImage" height={600} width={160} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdsContainer;