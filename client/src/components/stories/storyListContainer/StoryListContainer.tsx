import { useParams } from "react-router-dom";
import "../../../css/storyListContainer.css";
import React from "react";

const StoryListContainer:React.FC = () =>{
    const { storyName } = useParams();

    return(
        <div className="story-list-container">
            <h1>{storyName}</h1>
        </div>
    )
}

export default StoryListContainer;