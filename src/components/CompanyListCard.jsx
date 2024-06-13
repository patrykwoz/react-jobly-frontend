import { Link } from "react-router-dom";
import "./CompanyListCard.css";

function CompanyListCard({ company }) {
  if (!company) {
    return <div>Company not found.</div>;
  }
  return (
    <li className="CompanyListCard">
      <Link className="CompanyListCard-container" to={`/companies/${company.handle}`}>
        <div className="CompanyListCard-logo">
          {company.logo_url && <img src={company.logo_url} alt={company.name} />}
        </div>
        <div className="CompanyListCard-text">
          <h3>{company.name}</h3>
          <p>{company.description}</p>
          <p><b>{company.numEmployees}</b> Employees</p>
          <p><b>{company.jobs || "X"}</b> Jobs</p>
        </div>
      </Link>
    </li>
  );
}

export default CompanyListCard;