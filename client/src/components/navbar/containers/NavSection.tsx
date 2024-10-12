import "../../../css/navbar.css"
import React from "react";
import { Link } from "react-router-dom";
import navbarLogo from "../../../assets/navbar-logo.png";
import { DropdownTypes } from "../Navbar";

// interface to define the props types
interface PropsType {
    dropdown: DropdownTypes;
    handleDropdown: (option: string) => void;
    handleNavigate: (link: string) => void;
}

const NavSection: React.FC<PropsType> = ({ dropdown, handleDropdown, handleNavigate }) => {
    const browseLeftLinks = [
        { link: "/stories/wattpadoriginals", title: "Wattpad Originals" },
        { link: "/stories/romance", title: "Romance" },
        { link: "/stories/lgbt", title: "LGBTQ+" },
        { link: "/stories/werewolf", title: "Werewolf" },
        { link: "/stories/newadult", title: "New Adult" },
        { link: "/stories/fantasy", title: "Fantasy" },
        { link: "/stories/fanfiction", title: "Fanfiction" },
        { link: "/stories/shortstory", title: "Short Story" },
        { link: "/stories/teenfiction", title: "Teen Fiction" },
        { link: "/stories/historicalfiction", title: "Historical Fiction" },
        { link: "/stories/paranormal", title: "Paranormal" },
        { link: "/list/", title: "Editor's Picks" },
        { link: "/stories/humor", title: "Humor" },
        { link: "/stories/horror", title: "Horror" },
        { link: "/stories/contemporarylit", title: "Contemporary Lit" },
        { link: "/stories/diverselit", title: "Diverse Lit" },
        { link: "/stories/mystery", title: "Mystery" },
        { link: "/stories/thriller", title: "Thriller" },
        { link: "/stories/sciencefiction", title: "Science Fiction" },
        { link: "/user/theWatty", title: "The Wattys" },
        { link: "/stories/advanture", title: "Adventure" },
        { link: "/stories/nonfiction", title: "Non-Fiction" },
        { link: "/stories/poetry", title: "Poetry" }
    ];
    const browseRightLinks = [
        { link: "/", title: "Reading Radar" },
        { link: "/", title: "Engaged to Danger 💍🔥" },
        { link: "/", title: "Haunting Pasts 👻" },
        { link: "/", title: "Wattpad WEBTOON Studios Hits ⭐" },
        { link: "/", title: "Premium Picks" }
    ];
    const communityLinks = [
        { link: "/", title: "The Watty Awards" },
        { link: "/", title: "Community Happenings" },
        { link: "/", title: "Wattpad Ambassadors" }
    ];

    return (
        <nav className="navbar-nav">
            <ul className="navbar-list">
                <li className="navbar-image">
                    <Link to={"/"} className="navbar-img-link">
                        <img src={navbarLogo} alt="navbar-logo" width={126} height={27} />
                    </Link>
                </li>
                <li className="nav-option-list">
                    <div id="discover-dropdown" className="dorpdown-btn-conatiner">
                        <button className="drop-down-btn" onClick={() => handleDropdown("browse")}>Browse</button>
                        {dropdown.browseDropdown &&
                            <>
                                <div className="drop-down-arrow"></div>
                                <div id="browse-dropdown-item" className="dropdown-item-container">
                                    <div className="dropdown-left-section">
                                        <ul className="dropdown-list-heading" aria-label="browser">
                                            <li className="dropdown-heading-element">Browse</li>
                                            {browseLeftLinks.map((value, index) => (
                                                <li className="dropdown-list-item" key={index}>
                                                    <button className="dropdown-link bowse-dropdown-links" onClick={() => handleNavigate(value.link)}>{value.title}</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="dropdown-right-section">
                                        <ul className="dropdown-list-heading">
                                            <li className="dropdown-heading-element">Wattpad Picks</li>
                                            {browseRightLinks.map((value, index) => (
                                                <li className="dropdown-list-item right-link-dropdown" key={index}>
                                                    <button className="dropdown-link bowse-dropdown-links" onClick={() => handleNavigate(value.link)}>{value.title}</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </li>
                <li className="nav-option-list">
                    <div id="community-dropdown" className="dorpdown-btn-conatiner">
                        <button className="drop-down-btn" onClick={() => handleDropdown("community")}>Community</button>
                        {dropdown.communityDropdown &&
                            <>
                                <div className="drop-down-arrow"></div>
                                <div id="community-dropdown-item" className="dropdown-item-container">
                                    <ul className="dropdown-list-heading" aria-label="community-dropdown">
                                        {communityLinks.map((value, index) => (
                                            <li className="dropdown-list-item community-item-links" key={index}>
                                                <button className="dropdown-link" onClick={() => handleNavigate(value.link)}>{value.title}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        }
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default NavSection;