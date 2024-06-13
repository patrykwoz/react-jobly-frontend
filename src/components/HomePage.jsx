import { Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import './HomePage.css';

function HomePage() {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <div className="HomePage">
                <h1>Welcome to Jobly{currentUser &&
                    <>,<span className="HomePage-user-first-name"> {currentUser.firstName}</span></>}!
                </h1>
                <p>All the jobs in one, convenient place.</p>
            </div>
            <Outlet />
        </>
    );
}

export default HomePage;
