import { styled } from "styled-components";
import { JobFilterButton } from "./JobFilterButton";





  const Separator = styled.hr`
    display: none;
    @media (max-width: 40em) {
      display: flex;
      flex: 1;
      color: ${(props) => props.theme.neutral[200]};
    }
  `;

  const JobInterface = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    width: 100%;
    padding: 1.5rem;
    border-radius: .25rem;
    border-left: ${props => props.$featured
      ? `5px solid ${props.theme.primary_500}`
      : ""};
    @media (max-width: 40em) {
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      position: relative
    }
  `
  ;

  const JobInfo = styled.div`
    display: grid;
    grid-template-areas:
      "image company-status company-status"
      "image position-name ."
      "image job-details .";
    align-items: center;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    grid-template-rows: auto;
    @media (max-width: 40em) {
      grid-template-areas:
      "image ."
      "company-status company-status"
      "position-name position-name"
      "job-details job-details";
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;

    } 
  `;

  const CompanyStatusWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    grid-area: company-status;
    @media (max-width: 40em) {
      margin-top: 2rem;
    }
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

    @media (max-width: 40em) {
      position: absolute;
      max-width: 88px;
      top: -2rem;
    }
    @media (min-width: 40em) {
      min-width: 100%;
    }
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
    flex-wrap: nowrap;
    align-items: center;
    @media (max-width: 40em) {
      flex-wrap: wrap;
    }
  `;

export const JobTab = ({ jobData, addFilter }) => {
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

  //const right_btn_data = [role,level].concat(...languages).concat(...tools);

  const right_btn_data = {role,level,languages,tools}

  const entries = Object.entries(right_btn_data);


  return (
    <JobInterface $featured = {featured}>
      <JobInfo>
        <CompanyStatusWrapper>
          <CompanyName>{company}</CompanyName>
          <JobStatusWrapper>
            <NewBtn $new_key={new_key}>NEW!</NewBtn>
            <FeaturedBtn $featured = {featured}>FEATURED</FeaturedBtn>
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
      <Separator />
      <RightBtnWrapper>
        {entries.map((entry,i) => (
          // entry[0] - btn_key
          // entry[1] - btn_value
          <JobFilterButton btn_key={entry[0]} value={entry[1]} addFilter = {addFilter} /> 
        ))}
      </RightBtnWrapper>
    </JobInterface>
  );
};
