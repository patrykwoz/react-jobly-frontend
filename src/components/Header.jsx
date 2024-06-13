import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import logo from '/jobly.png';
import './Header.css'

function Header({currentUser}) {
    return (
        <>
            <header className="Header">
                <Link to="/">
                    <div className="Header-logo">
                        <img src={logo} alt='Jobly Logo' />
                    </div>
                </Link>
                <SearchBar />
                <NavBar user={currentUser} />
            </header>
            <Outlet />
        </>
    )
}

export default Header;