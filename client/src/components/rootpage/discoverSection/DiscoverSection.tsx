import "../../../css/rootpage.css";
import { Link } from "react-router-dom";
import React from "react";
import writingContest from "../../../assets/discoverPosters/writing-contests.png";
import wattys from "../../../assets/discoverPosters/wattys_avatar.png";
import wattpadPic from "../../../assets/discoverPosters/wp-picks.png";

const DiscoverSection: React.FC = () => {

    const discoverData = [
        {
            id: "01",
            link: "/",
            img: writingContest,
            title: "Writing Contests",
            description: "Enter writing contests to get published, win awards, and partner with global brands."
        },
        {
            id: "02",
            link: "/",
            img: wattys,
            title: "The Wattys",
            description: "Wattpad’s annual awards program committed to celebrating the best stories around the world."
        },
        {
            id: "03",
            link: "/",
            img: wattpadPic,
            title: "Wattpad Picks",
            description: "Get featured on our hand-picked reading list."
        }
    ]

    return (
        <div className="discover-section">
            <div id="get-dicoverd">
                <div className="content-section-discover">
                    <h3>Get Discovered</h3>
                    <div className="discover-containers">
                        {discoverData.map((value, index) => (
                            <Link to={value.link} key={index} className="discover-links">
                                <div className="discover-img-section">
                                    <img src={value.img} alt="" />
                                </div>
                                <div className="discover-content-section">
                                    <h4>{value.title}</h4>
                                    <p>{value.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscoverSection;