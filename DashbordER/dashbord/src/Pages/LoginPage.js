import React, { useState } from 'react';
import './Registrationpage.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';

const regions = [
    { label: 'East', value: 'East' },
    { label: 'West', value: 'West' },
    { label: 'North', value: 'North' },
    { label: 'South', value: 'South' }
]
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("")
    const [showPass, setShowpass] = useState(true);
    const [usertype, setUserType] = useState('');
    const [adminSecreateKey, setAdminSecreateKey] = useState('');
    const [selectedRegion, setSelectedRegion] = useState([]);

    const handelChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handelChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const navigate = useNavigate();
    const handelLogin = async (event) => {
        try {
            event.preventDefault();
            const responce = await axios.get("http://localhost:4306/teammembers");
            const teammember = responce.data;
            let loginsuccessfull = false;
            teammember.forEach(element => {
                if (element.Email_address === email && element.password === password) {
                    loginsuccessfull = true;
                    return;
                }
            })

            if (loginsuccessfull) {
                toast.success("Login successfully, Now redirectiong dashbord", {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    autoClose: true,
                });

                navigate('/Dashboard')
            } else {
                toast.error("Enter correct user name and password ", {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            console.error("An error occurred:", error);
            toast.error('error while login')
        }
    }

    const handelUserType = (event) => {
        setUserType(event.target.value);
    }

    const handelAdminSecreateKey = (event) => {
        setAdminSecreateKey(event.target.value)
    }

    const handelRegion = (selectedRegion) => {
        setSelectedRegion(selectedRegion);
    }


    return (
        <>
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
                            <form onSubmit={handelLogin}>
                                <div className='d-flex align-content-center'>
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
                                {usertype === 'admin' && (
                                    <>
                                        <label className='form-label fs-6 fw-bolder'>Secret key</label>
                                        <input className='form-control' placeholder='Secret Key' type='text' value={adminSecreateKey} onChange={handelAdminSecreateKey}></input>
                                    </>
                                )}
                                <label className='form-label'>Email Id </label>
                                <input type='text' className='form-control input' value={email} onChange={handelChangeEmail}></input>

                                {usertype !== 'admin' && (
                                    <>
                                        <label className='form-label'>Region</label>
                                        <Select options={regions} value={selectedRegion} onChange={handelRegion} placeholder='Select Region' className='mb-2'></Select>
                                    </>
                                )}

                                <label className='form-label '>Password </label>
                                <div className='pass'>
                                    <input type={showPass ? 'password' : "text"} className='form-control' value={password} onChange={handelChangePassword}></input>
                                    <button onClick={(e) => { e.preventDefault(); setShowpass(!showPass); }}><RemoveRedEyeIcon fontSize='20px' /></button>
                                </div>

                                <div className='container text-center'>
                                    <button type="submit" className='btn btn-primary'>Login </button>
                                </div>
                            </form>
                        </div>
                        <ToastContainer />
                    </div >
                </section >
            </div >
        </>

    );
};
export default LoginPage;
