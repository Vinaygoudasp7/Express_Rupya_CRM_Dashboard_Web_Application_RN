import React, { useEffect, useState } from 'react';
import './Registrationpage.css'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import "../App.css";
import "../Components/Dashbord.css"
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import './Borrower.css'

import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const regions = [
  {
    label: 'East',
    value: 'East'
  },
  {
    label: 'West',
    value: 'West'
  },
  {
    label: 'North',
    value: 'North'
  },
  {
    label: 'South',
    value: 'South'
  },
]

function TeamMemberReg() {
  const navigate = useNavigate();

  const [teammemberId, setteammemberId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("")
  const [cPassword, setCpassword] = useState('');
  const [passMatch, setPassMatch] = useState(true);
  const [showPass, setShowpass] = useState(true);
  const [teammember, setTeammember] = useState([]);
  const [selectedTeammember, setSelectedteammember] = useState('');
  // const [region, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  const handelChangeEmail = (event) => {
    setEmail(event.target.value);
  }
  const handelChangePassword = (event) => {
    setPassword(event.target.value);
  }
  const handelChangeCpassword = (event) => {
    setCpassword(event.target.value);
    setPassMatch(event.target.value === password)
  }

  useEffect(() => {
    const featchTeammember = async () => {
      try {
        const responce = await axios.get("http://localhost:4306/teammembers");
        const data = responce.data;

        data.sort((a, b) => {
          const nameA = a.FirstName.toUpperCase()
          const nameB = b.FirstName.toUpperCase()
          if (nameA < nameB) {
            return -1
          } else if (nameB > nameA) {
            return 1
          }
          return 0
        })
        const formatedoption = data.map((teammember) => ({
          label: `${teammember.FirstName} ${teammember.LastName}`,
          value: teammember.TeamM_id,
          email: teammember.Email_address
        }))
        setTeammember(formatedoption)
      }
      catch (error) {
        console.error("Error while featching team member")
      }
    }
    featchTeammember();
  }, [])

  const handelregister = async (event) => {
    event.preventDefault();
    try {
      const id = teammemberId
      console.log(id)
      const pass = password;
      const responce = await axios.put(`http://localhost:4306/attachPassword/${id}`, {
        password: pass,
        region: selectedRegion,
      });

      const message = responce.data;
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
        hideProgressBar: true,
        style: {
          backgroundColor: "whitesmoke",
          color: 'black',
        }
      })
      navigate('./LoginPage')
      console.log(teammember);
    }
    catch (error) {
      console.error("no such team member is there", error);
    }
  }


  const handelSelectedTeammember = (selectedOption) => {
    var emailaddress = selectedOption ? selectedOption.email : ''
    var teammemberId = selectedOption ? selectedOption.value : ''
    setEmail(emailaddress)
    setteammemberId(teammemberId)
    setSelectedteammember(selectedOption)
  }

  const handelRegion = (selectedRegion) => {
    setSelectedRegion(selectedRegion)
  }

  return (
    <>
      <div className='container'>
        <div className='tablesheading'>
          <h3>Registration Form</h3>
        </div>
        <div className='d-flex align-items-center justify-content-center'>
          <section className='form1'>
            <form className='' onSubmit={handelregister}>
              <label className='form-label'>Full Name </label>
              <Select options={teammember} value={selectedTeammember} onChange={handelSelectedTeammember} className='mb-2'></Select>
              <label className='form-label' >Email address </label>
              <input type='text' className='form-control input' value={email} onChange={handelChangeEmail}></input>
              <label htmlFor='region'>Region</label>
              <Select options={regions} value={selectedRegion} onChange={handelRegion} placeholder='Select Region' id="region" className='mb-2'></Select>
              <label className='form-label'>Password </label>
              <div className='pass'>
                <input type={showPass ? 'password' : "text"} className='form-control' value={password} onChange={handelChangePassword}></input>
                <button onClick={(e) => { e.preventDefault(); setShowpass(!showPass); }}><RemoveRedEyeIcon fontSize='20px' /></button>
              </div>
              <label className='form-label'>Confirm Password </label>
              {!passMatch && <p style={{ color: "red" }}>password do not match</p>}
              <div className='pass'>
                <input type='password' className='form-control' value={cPassword} onChange={handelChangeCpassword} ></input>
                <button onClick={(e) => { e.preventDefault(); setShowpass(!showPass); }}><RemoveRedEyeIcon fontSize='20px' /></button>
              </div>

              <div className='container text-center'>
                <button type="submit" className='btn btn-primary' >Submit</button>
              </div>
            </form>
          </section >
        </div>
      </div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        position='top-right'
      />
    </>
  );
};

export default TeamMemberReg;
