import React, { Fragment, useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './TeamMembers.css';
import { Link } from 'react-router-dom';
import BACKEND_API_END_POINT from '../config';


const Assign = () => {

  //for borrower
  const [borrower, setBorrower] = useState([]);
  const [selectedborrower, setSelectedborrower] = useState(null);

  // for lenders
  const [lenders, setLenders] = useState([]);
  const [selectedlenders, setSelectedlenders] = useState(null);

  // for teammembers
  const [teammember, setTeammember] = useState([]);
  const [selectedteammember, setSelectedteammember] = useState(null);

  const [editableRow, setEditableRow] = useState(null);
  const [updateData, setUpdateData] = useState({});



  //borrowers
  useEffect(() => {
    const featchdata = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_END_POINT}/borrowers`);

        const borrowers = response.data;
        const formattedOptions = borrowers.map((borrower) => ({
          value: borrower.Borrower_id,
          label: borrower.Borrower_name
        }));
        setBorrower(formattedOptions);
      }
      catch (error) {
        console.log(error)
      }
    };
    featchdata();
  }, [])

  const handelChangeBorrower = (selectedOption) => {
    setSelectedborrower(selectedOption)
  }


  //for lenders
  useEffect(() => {
    const featchdata = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_END_POINT}/lenders`);
        const lenders = response.data;
        const formattedOptions = lenders.map((lender) => ({
          value: lender.Lender_Id,
          label: lender.lender_Name,
        }));
        setLenders(formattedOptions);
      }
      catch (error) {
        console.error(error)
      }
    }
    featchdata();
  }, [])

  const handelChangeLender = (selectedOption) => {
    setSelectedlenders(selectedOption)
  }


  //for teammembers
  useEffect(() => {
    const featchdata = async () => {
      try {
        await axios.get(`${BACKEND_API_END_POINT}/teammembers`).then(responce => {
          const teammembers = responce.data;
          const formattedOptions = teammembers.map((teammember) => ({
            value: teammember.TeamM_id,
            label: teammember.FirstName,
          }));
          setTeammember(formattedOptions);
        })
      } catch (error) {
        console.log(error)
      }
    }
    featchdata();
  }, [])

  const handelChangeTeammember = (selectedOption) => {
    setSelectedteammember(selectedOption)
  }


  const optionslist = [
    { value: "Existing", label: "Existing" },
    { value: "Negtive", label: "Negtive" },
    { value: "Approval Given", label: "Approval Given" },
    { value: "Approval Not given", label: "Approval Not given" },
  ]

  const [selectedOption, setSelectedOptions] = useState({});
  const handelChangeoptions = (option) => {
    setSelectedOptions(option);
  }


  const handleAssigntotable = () => {
    if (!selectedborrower || !selectedlenders) {
      window.alert('Please select a borrower and a lender.');
      return;
    }
    const borrowerIdToUpdate = selectedborrower.value;
    const borrowerNameToUpdate = selectedborrower.label;
    const lenderIdToUpdate = selectedlenders.value;
    const lenderNameToUpdate = selectedlenders.label;
    const teammemberIdToUpdate = selectedteammember.value;
    const teammemberNameToUpdate = selectedteammember.label;
    const selectedoptionToUpdated = selectedOption.value;
    axios.post(`${BACKEND_API_END_POINT}/checkforApprovalTABEL`, {
      borrowerId: borrowerIdToUpdate,
      lenderId: lenderIdToUpdate,
    }).then((response) => {
      const { borrowerExists } = response.data;
      window.alert("lender and borrowers are exist", borrowerExists)
      if (!borrowerExists) {
        // Create the assignment without sending a response
        return axios.post(`${BACKEND_API_END_POINT}/assign`, {
          borrowerId: borrowerIdToUpdate,
          borrowerName: borrowerNameToUpdate,
          lenderId: lenderIdToUpdate,
          lenderName: lenderNameToUpdate,
          teammemberId: teammemberIdToUpdate,
          teammemberName: teammemberNameToUpdate,
          option: selectedoptionToUpdated,
        });
      }
      else {
        // Show confirmation message to update
        const confirmUpdate = window.confirm("Are you sure you want to update?");
        if (confirmUpdate) {
          // Update the assignment
          return axios.post(`${BACKEND_API_END_POINT}/assign`, {
            borrowerId: borrowerIdToUpdate,
            borrowerName: borrowerNameToUpdate,
            lenderId: lenderIdToUpdate,
            lenderName: lenderNameToUpdate,
            teammemberId: teammemberIdToUpdate,
            teammemberName: teammemberNameToUpdate,
            option: selectedoptionToUpdated,
          }
          );
        } else {
          // Return a resolved promise
          return Promise.resolve();
        }
      }
    }).catch((error) => {
      console.error("Error while assigning:", error);
      window.alert("Error while assigning");
    });

    { setSelectedborrower(""); setSelectedlenders(""); setSelectedteammember(""); setSelectedOptions("") }
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    const featchdata = async () => {
      try {
        const responce = await axios.get(`${BACKEND_API_END_POINT}/retriveApprovals`);
        setData(responce.data)
      } catch (error) {
        console.log(error);
        window.alert("error while updateing")
      }

    }
    featchdata();
  }, [])


  //filtering for each column
  const [queryID, setQueryID] = useState('');
  const [queryborrower, setQueryBorrower] = useState('');
  const [querylender, setQueryLender] = useState('');
  const [queryapproval, setQueryApproval] = useState('');
  const [queryupdatedby, setQueryupdatedby] = useState('');
  const [queryDate, setQueryDate] = useState('');
  const [querylastDate, setQuerylastDate] = useState('');

  const handelFilterId = (event) => {
    setQueryID(event.target.value.trim().toLowerCase());
  }

  const handelfilterDate = (event) => {
    setQueryDate(event.target.value.toLowerCase());
  }

  const handelfilterlastDate = (event) => {
    setQuerylastDate(event.target.value.toLowerCase());
  }

  const handelFilterborrower = (event) => {
    setQueryBorrower(event.target.value.toLowerCase());
  }

  const handelFilterapproval = (event) => {
    setQueryApproval(event.target.value.toLowerCase());
  }

  const handelFilterLender = (event) => {
    setQueryLender(event.target.value.toLowerCase());
  }

  const handelFilterupdatedby = (event) => {
    setQueryupdatedby(event.target.value.toLowerCase());
  }

  const clear = () => {
    setQueryApproval(""); setQueryBorrower(""); setQueryLender(""); setQueryID(''); setQueryupdatedby(''); setQueryDate(''); setQuerylastDate('');
  }


  const filterData = data.filter((approvals) => {
    const approvalid = approvals.aprovalid ? approvals.aprovalid.toString().toLowerCase() : '';
    const filterDate = approvals.Date_of_creation ? approvals.Date_of_creation.toString().toLowerCase() : '';
    const filterlastDate = approvals.lastupdate ? approvals.lastupdate.toString().toLowerCase() : '';
    const borrowerName = approvals.borrower_name ? approvals.borrower_name.toLowerCase() : '';
    const lendername = approvals.lender_name ? approvals.lender_name.toLowerCase() : '';
    const approval = approvals.lender_approval ? approvals.lender_approval.toLowerCase() : '';
    const updatedby = approvals.updated_by ? approvals.updated_by.toLowerCase() : '';

    return (
      approvalid.includes(queryID) && borrowerName.includes(queryborrower) &&
      lendername.includes(querylender) && approval.includes(queryapproval) &&
      updatedby.includes(queryupdatedby) && filterDate.includes(queryDate) &&
      filterlastDate.includes(querylastDate)
    )
  })


  const handelUpdate = (approvalId) => {
    if (editableRow === approvalId) {
      //cancel editing
      setEditableRow(null);
      setUpdateData({});
    } else {
      // Start editing
      setEditableRow(approvalId);
      // Set the last updated date
      const selectedApproval = data.find((approval) => approval.Approval_id === approvalId);
      setUpdateData({ ...selectedApproval, lastupdate: selectedApproval.lastupdate });
    }
  }

  const handelChange = (e, fieldName) => {
    const value = e.target.value;
    setUpdateData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  }

  const handelSave = (approvalId) => {
    const updatedData = {
      Approval_id: updateData.Approval_id || approvalId,
      Date_of_creation: updateData.Date_of_creation || '',
      lastupdate: updateData.lastupdate || '',
      borrower_name: updateData.borrower_name || '',
      lender_name: updateData.lender_name || '',
      lender_approval: updateData.lender_approval || '',
      updated_by: updateData.updated_by || '',
    };
    console.log(updatedData)
    axios.post(`${BACKEND_API_END_POINT}/updatetoAproval/${approvalId}`, updatedData)
      .then(responce => {
        const msg = responce.data
        console.log("status updated  succcessfully");
        window.alert("Approval status is updated");
      }).catch((error) => {
        console.error("Error while assigning:", error);
        window.alert("Error while assigning");
      });

    setEditableRow(null);
    setUpdateData({});
  }


  return (
    <div className='assignformandtable'>
      <div className='approvaltable'>
        {/* <button className='createbutton'><Link to={'/LenderAprovalform'}>Create New</Link></button> */}
        <div><h3>Lender Approval Records</h3></div>
        <div className='containt'>
          <table>
            <thead>
              <tr>
                <th>Date of creation <input type='text' value={queryDate} onChange={handelfilterDate} placeholder='Date' className='search' /> </th>
                <th>Last updated <input type='text' value={querylastDate} onChange={handelfilterlastDate} placeholder='Date' className='search' /></th>
                <th>Borrower Name  <input type='text' value={queryborrower} onChange={handelFilterborrower} placeholder='Name' className='search'></input></th>
                <th>Lender Name  <input type='text' value={querylender} onChange={handelFilterLender} placeholder='Name' className='search'></input></th>
                <th>Lender Approval  <input type='text' value={queryapproval} onChange={handelFilterapproval} placeholder='Approval' className='search'></input></th>
                <th>Updated By  <input type='text' value={queryupdatedby} onChange={handelFilterupdatedby} placeholder='Name' className='search'></input></th>
                <th><button onClick={clear} className='deletebtn'>ClEAR</button></th>
              </tr>
            </thead>
            <tbody>
              {filterData && filterData.map((approvals) => {
                const isEditable = editableRow === approvals.Approval_id;
                return (
                  <Fragment key={approvals.Approval_id}>
                    <tr>
                      <td>{approvals.Date_of_creation}</td>
                      <td>{approvals.lastupdate}</td>
                      <td>{approvals.borrower_name}</td>
                      <td>{approvals.lender_name}</td>
                      <td>{approvals.lender_approval}</td>
                      <td>{approvals.updated_by}</td>
                      <td>
                        <button className={`deletebtn ${isEditable ? 'cancel' : ''}`} onClick={() => handelUpdate(approvals.Approval_id)}>
                          {isEditable ? 'Cancel' : 'Edit'}</button>
                      </td>
                    </tr>
                    {isEditable && (
                      <tr>

                        <td>
                          <input
                            name='Date_of_creation'
                            type='text'
                            value={updateData.Date_of_creation || approvals.Date_of_creation}
                            onChange={(e) => handelChange(e, 'Date_of_creation')}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            name='lastupdate'
                            type='date'
                            value={updateData.lastupdate || approvals.lastupdate}
                            onChange={(e) => handelChange(e, 'lastupdate')}
                          />
                        </td>
                        <td>
                          <input
                            name='borrower_name'
                            type='text'
                            value={updateData.borrower_name || approvals.borrower_name}
                            onChange={(e) => handelChange(e, 'borrower_name')}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            name='lender_name'
                            type='text'
                            value={updateData.lender_name || approvals.lender_name}
                            onChange={(e) => handelChange(e, 'lender_name')}
                            readOnly
                          />
                        </td>
                        <td>
                          <select
                            name='lender_approval'
                            value={updateData.lender_approval || approvals.lender_approval}
                            onChange={(e) => handelChange(e, 'lender_approval')}
                          >
                            <option>Select</option>
                            {optionslist.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type='text'
                            name='updated_by'
                            value={updateData.updated_by || approvals.updated_by}
                            onChange={(e) => handelChange(e, 'updated_by')}
                            readOnly
                          />
                        </td>
                        <td>
                          <button className='deletebtn' onClick={() => handelSave(approvals.Approval_id)}>
                            Save
                          </button>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Assign
