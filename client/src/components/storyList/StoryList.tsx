import "../../css/storyList.css";
import React, { useState } from "react";
import AdsContainer from "../adsContainer/AdsContainer";
import { useParams, Link } from "react-router-dom";
import img from "../../assets/230779971-144-k856253.jpg";

const StoryList: React.FC = () => {
    const { storyName } = useParams();
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("New");
    const bookList = [
        {
            id: 1,
            link: "/story/tera",
            image: img,
            title: "The Second Short",
            descrition: "The story of two souls who have experienced utmost love as well as heartbreak. What happens when two of them collide accidently? Will they heal each other or Will their...",
            complete: true,
            mature: false,
            tags: ["dhe", "jfk", "jkf", "india", "dhj"],
            writer: "users",
            writerLink: "/",
            readCount: "34k",
            voteCont: "1.4K",
            partCount: 13
        },
    ]

    // function to capitlize the first word
    const capitlizeFN = (name: string | undefined): string => {
        if (!name) {
            return "Unknown Stories";
        }

        const capitlize = name[0].toUpperCase() + name.slice(1).toLowerCase() + " Stories";
        return capitlize;

    }
    // tag list
    const tagLinks = [
        { link: "/hello", title: "wattpadoriginals" },
        { link: "/hello", title: "moran" },
        { link: "/hello", title: "manan" },
    ]

    return (
        <div className="story-list-container">
            <div id="browse-container">
                <div className="list-inner-container">
                    {/* header section */}
                    <header className="list-header-section">
                        <h1>{capitlizeFN(storyName)}</h1>
                    </header>
                    {/* tag section container */}
                    <div className="tag-section">
                        <div className="refine-by-tag">Refine by tag:</div>
                        <div className="tag-list">
                            <div className="tag-carousel">
                                <div className="tag-item">
                                    {tagLinks.map((element, index) => (
                                        <Link to={element.link} className={`tag-link ${storyName === element.title ? "activeLink" : ""}`} key={index}>
                                            <span>{element.title}</span>
                                            <span className="story-plus-tag">{storyName !== element.title ? "+" : ""}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* story list container */}
                    <div className="story-list-data-container">
                        <div className="story-header">
                            <div className="panel-heading">
                                <h4>1.2K Stories</h4>
                                <div className="btn-filter">
                                    <button onClick={() => setDropdown(!dropdown)}>
                                        <span>Sort by: {filter}</span>
                                        <span className="down-arrow"></span>
                                    </button>
                                    {dropdown &&
                                        <ul className="filter-list">
                                            <li>
                                                <Link className="filter-link" to={`/stories/${storyName}/new`} >
                                                    Hot
                                                    {filter === "Hot" &&
                                                        <span className="true-mark">
                                                            <i className="fa-regular fa-circle-check"></i>
                                                        </span>
                                                    }
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="filter-link" to={`/stories/${storyName}/new`} >
                                                    New
                                                    {filter === "New" &&
                                                        <span className="true-mark">
                                                            <i className="fa-regular fa-circle-check"></i>
                                                        </span>
                                                    }
                                                </Link>
                                            </li>
                                        </ul>
                                    }
                                </div>
                            </div>
                        </div>
                        <main className="story-item-list-container">
                            <div className="browse-result-story">
                                <article id="story-item-article">
                                    {bookList.map((value, index) => (
                                        <div className="story-item-data" key={index}>
                                            <div className="component-story-wraper">
                                                <div className="story-item">
                                                    <Link to={value.link} className="story-image-link">
                                                        <div className="img-wraper-container">
                                                            <img src={value.image} alt="" />
                                                        </div>
                                                    </Link>
                                                    <div className="story-content">
                                                        <Link to={value.link} className="story-dec-link" >{value.title}</Link>
                                                        <Link to={value.writerLink} className="story-write-link"> by {value.writer}</Link>
                                                        <div className="meta-social-data">
                                                            <span className="read-count">
                                                                <i className="fa-solid fa-eye"></i>
                                                                {value.readCount}
                                                            </span>
                                                            <span className="vote-count">
                                                                <i className="fa-solid fa-star"></i>
                                                                {value.voteCont}
                                                            </span>
                                                            <span className="part-count">
                                                                <i className="fa-solid fa-list"></i>
                                                                {value.partCount}
                                                            </span>
                                                        </div>
                                                        <div className="story-description">{value.descrition}</div>
                                                        <div className="bottom-story-data">
                                                            {value.complete &&
                                                                <div className="story-status">
                                                                    <span>Complete</span>
                                                                </div>
                                                            }
                                                            <div className="tag-story-data"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </article>
                            </div>
                        </main>
                    </div>
                </div>
                <AdsContainer />
            </div>
        </div>
    )
}

export default StoryList