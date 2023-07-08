import { useEffect, useState } from 'react'
import './App.css'

import { JobsListing } from './components/JobsListing';

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

const ClearAllText = styled.a `
  color: ${props => props.theme.primary_500};
  font-weight: ${props => props.theme.fw_bold};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`


  return (
    <FilterWrapper>
      <FilterButtonList>
        {currentFilters.map((filter) => (
          <ActiveFilterButton text={filter} />
        ))}
      </FilterButtonList>
      <ClearAllText href="#"  onClick={(e) => {e.preventDefault();console.log("lel")}}>Clear</ClearAllText>
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
    border: none;
    &:hover {
      background-color: ${props => props.theme.neutral[200]};
      cursor: pointer;
    }
  `;

  return(
    <ActiveFilterWrapper>
      <ActiveFilterDiv>{text}</ActiveFilterDiv>
      <ActiveFilterCloseBtn><img src={removeFilterImg} alt='remove filter'/></ActiveFilterCloseBtn>
    </ActiveFilterWrapper>
  )
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
