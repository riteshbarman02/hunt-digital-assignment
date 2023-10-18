import './App.css';
import { Table } from './components/Table';
import { Modal } from './components/Modal';
import { useState } from 'react';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    { 
      Action: "N/A", 
      id: "N/A", 
      start: "yyyy-mm-dd", 
      datesExcluded: "yyyy-mm-dd", 
      enddate: "yyyy-mm-dd", 
      month: "N/A", 
      daysDifference: "N/A", 
      leadcount: "N/A",
      expectedDrr:"N/A",
      lastUpdated:"yyyy-mm-dd/hh-mm-ss"
   }
  ]);
  const [RowtoEdit , setRowtoEdit] = useState(null)

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex))
  }
  const handleEditRow = (idx) => {
    setRowtoEdit(idx);

    setModalOpen(true);
  }

  const handleSubmit = (newRow) => {
    RowtoEdit === null
    ? setRows([...rows, newRow])
    :setRows(
      rows.map((currRow,idx) => {
        if(idx!== RowtoEdit) return currRow;

        return newRow;
      })
    )
    }
  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow}/>
      <button className='btn' onClick={() => setModalOpen(true)}>Add</button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
          }}
         onSubmit={handleSubmit}
         defaultValue={RowtoEdit !== null && rows[RowtoEdit]}
        />
      )
      }
    </div>
  );
}

export default App;
