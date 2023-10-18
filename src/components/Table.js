import React from 'react'
import './Table.css'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

export const Table = ({rows,deleteRow,editRow}) => {
    return (
        <div className='table-wrapper'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Month,Year</th>
                        <th>Dates Excluded</th>
                        <th>Number of Days</th>
                        <th>Lead Count</th>
                        <th className='expand'>Expected DRR</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                   {
                     rows.map((row,idx)=>{
                        return <tr key={idx}>
                            <td>
                            <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn" onClick={()=> deleteRow(idx)}
                    />
                    <BsFillPencilFill onClick={()=> editRow(idx)}
                      className="edit-btn"
                    />
                  </span>
                            </td>
                            <td>{row.id}</td>
                            <td>{row.start}</td>
                            <td>{row.enddate}</td>
                            <td>{row.month}</td>
                            <td>{row.datesExcluded}</td>
                            <td>{row.daysDifference}</td>
                            <td>{row.leadcount}</td>
                            <td>{row.expectedDrr}</td>
                            <td>{row.lastUpdated}</td>
                        </tr>
                     })
                   }

                </tbody>
            </table>
        </div>
    )
}

