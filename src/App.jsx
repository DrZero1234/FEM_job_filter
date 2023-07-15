import { useEffect, useState } from 'react'
import './App.css'

import JobsListing from './components/JobsListing';
import FilterTab from './components/FilterTab';

import desktopHeader from "./assets/bg-header-desktop.svg";
import mobileHeader from "./assets/bg-header-mobile.svg";





import data from "./data/data.json"
import { ThemeProvider } from 'styled-components';




function App() {


  // Empty active filter objects
  const DEFAULT_FILTER_OBJ = {
    role: "",
    level: "",
    languages: [],
    tools: [],
  };

  // Fetches the local data.json file and returns it in a list of objects format
  const allJobs = [JSON.parse(JSON.stringify(data))][0];

  const [jobsList, setJobsList] = useState(
    allJobs
  );
  const [currentFilters, setCurrentFilters] = useState(
    DEFAULT_FILTER_OBJ
  );

  const clearFilters = (e) => {
    e.preventDefault();
    setCurrentFilters(DEFAULT_FILTER_OBJ);
  };



  // Function which adds the filter to the current filter object based on the button the user clicked on
  const addFilter = (key, val) => {
    let key_arr_copy;
    // The role and level stores the string of the button so it only inserts in key: value format
    if (key === "role" || key === "level") {
      setCurrentFilters({ ...currentFilters, [`${key}`]: val });
      // Otherwise the function will check if the languages or tools array contains the clicked filter
      // If no then the filter will be added otherwise the array stays the same
    } else if (key === "languages") {
      key_arr_copy = currentFilters["languages"];
      if (!currentFilters["languages"].includes(val)) {
        key_arr_copy.push(val);
        setCurrentFilters({
          ...currentFilters,
          languages: key_arr_copy,
        });
      }
    } else if (key === "tools") {
      key_arr_copy = currentFilters["tools"];
      if (!currentFilters["tools"].includes(val)) {
        key_arr_copy.push(val);
        setCurrentFilters({
          ...currentFilters,
          tools: key_arr_copy,
        });
      }
    }
  };

  // Function that handles the removal of active filter by clicking on the X button next to an active filter
  const removeFilter = (key,val=undefined) => {
    const copy = { ...currentFilters };
    if (key === "role" || key === "level") {
      delete copy[key];
    } else if (key === "languages"||key === "tools") {
      const elem_index = currentFilters[key].indexOf(val);
      copy[key].splice(elem_index,1);
      
    }
    setCurrentFilters(copy);
  };

  // The function that determines which jobs are in pair with the current filters
  const compareFilters =  (jobObj) => {
    const filter_keys = Object.keys(currentFilters);
    // First we iterate over the keys of the filters object
    for (let filter_key of filter_keys){
      // The function checks if the role AND level keys have the same value for the job Object as the filter object
      if (typeof jobObj[filter_key] === "string" && currentFilters[filter_key].length) {
        if (jobObj[filter_key] != currentFilters[filter_key]) {
          return false;
        }
        // The function checks if any of the languages or tools array have the same values as the filter object
      } else if (typeof jobObj[filter_key] === "object" && currentFilters[filter_key].length) {
        for (let arr_item of currentFilters[filter_key]) {
          if (!jobObj[filter_key].includes(arr_item)){
            // If ANY of the if loops are false the whole function will return false meaning the job Object is not in pair with the current filters 
            return false
          }
        }
      }
    }
    // The job object will be returned
    return true
  }

  const filterJobs = () => {
    /*
    if (JSON.stringify(currentFilters) === JSON.stringify(DEFAULT_FILTER_OBJ)) {
      setJobsList(allJobs);
    }
    */
    const filtered_jobs = allJobs.filter(compareFilters);
    setJobsList(filtered_jobs)
  };


  // The ThemeProvider will store these global CSS values
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


  useEffect(() => {
   filterJobs() 
  }, [currentFilters])


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
            <FilterTab
              currentFilters={currentFilters}
              removeFilter={removeFilter}
              clearFilters={clearFilters}
            >
              <div>
                <button>One</button>
                <button>Two</button>
                <button>Three</button>
              </div>
              <a href="#">Clear</a>
            </FilterTab>
            <JobsListing jobs_arr={jobsList} addFilter={addFilter} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App
