import React, { useEffect, useState } from 'react'
import "./Contactdetailes.css"
import axios from 'axios';

const Contactdetailes = () => {

  function submit() {
    const msg="Contact detailes submited successfully to "+ selectedBorrower;
    alert(msg)

  }

  //retriving name of the borower data from database
  const [borrowers, setBorrowers] = useState([]);
  const [selectedBorrower, setSelectedBorrower] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4306/retriveName')
      .then(response => {
        setBorrowers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleselectchange = event => {
    setSelectedBorrower(event.target.value);
  }
  return (
    <>
      <div className='Contact'><h1>Contact Detailes</h1></div>
      <form>
        <div className='contactform'>
          <label >Company name/<br></br>Borrower Name</label>
          <select className='companys' value={selectedBorrower} onChange={handleselectchange}>
            <option value="">select the company/Name of Borrower</option>
            {borrowers.map(borrower => (
          <option key={borrower.Borrower_Id} value={borrower.Name_of_the_Borrower}>
            {borrower.Name_of_the_Borrower}
          </option>
        ))}
          </select>
          <br></br>
          <label>Name of the Person</label>
          <input type='text' placeholder='Enter your name' pattern='[a-zA-Z]{0-20}'></input>
          <br></br>
          <label>
            Email address
          </label>
          <input type='text'></input>
          <br></br>
          <label>TO/CC</label>
          <select>
            <option>select TO/CC</option>
            <option value="TO">TO</option>
            <option value="CC">CC</option>
          </select>
          <br></br>
          <label>Designation</label>
          <input></input>
          <br></br>
          <label>Mobile Number</label>
          <input type='text'></input>

          <br></br>
          <div className='Update'></div>
          <button type='submit' onClick={submit}>Update to Database</button>
        </div>
      </form >
    </>
  )
}
export default Contactdetailes
