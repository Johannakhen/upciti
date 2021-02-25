import React from 'react';

const Options = ({ filter, handleInput, handlePerPage, setSort }) => {
  return (
    <div className="options">
      <div className="group">
        <input id="search" type="text" required value={filter} onChange={handleInput} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label htmlFor="search" className="search">Search</label>
      </div>
      <div className="group group-select">
        <label>Sort By</label>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="" defaultValue>None</option>
          <option value="status">Connected</option>
          <option value="last_seen_at">Most recent</option>
        </select>
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
      <div className="group group-select">
        <label>Item Per Page</label>
        <select onChange={handlePerPage}>
          <option value="10" defaultValue>10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  )
}

export default Options;