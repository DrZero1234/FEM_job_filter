import { styled } from "styled-components";
import { JobFilterButton } from "./JobFilterButton";



    const addFilter = (e) => {
        console.log("Add this filter text");
    };


  const JobInterface = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    width: 100%;
    padding: 1.5rem;
    border-left: ${props => props.$featured
      ? /*props => */ `5px solid ${props.theme.primary_500}`
      : ""};
  `;

  const JobInfo = styled.div`
    display: grid;
    grid-template-areas:
      "image company-status company-status"
      "image position-name ."
      "image job-details .";
    align-items: center;
    grid-template-columns: auto 1fr 1fr;
    gap: 1rem;
    grid-template-rows: auto;
  `;

  const CompanyStatusWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    grid-area: company-status;
  `;

  const CompanyName = styled.h2`
    color: ${(props) => props.theme.primary_500};
    font-weight: ${(props) => props.theme.fw_bold};
    font-size: ${(props) => props.theme.fs_status_btn};
  `;
  const JobStatusWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
    align-items: center;
  `;

  const NewBtn = styled.button `
    display: ${props => props.$new_key ? "block" : "none"};
    font-weight: ${(props) => props.theme.fw_bold};
    font-size: ${(props) => props.theme.fs_status_btn};
    border: none;
    border-radius: 100vw;
    padding: ${(props) => props.theme.padding_status_btn};
    background-color: ${(props) => props.theme.primary_500};
    color: ${(props) => props.theme.neutral[900]};
  `;

  const FeaturedBtn = styled(NewBtn)`
    display: ${(props) => (props.$featured ? "block" : "none")};
    background-color: ${(props) => props.theme.neutral[200]};
  `;

  const CompanyImage = styled.div`
    grid-area: image;
  `;

    const PositionText = styled.h1`
    grid-area: position-name;
    font-size: ${(props) => props.theme.fs_title};
    font-weight: ${(props) => props.theme.fw_bold};
    &:hover {
      color: ${(props) => props.theme.primary_500};
      cursor: pointer;
    }
  `;

    // Grey text on tab
  const JobTimeList = styled.ul`
    display: flex;
    color: ${(props) => props.theme.neutral[200]};
    gap: 1.25rem;
    list-style-type: none;
    grid-area: job-details;
  `;

const RightBtnWrapper = styled(JobTimeList)`
    align-items: center;
    grid-area: none;
  `;

export const JobTab = ({ jobData }) => {
  const new_key = jobData.new;
  const {
    id,
    company,
    logo,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  } = jobData;

  // Right side of the
  const right_btn_data = [position, role].concat(...languages);


  return (
    <JobInterface>
      <JobInfo>
        <CompanyStatusWrapper>
          <CompanyName>{company}</CompanyName>
          <JobStatusWrapper>
            <NewBtn $new_key={new_key}>New!</NewBtn>
            <FeaturedBtn $featured = {featured}>Featured</FeaturedBtn>
          </JobStatusWrapper>
        </CompanyStatusWrapper>
        <CompanyImage as="img" src={logo} />
        <PositionText>{position}</PositionText>
        <JobTimeList>
          <li>{postedAt}</li>
          <li>{contract}</li>
          <li>{location}</li>
        </JobTimeList>
      </JobInfo>

      <RightBtnWrapper>
        {right_btn_data.map((data, i) => (
          <li key={i}>
            <JobFilterButton
              handleClick={addFilter}
              text={data}
            />
          </li>
        ))}
      </RightBtnWrapper>
    </JobInterface>
  );
};
