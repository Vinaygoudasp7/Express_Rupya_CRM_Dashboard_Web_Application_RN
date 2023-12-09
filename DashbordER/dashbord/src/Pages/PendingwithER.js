import React, { useState } from 'react'
import Eamil from './Eamil';
import "./Email.css"

const PendingwithER = ({ pendingdata }) => {
    const [open, setOpen] = useState(false);
    const [reminderTime, setReminderTime] = useState(null);

    //filtering data
    const pendingwithExpressrupaya = pendingdata.filter(
        (statusupdate) => statusupdate.Pending_with === "Express Rupaya"
            && statusupdate.action_Taken !== "Disbursed" &&
            statusupdate.action_Taken !== "Declined"
    )

    const handelOpen = () => {
        setOpen(true)
    }

    const handelClose = () => {
        setOpen(false)
    }


    return (
        <div>
            <section className='remindercontents'>
                <div className='remindertables'>
                    <div className='remindertablesheading'>
                        Pending with Express Rupaya
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
                                {pendingwithExpressrupaya.length > 0 ? (
                                    pendingwithExpressrupaya.map((statusupdate) => {
                                        return (<tr key={statusupdate.St_id}>
                                            <td>{statusupdate.St_id}</td>
                                            <td>{statusupdate.borrower_name}</td>
                                            <td>{statusupdate.lender_name}</td>
                                            <td>{statusupdate.action_Taken}</td>
                                            <td>{statusupdate.Pending_with}</td>
                                            <td>{statusupdate.teammember.FirstName}</td>
                                            <td>{statusupdate.teammember.Email_address}</td>
                                            <td>
                                                <button className='sendbtn' onClick={handelOpen} >Drop email</button>
                                                {/**import email component here and pass props */}
                                                <Eamil handelClose={handelClose} handelOpen={handelOpen} open={open} />

                                            </td>
                                        </tr>)

                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={7}><b>No data is pending with Express rupaya</b></td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PendingwithER
