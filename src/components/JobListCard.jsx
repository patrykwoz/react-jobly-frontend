import { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import "./JobListCard.css";

function JobListCard({ job }) {
  const { currentUser, handleApply } = useContext(AuthContext);
  const [applied, setApplied] = useState(currentUser.applications.includes(job.id));

  const handleClick = async () => {
    let data = {
      username: currentUser.username,
      jobId: job.id
    }
    let handledApply = await handleApply(data);
    setApplied(handledApply);
  }

  return (
    <li className="JobListCard">
      <div className="JobListCard-container">
        <div className="JobListCard-text">
          <h3>{job.title}</h3>
          <p>Salary: <b>{job.salary}</b></p>
          <p>Equity: <b>{job.equity}</b></p>
          <button
            onClick={handleClick}
            className={applied ? "JobListCard-button applied" : "JobListCard-button"}>
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    </li>
  );
}

export default JobListCard;