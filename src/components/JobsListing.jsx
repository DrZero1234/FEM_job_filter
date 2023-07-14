import { styled } from "styled-components";
import { JobTab } from "./JobTab";

export const JobListing = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (max-width: 40em) {
      gap: 3rem
    }
`;

export const JobsListing = ({ jobs_arr, setCurrentFilters,addFilter}) => {
  return (
    <JobListing>
      {jobs_arr.map((job) => (
        <JobTab jobData={job} addFilter = {addFilter}/>
      ))}
    </JobListing>
  );
};
