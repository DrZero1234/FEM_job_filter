import { useEffect, useState } from 'react'
import './App.css'

import desktopHeader from "./assets/bg-header-desktop.svg";
import mobileHeader from "./assets/bg-header-mobile.svg";

import styled from 'styled-components';

import removeFilterImg from "./assets/icon-remove.svg"


import data from "./data/data.json"
import { ThemeProvider } from 'styled-components';


const MOCK_DATA = 
[
  {
    "id": 1,
    "company": "Photosnap",
    "logo": "/src/assets/photosnap.svg",
    "new": true,
    "featured": true,
    "position": "Senior Frontend Developer",
    "role": "Frontend",
    "level": "Senior",
    "postedAt": "1d ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["HTML", "CSS", "JavaScript"],
    "tools": []
  },
  {
    "id": 2,
    "company": "Manage",
    "logo": "/src/assets/manage.svg",
    "new": true,
    "featured": true,
    "position": "Fullstack Developer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1d ago",
    "contract": "Part Time",
    "location": "Remote",
    "languages": ["Python"],
    "tools": ["React"]
  },
  {
    "id": 3,
    "company": "Account",
    "logo": "/src/assets/account.svg",
    "new": true,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2d ago",
    "contract": "Part Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  },
];

function App() {
  const [count, setCount] = useState(0);
  const [activeFilters,setActiveFilters] = useState(["item1","item2","item3"]);  
  const [allJobs, setAllJobs] = useState([JSON.parse(JSON.stringify(data))][0]);
  const [filteredJobs,setFilteredJobs] = useState([]);

  const pageTheme = {
    primary_500: "#5ba4a4", //hsl(180, 29%, 50%)

    neutral: {
      200: "#2c3a3a", //hsl(180, 14%, 20%),
      500: "#7b8e8e", //hsl(180, 8%, 52%)
      800: "#eef6f6", //hsl(180, 31%, 95%)
      900: "#effafa", //hsl(180, 52%, 96%)
    },

    fs_title: "1.25rem",
    fs_status_btn: "1.15rem",

    padding_status_btn: ".1rem .45rem",
    padding_btn_lg: ".25rem .55rem",

    fw_normal: 500,
    fw_bold: 700,


  };




const JobTab = ({jobData}) => {
  const new_key = jobData.new;
  const {id,company,logo,featured,position,role,level,postedAt,contract,location,languages,tools} = jobData;

  // Right side of the 
  const right_btn_data = [position,role,].concat(...languages);

  console.log(right_btn_data)
  


  const JobInterface = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    width: 100%;
    padding: 1.5rem;
    border-left: ${featured ? (props => `5px solid ${props.theme.primary_500}`) : ""};
  `

  const JobInfo = styled.div`
    display:grid;
    grid-template-areas:
    "image company-status company-status"
    "image position-name ."
    "image job-details .";
    align-items: center;
    grid-template-columns: auto 1fr 1fr;
    gap: 1rem;
    grid-template-rows:auto
  `

  const CompanyStatusWrapper = styled.div`
    display:flex;
    align-items: center;
    gap: 1rem;
    grid-area: company-status;
  `

  const CompanyName = styled.h2`
    color: ${props => props.theme.primary_500};
    font-weight: ${props => props.theme.fw_bold};
    font-size: ${props => props.theme.fs_status_btn};
  `
  const JobStatusWrapper = styled.div`
    display: flex;
    flex-direction:row;
    gap: .75rem;
    align-items:center;
   `

  const NewBtn = styled.button `
    display: ${new_key ? "block" : "none"};
    font-weight: ${props => props.theme.fw_bold};
    font-size: ${props => props.theme.fs_status_btn};
    border: none;
    border-radius: 100vw;
    padding: ${props => props.theme.padding_status_btn};
    background-color: ${props => props.theme.primary_500};
    color: ${props => props.theme.neutral[900]};
  `

  const FeaturedBtn = styled(NewBtn)`
    background-color: ${props => props.theme.neutral[200]};
  `

  const PositionImage = styled.div`
    grid-area: image;
  `

  const PositionText = styled.h1`
    grid-area: position-name;
    font-size: ${(props) => props.theme.fs_title};
    font-weight: ${(props) => props.theme.fw_bold};
    &:hover {
      color: ${(props) => props.theme.primary_500};
      cursor: pointer
    }
  `;

  // Grey text on tab
  const JobTimeList = styled.ul`
    display: flex;
    color: ${props => props.theme.neutral[200]};
    gap: 1.25rem;
    list-style-type: none;
    grid-area: job-details;
  `

  const RightBtnWrapper = styled(JobTimeList) `
    align-items:center;
    grid-area: none;
  `





  return (
    <JobInterface>
      <JobInfo>
        <CompanyStatusWrapper>
          <CompanyName>{company}</CompanyName>
          <JobStatusWrapper>
            <NewBtn>New!</NewBtn>
            <FeaturedBtn>Featured</FeaturedBtn>
          </JobStatusWrapper>
        </CompanyStatusWrapper>
        <PositionImage as="img" src={logo} />
        <PositionText>{position}</PositionText>
        <JobTimeList>
          <li>{postedAt}</li>
          <li>{contract}</li>
          <li>{location}</li>
        </JobTimeList>
      </JobInfo>

      <RightBtnWrapper>
        {right_btn_data.map((data) => (
          <li>
            <JobFilterButton handleClick={() => console.log("Test")} text={data} />
          </li>
        ))}
      </RightBtnWrapper>
    </JobInterface>
  );
}


// Seperate component
const JobFilterButton = ({handleClick,text}) =>{
  const FilterButton = styled.button`
    background-color: ${(props) => props.theme.neutral[800]};
    color: ${(props) => props.theme.primary_500};
    padding: ${(props) => props.theme.padding_btn_lg};
    font-weight: ${(props) => props.theme.fw_bold};
    font-size: ${(props) => props.theme.fs_status_btn};
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background-color: ${(props) => props.theme.primary_500};
      color: ${(props) => props.theme.neutral[800]};
    }
  `;

  return(
    <FilterButton onClick={() => handleClick()}>{text}</FilterButton>
  )
}

const FilterTab = ({currentFilters}) => {
  console.log(currentFilters)
  const FilterWrapper = styled.div`
    display: ${currentFilters ? "flex" : "none"};
    justify-content: space-between;
    padding: 2rem;
    border: 3px solid black;
    width: 100%;
    align-items:center;
    background-color: white;
  `

const FilterButtonList = styled.ul `
  display: flex;
  list-style-type: none;
  gap: 1rem;
`


  return (
    <FilterWrapper>
      <FilterButtonList>
        {currentFilters.map((filter) => (
          <ActiveFilterButton text={filter} />
        ))}
      </FilterButtonList>
      <a href='lel'>k</a>
    </FilterWrapper>
  );
}

const ActiveFilterButton = ({text}) => {
  const ActiveFilterWrapper = styled.div `
    display: flex;
    font-weight: ${(props) => props.theme.fw_bold};
    font-size: ${(props) => props.theme.fs_status_btn};
  `

  const ActiveFilterDiv = styled.div`
    background-color: ${(props) => props.theme.neutral[800]};
    color: ${(props) => props.theme.primary_500};
    padding: ${props => props.theme.padding_btn_lg};
  `;

  const ActiveFilterCloseBtn = styled.button`
    background-color: ${(props) => props.theme.primary_500};
    padding: ${props => props.theme.padding_btn_lg};
  `;

  return(
    <ActiveFilterWrapper>
      <ActiveFilterDiv>{text}</ActiveFilterDiv>
      <ActiveFilterButton><img src={removeFilterImg} alt='remove filter'/></ActiveFilterButton>
    </ActiveFilterWrapper>
  )
}
   

const JobsListing = ({jobs_arr}) => {
  

  const JobListing = styled.div`
    border: 2px solid black;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;



  return (
    <JobListing>
      {jobs_arr.map((job) => (
        <JobTab jobData={job} />
      ))}
    </JobListing>
  );
}




  return (
    <ThemeProvider theme={pageTheme}>
      <div className="container">
        <header>
          <picture className="header-picture">
            <source
              srcSet={desktopHeader}
              alt="Header desktop"
              media="(min-width: 40em)"
            />
            <img src={mobileHeader} alt="Header mobile" />
          </picture>
        </header>

        <main>
          <div className="main-container">
            <FilterTab currentFilters={activeFilters}>
              <div>
                <button>One</button>
                <button>Two</button>
                <button>Three</button>
              </div>
              <a href="#">Clear</a>
            </FilterTab>
            <JobsListing jobs_arr={MOCK_DATA} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App
