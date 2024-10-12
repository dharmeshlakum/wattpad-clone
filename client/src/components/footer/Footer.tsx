import "../../css/footer.css";
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    const topList = [
        { link: "/", title: "Wattpad Originals" },
        { link: "/", title: "Try Premium" },
        { link: "/", title: "Get the App" },
        { link: "/", title: "Language" },
        { link: "/", title: "Writers" },
        { link: null, title: "" },
        { link: "/", title: "Brand Partners" },
        { link: "/", title: "Jobs" },
        { link: "/", title: "Press" },
    ];
    const bottomList = [
        { link: "/", title: "Terms" },
        { link: "/", title: "Privacy" },
        { link: "/", title: "Payment Policy" },
        { link: "/", title: "Accessibility" },
        { link: "/", title: "Do Not Sell My Personal Information" },
        { link: "/", title: "Help" },
        { link: null, title: "© 2024 Wattpad" },
    ]

    return (
        <footer className="footer-section">
            <ul className="footer-list footer-top">
                {topList.map((value, index) => (
                    <li key={index}>
                        {value.link !== null ?
                            <Link to={value.link} className="footer-links">{value.title}</Link> :
                            <p>|</p>
                        }
                    </li>
                ))}
            </ul>
            <ul className="footer-list footer-bottom-list">
                {bottomList.map((value, index) => (
                    <li key={index}>
                        {value.link !== null ?
                            <Link to={value.link} className="footer-links">{value.title}</Link> :
                            <p>{value.title}</p>
                        }
                    </li>
                ))}
            </ul>
        </footer>
    )
}

export default Footer;