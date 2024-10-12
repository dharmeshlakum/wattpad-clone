import "../../../css/rootpage.css";
import React from "react";
import studioPoster from "../../../assets/studiosPoster.png";
import bookPoster from "../../../assets/booksPoster.png";

const StudioSection: React.FC = () => {
    const storyItem = [
        { img: "https://www.wattpad.com/wp-web-assets/images/landing/tv-icon.svg", alt: "tv-icon", text: "Get produced to movie or film" },
        { img: "https://www.wattpad.com/wp-web-assets/images/landing/reel-icon.svg", alt: "reel-icon", text: "Get adapted to a TV series" },
        { img: "https://www.wattpad.com/wp-web-assets/images/landing/book-icon.svg", alt: "book-icon", text: "Get published" }
    ]

    return (
        <div className="studio-section">
            <div className="see-your-stories">
                <h3>See Your Story...</h3>
                <div className="see-story-content">
                    {storyItem.map((value, index) => (
                        <div className="see-story-item" key={index}>
                            <img src={value.img} alt={value.alt} />
                            {value.text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="studio-data-container">
                <div>
                    <img src={studioPoster} width={414} alt="studio poster" />
                </div>
                <div className="data-studio-inner-container">
                    <img src="https://www.wattpad.com/wp-web-assets/images/landing/wattpadStudiosLogo.svg" alt="stuio logo" />
                    <h3>Your original story could be the next big hit</h3>
                    <p>Wattpad Studios discovers untapped, unsigned, and talented writers on Wattpad and connects them to global multi-media entertainment companies.</p>
                    <p>Wattpad Studios works with partners such as:</p>
                    <img src="https://www.wattpad.com/wp-web-assets/images/landing/sony.svg" width={31} alt="sony-logo" />
                    <img src="https://www.wattpad.com/wp-web-assets/images/landing/hulu.svg" width={61} alt="hulu-logo" />
                    <img src="https://www.wattpad.com/wp-web-assets/images/landing/syfy.svg" width={81} alt="syfy-logo" />
                </div>
            </div>
            <div className="studio-data-container book-stuio-margin">
                <div className="data-studio-inner-container book-container">
                    <img src="https://www.wattpad.com/wp-web-assets/images/landing/wattpadBooksLogo.svg" alt="stuio logo" />
                    <h3>Your voice belongs on bookshelves</h3>
                    <p>Wattpad Books aspires to recognize and reflect diverse voices by taking Wattpad stories to published book and onto bookshelves around the world.</p>
                    <p>Wattpad Books works with partners such as:</p>
                    <img src="https://www.wattpad.com/wp-web-assets/images/landing/macmillan.png" width={110} alt="Macmilin" />
                    <img src="https://www.wattpad.com/wp-web-assets/images/landing/anvil.png" width={87} alt="anvil" />
                    <img src="https://www.wattpad.com/wp-web-assets/images/landing/penguin.png" width={97} alt="penguin" />
                </div>
                <div>
                    <img src={bookPoster} width={348} alt="studio poster" />
                </div>
            </div>
        </div>
    )
}

export default StudioSection;