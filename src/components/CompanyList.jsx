import CompanyListCard from './CompanyListCard'
import './CompanyList.css'

function CompanyList({ companies }) {
    if (!companies || companies.length < 1) {
        return <div>No companies found.</div>
    }

    return (
        <div className="CompanyList">
            <ul className="CompanyList-list">
                {companies.map(company => (
                    <CompanyListCard key={company.handle} company={company} />
                ))}
            </ul>
        </div>
    )
}

export default CompanyList