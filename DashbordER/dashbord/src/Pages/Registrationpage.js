import React, { useEffect, useState } from 'react';
import './Registrationpage.css'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import "../App.css";
import "../Components/Dashbord.css"
import 'bootstrap/dist/css/bootstrap.css'
import PageRoutes from '../Components/PageRoutes';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';

import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function Registrationpage() {
  const navigate = useNavigate();

  const [teammemberId, setteammemberId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("")
  const [cPassword, setCpassword] = useState('');
  const [passMatch, setPassMatch] = useState(true);
  const [showPass, setShowpass] = useState(true);
  const [teammember, setTeammember] = useState([]);
  const [usertype, setUserType] = useState('');
  const [adminSecretKey, setAdminSecretKey] = useState('');
  const [adminName, setAdminName] = useState('');


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

  const handelregister = async (event) => {
    event.preventDefault();
    try {
      const id = teammemberId
      console.log(id)
      const pass = password;
      const responce = await axios.put(`http://localhost:4306/attachPassword/${id}`, {
        password: pass,
        secret_key: adminSecretKey,
        userType: usertype,
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

  const handelUserType = (event) => {
    setUserType(event.target.value);
  }

  const handelAdminSecreateKey = (event) => {
    setAdminSecretKey(event.target.value)
  }
  return (
    <div className='mainpagectn'>
      <div className='topsection'>
        <div className='Logotext'>
          <div className='Express'>
            <span className='E'>E</span>
            <span>xpress</span>
          </div>
          <div className='rupaya'>
            <span className='E'>R</span>
            <span>upaya</span>
          </div>
        </div>
        <div className='logo'>
          <img src="images/ER.jpeg" alt=''></img>
        </div>
      </div>
      <div className='contentheader'>
        <nav>
          <NavLink to={"/"}>Registration Page</NavLink>
          <NavLink to={"/LoginPage"}>Login Page</NavLink>
        </nav>
      </div>
      <section className='main-content'>
        <div className='sub-content'>
          <div className='contentbody'>
            <form onSubmit={handelregister}>
              <div className='d-flex align-content-center '>
                <label className='form-label mx-3 fs-5'>User Type</label>
                <div className='form-check fs-5 '>
                  <input className='form-check-input' id='admin' type='radio' name='userType' value='admin' onChange={handelUserType} />
                  <label className='form-check-label' htmlFor='admin'>Admin</label>
                </div>
                <div className='form-check mx-3 fs-5'>
                  <input className='form-check-input ' id='user' type='radio' name='userType' value='user' onChange={handelUserType} />
                  <label className='form-check-label' htmlFor='user' >Team Memmbers</label>
                </div>
              </div>
              {usertype === 'admin' ? (
                <>
                  <label className='form-label fs-6 fw-bolder'>Secret key</label>
                  <input className='form-control mb-2' placeholder='Secret Key' type='text' value={adminSecretKey} onChange={handelAdminSecreateKey}></input>
                  <label className='form-label'>Admin Name </label>
                  <input className='form-control' placeholder='name'></input>
                  <label className='form-label' >Email address </label>
                  <input type='text' className='form-control input' value={email} onChange={handelChangeEmail}></input>

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
                </>
              ) : (
                <>
                  <div className='my-4 text-center text-primary fs-3'>
                    <h5 className='fs-3 fw-bolder'>Team Member can Directly login </h5>
                    <h6 className='fs-4 text-warning'>Note: Use "Email and password" given by Your admin</h6>
                  </div>
                </>
              )}

            </form>
          </div>
        </div >
      </section >
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        position='top-right'
      />
    </div >
  );
};

export default Registrationpage;
