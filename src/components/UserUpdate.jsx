import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import './UserUpdate.css';

function UserUpdate() {
    const { updateUser, currentUser } = useContext(AuthContext);
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/feed";

    const INITIAL_STATE = {
        firstName: "",
        lastName: "",
        email: ""
    };

    if (currentUser) {
        INITIAL_STATE.firstName = currentUser.firstName;
        INITIAL_STATE.lastName = currentUser.lastName;
        INITIAL_STATE.email = currentUser.email;
    }

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
        updateUser(formData);
        setFormData(INITIAL_STATE);
        navigate(from, { replace: true });
    };

    return (
        <div className="UserUpdate">
            <h3>Edit your profile</h3>
            <form className="UserUpdate-form" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    autoComplete="off"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    autoComplete="off"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button >Submit</button>
            </form>
        </div>
    );
}

export default UserUpdate;