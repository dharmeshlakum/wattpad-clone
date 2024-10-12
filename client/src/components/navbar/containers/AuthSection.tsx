import "../../../css/navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { DropdownTypes } from "../Navbar";
import { useAuthFormContext } from "../../../context/formContext/AuthFormContext";
import { useAuthContext } from "../../../context/authContext/AuthContext";

// interface to define types of props
interface PropsType {
    dropdown: DropdownTypes;
    handleDropdown: (option: string) => void;
    handleNavigate: (link: string)=> void;
}

const AuthSection: React.FC<PropsType> = ({ dropdown, handleDropdown, handleNavigate }) => {
    const { setIsOpen, setFormType } = useAuthFormContext();
    const { url, token, user } = useAuthContext();

    // function to handle click on the auth buttons
    const handleClickBTN = (type: string) => {
        setIsOpen(true);
        setFormType(type);
    }

    return (
        <div className="nav-auth-section">
            <ul className="navbar-list">
                <li className="auth-list">
                    <div className="dorpdown-btn-conatiner" id="write-dropdown">
                        <button className="drop-down-btn" onClick={() => handleDropdown("write")}>
                            Write
                            <span className="arrow-down"></span>
                        </button>
                        {dropdown.writeDropdown &&
                            <>
                                <div className="drop-down-arrow"></div>
                                <div className="dropdown-item-container" id="write-dropdown">
                                    <ul className="dropdown-list-heading" aria-label="write-dropdown">
                                        <li className="dropdown-list-item community-item-links">
                                            <button onClick={()=> handleNavigate("/")} className="dropdown-link" >
                                                <img src="https://www.wattpad.com/wp-web-assets/images/icons/create-story.svg" alt="create-note" />
                                                Create a new story
                                            </button>
                                        </li>
                                        <li className="dropdown-list-item community-item-links">
                                            <button onClick={()=> handleNavigate("/")} className="dropdown-link" >My Stories</button>
                                        </li>
                                        <hr id="dropdown-devider" />
                                        <li className="dropdown-list-item community-item-links">
                                            <button onClick={()=> handleNavigate("/")} className="dropdown-link" >Helpful writer resources</button>
                                        </li>
                                        <li className="dropdown-list-item community-item-links">
                                            <button onClick={()=> handleNavigate("/")} className="dropdown-link" >Wattpad programs & opportunities</button>
                                        </li>
                                        <li className="dropdown-list-item community-item-links">
                                            <button onClick={()=> handleNavigate("/")} className="dropdown-link" >Writing contests</button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        }
                    </div>
                </li>
                <li className="premium-element">
                    <i className="fa-solid fa-bolt"></i>
                    <Link to={"/"} className="prmium-link">Try Premium</Link>
                </li>
            </ul>
            {
                token ?
                    <>
                        <div className="auth-profile-dropdown">
                            <button className="drop-down-user-btn" onClick={() => handleDropdown('user')}>
                                <div className="avatar">
                                    <span className="notification-bedge"></span>
                                    <img src={`${url}/user/images/${user?.avatar}`} alt="" />
                                </div>
                                <div className="down-arrow"></div>
                            </button>
                            {dropdown.userDropdown && (
                                <>
                                    <div className="user-profile-arrow"></div>
                                    <div className="userDrop-down-menu">
                                        <ul className="profile-dropdown-list">
                                            <li><button onClick={()=> handleNavigate("/")} className="drop-down-links">My Profile</button></li>
                                            <li className="line-dropdown"></li>
                                            <li><button onClick={()=> handleNavigate("/")} className="drop-down-links">Inbox</button></li>
                                            <li><button onClick={()=> handleNavigate("/")} className="drop-down-links">
                                                Notification
                                                <span id="notification-bedge">2</span>
                                            </button></li>
                                            <li><button onClick={()=> handleNavigate("/")} className="drop-down-links">Library</button></li>
                                            <li className="line-dropdown"></li>
                                            <li><button onClick={()=> handleNavigate("/")} className="drop-down-links">Language : English</button></li>
                                            <li><button onClick={()=> handleNavigate("/")} className="drop-down-links">Help</button></li>
                                            <li><button onClick={()=> handleNavigate("/")} className="drop-down-links">Setting</button></li>
                                            <li><button onClick={()=> handleNavigate("/")} className="drop-down-links">Log out</button></li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </> :
                    <>
                        <div className="auth-option-conatiner">
                            <ul className="auth-option-list navbar-list">
                                <li><button type="button" className="auth-option-btns" onClick={() => handleClickBTN("login")}>Log In</button></li>
                                <li><button type="button" className="auth-option-btns" onClick={() => handleClickBTN("signup")}>Sign Up</button></li>
                            </ul>
                        </div>
                    </>
            }
        </div>
    )
}

export default AuthSection;