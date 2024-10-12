import React from "react";
import { Link } from "react-router-dom";

const Partnership: React.FC = () => {

    return (
        <div className="partnership-container">
            <img src="https://www.wattpad.com/wp-web-assets/images/landing/company-logo.svg" alt="logo" className="partnership-logo" />
            <div className="partnership-data-container">
                <img src="	https://www.wattpad.com/wp-web-assets/images/landing/brand-partnerships-logo.svg" alt="" />
                <h2>The world’s most positive platform for brands to engage Gen Z.</h2>
                <p>If you’re a business, click below to learn more.</p>
                <Link to={"/"} className="learn-more">Learn More</Link>
            </div>
        </div>
    );
}

export default Partnership;