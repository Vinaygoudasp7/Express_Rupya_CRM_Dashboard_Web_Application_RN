import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './TeamMembers.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AleartDailog from './Dailogs/AleartDailog';
import ConfiromDailog from './Dailogs/ConfiromDailog';
import BACKEND_API_END_POINT from '../config';

const LenderAprovalform = () => {
  const [borrower, setBorrower] = useState([]);
  const [selectedborrower, setSelectedborrower] = useState('');

  // for lenders
  const [lenders, setLenders] = useState([]);
  const [selectedlenders, setSelectedlenders] = useState('');

  // for teammembers
  const [teammember, setTeammember] = useState([]);
  const [selectedteammember, setSelectedteammember] = useState('');

  const [isConfiormOpen, setIsConfiromOpen] = useState(false);

  const [date, setDate] = useState('');

  const handelCloseConfirm = () => {
    setIsConfiromOpen(!isConfiormOpen)
  }



  const handelDateChange = (event) => {
    setDate(event.target.value);
  }

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


  const optionslist = [
    { value: "Existing", label: "Existing" },
    { value: "Negtive", label: "Negtive" },
    { value: "Approval Given", label: "Approval Given" },
    { value: "Approval Not Given", label: "Approval Not Given" },
  ]

  const [selectedOption, setSelectedOptions] = useState({});
  const handelChangeoptions = (option) => {
    setSelectedOptions(option);
  }

  const [message, setMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const handelOpenAlert = () => {
    setIsAlertOpen(true);
  }

  const handelCLoseAlert = () => {
    setIsAlertOpen(false);
  }

  const navigate = useNavigate();

  const handleAssigntotable = (event) => {
    event.preventDefault();
    const Date = date;
    const borrowerIdToUpdate = selectedborrower.value;
    const borrowerNameToUpdate = selectedborrower.label;
    const lenderIdToUpdate = selectedlenders.value;
    const lenderNameToUpdate = selectedlenders.label;
    const teammemberIdToUpdate = selectedteammember.value;
    const teammemberNameToUpdate = selectedteammember.label;
    const selectedoptionToUpdated = selectedOption.value;
    if (Date.length == 0 || borrowerNameToUpdate.length == 0 || lenderNameToUpdate.length == 0 || teammemberNameToUpdate.length == 0 ||
      selectedOption.length == 0) {
      setMessage('Please fill all required detailes');
      handelOpenAlert();
    } else {
      axios.post(`${BACKEND_API_END_POINT}/checkforApprovalTABEL`, {
        borrowerId: borrowerIdToUpdate,
        lenderId: lenderIdToUpdate,
      }).then(async (response) => {
        const { borrowerExists } = response.data;
        if (!borrowerExists) {
          // Create the assignment without sending a response
          const responce = await axios.post(`${BACKEND_API_END_POINT}/assign`, {
            Date_of_creation: Date,
            lastupDate: Date,
            borrowerId: borrowerIdToUpdate,
            borrowerName: borrowerNameToUpdate,
            lenderId: lenderIdToUpdate,
            lenderName: lenderNameToUpdate,
            teammemberId: teammemberIdToUpdate,
            teammemberName: teammemberNameToUpdate,
            option: selectedoptionToUpdated,
          });
          const message = responce.message
          toast.success('Lender Aproval is created', {
            autoClose: true,
            hideProgressBar: true,
            draggable: true,
            pauseOnHover: true
          })
        }
        else {
          // Show confirmation message to update
          toast.info('Record alredy exist', {
            autoClose: true,
            hideProgressBar: true,
            draggable: true,
            pauseOnHover: true
          })
          // var handelOnconfirm = () => {
          //   // Update the assignment
          //   const responce = axios.post("${BACKEND_API_END_POINT}/assign", {
          //     date: date,
          //     lastupDate: date,
          //     borrowerId: borrowerIdToUpdate,
          //     borrowerName: borrowerNameToUpdate,
          //     lenderId: lenderIdToUpdate,
          //     lenderName: lenderNameToUpdate,
          //     teammemberId: teammemberIdToUpdate,
          //     teammemberName: teammemberNameToUpdate,
          //     option: selectedoptionToUpdated,
          //   });
          //   toast.success(responce.message, {
          //     autoClose: true,
          //     hideProgressBar: true,
          //     draggable: true,
          //     pauseOnHover: true
          //   })
          //   // navigate('/Assign');

        }
        // Return a resolved promise
      })
        .catch((error) => {
          console.error("Error while assigning:", error);
          toast.error('error while updateing Creating', {
            autoClose: true,
            hideProgressBar: true,
            draggable: true,
            pauseOnHover: true
          })
        });
    }
    { setSelectedborrower(""); setSelectedlenders(""); setSelectedteammember(""); setSelectedOptions("") }
  }

  return (
    <div >
      <div className='assignform'>
        <h3>Lender Approvals Form</h3>
      </div>
      <div className='container-body'>
        <div className='containet-body'>
          <div className='fileds'>
            <form onSubmit={handleAssigntotable} >
              <div className='Date'>
                <label>Date of Creation : </label>
                <input className="date" type='date' value={date} onChange={handelDateChange} ></input>
              </div>
              <div className='borrowerlist'>
                <label>Borrower : </label>
                <div className='input'>
                  <Select className='list' placeholder="Search..."
                    isSearchable={true} options={borrower} onChange={handelChangeBorrower} value={selectedborrower} >
                  </Select>
                </div>
              </div>
              <div className='lenderlist'>
                <label>Lenders : </label>
                <div className='input'>
                  <Select className='list' placeholder="Search...."
                    isSearchable={true} options={[{ value: 'NA', label: 'NA' }, ...lenders]} onChange={handelChangeLender} value={selectedlenders}></Select>
                </div>
              </div>
              <div className='approval'>
                <label>Lender Approval :</label>
                <Select className=" list" value={selectedOption} onChange={handelChangeoptions} options={optionslist} placeholder="Select... "></Select>
              </div>
              <div className='teamlist'>
                <label>Updated by :</label>
                <div className='input'>
                  <Select className='list' placeholder="Search...."
                    isSearchable={true} options={teammember} onChange={handelChangeTeammember} value={selectedteammember}></Select>
                </div>
              </div>
              <button className='createbuttonU' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>

      <AleartDailog open={isAlertOpen} onClose={handelCLoseAlert} message={message} />
      <ToastContainer
        autoClose={5000}
        draggable='true'
        pauseOnHover={true}
        hideProgressBar={true}
      ></ToastContainer>
    </div>
  )
}

export default LenderAprovalform
