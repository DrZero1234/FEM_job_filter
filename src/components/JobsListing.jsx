import { styled } from "styled-components";
import JobTab from "./JobTab";
import { PropTypes } from "prop-types";

export const JobListing = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (max-width: 40em) {
      gap: 3rem
    }
`;

function JobsListing ({ jobs_arr,addFilter}) {
  return (
    <JobListing>
      {jobs_arr.map((job) => (
        <JobTab jobData={job} addFilter = {addFilter}/>
      ))}
    </JobListing>
  );
}

JobsListing.propTypes =  {
  jobs_arr: PropTypes.array.isRequired,
  addFilter: PropTypes.func.isRequired
}

export default JobsListing


