import { useLoaderData } from "react-router-dom";
import CompanyListCard from "./CompanyListCard";
import JobListCard from "./JobListCard";

function SearchResults() {
    const { companies, jobs } = useLoaderData();
    return (
        <div>
            <div className="SearchResults-companies">
                <h3>Companies</h3>
                {companies.length === 0 ?
                    <div>
                        <h2>No companies found.</h2>
                    </div> :
                    <div className="CompanyList">
                        <ul className="CompanyList-list">
                            {companies.map(company => (
                                <CompanyListCard key={company.handle} company={company} />
                            ))}
                        </ul>
                    </div>
                }
            </div>
            <div className="SearchResults-jobs">
                <h3>Jobs</h3>
                {jobs.length === 0 ?
                    <div>
                        <h2>No jobs found.</h2>
                    </div> :
                    <div className="JobList">
                        <ul className="JobList-list">
                            {jobs.map(job => (
                                <JobListCard key={job.id} job={job} />
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}

export default SearchResults;