import React, { useState } from 'react'
import Eamil from './Eamil';
import "./Email.css"

const Pendingwithborrowe = ({ pendingdata }) => {
    const [open, setOpen] = useState(false);
    const [reminderTime, setReminderTime] = useState(null);

    //filtering data 
    const Pendingwithborrower = pendingdata.filter(
        (pendings) => pendings.Pending_with === "Borrower" &&
            pendings.action_Taken !== "Disbursed" &&
            pendings.action_Taken !== "Declined"
    )

    const handelOpen = () => {
        setOpen(true)
    }

    const handelClose = () => {
        setOpen(false)
    }


 
    return (
        <div>
            <div className='borrrowertable'>
                <div className='remindertablesheading'>
                    Pending with Borrower
                </div>
                <div className='remindertable'>
                    <table>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Name of the borrower</th>
                                <th>Name of the Lender</th>
                                <th>Action Taken</th>
                                <th>Pending With</th>
                                <th>Team member Full Name</th>
                                <th>Team member Email Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Pendingwithborrower.length > 0 ?
                                (Pendingwithborrower.map((pending) => {
                                    return (
                                        <tr key={pending.St_id}>
                                            <td>{pending.St_id}</td>
                                            <td>{pending.borrower_name}</td>
                                            <td>{pending.lender_name}</td>
                                            <td>{pending.action_Taken}</td>
                                            <td>{pending.Pending_with}</td>
                                            <td>{pending.teammember.FirstName}</td>
                                            <td>{pending.teammember.Email_address}</td>
                                            <td>
                                                <button className='sendbtn' onClick={ handelOpen} >Drop email</button>
                                                {/**import email component here and pass props */}
                                                <Eamil handelClose={handelClose} handelOpen={handelOpen} open={open} />
                                            </td>
                                        </tr>
                                    )
                                })) : (
                                    <tr>
                                        <td colSpan={7}><b>No data is pending with Express rupaya</b></td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Pendingwithborrowe
