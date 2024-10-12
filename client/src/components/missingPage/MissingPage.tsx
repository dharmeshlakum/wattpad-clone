import "../../css/missingPage.css";
import React from "react";
import { Link } from "react-router-dom";

const MissingPage: React.FC = () => {
    document.title="Page not found -Wattpad";

    const categoryItems = [
        { title: "Wattpad Originals", link: "/stories/wattpadoriginals", color: "#ff7744" },
        { title: "Romance", link: "/stories/romance", color: "#ff9b77" },
        { title: "LGBTQ+", link: "/stories/lgbt", color: "#ff7744" },
        { title: "Werewolf", link: "/stories/werewolf", color: "#ffc477" },
        { title: "New Adult", link: "/stories/newadult", color: "#6dbec0" },
        { title: "Fantasy", link: "/stories/fantasy", color: "#87dbdb" },
        { title: "Fanfiction", link: "/stories/fanfiction", color: "#6d7fc0" },
        { title: "Short Story", link: "/stories/shortstory", color: "#8799db" },
        { title: "Teen Fiction", link: "/stories/teenfiction", color: "#ff7744" },
        { title: "Historical Fiction", link: "/stories/historicalfiction", color: "#ff9b77" },
        { title: "Peranormal", link: "/stories/paranormal", color: "#ffae4d" },
        { title: "Editor's Pics", link: "/list/", color: "#ffc477" },
        { title: "Humor", link: "/stories/humor", color: "#6dbec0" },
        { title: "Horror", link: "/stories/horror", color: "#87dbdb" },
        { title: "Contamporary Lit", link: "/stories/contemporarylit", color: "#6d7fc0" },
        { title: "Diverse Lit", link: "/stories/diverselit", color: "#8799db" },
        { title: "Mystery", link: "/stories/mystery", color: "#ff7744" },
        { title: "Thriller", link: "/stories/thriller", color: "#ff9b77" },
        { title: "Sciense Fiction", link: "/stories/sciencefiction", color: "#ffae4d" },
        { title: "The Wattys", link: "/user/theWatty", color: "#ffc477" },
        { title: "Advanture", link: "/stories/advanture", color: "#6dbec0" },
        { title: "Non-Fiction", link: "/stories/nonfiction", color: "#87dbdb" },
        { title: "Poetry", link: "/stories/poetry", color: "#6d7fc0" }
    ];
    return (
        <div className="missing-page-container">
            <div className="inner-container-missing">
                <div className="head-wraper">
                    <h1 className="heading-h1">This page seems to be missing...</h1>
                    <h3 className="heading-h3">We couldn't find what you were looking for. You could try searching for something else you love!</h3>
                    <div className="error-search-container">
                        <form className="missing-page-form" autoComplete="off">
                            <span><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" name="search" id="search" placeholder="Search stories & people" />
                        </form>
                    </div>
                </div>
                <div className="body-wraper">
                    <div className="body-wraper-row">
                        <div className="body-warper-categories">
                            <div className="title-body-wraper">
                                <h3>Browse Topics</h3>
                            </div>
                            {categoryItems.map((value, index) => (
                                <div className="category-items" key={index}>
                                    <Link to={value.link} className="category-link-tag" style={{ backgroundColor: value.color }}>
                                        <span>{value.title}</span>
                                    </Link>
                                </div>
                            ))}
                            <div className="category-items">
                                <Link to={"/"} className="category-link-tag navigate-link">
                                    Discover more 🠲
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MissingPage;