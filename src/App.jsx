import { useEffect, useState } from 'react'
import './App.css'

import { JobsListing } from './components/JobsListing';
import { FilterTab } from './components/FilterTab';

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
  const DEFAULT_FILTER_OBJ = {role: "", level: "", languages: [], tools: []};

  const [jobsList, setJobsList] = useState([JSON.parse(JSON.stringify(data))][0]);
  const [currentFilters, setCurrentFilters] = useState(
    DEFAULT_FILTER_OBJ
  );
  console.log(currentFilters)

  const clearFilters = (e) => {
    e.preventDefault();
    setCurrentFilters(DEFAULT_FILTER_OBJ);
  }


  // Todo the languages and tools value should add to 
  const addFilter = (key,val) => {
    let key_arr_copy;
    if (key === "role" || key === "level") {
      setCurrentFilters({ ...currentFilters, [`${key}`]: val });
    } else if (key === "languages") {
      key_arr_copy = currentFilters["languages"]
      if (!currentFilters["languages"].includes(val)) {
        key_arr_copy.push(val);
        setCurrentFilters({
          ...currentFilters,
          languages: key_arr_copy,
        });
      }
    } else if (key === "tools") {
      key_arr_copy = currentFilters["tools"]
      if (!currentFilters["tools"].includes(val)) {
        key_arr_copy.push(val);
        setCurrentFilters({
          ...currentFilters,
          tools: key_arr_copy,
        });
      }
  }
}

  const removeFilter =(key) => {
    const copy = {...currentFilters};

    delete copy[key];

    setCurrentFilters(copy)
  }
  

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
            <FilterTab currentFilters = {currentFilters} removeFilter = {removeFilter} clearFilters={clearFilters}>
              <div>
                <button>One</button>
                <button>Two</button>
                <button>Three</button>
              </div>
              <a href="#">Clear</a>
            </FilterTab>
            <JobsListing jobs_arr={jobsList} addFilter = {addFilter} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App
