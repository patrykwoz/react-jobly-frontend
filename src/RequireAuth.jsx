import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";


function RequireAuth({ children }) {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    const token = localStorage.getItem('token');

    // console.log(currentUser, token);
    //TODO:
    // currentUser is null even if the user is logged in when the page is refreshed
    // how to fix this?
    // I want to be able to click refresh and still be logged in
    // I'm worried that checking just for the token is not secure enough
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

export default RequireAuth;