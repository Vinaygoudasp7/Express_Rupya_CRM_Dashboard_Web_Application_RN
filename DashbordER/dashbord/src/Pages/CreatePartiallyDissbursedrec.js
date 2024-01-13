import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import "./PartiallyDisbursed.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AleartDailog from './Dailogs/AleartDailog';

const CreatePartiallyDissbursedrec = () => {

    const [error, setError] = useState('');

    const [borrower, setBorrower] = useState([]);
    const [selectedborrower, setSelectedborrower] = useState('');

    // for lenders
    const [lenders, setLenders] = useState([]);
    const [selectedlenders, setSelectedlenders] = useState('');

    //borrowers
    useEffect(() => {
        const featchdata = async () => {
            try {
                const response = await axios.get("http://192.168.29.250:4306/List_borrowers");

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
                const response = await axios.get("http://192.168.29.250:4306/List_Lenders");
                const lenders = response.data;
                lenders.sort((a, b) => {
                    const aName = a.name.toUpperCase()
                    const bName = b.name.toUpperCase()

                    if (aName < bName) {
                        return -1
                    } else if (bName > aName) {
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

    const actiontaken = [
        { value: "Term Loan", label: "Term Loan" },
        { value: "Business Correspondence Limits", label: "Business Correspondence Limits" },
        { value: "Co-lending", label: "Co-lending" },
    ]

    const [selectedActions, setSelectedActions] = useState([]);

    const handelActions = (option) => {
        setSelectedActions(option);
    }

    const [sactionedDate, setSactioneddate] = useState('');
    const handelSactioneddate = (event) => {
        setSactioneddate(event.target.value);
    }

    const [sactioned, setsactioned] = useState(0);
    const handelSactionChanged = (event) => {
        const value = event.target.value
        setsactioned(value);
    }

    const [disperseddate, setDispersedDate] = useState('');
    const handelDispersedDateChanged = (event) => {
        setDispersedDate(event.target.value)
    }

    const [dispursedamt, setDispursedamt] = useState('0');
    const handelDispursedamtChanged = (event) => {
        // const value = parseFloat(event.target.value);
        const value = event.target.value
        if (parseFloat(value) <= parseFloat(sactioned)) {
            setDispursedamt(value);
            setError('');
        } else {
            setError("Dispursed amount cannot be greater than sanctioned amount")
            setDispursedamt(event.target.value)
        }
    }

    const [balancedispurcedamt, setbalancedDispurceamt] = useState('0');
    const handelBalanceedDispurced = (event) => {
        setbalancedDispurceamt(event.target.value)
    }

    const [followupDate, setFollowupDate] = useState('');
    const handelFollowupDateChanged = (event) => {
        setFollowupDate(event.target.value)
    }

    const [message, setMessage] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const handelOpenAlert = () => {
        setIsAlertOpen(true);
    }

    const handelCLoseAlert = () => {
        setIsAlertOpen(false);
    }

    const submitPartialdisburseddata = async (event) => {
        event.preventDefault();
        const borrowername = selectedborrower.label;
        const borrowerid = selectedborrower.value;
        const lenderid = selectedlenders.value;
        const lendername = selectedlenders.label;
        const typeofsanction = selectedActions.label;
        const sactioneddate = sactionedDate;
        const sactionamt = sactioned;
        const dispersedate = disperseddate;
        const disbuersedamount = dispursedamt;
        const balancedispurced = balancedispurcedamt;
        const followupdate = followupDate;
        if (selectedborrower.length == 0 || selectedlenders.length == 0 || selectedActions.length == 0 || sactionedDate.length == 0 ||
            sactionamt.length == 0 || dispersedate.length == 0 || disbuersedamount.length == 0 || followupDate.length == 0) {
            setMessage('Please fill all required detailes');
            handelOpenAlert();
        } else {
            try {
                const responce = await axios.post("http://192.168.29.250:4306/partiallydisbursed", {
                    borrowerId: borrowerid,
                    borrowerName: borrowername,
                    lenderId: lenderid,
                    lenderName: lendername,
                    typeOfSanction: typeofsanction,
                    sactionDate: sactioneddate,
                    sactionAmount: sactionamt,
                    dispursedDate: dispersedate,
                    dispursedAmount: disbuersedamount,
                    balancedispurseAmt: balancedispurced,
                    nextFollowup: followupdate,

                })
                const message = responce.data.message
                toast.success(message, {
                    autoClose: true,
                    hideProgressBar: true,
                    draggable: true,
                    pauseOnHover: true
                })
                setSelectedborrower('')
                setSelectedlenders('')
                setSactioneddate('')
                setSelectedActions('')
                setsactioned('')
                setDispersedDate('')
                setDispursedamt('')
                setbalancedDispurceamt('')
                setFollowupDate('')
            }
            catch (error) {
                console.log("Error while creating status", error)
                toast.error('error while creating  status', {
                    autoClose: true,
                    hideProgressBar: true,
                    draggable: true,
                    pauseOnHover: true
                })
            }
        }
    }

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };
    return (
        <>
            <div className='formheading'>
                Create Partially disburcsed Record
            </div>
            <div className='disbursedform-container'>
                <div className='disbursedform-content'>
                    <div className='formbody' >
                        <form onSubmit={submitPartialdisburseddata}>
                            <label>Borrower</label>
                            <Select className='listb' placeholder="Search..."
                                isSearchable={true} options={borrower} onChange={handelChangeBorrower} value={selectedborrower} >
                            </Select>
                            <label className='lender'>Lender</label>
                            <Select className='listb' placeholder="Search...."
                                isSearchable={true} options={[{ value: 'NA', label: 'NA' }, ...lenders]} onChange={handelChangeLender} value={selectedlenders}></Select>
                            <label className='lender'>Sanction Date</label>
                            <input type='date' className='list' value={sactionedDate} onChange={handelSactioneddate} max={getTodayDate()}></input>
                            <label>Type of Sanction</label>
                            <Select className='listb' styles={{
                                control: (provider, state) => ({
                                    ...provider,
                                    width: '398px',
                                    marginBottom: '10px',

                                })
                            }} options={actiontaken} value={selectedActions} onChange={handelActions}>
                            </Select>
                            <label>Sanctioned (in crs)</label>
                            <input type='text' className='list' placeholder='Amount' value={sactioned} onChange={handelSactionChanged}  ></input>
                            <label>Disbursed Date</label>
                            <input type='date' className='list' placeholder='Amount' value={disperseddate} onChange={handelDispersedDateChanged} min={sactionedDate}></input>
                            <label>Disbursed Amount (in crs)</label>
                            {error && <div style={{ color: 'red', fontSize: '13px' }}>{error}</div>}
                            <input type='text' className='list' placeholder='Amount' value={dispursedamt} onChange={handelDispursedamtChanged} style={{ borderColor: error ? 'red' : 'blue' }}></input>
                            {/* <label>Balance Disbursed Amount (in crs)</label>
                        <input type='text' className='list' placeholder='Amount' value={balancedispurcedamt} onChange={handelBalanceedDispurced} ></input> */}
                            <label>Next Follow up date (Reminder date)</label>
                            <input type='date' className='list' placeholder='Amount' value={followupDate} onChange={handelFollowupDateChanged} min={sactionedDate} ></input>
                            <button className='SubmitbuttonTM' type='submit'>Submit</button>
                        </form>
                    </div>
                </div >
                <AleartDailog open={isAlertOpen} onClose={handelCLoseAlert} message={message} />

                <ToastContainer
                    autoClose={5000}
                    draggable='true'
                    pauseOnHover={true}
                    hideProgressBar={true}
                ></ToastContainer>
            </div >
        </>
    )
}

export default CreatePartiallyDissbursedrec
