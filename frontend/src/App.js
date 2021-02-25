import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as _ from "lodash";

import Datatable from './components/Datatable'
import Pagination from './components/Pagination'
import Options from './components/Options';

import './styles/App.scss';
import { BsArrowLeft } from 'react-icons/bs';

const dataExample = require('./data.json');

const App = () => {
  const [data, setData] = useState([])
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState("")

  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  const [columnsKey, setColumnsKey] = useState(true)


  useEffect(() => {
    const rand = Math.floor(Math.random() * 6) + 40
    // Get random number of devices
    axios
      .get(`http://${window.location.hostname}:8010/devices?n=${rand}`)
      .then(res => {
        setData(res.data)
        // Get data length and keys for filter and pagination
        setItems(res.data.length)
        setColumnsKey(res.data[0] && Object.keys(res.data[0]))
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        alert('Error getting data will use dummy data')
        setData(dataExample)
        setItems(dataExample.length)
        setColumnsKey(dataExample[0] && Object.keys(dataExample[0]))
        setLoading(false)
      })
  }, []);

  const search = (rows) => {
    // Filter datas using keys and sort
    const columns = Object.keys(rows[0])
    const searchItems = _.sortBy(rows, sort).filter(row => columns.some(column => row[column].toString().toLowerCase().indexOf(filter.toLowerCase()) > -1))
    setTimeout(() => {
      // Set timeout to recalculate pagination
      setItems(searchItems.length)
    }, 300);
    return searchItems.slice(indexOfFirstPost, indexLastItem)
  }

  const indexLastItem = currentPage * itemPerPage
  const indexOfFirstPost = indexLastItem - itemPerPage

  const handleInput = (e) => {
    // Get search value and reset go back to first page
    setFilter(e.target.value)
    setCurrentPage(1)
  }
  const handlePerPage = (e) => {
    // Change value of items per page and reset go back to first page
    setItemPerPage(e.target.value)
    setCurrentPage(1)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const [sort, setSort] = useState([])

  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="sidebar">
          <h1><img src="https://www.upciti.com/wp-content/themes/upciti/img/svg/upciti-track.svg" alt="logo" className="logo" /></h1>
          <ul className="menu">
            <li className="menu__list">Dashboard</li>
            <li className="menu__list active" >Cameras<span>{data.length}</span></li>
            <li className="menu__list">History</li>
          </ul>
        </div>
        <div className="container">
          {
            data && !loading &&
            <div className="feed">
              <div className="feed__title"><BsArrowLeft />Cameras</div>
              {/* Search change item per page and sort */}
              <Options filter={filter} handleInput={handleInput} handlePerPage={handlePerPage} setSort={setSort} />
              <Datatable data={search(data)} columns={columnsKey} />
              <Pagination itemPerPage={itemPerPage} totalItem={items} paginate={paginate} current={currentPage} />
            </div>
          }
          {
            loading &&
            <div className="feed">
              Fetching datas ...
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App