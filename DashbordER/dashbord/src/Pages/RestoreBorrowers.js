import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Borrower.css"
import { Link } from 'react-router-dom';

function RestoreBorrowers() {
  const [data, setData] = useState([])
  useEffect(() => {
    const featchdata = async () => {
      try {
        const responce = await axios.get("http://localhost:4306/restoreB");
        setData(responce.data)

      } catch (error) {
        console.log(error);
      }
    };
    featchdata();
  }, [])

  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filterdata = data.filter((borrowers) => {
    const queryLower = query ? query.toLowerCase() : ''; // Set queryLower to an empty string if query is undefined

    return (
      (borrowers.Borrower_name && borrowers.Borrower_name.toLowerCase().includes(queryLower)) ||
    (borrowers.region && borrowers.region.toLowerCase().includes(queryLower)) ||
    (borrowers.city && borrowers.city.toLowerCase().includes(queryLower)) ||
    (borrowers.state && borrowers.state.toLowerCase().includes(queryLower)) ||
    (borrowers.Borrower_id && borrowers.Borrower_id.toString().toLowerCase().includes(queryLower))
    || (borrowers.loanTypes && borrowers.loanTypes.toString().toLowerCase().includes(queryLower))
      );
  });




const handleDelete = (id) => {
  const result = window.confirm("Lender id " + id + " are you continue ");
    if (result) {
      axios.delete(`http://localhost:4306/deleteB/${id}`)
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

const handleRestore=(id)=>{
  const result=window.confirm("Are you suer to restore");
  if(result){
      axios.delete(`http://localhost:4306/TempdeleteB/${id}`, { data: { isDeleted: false } }).then(res=>{
        window.location.reload();
        window.alert("Borrower "+id+" restore sucessfull")
      }).catch(err=>{
        console.log(err);
          alert('An error occurred while deleting.');
      })
  }else{
    alert("Restore canceled")
  }
}
return (
  //conect to nodejs and retrive data from database

  <>
    <div className='heading'>
      Borrower List
    </div>
    <div className='searcha'>
      <span>Search</span>
      <input type='text' value={query} placeholder='search...' onChange={handleSearch}></input>
    </div>
    
      <div className='table'>
        <table>
          <thead className='tableheadrow'>
            <tr >
              <th>Borrower ID</th>
              <th>Name of the Borrower</th>
              <th>Region</th>
              <th>State</th>
              <th>City</th>
              <th>Loan types</th>
              {/* <th>Name of the Lender</th>
                <th>Action Taken</th>
                <th>Pending With</th>
                <th>Proposal Status</th> */}
              <th>Actions</th>
              
            </tr>
          </thead>

          <tbody className='tablebody'>
            {filterdata.length ===0 ?(
             <tr className='noData'>
             <td colSpan={7}>No data found</td>
           </tr>
            ) :(
            filterdata && filterdata.map((borrowers) => {
              return (<tr key={borrowers.Borrower_id} className='bodyrow'>
                <td>{borrowers.Borrower_id}</td>
                <td>{borrowers.Borrower_name}</td>
                <td>{borrowers.region}</td>
                <td>{borrowers.state}</td>
                <td>{borrowers.city}</td>
                <td>{borrowers.loanTypes}</td>
                {/* <td>{borrowers.Name_of_the_Lender}</td>
                  {/* <td>{borrowers.Action_Taken}</td>
                  <td>{borrowers.Pending_With}</td>
                  <td>{borrowers.Proposal_Status}</td> */}
                <td>
                <button className='update' onClick={()=>handleRestore(borrowers.Borrower_id)}>Restore</button>
                <button className='Delete' onClick={() => handleDelete(borrowers.Borrower_id)}>Delete</button>
                </td>
              </tr>)
            }))}

          </tbody>
        </table>
      </div>
    
  </>
)
}

export default RestoreBorrowers;
