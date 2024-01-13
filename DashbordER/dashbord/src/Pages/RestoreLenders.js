import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Borrower.css"
import { Link } from 'react-router-dom';


function RestoreLenders() {
  const [data, setData] = useState([])
  useEffect(() => {
    const featchdata = async () => {
      try {
        const responce = await axios.get("http://192.168.29.250:4306/restoreL");
        setData(responce.data)

      } catch (error) {
        console.log(error);
      }
    };
    featchdata();
  }, [])



  const handleDelete = (id) => {

    const result = window.confirm("Lender id " + id + " are you continue ");
    if (result) {
      axios.delete(`http://192.168.29.250:4306/deleteL/${id}`)
        .then(res => {
          alert("Lender id " + id + " deleted successfully");
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
          alert('An error occurred while deleting.');
        });
    } else {
      alert('Deletion Cancelled!');
    }
  }

  const handleRestore = (id) => {

    const result = window.confirm("Are you suer to Restore")
    if (result) {
      axios.delete(`http://192.168.29.250:4306/TempdeleteL/${id}`, { data: { isDeleted: false } }).then(res => {
        window.location.reload();
        window.alert("Lender id " + id + " Restore successfully");

      })
        .catch(err => {
          console.log(err);
          alert('An error occurred while deleting.');
        });
    }
    else {
        alert("Deleteation Cancelation")
    }

  }

  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filterdata = data.filter((lenders) => {
    const queryLower = query ? query.toLowerCase() : ''; // Set queryLower to an empty string if query is undefined

    return (
      (lenders.lender_Name && lenders.lender_Name.toLowerCase().includes(queryLower)) ||
      (lenders.Region && lenders.Region.toLowerCase().includes(queryLower)) ||
      (lenders.city && lenders.city.toLowerCase().includes(queryLower)) ||
      (lenders.State && lenders.State.toLowerCase().includes(queryLower)) ||
      (lenders.Lender_Id && lenders.Lender_Id.toString().toLowerCase().includes(queryLower)) ||
      (lenders.LoanTypes && lenders.LoanTypes.toString().toLowerCase().includes(queryLower))
    );
  });




  return (
    //conect to nodejs and retrive data from database
    <>
      <div className='heading'>
        Lender List
      </div>
      <div>
        <div className='searcha'>
          <span>Search </span>
          <input type='text' value={query} placeholder='Search....' onChange={handleSearch}></input>
        </div>
        <div className='tableL'>

          <table>
            <thead className='tableheadrow'>
              <tr >
                <th>Lender ID </th>
                <th>Name of the Lender</th>
                <th>Region</th>
                <th>State</th>
                <th>City</th>
                <th>Loan Types</th>
                <th>Action</th>
                {/* <th>Action Taken</th>
                <th>Pending With</th>
                <th>Proposal Status</th> */}
              </tr>
            </thead>

            <tbody className='tablebody'>
              {filterdata.length ===0 ? (
                <tr className='noData'>
                <td colSpan={7}>No data found</td>
              </tr>
              ) : (
              filterdata && filterdata.map((lenders) => {
                return (
                  <tr key={lenders.Lender_Id} className='bodyrow'>
                    <td>{lenders.Lender_Id}</td>
                    <td>{lenders.lender_Name}</td>
                    <td>{lenders.Region}</td>
                    <td>{lenders.State}</td>
                    <td>{lenders.city}</td>
                    <td>{lenders.LoanTypes}</td>
                    {/* <td>{lenders.Name_of_the_Lender}</td>
                  <td>{lenders.Action_Taken}</td>
                  <td>{lenders.Pending_With}</td>
                  <td>{lenders.Proposal_Status}</td> */}
                    <td>
                      <button className='update' onClick={()=>handleRestore(lenders.Lender_Id)}>Restore</button>
                      <button className='Delete' onClick={() => handleDelete(lenders.Lender_Id)}>Delete</button>
                    </td>
                  </tr>)
              }))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default RestoreLenders;
