import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import './UserLogin.css'

function UserLogin() {
    const { login } = useContext(AuthContext);
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/feed";

    const INITIAL_STATE = {
        username: "",
        password: ""
    };
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        login(formData);
        setFormData(INITIAL_STATE);
        navigate(from);
    };

    return (
        <div className="UserLogin">
            <h3>Log In</h3>
            <form className="UserLogin-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button >Submit</button>
            </form>
        </div>
    );
}

export default UserLogin;