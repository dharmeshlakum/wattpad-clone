import "../../../css/navbar.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchSection: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearch(event.target.value);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/search/${search}`)
    }

    return (
        <div className="nav-search-section">
            <div className="nav-search-inner-section">
                <form
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className="nav-search-form">
                    <button
                        type="submit"
                        className="search-btn">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <input
                        type="text"
                        id="search-input"
                        value={search}
                        onChange={handleChange}
                        placeholder="Search"
                        name="searchStory"
                        className="search-input" />
                </form>
            </div>
        </div>
    )
}

export default SearchSection;