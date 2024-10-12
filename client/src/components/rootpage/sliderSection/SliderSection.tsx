import "../../../css/rootpage.css";
import React, { useEffect, useState } from "react";
import walterBoys from "../../../assets/books/walter-boys.png";
import blackEyes from "../../../assets/books/black-eye.png";
import whiteStage from "../../../assets/books/white-stag.png";
import feather from "../../../assets/books/feather.png";
import chasingRed from "../../../assets/books/chasing-red.png";
import { Link } from "react-router-dom";

const SliderSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(4) // state to manage the number of the array index
    const bookInfo = [
        {
            id: "01",
            img: walterBoys,
            quato: "When I joined Wattpad, I gained a second family who were as passionate about reading and writing as I am.",
            writer: "ALI NOVAK (@FALLZSWIMMER)",
            description: "Ali Novak is a Wisconsin native and a graduate of the University of Wisconsin-Madison's creative writing program. She started writing her debut novel My Life with the Walter Boys when she was only fifteen. Since then, her work has received more than 150 million hits online and My Life with the Walter Boys has been optioned for television by Komixx Entertainment and Sony Pictures Television.",
            link: "/"
        },
        {
            id: "02",
            img: blackEyes,
            quato: "Being a Wattpad Star is the foundation for everything I do as a writer, from the behind the scenes wrangling to the big, game-changing projects.",
            writer: "BEN SOBIECK (@BENSOBIECK)",
            description: "Benjamin Sobieck is a Wattpad Star and editor of “The Writer’s Guide to Wattpad,” published in August 2018 by Writer’s Digest Books and featuring contributions by 23 Wattpad Stars, ambassadors, and staff. His stories on Wattpad, such as “When the Black-Eyed Children Knock,” have drawn more than 1.5 million reads.",
            link: "/"
        },
        {
            id: "03",
            img: whiteStage,
            quato: "Working with Wattpad Studios is like a dream. Not only do they care about your success, but also staying true to your vision.",
            writer: "KARA BARBIERI (@PANDEAN)",
            description: "Kara Barbieri is a twenty-two year old author with a love for the weird and mystic. Her debut novel, WHITE STAG, will be published by Wednesday Books/Macmillan in January 2019.",
            link: "/"
        },
        {
            id: "04",
            img: feather,
            quato: "Having been active on Wattpad for several  years, I knew it would be the perfect platform for a thriller with lots of cliffhangers for readers to discuss. Teen horror is my passion, so I can’t wait to be able to share Light as a Feather with other horror aficionados on Hulu.",
            writer: "ZOE AARSEN (@ZAARSENIST)",
            description: "Zoe Aarsen is a graphic designer and copywriter. Her first paranormal YA novel, Light as a Feather, Stiff as a Board, is being published by Simon & Schuster and turned into a television series on Hulu.",
            link: "/"
        },
        {
            id: "05",
            img: chasingRed,
            quato: "The Wattpad Stars Program gave me opportunities I never thought possible. It connected me to a world that I had only imagined. I don’t know how else to say it. It changed my life!",
            writer: "ISABELLE RONIN (@ISABELLERONIN)",
            description: "Chasing Red was one of 2016’s most-read stories on Wattpad -- and that was just the beginning for this Winnipeg-Manitoba-based writer. In a single year, her explosive hit has racked up over 127 million reads on Wattpad. Newly edited and expanded, the book was split into two and hit bookstore shelves in 2017.",
            link: "/"
        }
    ];

    // upgrade the slider index in every 3 second
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bookInfo.length);
        }, 3000);
    
        return () => clearTimeout(timer); 
        // eslint-disable-next-line
    }, [currentIndex]);

    // function to handle the click on the next button
    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bookInfo.length);
    }

    return (
        <div className="book-slider-section">
            <div className="slider-inner-main-container">
                <div className="slider-container">
                    {/* slider contoller button */}
                    <div className="next-arrow-btn-container">
                        <div className="slider-controller-btn">
                            <button onClick={handleNextClick}>
                                <img src="https://www.wattpad.com/wp-web-assets/images/landing/carousel/next-btn.svg" alt="" />
                            </button>
                        </div>
                    </div>
                    {/* slider indicater bar */}
                    <div className="slider-indicater-bar">
                        <div className="slider-controller-bar">
                            <div className="slider-contoller-list">
                                <div className={`slider-conroller-item ${currentIndex === 0 ? "conroller-opacity" : ""}`} onClick={() => setCurrentIndex(0)}></div>
                                <div className={`slider-conroller-item ${currentIndex === 1 ? "conroller-opacity" : ""}`} onClick={() => setCurrentIndex(1)}></div>
                                <div className={`slider-conroller-item ${currentIndex === 2 ? "conroller-opacity" : ""}`} onClick={() => setCurrentIndex(2)}></div>
                                <div className={`slider-conroller-item ${currentIndex === 3 ? "conroller-opacity" : ""}`} onClick={() => setCurrentIndex(3)}></div>
                                <div className={`slider-conroller-item ${currentIndex === 4 ? "conroller-opacity" : ""}`} onClick={() => setCurrentIndex(4)}></div>
                            </div>
                        </div>
                    </div>
                    {/* slider book item container */}
                    <div className="sliding-book-container">
                        <div className="sliding-book-inner-container">
                            <div className="sliding-book-item">
                                <div className="slide-item-inner">
                                    <Link to={bookInfo[currentIndex].link} className="slider-link">
                                        <img src={bookInfo[currentIndex].img} alt="book" />
                                    </Link>
                                    <div className="book-info-container">
                                        <div className="quato-section">
                                            <p className="quto">{bookInfo[currentIndex].quato}</p>
                                            <p className="author-name">{bookInfo[currentIndex].writer}</p>
                                        </div>
                                        <p className="book-description">{bookInfo[currentIndex].description}</p>
                                        <Link to={bookInfo[currentIndex].link} className="link-slider-style">
                                            <button>Start Reading</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderSection;