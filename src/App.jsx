import { useEffect, useState } from 'react'
import './App.css'

import desktopHeader from "./assets/bg-header-desktop.svg";
import mobileHeader from "./assets/bg-header-mobile.svg";


import data from "./data/data.json"

function App() {
  const [count, setCount] = useState(0);
  const [filters,setFilters] = useState([]);
  const [allJobs, setAllJobs] = useState([JSON.parse(JSON.stringify(data))][0]);
  const [filteredJobs,setFilteredJobs] = useState([]);




const JobTab = ({jobData}) => {
  const new_key = jobData.new;
  const {id,company,logo,featured,position,role,level,postedAt,contract,location,languages,tools} = jobData;
  console.log(id,company,logo)


}

const JobsListing = ({jobs_arr}) => {
  
  console.log(jobs_arr)

  return(
  <div className='job-listings job-tab'>
    {jobs_arr.map((job) => (
      <JobTab jobData = {job} />
    ))}
  </div>
  )
}




  return (
    <div className="container">
      <header>
        <picture className='header-picture'>
          <source srcSet={desktopHeader} alt="Header desktop" media='(min-width: 40em)' />
          <img src={mobileHeader} alt="Header mobile" />          
        </picture>
      </header>

      <div className='main-container'>
        <main>
          <JobsListing jobs_arr = {allJobs} />
        </main>
      </div>
    </div>
  );
}

export default App
