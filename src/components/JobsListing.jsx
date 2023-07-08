import { styled } from "styled-components";
import { JobTab } from "./JobTab";

export const JobListing = styled.div`
    border: 2px solid black;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const JobsListing = ({ jobs_arr }) => {
  return (
    <JobListing>
      {jobs_arr.map((job) => (
        <JobTab jobData={job} />
      ))}
    </JobListing>
  );
};
