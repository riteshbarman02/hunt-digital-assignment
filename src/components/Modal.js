import React, { useState } from 'react'
import "./Modal.css"
export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(defaultValue||{
    id: "",
    start: null,
    enddate: null,
    leadcount: "",
    daysDifference: null,
    datesExcluded: null,
    expectedDrr: null,
    lastUpdated: null
  });

  //to print the error if all fields are not filled or start date is bigger than end date
  const [errors, seterrors] = useState("")

  const validateForm = () => {
    if (formState.start && formState.enddate && formState.leadcount && formState.datesExcluded) {
      seterrors("");
      return true;
    }
    else {
      seterrors("Please fill all fields.");
      return false;
    }
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    calculateNoOfDays();
    expectedDrr();
    dateValidate();
    calcMonth();
    currentDateAndTime();
    onSubmit(formState);
    closeModal();
    sendData();

  };

  const dateValidate = () => {
    let date1 = new Date(formState.start);
    let date2 = new Date(formState.enddate);
    if (date1 < date2) {
      return true;
    }
    else {
      seterrors("start date shoould be smaller than end date!!")
      return false;
    }
  }

  const calculateNoOfDays = () => {
    const startDate = new Date(formState.start);
    const endDate = new Date(formState.enddate);
    const diffInMs = Math.abs(endDate - startDate);
    formState.daysDifference = (diffInMs / (1000 * 60 * 60 * 24)) - 1;
    return formState.daysDifference;
  }

  const currentDateAndTime = () => {
    let date = new Date().toISOString();
    formState.lastUpdated = date;
    return formState.lastUpdated
  }

  const calcMonth = () => {
    let date = new Date(formState.start);
    formState.month = (date.getMonth() + 1).toString().padStart(2, '0');
    return formState.month;
  }

  const expectedDrr = () => {
    let leadCount = formState.leadcount;
    let daysDifference = formState.daysDifference;
    formState.expectedDrr = (leadCount / daysDifference);
  }

  const sendData = () => {
    // Convert the object to a JSON string
    var jsonData = JSON.stringify(formState);
    console.log(jsonData)
    // Make an AJAX request using the fetch API
    fetch('../data.json', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json',},
      body: jsonData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // If you expect a JSON response from the server
      })
      .then(data => {
        console.log('Data sent successfully:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className='modal-container' onClick={(e) => {
      if (e.target.className === "modal-container")
        closeModal();
    }}
    >
      <div className='modal'>
        <form >
          <div className='form-group'>
            <label htmlFor="id">ID</label>
            <input type="text" name="id" id='id' value={formState.id} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="start">Start Date</label>
            <input type='date' name="start" id="start" value={formState.startdate} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="end">End Date</label>
            <input type='date' name="enddate" id="end" value={formState.enddate} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="datesExcluded">Dates Excluded</label>
            <input type='date' name="datesExcluded" id="datesExcluded" min={formState.start} max={formState.enddate} value={formState.datesExcluded} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="leadcount">Lead Count</label>
            <input type='number' name="leadcount" id="leadcount" value={formState.leadcount} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <span onChange={handleChange} value={formState.daysDifference}></span>
          </div>
          <div className='form-group'>
            <span onChange={handleChange} value={formState.month}></span>
          </div>
          <div className='form-group'>
            <span onChange={handleChange} value={formState.expectedDrr}></span>
          </div>
          <div className='form-group'>
            <span onChange={handleChange} value={formState.lastUpdated}></span>
          </div>
          <div className='errors'>
            {errors}
          </div>


          <button type="submit" className='btn' onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  )
}
