import React from 'react';

const Datatable = ({ data, columns }) => {


  const handleRow = (row) => {
    return columns.map(column => {
      if (column === "last_seen_at") {
        // Format Date YY-mm-dd hh:mm
        let date_ob = new Date(row[column])
        let date = ("0" + date_ob.getDate()).slice(-2)
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
        let year = date_ob.getFullYear()
        let hours = date_ob.getHours()
        let minutes = date_ob.getMinutes()
        return <td key={column}>{year + "-" + month + "-" + date + " " + hours + ":" + minutes}</td>
      }
      // return each row and add class for status
      return <td key={column} className={`${row[column] === "disconnected" ? "status disconnected" : ""} ${row[column] === "connected" ? "status connected" : ""}`}><span>{row[column]}</span></td>
    })
  }

  return (
    <>
      <table cellSpacing="0">
        <thead>
          {/* Check if data and get all keys for heading */}
          <tr>{data[0] && columns.map(heading => <th key={heading}>{heading.replaceAll('_', ' ')}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => <tr key={i}>
            {
              handleRow(row)
            }
          </tr>)}
        </tbody>
        {/* If no results */}
        {data.length <= 0 &&
          <p> No results for your search </p>
        }
      </table>
    </>
  )
}

export default Datatable;