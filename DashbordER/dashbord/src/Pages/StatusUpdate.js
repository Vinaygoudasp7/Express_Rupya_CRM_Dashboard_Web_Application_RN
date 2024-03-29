import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Readonlyrow from './Readonlyrow';
import Editabletorow from './Editabletorow';
import ReactDOMServer from 'react-dom/server';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from './ReminderNotification';
import moment from 'moment'
import BACKEND_API_END_POINT from '../config';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

const StatusUpdate = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  //for setting editable row
  const [editStatusId, setEditstatusId] = useState(null);

  //for setting data to editable 
  const [editTableRow, setEditTableRow] = useState({
    Date_of_entery: '',
    lastupdate: '',
    borrower_name: '',
    lender_name: '',
    action_Taken: '',
    Pending_with: '',
    Praposal_status: '',
    Comment: '',
    updated_by: '',
    Next_followup_Date: '',
  });


  useEffect(() => {
    const featchdata = async () => {
      try {
        const responce = await axios.get(`${BACKEND_API_END_POINT}/retrivestatus`);
        const statusUpdateData = responce.data
        setData(statusUpdateData);
        console.log(responce.data)
      } catch (error) {
        console.log("error while retriving data", error);
        window.alert("Error while retriving data")
      }
    }
    featchdata();
  }, [])

  //filtering for each column
  const [querylastupDate, setQuerylastupDate] = useState('');
  const [querydateofcreation, setQuerydateofcreation] = useState('');
  const [queryborrower, setQueryBorrower] = useState('');
  const [querylender, setQueryLender] = useState('');
  const [queryaction, setQueryactions] = useState('');
  const [querypraposal, setQuerypraposal] = useState('');
  const [querypending, setQuerypending] = useState('');
  const [queryupdatedby, setQueryupdatedby] = useState('');
  const [queryNextfollowup, setQueryNextfollowup] = useState('');


  const handelFilterDate = (event) => {
    setQuerydateofcreation(event.target.value.toLowerCase());
  }

  const handelFilterLastDate = (event) => {
    setQuerylastupDate(event.target.value.toLowerCase());
  }

  const handelFilterborrower = (event) => {
    setQueryBorrower(event.target.value.toLowerCase());
  }

  const handelFilterpraposal = (event) => {
    setQuerypraposal(event.target.value.toLowerCase());
  }

  const handelFilterLender = (event) => {
    setQueryLender(event.target.value.toLowerCase());
  }

  const handelFilterupdatedby = (event) => {
    setQueryupdatedby(event.target.value.toLowerCase());
  }

  const handelaction = (event) => {
    setQueryactions(event.target.value.toLowerCase());
  }

  const handelFilterpendings = (event) => {
    setQuerypending(event.target.value.toLowerCase());
  }

  const handelNextFollowupDate = (event) => {
    setQueryNextfollowup(event.target.value.toLowerCase());
  }

  const clear = () => {
    setQuerydateofcreation(''); setQueryBorrower(""); setQueryLender(""); setQueryactions('');
    setQuerypending(''); setQuerypraposal(""); setQueryupdatedby(''); setQuerylastupDate(''); setQueryNextfollowup('');
  }

  const filterData = data.filter((statusupdates) => {
    const dateofcreation = statusupdates.Date_of_Creation ? statusupdates.Date_of_Creation.toString().toLowerCase() : '';
    const lastupdate = statusupdates.lastupdate ? statusupdates.lastupdate.toString().toLowerCase() : '';
    const borrowerName = statusupdates.borrower_name ? statusupdates.borrower_name.toLowerCase() : '';
    const lendername = statusupdates.lender_name ? statusupdates.lender_name.toLowerCase() : '';
    const actions = statusupdates.action_Taken ? statusupdates.action_Taken.toLowerCase() : '';
    const praposals = statusupdates.Praposal_status ? statusupdates.Praposal_status.toLowerCase() : '';
    const pendings = statusupdates.Pending_with ? statusupdates.Pending_with.toLowerCase() : '';
    const updatedby = statusupdates.updated_by ? statusupdates.updated_by.toLowerCase() : '';
    const nextfollowup = statusupdates.Next_followup_Date ? statusupdates.Next_followup_Date.toLowerCase() : '';
    return (
      dateofcreation.includes(querydateofcreation) && borrowerName.includes(queryborrower) &&
      lendername.includes(querylender) && actions.includes(queryaction) && praposals.includes(querypraposal)
      && pendings.includes(querypending) && updatedby.includes(queryupdatedby) && lastupdate.includes(querylastupDate)
      && nextfollowup.includes(queryNextfollowup)
    )
  })


  const handelEditClick = (event, statusupdates) => {
    event.preventDefault();
    setEditstatusId(statusupdates.St_id);
    setEditTableRow({
      Date_of_Creation: statusupdates.Date_of_Creation,
      lastupdate: statusupdates.lastupdate,
      borrower_name: statusupdates.borrower_name,
      lender_name: statusupdates.lender_name,
      action_Taken: statusupdates.action_Taken,
      Pending_with: statusupdates.Pending_with,
      Praposal_status: statusupdates.Praposal_status,
      Comment: statusupdates.Comment,
      updated_by: statusupdates.updated_by,
      Next_followup_Date: statusupdates.Next_followup_Date
    });
  }

  const handeleditrowchange = (event) => {
    event.preventDefault();

    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setEditTableRow((prevEditTableRow) => ({
      ...prevEditTableRow,
      [fieldName]: fieldValue
    }))
  }

  // const [specificteammember, setSpecificteammember] = useState('');

  // useEffect(() => {
  //   const specificteammemberdetaile = data.find(
  //     (statusupdates) => statusupdates.St_id === editStatusId
  //   );

  //   setSpecificteammember(specificteammemberdetaile);
  //   console.log(specificteammember);

  // }, [editStatusId, data])


  // const filterteammemberData = data.filter((teammember) => {
  //   const currentDate = new Date();
  //   const nextFollowupDate = new Date(teammember.Next_followup_Date);
  //   if (specificteammember && specificteammember.teammember_id === teammember.teammember_id
  //     && nextFollowupDate <= currentDate
  //   ) {
  //     return true;
  //   }
  //   return false;
  // })

  // const table =
  //   (<table border="1" style={{ borderSpacing: "0" }}>
  //     <thead style={{ backgroundColor: 'aquamarine', border: "2px solid rgb(0, 204, 255)" }}>
  //       <tr >
  //         <th style={{ padding: "5px" }}>Date of creation</th>
  //         <th style={{ padding: "5px" }}>Last update</th>
  //         <th style={{ padding: "5px" }}>Borrower Name </th>
  //         <th style={{ padding: "5px" }}>Lender Name </th>
  //         <th style={{ padding: "5px" }}>Action Taken </th>
  //         <th style={{ padding: "5px" }}>Pending with </th>
  //         <th style={{ padding: "5px" }}>Praposal Status </th>
  //         <th style={{ padding: "5px" }}>Comment/Query </th>
  //         <th style={{ padding: "5px" }}>Updated By  </th>
  //         <th style={{ padding: "5px" }}>Next followup Date </th>
  //       </tr>
  //     </thead>
  //     <tbody style={{ border: "2px solid rgb(0, 204, 255)", padding: "5px" }}>
  //       {filterteammemberData.map((statusdetailes) => {
  //         return (
  //           <tr key={statusdetailes.St_id}>
  //             <td style={{ padding: "5px" }}>{statusdetailes.Date_of_Creation}</td>
  //             <td style={{ padding: "5px" }}>{statusdetailes.lastupdate}</td>
  //             <td style={{ padding: "5px" }}>{statusdetailes.borrower_name}</td>
  //             <td style={{ padding: "5px" }}>{statusdetailes.lender_name}</td>
  //             <td style={{ padding: "5px" }}>{statusdetailes.action_Taken}</td>
  //             <td style={{ padding: "5px" }}>{statusdetailes.Pending_with}</td>
  //             <td style={{ padding: "5px" }}>{statusdetailes.Praposal_status}</td>
  //             <td style={{ padding: "5px" }}>"please refer status table"</td>
  //             <td style={{ padding: "5px" }}>{statusdetailes.updated_by}</td>
  //             <td style={{ padding: "5px" }}>{statusdetailes.Next_followup_Date}</td>
  //           </tr>
  //         )
  //       })}
  //     </tbody>
  //   </table>
  //   );
  // const tableHtml = ReactDOMServer.renderToString(table);


  // const sendReminderMail = async () => {
  //   const loadingToastId = toast.info('Sending email...', { autoClose: false });

  //   //const emaillist = "expressrupya@gmail.com";
  //   const emaillist = "vinaysp254@gmail.com"

  //   const cclist = [];
  //   cclist.push(specificteammember.teammember.Email_address);
  //   cclist.push("statusexpressrupya@gmail.com")
  //   cclist.push("vinaysp254@gmail.com");
  //   const message = `${tableHtml}`;
  //   const subject = "Regarding status updates";

  //   // Log the values before sending the email
  //   console.log("emaillist:", emaillist);
  //   console.log("cclist:", cclist);
  //   console.log("message:", message);
  //   console.log("subject:", subject);
  //   try {
  //     const response = await fetch(`${BACKEND_API_END_POINT}/sendEmailreminder`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         emaillist,
  //         cclist,
  //         subject,
  //         message,
  //       })
  //     });
  //     // Handle the response here

  //     console.log("email sent...", response);

  //     toast.update(loadingToastId, {
  //       render: 'Reminder is sent to your Email',
  //       type: toast.TYPE.SUCCESS,
  //       position: 'top-right',
  //       autoClose: 4000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined
  //     })
  //   } catch (error) {
  //     // Handle errors here

  //     toast.error('Failed to send reminder email!', {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   }
  // }

  // const setReminder = (nextFollwupUpDate) => {
  //   const checkReminder = () => {
  //     //set reminder based on the next followup date
  //     const currentDate = new Date()
  //     const nextFollupdate = new Date(nextFollwupUpDate)

  //     if (nextFollupdate <= currentDate) {
  //       sendReminderMail();
  //     }
  //   }

  //   // Check the reminder every hour
  //   const reminderInterval = setInterval(checkReminder, 60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds

  //   // Stop checking when nextFollupdate is reached
  //   const stopReminder = () => {
  //     clearInterval(reminderInterval);
  //   };


  //   // Calculate the duration until nextFollupdate
  //   const timeUntilNextFollupdate = new Date(nextFollwupUpDate) - new Date();

  //   // Schedule stopReminder when nextFollupdate is reached
  //   setTimeout(stopReminder, timeUntilNextFollupdate);

  // }

  const handelEditrowsave = async (event) => {
    event.preventDefault();

    const editRow = {
      Date_of_Creation: editTableRow.Date_of_Creation,
      lastupdate: editTableRow.lastupdate,
      borrower_name: editTableRow.borrower_name,
      lender_name: editTableRow.lender_name,
      action_Taken: editTableRow.action_Taken,
      Pending_with: editTableRow.Pending_with,
      Praposal_status: editTableRow.Praposal_status,
      Comment: editTableRow.Comment,
      updated_by: editTableRow.updated_by,
      Next_followup_Date: editTableRow.Next_followup_Date,
    }

    console.log(editRow);

    try {
      const responce = await axios.post(`${BACKEND_API_END_POINT}/statusupdateData/${editStatusId}`, editRow);
      console.log(responce.data);

      //update the data in the local state
      const updatedData = data.map((statusupdates) => {
        if (statusupdates.St_id === editStatusId) {
          return {
            ...statusupdates,
            ...editRow
          }
        }
        return statusupdates;
      });
      setData(updatedData);
      setEditstatusId(null);
      const responcedata = responce.data
      if ('message' in responcedata) {
        // sendReminderMail()
        // setReminder(editTableRow.Next_followup_Date)
        toast.success('Status updated', {
          autoClose: 4000,
          hideProgressBar: true,
          position: 'top-right',
        })
      } else {
        toast.error('Some error occured!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

    } catch (error) {
      // toast.error('Some error occured!', {
      //   position: toast.POSITION.TOP_RIGHT,
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
      console.error('error updateing data', error)
    }
  }

  const handelCancel = () => {
    setEditstatusId(null);
    setEditTableRow({
      Date_of_Creation: '',
      lastupdate: '',
      borrower_name: '',
      lender_name: '',
      action_Taken: '',
      Pending_with: '',
      Praposal_status: '',
      Comment: '',
      updated_by: '',
      Next_followup_Date: '',
    })
  }

  const handelSort = (key) => {
    let direction = sortConfig.key === key ? (sortConfig.direction === 'asc' ? 'desc' : 'asc') : '';

    setSortConfig({ key, direction });

    const sortedData = [...filterData].sort((a, b) => {
      if (key === 'aum' || key === 'maxInterestRate' || key === 'minLoanAmount') {
        return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
      } else if (a[key] === undefined || b[key] === undefined) {
        return 0; // Treat undefined values as equal
      } else if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        // For case-insensitive string comparison
        const strA = a[key].toUpperCase(); // Convert to uppercase for comparison
        const strB = b[key].toUpperCase(); // Convert to uppercase for comparison
        const comparison = strA < strB ? -1 : strA > strB ? 1 : 0;
        return direction === 'asc' ? comparison : -comparison;
      } else {
        // For other types of data comparison (assuming numbers), handling ascending and descending orders
        return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setData(sortedData);
  };


  return (
    <div className='Statuspage'>
      {/* <button className='createbutton '><Link to={'/Statusupdateform'}>Create New</Link></button> */}
      <div className='tablesheading'>
        <h3>Status Table</h3>
      </div>
      <div className='containt'>
        <table>
          <thead>
            <tr>
              {/* <th>Status Id <input type='text' value={queryStID} onChange={handelFilterId} className='search'/></th>*/}
              <th >
                <div className='row w-100 py-1'>
                  <div className='col-9' style={{ fontSize: '18px' }}>Date of Creation</div>
                  <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-3 px-2'>
                      <button className='btn btn-sm' onClick={() => handelSort('Date_of_Creation')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input type='text' style={{ width: "140px" }} value={querydateofcreation} onChange={handelFilterDate} className='search'></input></th>
              <th >
                <div className='row w-100 py-1'>
                  <div className='col-9' style={{ fontSize: '18px' }}>Last Update</div>
                  <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-3 px-2'>
                      <button className='btn btn-sm' onClick={() => handelSort('lastupdate')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div> <input type='text' style={{ width: "140px" }} value={querylastupDate} onChange={handelFilterLastDate} className='search' /></th>
              <th>
                <div className='row py-1'>
                  <div className='col-9' style={{ fontSize: '18px' }}>Borrower Name </div>
                  <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-3 px-2'>
                      <button className='btn btn-sm' onClick={() => handelSort('borrower_name')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div> <input type='text' style={{ width: "250px" }} value={queryborrower} onChange={handelFilterborrower} className='search' /></th>
              <th><div className='row py-1'>
                <div className='col-9' style={{ fontSize: '18px' }}>Lender Name</div>
                <IconContext.Provider value={{ size: '1.3rem' }}>
                  <div className='col-3 px-2'>
                    <button className='btn btn-sm' onClick={() => handelSort('lender_name')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>  <input type='text' style={{ width: "250px" }} value={querylender} onChange={handelFilterLender} className='search' /></th>
              <th><div className='row py-1'>
                <div className='col-9' style={{ fontSize: '18px' }}>Action Taken</div>
                <IconContext.Provider value={{ size: '1.3rem' }}>
                  <div className='col-3 px-2'>
                    <button className='btn btn-sm' onClick={() => handelSort('action_Taken')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>  <input type='text' value={queryaction} onChange={handelaction} className='search' /></th>
              <th> <div className='row py-1'>
                <div className='col-9' style={{ fontSize: '18px' }}>Pending with</div>
                <IconContext.Provider value={{ size: '1.3rem' }}>
                  <div className='col-3 px-2'>
                    <button className='btn btn-sm' onClick={() => handelSort('Pending_with')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>  <input type='text' value={querypending} onChange={handelFilterpendings} className='search' /></th>
              <th>  <div className='row py-1'>
                <div className='col-9' style={{ fontSize: '18px' }}>Praposal Status</div>
                <IconContext.Provider value={{ size: '1.3rem' }}>
                  <div className='col-3 px-2'>
                    <button className='btn btn-sm' onClick={() => handelSort('Praposal_status')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div> <input type='text' value={querypraposal} onChange={handelFilterpraposal} className='search' /></th>
              <th style={{ width: '450px', minWidth: '450px', maxWidth: '500px' }}>Comment/Query </th>
              <th>
                <div className='row py-1'>
                  <div className='col-9' style={{ fontSize: '18px' }}>Updated By</div>
                  <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-3 px-2'>
                      <button className='btn btn-sm' onClick={() => handelSort('updated_by')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>   <input type='text' style={{width:'140px'}} value={queryupdatedby} onChange={handelFilterupdatedby} className='search' /></th>
              <th>
                <div className='row py-1'>
                  <div className='col-9' style={{ fontSize: '18px' }}>Next Follow Up Date</div>
                  <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-3 px-2'>
                      <button className='btn btn-sm' onClick={() => handelSort('Next_followup_Date')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>   <input type='text' style={{width:'230px'}}  value={queryNextfollowup} onChange={handelNextFollowupDate} className='search' /></th>
              <th><button className='deletebtn' onClick={clear}>Clear</button></th>
            </tr>
          </thead>
          <tbody>
            {data.map((statusupdates) => {
              return (
                <Fragment key={statusupdates.St_id}>
                  {editStatusId === statusupdates.St_id ? (
                    <Editabletorow editTableRow={editTableRow} handeleditrowchange={handeleditrowchange} handelEditrowsave={handelEditrowsave} handelCancel={handelCancel} />
                  ) : (
                    <Readonlyrow statusupdates={statusupdates} handelEditClick={handelEditClick} />
                  )}
                </Fragment>
              )
            })
            }
          </tbody>
        </table>
      </div>
      <div>
        <ToastContainer
          className="custompopup"
          position='top-right'
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        ></ToastContainer>
      </div>
    </div>
  )
}

export default StatusUpdate
