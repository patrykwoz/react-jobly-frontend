import { useLoaderData } from 'react-router-dom';
import JobListCard from './JobListCard';
import './JobList.css';

function JobList({ jobs }) {
    try {
        const loaderData = useLoaderData()
        const company = loaderData?.company || null;
        const applications = loaderData?.applications || [];

        if (company) {
            jobs = company.jobs;
        }

        if (applications && applications.length > 0) {
            jobs = applications;
        }

    } catch (error) {
        console.error("Error in JobList.jsx", error);
    }
    if (!jobs || jobs.length < 1) {
        return (
            <div>
                <h2>No jobs found.</h2>
            </div>
        );
    }
    return (
        <div className="JobList">
            <ul className="JobList-list">
                {jobs.map(job => (
                    <JobListCard key={job.id} job={job} />
                ))}
            </ul>
        </div>
    );
}

export default JobList;
