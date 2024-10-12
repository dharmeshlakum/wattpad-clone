import "../../css/navbar.css"
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavSection from "./containers/NavSection";
import SearchSection from "./containers/SearchSection";
import AuthSection from "./containers/AuthSection";

// interface to define the dropdown options
export interface DropdownTypes {
    browseDropdown: boolean;
    communityDropdown: boolean;
    writeDropdown: boolean;
    userDropdown: boolean;
}

const Navbar: React.FC = () => {
    const [dropdowns, setDropdown] = useState<DropdownTypes>({
        browseDropdown: false,
        communityDropdown: false,
        writeDropdown: false,
        userDropdown: false
    });
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // function to handle the cisibility of the dropdown
    const handleDropdown = (option: string): void => {
        setDropdown({
            browseDropdown: option === "browse" ? (!dropdowns.browseDropdown) : false,
            communityDropdown: option === "community" ? (!dropdowns.communityDropdown) : false,
            writeDropdown: option === "write" ? (!dropdowns.writeDropdown) : false,
            userDropdown: option === "user" ? (!dropdowns.userDropdown) : false,
        });
    }

    // function to handle the link navigation
    const handleNavigation = (link: string): void => {

        setDropdown({
            browseDropdown: false,
            communityDropdown: false,
            writeDropdown: false,
            userDropdown: false
        });
        navigate(link)
    }

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdown({
                    browseDropdown: false,
                    communityDropdown: false,
                    writeDropdown: false,
                    userDropdown: false
                });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="navbar-container" ref={dropdownRef}>
            <NavSection dropdown={dropdowns} handleDropdown={handleDropdown} handleNavigate={handleNavigation} />
            <SearchSection />
            <AuthSection dropdown={dropdowns} handleDropdown={handleDropdown} handleNavigate={handleNavigation} />
        </div>
    )
}

export default Navbar;