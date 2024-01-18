import React, { useEffect, useState } from 'react'
import "./TeamMembers.css"
import axios from 'axios'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AleartDailog from './Dailogs/AleartDailog';
import ConfiromDailog from './Dailogs/ConfiromDailog';
import BACKEND_API_END_POINT from '../config';

const Statusupdateform = () => {

  //for borrower
  const [borrower, setBorrower] = useState([]);
  const [selectedborrower, setSelectedborrower] = useState('');

  // for lenders
  const [lenders, setLenders] = useState([]);
  const [selectedlenders, setSelectedlenders] = useState('');

  // for teammembers
  const [teammember, setTeammember] = useState([]);
  const [selectedteammember, setSelectedteammember] = useState('');

  //borrowers
  useEffect(() => {
    const featchdata = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_END_POINT}/List_borrowers`);

        const borrowers = response.data;
        borrowers.sort((a, b) => {
          const aName = a.name.toUpperCase()
          const bName = b.name.toUpperCase()
          if (aName < bName) {
            return -1
          } else if (bName > aName) {
            return 1
          }
          return 0
        })
        const formattedOptions = borrowers.map((borrower) => ({
          value: borrower.id,
          label: borrower.name
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
  console.log(selectedborrower)
  //for lenders
  useEffect(() => {
    const featchdata = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_END_POINT}/List_Lenders`);
        const lenders = response.data;

        lenders.sort((a, b) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if (nameA < nameB) {
            return -1
          } else if (nameB > nameA) {
            return 1
          }
          return 0
        })

        const formattedOptions = lenders.map((lender) => ({
          value: lender.id,
          label: lender.name,
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

          teammembers.sort((a, b) => {
            const nameA = a.FirstName.toUpperCase()
            const nameB = b.FirstName.toUpperCase()
            if (nameA < nameB) {
              return -1
            } else if (nameB > nameA) {
              return 1
            }
            return 0
          })

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

  const actiontaken = [
    { value: "Initial Documents List Sent to Borrower", label: "Initial Documents List Sent to Borrower" },
    { value: "Initial Documents Received from Borrower", label: "Initial Documents Received from Borrower" },
    { value: "Proposal Sent to Lender", label: "Proposal Sent to Lender" },
    { value: "Reminder Sent to Lender", label: "Reminder Sent to Lender" },
    { value: "Queries Sent to Borrower", label: "Queries Sent to Borrower" },
    { value: "Reminder Sent to Borrower", label: "Reminder Sent to Borrower" },
    { value: "Documents Received from Borrower", label: "Documents Received from Borrower" },
    { value: "Queries Replied to Lender", label: "Queries Replied to Lender" },
    { value: 'Asked for lenders Approval', label: 'Asked for lenders Approval' },
  ]

  const [selectedActions, setSelectedActions] = useState({});

  const handelActions = (option) => {
    setSelectedActions(option);
  }

  const pendingwith = [
    { value: 'Borrower', label: 'Borrower' },
    { value: 'Lender', label: 'Lender' },
    { value: 'Express Rupya', label: 'Express Rupya' },

  ]

  const [selectedpendingwith, setselectedpendingWith] = useState({});

  const handelpendings = (option) => {
    setselectedpendingWith(option);
  }

  const praposalstatus = [
    { value: 'Work in Progress', label: 'Work in Progress' },
    { value: 'Sanctioned', label: 'Sanctioned' },
    { value: 'Disbursed', label: 'Disbursed' },
    { value: 'Partially Disbursed', label: 'Partially Disbursed' },
    { value: 'Declined', label: 'Declined' },
    { value: 'Received', label: 'Received' }
  ]

  const [selectedpraposalstatus, setselectedPraposalstatus] = useState({});
  const handelpraposalActions = (option) => {
    setselectedPraposalstatus(option);
  }

  const [textareavalue, setTextareavalue] = useState('');

  const handelTextarea = (e) => {
    setTextareavalue(e.target.value);
  }


  const [selecteddate, setSelectedDate] = useState('');

  const handelSelecteddate = (event) => {
    setSelectedDate(event.target.value);
  }

  const [Nextselecteddate, setNextSelecteddate] = useState('');
  const handelSelectedNextDate = (event) => {
    setNextSelecteddate(event.target.value);
  }

  const [message, setMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const handelOpenAlert = () => {
    setIsAlertOpen(true);
  }


  const handelCLoseAlert = () => {
    setIsAlertOpen(false);
  }

  const [isConfiromOpen, setIsConfiromOpen] = useState(false)

  const handelConfirmopen = () => {
    setIsConfiromOpen(true);
  }
  const handelOnConfirm = () => {
    handelCloseConfirmClose();
  }

  const handelCloseConfirmClose = () => {
    setIsConfiromOpen(false);
  }
  const navigate = useNavigate();
  const Updatetodatabase = async (event) => {

    event.preventDefault();//for preventing reloading of page

    const datetoupdate = selecteddate;
    const borrowernametoupdate = selectedborrower.label;
    const borroweridtoupdate = selectedborrower.value;
    const lendernametoupdate = selectedlenders.label;
    const lenderidtoupdate = selectedlenders.value;
    const actiontoupdate = selectedActions.value;
    const pendingwithtoupdate = selectedpendingwith.value;
    const praposalstatustoupdate = selectedpraposalstatus.value;
    const commenttoupdate = textareavalue;
    const teammember_id = selectedteammember.value;
    const updatedbytoupdate = selectedteammember.label;
    const nextFollwupdate = Nextselecteddate;

    if (selecteddate.length == 0 || borrowernametoupdate.length == 0 || lendernametoupdate.length == 0 || actiontoupdate.length == 0 ||
      pendingwithtoupdate.length == 0 || selectedpraposalstatus.length == 0 || textareavalue.length == 0 || selectedteammember.length == 0 || nextFollwupdate.length == 0) {
      setMessage('Please fill all required detailes');
      handelOpenAlert();
    } else {
      try {
        const response = await axios.post(`${BACKEND_API_END_POINT}/checkforstatusupdatetable`, {
          borrowerId: borroweridtoupdate,
          lenderId: lenderidtoupdate,
        });

        const borrowerandlenderExists = response.data;
        if (!borrowerandlenderExists) {
          const response = await axios.post(`${BACKEND_API_END_POINT}/assignStatusupdate`, {
            borrowerId: borroweridtoupdate,
            borrowerName: borrowernametoupdate,
            lenderId: lenderidtoupdate,
            lenderName: lendernametoupdate,
            date: datetoupdate,
            actions: actiontoupdate,
            pendingwith: pendingwithtoupdate,
            PraposalStatus: praposalstatustoupdate,
            comment: commenttoupdate,
            updateedperson: updatedbytoupdate,
            teammemberId: teammember_id,
            nextFollowup: nextFollwupdate
          });
          const createresponce = response.data.message;
          console.log(createresponce);
          toast.info(createresponce, {
            autoClose: true,
            hideProgressBar: true,
            draggable: true,
            pauseOnHover: true
          })
          navigate("/StatusUpdate");
        }
        else {
          toast.info('Record arlerdy exist', {
            autoClose: 4000,
            hideProgressBar: true,
            position: 'top-right',
          })
          // const handelUpdateStatus = async () => {
          //   const response = await axios.post("${BACKEND_API_END_POINT}/assignStatusupdate", {
          //     borrowerId: borroweridtoupdate,
          //     borrowerName: borrowernametoupdate,
          //     lenderId: lenderidtoupdate,
          //     lenderName: lendernametoupdate,
          //     date: datetoupdate,
          //     actions: actiontoupdate,
          //     pendingwith: pendingwithtoupdate,
          //     PraposalStatus: praposalstatustoupdate,
          //     comment: commenttoupdate,
          //     updateedperson: updatedbytoupdate,
          //     teammemberId: teammember_id,
          //     nextFollowup: nextFollwupdate
          //   });

          //   const updateresponce = response.data.message;
          //   toast.info(updateresponce, {
          //     autoClose: true,
          //     hideProgressBar: true,
          //     draggable: true,
          //     pauseOnHover: true
          //   })
          // navigate("/StatusUpdate");
          // }
        }
      }
      catch (error) {
        console.error("Error updating status:", error);
        toast.error('error while creating  status', {
          autoClose: true,
          hideProgressBar: true,
          draggable: true,
          pauseOnHover: true
        })
      }
    }
    // setSelectedborrower(""); setSelectedlenders(""); setSelectedActions(""); setSelectedDate("");
    // setSelectedteammember(""); setselectedPraposalstatus(""); setselectedpendingWith(""); setTextareavalue(""); setNextSelecteddate('');

  };



  return (
    <div className='container'>
      <div className='assignform'>
        <h3>Status update form</h3>
      </div>
      <div className='container-body'>
        <div className='containet-body'>
          <div className='form'>
            <form onSubmit={Updatetodatabase}>
              <label className='dborrower'>Date </label>
              <input type='date' className='date' name='date' value={selecteddate}
                onChange={handelSelecteddate} ></input>

              <label className='dborrower'>Name of the Borrower </label>
              <Select className='list' placeholder="Search..."
                isSearchable={true} options={borrower} onChange={handelChangeBorrower} value={selectedborrower} >
              </Select>

              <label className='dborrower'>Name of the lender</label>
              <Select className='listna' placeholder="Search...."
                isSearchable={true} options={[{ value: 'NA', label: 'NA' }, ...lenders]} onChange={handelChangeLender} value={selectedlenders}></Select>

              <label className='dborrower' >Action Taken</label>
              <select className="actionstaken" value={selectedActions.value} onChange={(e) => handelActions({ value: e.target.value, label: e.target.options[e.target.selectedIndex].text })}>
                <option value="">Select </option>
                {actiontaken.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  )
                })}
              </select>

              <label className='dborrower'>Pending with</label>
              <select className="actionstaken" value={selectedpendingwith.value} onChange={(e) => handelpendings({ value: e.target.value, label: e.target.options[e.target.selectedIndex].text })}>
                <option value="">Select </option>
                {pendingwith.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>{option.value}</option>
                  )
                })}
              </select>

              <label className='dborrower'>Proposal State</label>
              <select className="actionstaken p" value={selectedpraposalstatus.value} onChange={(e) => handelpraposalActions({ value: e.target.value, label: e.target.options[e.target.selectedIndex].text })}>
                <option value="">Select </option>
                {praposalstatus.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>{option.value}</option>
                  )
                })}
              </select>

              <label className='dborrower'>Comment Query (if any):</label>
              <textarea className='area' value={textareavalue} onChange={handelTextarea}
                placeholder='Enter your comment here..'></textarea>

              <label className='dborrower'>Status Updated by</label>
              <Select className='listna' placeholder="Search...."
                isSearchable={true} options={teammember} onChange={handelChangeTeammember} value={selectedteammember}></Select>

              <label className='dborrower'>Next follow up date</label>
              <input type='date' className='date' name='Nextdate' value={Nextselecteddate}
                onChange={handelSelectedNextDate}></input>

              <div className='division'>
                <button className='createbutton' type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AleartDailog open={isAlertOpen} onClose={handelCLoseAlert} message={message} />
      <ConfiromDailog open={isConfiromOpen} onClose={handelCloseConfirmClose} handelOnConfirm={handelOnConfirm} message={message} />

      <ToastContainer
        autoClose={5000}
        draggable='true'
        pauseOnHover={true}
        hideProgressBar={true}
      ></ToastContainer>
    </div>
  )
}

export default Statusupdateform;


