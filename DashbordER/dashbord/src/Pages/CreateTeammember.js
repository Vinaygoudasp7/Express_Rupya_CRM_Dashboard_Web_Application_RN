import React, { useState } from 'react';
import './TeamMembers.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AleartDailog from './Dailogs/AleartDailog';



const CreateTeammember = () => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false)


    const handelFnameChange = (event) => {
        setFname(event.target.value);
    }

    const handelLnameChange = (event) => {
        setLname(event.target.value);
    }
    const handelEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handelOpenAlert = () => {
        setIsAlertOpen(true);
    }

    const handelCLoseAlert = () => {
        setIsAlertOpen(false);
    }

    //for back to team members page after submiting
    const navigate = useNavigate();
    const handelSubmit = (event) => {
        event.preventDefault();
        if (fname.length == 0 || lname.length == 0 || email.length == 0) {
            setMessage('Please fill all required detailes');
            handelOpenAlert();
        } else {
            try {
                //send the data to database
                const updateformData = {
                    // teamid: teamid,
                    fname: fname,
                    lname: lname,
                    email: email,
                };

                // api request to update to database
                axios.post(`http://192.168.29.250:4306/insertdata`, updateformData)
                    .then((res) => {
                        console.log('data updated successfully', res.data)
                        toast.info('team members successfully Created', {
                            autoClose: true,
                            hideProgressBar: true,
                            draggable: true,
                            pauseOnHover: true
                        })

                        navigate('/TeamMembers')
                    }).catch((err) => {
                        console.error("error while updateing ", err);

                        toast.error('error while updateing Creating', {
                            autoClose: true,
                            hideProgressBar: true,
                            draggable: true,
                            pauseOnHover: true
                        })
                    })
            } catch (error) {
                console.error("error while updateing ", error);

                toast.error('error while updateing Creating', {
                    autoClose: true,
                    hideProgressBar: true,
                    draggable: true,
                    pauseOnHover: true
                })
            }
        }

    }

    return (
        <>
            <div className='assignform'>
                <h3>Create Team memmber Detailes</h3>
            </div>
            <div className='teamform-container'>
                <div className='teamform-containet'>
                    <form className='form' onSubmit={handelSubmit}>
                        {/* <div className='tmid'>
                            <label>Team Member Id :</label>
                            <input type='text' value={teamid} placeholder='ID' onChange={handelTeamId} name='teamid'></input>
                        </div> */}
                        <div className='fname'>
                            <label>First Name :</label>
                            <input type='text' value={fname} placeholder='First name' onChange={handelFnameChange} name='fname' required></input>
                        </div>
                        <div className='lname'>
                            <label>Last Name :</label>
                            <input type='text' value={lname} placeholder='Last name' onChange={handelLnameChange} name='lname' required></input>
                        </div>

                        <div className='email'>
                            <label>Email address :</label>
                            <input type='email' value={email} placeholder='Email address' onChange={handelEmailChange} name='email'></input>
                        </div>
                        <button type='submit' className='SubmitbuttonTM'>Submit</button>
                    </form>
                </div>
                <AleartDailog open={isAlertOpen} onClose={handelCLoseAlert} message={message} />
                <ToastContainer
                    autoClose={5000}
                    draggable='true'
                    pauseOnHover={true}
                    hideProgressBar={true}
                ></ToastContainer>
            </div>
        </>
    )
}

export default CreateTeammember
