import "../../../css/rootpage.css";
import React from "react";

const WorkSection: React.FC = () => {
    const workContainerData = [
        {
            id: "create-section",
            title: "create",
            description: "Share your unique voice and original story on Wattpad. Find the writing resources you need to craft a story only you can tell.",
            key: "50+",
            value: "Writing Resources"
        },
        {
            id: "build-section",
            title: "Build",
            description: "Establish a global fan base as your story gains readership and momentum. Connect with other like-minded writers through storytelling.",
            key: "97 MILLION",
            value: "People²"
        },
        {
            id: "amplify-section",
            title: "Amplify",
            description: "Gain Wattpad Star status and get your story published or adapted into film or television with Wattpad WEBTOON Studios!",
            key: "1000+",
            value: "Story deals"
        }
    ]

    return (
        <div className="work-section">
            <div className="work-inner-container">
                <h2>How Wattpad Works</h2>
                <p>Get your story discovered through the power of community and technology on Wattpad.</p>
                <div className="work-data-container">
                    {workContainerData.map((value, index) => (
                        <div className="work-item-container" key={index}>
                            <div className="work-item-upper-section">
                                <h2>{index + 1}</h2>
                                <div>
                                    <h3>{value.title}</h3>
                                    <p>{value.description}</p>
                                </div>
                            </div>
                            <div className="work-item-bottom-section" id={value.id}>
                                <div>
                                    <div className="work-item-key">{value.key}</div>
                                    <div className="work-item-value">{value.value}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="work-pera-tag">²Monthly Wattpad Visitors. As of July 2023</p>
            </div>
        </div>
    )
}

export default WorkSection;