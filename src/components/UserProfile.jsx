import { useParams, useLoaderData, NavLink, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faComments, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './UserProfile.css'

function Profile() {
    const { username } = useParams()
    const user = useLoaderData()
    return (
        <>
            <div className="Profile">
                <div className='Profile-info-container'>
                    <div className='Profile-hero-image'></div>
                    <div className='Profile-headshot'>
                        {user.headshotUrl && <img src={user.headshotUrl} alt={user.firstName + user.lastName} />}
                    </div>
                    <div className='Profile-edit-button'>
                        <NavLink to={`/users/${user.username}/edit`}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </NavLink>
                    </div>
                    <div className='Profile-info-text'>
                        <h3>{user.firstName} {user.lastName}</h3>
                        <p><FontAwesomeIcon icon={faComments} /> {user.description || "I'm in love with Jobly!"}</p>
                        <p><FontAwesomeIcon icon={faEnvelope} /> <b>{user.email}</b></p>
                    </div>
                    <nav className='Profile-user-nav'>
                        <ul className='Profile-user-nav-list'>
                            <li className='Profile-user-nav-item'>
                                <NavLink to={`/users/${user.username}`} end>About</NavLink>
                            </li>
                            <li
                                className='Profile-user-nav-item'
                            >
                                <NavLink to={`/users/${user.username}/applications`}>Applications</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default Profile