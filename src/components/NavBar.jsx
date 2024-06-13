import { NavLink } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../AuthContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBuilding, faSuitcase, } from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'

function NavBar() {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <>
            <nav className="NavBar">
                <ul className="NavBar-primary-items">
                    <li className="NavBar-primary-item">
                        <NavLink className="NavBar-primary-item-inside-container" to="/feed">
                            <FontAwesomeIcon icon={faHouse} />
                            <p>Home</p>
                        </NavLink>
                    </li>
                    {currentUser && (
                        <>
                            <li className="NavBar-primary-item">
                                <NavLink className="NavBar-primary-item-inside-container" to="/companies">
                                    <FontAwesomeIcon icon={faBuilding} />
                                    <p>Companies</p>
                                </NavLink>
                            </li>
                            <li className="NavBar-primary-item">
                                <NavLink className="NavBar-primary-item-inside-container" to="/jobs">
                                    <FontAwesomeIcon icon={faSuitcase} />
                                    <p>Jobs</p>
                                </NavLink>
                            </li>
                            <li className="NavBar-primary-item">
                                <NavLink className="NavBar-primary-item-inside-container" to={`/users/${currentUser.username}`}>
                                    <div className="NavBar-primary-item-inside-headshot-container">
                                        <img className="NavBar-primary-item-inside-headshot" src={currentUser.photo_url} alt="headshot" />
                                    </div>
                                    <p>Me</p>
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
                <ul className="NavBar-auth-items">
                    {!currentUser && (
                        <>
                            <li className="NavBar-auth-item">
                                <NavLink className="NavBar-auth-item-inside-container" to="/login">
                                    <p>Log In</p>
                                </NavLink>
                            </li>
                            <li className="NavBar-auth-item">
                                <NavLink className="NavBar-auth-item-inside-container" to="/signup">
                                    <p>Sign Up</p>
                                </NavLink>
                            </li>
                        </>
                    )}
                    {currentUser && (
                        <li className="NavBar-auth-item">
                            <NavLink
                                onClick={logout}
                                className="NavBar-auth-item-inside-container"
                                to="/feed">
                                <p>Sign Out</p>
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    )
}

export default NavBar