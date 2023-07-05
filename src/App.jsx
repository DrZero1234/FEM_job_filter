import { useEffect, useState } from 'react'
import './App.css'

import desktopHeader from "../public/assets/bg-header-desktop.svg";
import mobileHeader from "../public/assets/bg-header-mobile.svg";

import styled from 'styled-components';


import data from "./data/data.json"
import { ThemeProvider } from 'styled-components';


const MOCK_DATA = 
[
  {
    "id": 1,
    "company": "Photosnap",
    "logo": "../public/assets/photosnap.svg",
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
    "logo": "../public/assets/manage.svg",
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
    "logo": "../public/assets/account.svg",
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
  const [filters,setFilters] = useState([]);
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

    fw_normal: 500,
    fw_bold: 700,


  };




const JobTab = ({jobData}) => {
  const new_key = jobData.new;
  const {id,company,logo,featured,position,role,level,postedAt,contract,location,languages,tools} = jobData;
  
  let image = require(logo);


  const JobInterface = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    width: 100%;
    padding: 1.5rem;
  `

  const jobInfo = styled.div`
    display:grid;
    grid-template-areas:
    "image company-name job-status"
    "image position-name ."
    "image job-details ."
  `

  const positionImage = styled.img`
    grid-area: image;
    
  `

  return(
      <JobInterface>
        <jobInfo>
          <positionImage src = {require(image).default} alt={company} />        
        </jobInfo>
      </JobInterface>
  )


}

const JobsListing = ({jobs_arr}) => {
  
  console.log(jobs_arr)

  const JobListing = styled.div`
    margin: 5rem 7.5rem;
    border: 2px solid black;
    min-width: 100vw;
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

        <div className="main-container">
          <main>
            <JobsListing jobs_arr={MOCK_DATA} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App
