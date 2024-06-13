import { NavLink, Link, useLoaderData, Outlet } from 'react-router-dom';
import './CompanyDetail.css'

function CompanyDetail() {
    const { company } = useLoaderData();

    if (!company) {
        return (
            <div>
                <h2>Company not found</h2>
                <Link to="/companies">Go back</Link>
            </div>
        );
    }

    return (
        <div className="CompanyDetail">
            <div className='CompanyDetail-info-container'>
                <div className='CompanyDetail-hero-image'></div>
                <div className='CompanyDetail-logo'>
                    {company.logoUrl && <img src={company.logo
                    } alt={company.name} />}
                </div>
                <div className='CompanyDetail-info-text'>
                    <h3>{company.name}</h3>
                    <p>{company.description}</p>
                    <p><b>{company.numEmployees}</b> Employees</p>
                </div>
                <nav className='CompanyDetail-company-nav'>
                    <ul className='CompanyDetail-company-nav-list'>
                        <li className='CompanyDetail-company-nav-item'>
                            <NavLink to={`/companies/${company.handle}`} end>Home</NavLink>
                        </li>
                        <li
                            className='CompanyDetail-company-nav-item'
                        >
                            <NavLink to={`/companies/${company.handle}/jobs`}>Jobs</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </div>
    )
}

export default CompanyDetail;