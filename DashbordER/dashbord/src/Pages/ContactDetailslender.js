import React, { useEffect, useState } from 'react'
// import './Borrower.css';
import './ContactDetails.css';
import Axios from 'axios';
import { RegionsData } from './Borrower';
import './Borrower.css'
import AleartDailog from './Dailogs/AleartDailog';
import ConfiromDailog from './Dailogs/ConfiromDailog';
import { ToastContainer, toast } from 'react-toastify';


const Contactdetaileslender = () => {
  const [lenders, setLenders] = useState([]);
  const [selectedLender, setSelectedLender] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [mailType, setMailType] = useState('');
  const [designation, setDesignation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [deletingId, setDeletingId] = useState('');
  const [message, setMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isConfiromOpen, setIsConfiromOpen] = useState(false)
  const [nameerrorMessage, setNameErrorMessage] = useState('')
  const [emailerrorMessage, setEmailErrorMessage] = useState('')
  const [DesignationErrorMsg, setDesignationErrorMsg] = useState('')

  const handelOpenAlert = () => {
    setIsAlertOpen(true);
  }

  const handelCLoseAlert = () => {
    setIsAlertOpen(false);
  }

  const handelConfirmopen = () => {
    setIsConfiromOpen(true);
  }

  const handelOnConfirm = () => {
    handleDeleteContact(deletingId);
    handelCloseConfirmClose();
  }

  const handelCloseConfirmClose = () => {
    setIsConfiromOpen(false);
  }
  const [contactDetails, setContactDetails] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedLender.length == 0 || name.length == 0 || emailAddress.length == 0 || mailType.length == 0 ||
      designation.length == 0 || mobileNumber.length == 0 || region.length == 0) {
      setMessage('Please fill all required detailes ');
      handelOpenAlert();
    } else {
      try {
        Axios.post("http://192.168.29.250:4306/contactslender", {
          id: selectedLender,
          name: name,
          emailAddress: emailAddress,
          mailType: mailType,
          designation: designation,
          mobileNumber: mobileNumber,
          region: region,

        }, {
          headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
          console.log('Response:', response.data);

          setSelectedLender('');
          setName('');
          setEmail('');
          setMailType('');
          setDesignation('');
          setMobileNumber('');
          setRegion('');
          console.log('Contact details submitted successfully!');
        });
        toast.info("Contact details Created successfully to ", {
          autoClose: true,
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,

        })
      } catch (error) {
        console.error('Error submitting contact data:', error);
        toast.error("Error submitting contact detailes", {
          autoClose: true,
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
        })
      }
    }
  }


  useEffect(() => {
    Axios.get("http://192.168.29.250:4306/List_lenders")
      .then(response => {
        setLenders(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  useEffect(() => {
    // Fetch contact details for the specific lenderId
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://192.168.29.250:4306/contact-details-lender/${selectedLender}`);
        setContactDetails(response.data);
        console.log(response.data);
        console.log(selectedLender);
      } catch (error) {
        console.log('Error fetching contact details:', error);
      }
    };

    fetchData();
  }, [selectedLender]);

  const handleDeleteContact = (id) => {
    // Send a DELETE request to the backend API to delete the contact detail

    Axios.delete(`http://192.168.29.250:4306/contactdetailslender/${id}`)
      .then((response) => {
        // Remove the deleted contact detail from the state
        setContactDetails(contactDetails.filter((contact) => contact.id === id));
        console.log('Lender Contact detail deleted successfully');
        setMessage(response.data.message);

        handelOpenAlert();
      })
      .catch((error) => {
        console.error('Error deleting Lender contact detail:', error);
        setMessage("Error while deleting contact detailes")
        handelOpenAlert();
      });
  };

  const handleselectchange = event => {
    setSelectedLender(event.target.value);
  };
  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);

  };

  const handelNameChange = (event) => {
    const inputValue = event.target.value
    setName(inputValue);
  }

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;

    // Regular expression for basic email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailPattern.test(inputValue)) {
      setEmail(inputValue);
      setEmailErrorMessage('');
    } else {
      setEmail(inputValue);
      setEmailErrorMessage('Enter valid email address');
    }
  };

  const handelDesignation = (event) => {
    const inputValue = event.target.value
    setDesignation(inputValue);
  }

  return (
    <>
      <div className="contacts">
        <div className="formdiv">
          <div className='assignform'><h3>Lender Contact Details</h3></div>
          <form className='CD-form'>
            <div className='contactform'>
              <label >Lender Name </label>
              <select className='companys' value={selectedLender} onChange={handleselectchange}>
                <option value="">select the name of Lender</option>
                {lenders.map(lender => (
                  <option key={lender.id} value={lender.id}>
                    {lender.name}
                  </option>
                ))}
              </select>
              <div>
                <label htmlFor="name">Name of person:</label>
                <p >{nameerrorMessage}</p>
                <input
                  type="text"
                  className='fieldtext'
                  id="name"
                  value={name}
                  onChange={handelNameChange}
                  required
                />
              </div>
              <div id="region">
                <label htmlFor="region">Region:</label>
                <select

                  value={region}
                  onChange={handleRegionChange}
                  required
                >
                  <option value="">Select a region</option>
                  {RegionsData.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <p>{emailerrorMessage}</p>
                <input
                  type="email"
                  className='fieldtext'
                  id="email"
                  value={emailAddress}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="mailType">TO/CC:</label>
                <select
                  id="mailType"

                  value={mailType}
                  onChange={(event) => setMailType(event.target.value)}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="TO">TO</option>
                  <option value="CC">CC</option>
                </select>
              </div>
              <div>
                <label htmlFor="designation">Designation:</label>
                <input
                  type="text"
                  className='fieldtext'
                  id="designation"
                  value={designation}
                  onChange={handelDesignation}
                  required
                />
              </div>
              <div>
                <label htmlFor="mobileNumber">Mobile Number:</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  className='fieldtext'
                  value={mobileNumber}
                  onChange={(event) => setMobileNumber(event.target.value)}
                  required
                />
              </div>
              <br></br>
              <div className='Update'></div>
              <button type='submit' className='Submitbutton' onClick={handleSubmit}> Submit </button>
            </div>
          </form >
        </div>

        <div className="showcontacts">
          <div className='assignform'><h3>Existing contacts Of Lenders</h3></div>
          <table id="contactstable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Region</th>
                <th>Email</th>
                <th>TO/CC</th>
                <th>Designation</th>
                <th>Mobile Number</th>
                <th>Delete Contact</th>
              </tr>
            </thead>
            <tbody>
              {contactDetails.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.region}</td>
                  <td>{contact.emailAddress}</td>
                  <td>{contact.mailType}</td>
                  <td>{contact.designation}</td>
                  <td>{contact.mobileNumber}</td>
                  <td>
                    <button onClick={() => handelConfirmopen(setDeletingId(contact.id))} className='deletebtn'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {contactDetails.length === 0 &&
            <div><b>There is no existing contact details for this lender</b></div>
          }
        </div>
        <AleartDailog open={isAlertOpen} onClose={handelCLoseAlert} message={message} />
        <ToastContainer
          autoClose={5000}
          hideProgressBar
          position='top-right'
        />
        <ConfiromDailog open={isConfiromOpen} onClose={handelCloseConfirmClose} handelOnConfirm={handelOnConfirm} message={message} />
      </div>
    </>
  )
}
export default Contactdetaileslender