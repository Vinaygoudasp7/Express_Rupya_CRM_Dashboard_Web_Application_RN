import { React, useEffect, useState } from 'react'
import axios from 'axios';
import Select from "react-select"
import { ToastContainer, toast } from 'react-toastify';

const Partiallydisbursed = () => {
    const [partialyDisbuersedData, setPartialyDisbursedData] = useState([]);
    const [filterdData, setFilterdData] = useState([])
    const [editId, setEditId] = useState(-1)
    const [featchdetails, setFeatchdetails] = useState(true)
    const [errormsg, seterrormsg] = useState(false)
    const featchData = async () => {
        try {
            const responce = await axios.get("http://localhost:4306/retrivepartiallydispursed");
            console.log(responce.data)
            const partialydisbursed = responce.data
            console.log(partialydisbursed)
            setPartialyDisbursedData(partialydisbursed)
        } catch (error) {
            console.log("Error while featching data", error)
            window.alert("Error while featching data");
        }
    }
    useEffect(() => {
        if (featchdetails) {
            featchData()
            setFeatchdetails(false)
        }
    }, [featchdetails, featchData])

    const actiontaken = [
        { value: "Term Loan", label: "Term Loan" },
        { value: "Business Correspondence Limits", label: "Business Correspondence Limits" },
        { value: "Co-lending", label: "Co-lending" },
    ]

    const [selectedActions, setSelectedActions] = useState([]);

    const handelActions = (option) => {
        setSelectedActions(option);
    }
    // const handleFilterButtonClick = () => {
    //     const uniqueLenderBorrowerPairs = {};
    //     // Filter rows based on conditions and store unique lender-borrower pairs
    //     // filterdata.forEach(row => {
    //     //     const key = `${row.borrower_id}-${row.lender_id}`;
    //     //     uniqueLenderBorrowerPairs[key] = row;
    //     // });
    //     const lastRowArray = [];
    //     console.log(" unique ids " + JSON.stringify(uniqueLenderBorrowerPairs, null, 2));

    //     const filtereduniqueRows = Object.values(uniqueLenderBorrowerPairs);
    //     // Print uniqueLenderBorrowerPairs to console with proper formatting
    //     console.log("uniqueLenderBorrowerPairs:", JSON.stringify(uniqueLenderBorrowerPairs, null, 2));
    //     console.log("uniqueLenderBorrowerPairs:", JSON.stringify(filtereduniqueRows, null, 2));

    //     // Iterate through the filtereduniqueRows to store the last row for each pair
    //     filtereduniqueRows.forEach(uniquerow => {
    //         const { borrower_id, lender_id } = uniquerow;
    //         console.log("unique row ", JSON.stringify(uniquerow, null, 2));
    //         console.log(" lender_id and borrower_id " + borrower_id, lender_id)

    //         // Select rows from filterdata that match the current unique pair
    //         // const matchingrows = filterdata.filter(
    //         //     row => row.borrower_id === borrower_id && row.lender_id === lender_id
    //         // );

    //         // if (matchingrows.length > 0) {
    //         //     // Select the last row from matchingRows
    //         //     const lastrow = matchingrows[matchingrows.length - 1];
    //         //     // Display the selected last row
    //         //     console.log("Last Row:", JSON.stringify(lastrow, null, 2));
    //         //     if (lastrow.isDisbursed === 0) {
    //         //         lastRowArray.push(lastrow);
    //         //     }

    //         // }
    //     });

    // let totalUnDispursed = lastRowArray.reduce((total, row) => {
    //     const disbursedamt = parseFloat(row.balance_disbursed_amt);
    //     return isNaN(disbursedamt) ? total : total + disbursedamt
    // }, 0);
    // console.log(totalUnDispursed);
    // setShowOnlyBalanced(totalUnDispursed);
    // setShowOnlyDispursed(" ");
    // setFilterdata(lastRowArray)
    // }

    // let totalDispursed = filterdata.reduce((total, item) => total + item.disbursed_amt, 0)
    // console.log(totalDispursed)
    // let totalSactioned = filterdata.reduce((total, item) => total + item.sanctioned, 0)
    // console.log(totalSactioned)
    // let totalBalance = totalSactioned - totalDispursed

    // let selectborrower = selectedborrower?.value
    // let selectlender = selectedlenders?.value
    // console.log("borrower " + selectborrower)
    // console.log("lender" + selectlender)
    // const featchFilteredData = () => {
    //     try {
    //         if (selectborrower && selectlender) {
    //             const filteredData = filterdata.filter(
    //                 item => item.borrower_id === selectborrower && item.lender_id === selectlender
    //             )
    //             setFilterdata(filteredData);
    //             setSpecificdata(filteredData)
    //         }
    //     } catch (error) {
    //         window.alert("select borrower and lender")
    //     }
    // }
    // useEffect(() => {
    //     featchFilteredData();

    // }, [selectedborrower, selectedlenders])
    // console.log(filterdata)


    const handeldeleteSelectedRows = async (p_id) => {
        const confoirm = window.confirm('are you suer to delete')
        try {
            if (confoirm) {
                const responce = await axios.delete(`http://localhost:4306/deletepartialydisbursedData/${p_id}`);
                console.log(responce.data)
                setFeatchdetails(true)
            }
        } catch (error) {
            console.error('Error while deleting row', error);
        }
    }

    // const [editingIndex, setEditingIndex] = useState(-1);
    const [editableRowData, setEditableRowData] = useState({
        id: '',
        borrower_name: '',
        borrower_id: '',
        lender_id: '',
        lender_name: '',
        type_of_sanction: '',
        sanction_date: '',
        sanctioned: '',
        disburseddate: '',
        disbursed_amt: '',
        balance_disbursed_amt: '',
        nextfollowupdate: '',
    });
    console.log(editableRowData)

    const handelEditClick = (e, id) => {
        setEditId(id);
        const partialydisburseddata = partialyDisbuersedData.find((data) => data.id === id)
        setEditableRowData({
            id: partialydisburseddata?.id,
            borrower_name: partialydisburseddata?.borrower_name,
            borrower_id: partialydisburseddata?.borrower_id,
            lender_id: partialydisburseddata?.lender_id,
            lender_name: partialydisburseddata?.lender_name,
            type_of_sanction: partialydisburseddata?.type_of_sanction,
            sanction_date: partialydisburseddata?.sanction_date,
            sanctioned: partialydisburseddata?.sanctioned,
            disburseddate: partialydisburseddata?.disbuersed_date,
            disbursed_amt: partialydisburseddata?.disbursed_amt,
            balance_disbursed_amt: partialydisburseddata?.balance_disbursed_amt,
            nextfollowupdate: partialydisburseddata?.nextfollowupdate,
        })
    }
    console.log(editableRowData)
    // const [error, setError] = useState('');
    // const handelEditFiledChange = (e) => {
    //     const filedname = e.target.name;
    //     const value = e.target.value;
    //     console.log("Current editableRowData state:", editableRowData);

    //     if (filedname === 'disbursed_amt' && parseFloat(value) > parseFloat(editableRowData.balance_disbursed_amt)) {
    //         setError('Disbursed amount cannot be greater than balance disbursed amount.');
    //         return;
    //     }

    //     setEditableRowData((prevData) => ({
    //         ...prevData,
    //         [filedname]: value,
    //     }))
    // }

    const handelUpdateChanges = async () => {
        const p_id = editableRowData.id
        const borrowerId = editableRowData.borrower_id
        const borrowerName = editableRowData.borrower_name;
        const lenderId = editableRowData.lender_id;
        const lenderName = editableRowData.lender_name;
        const typeOfSanction = editableRowData.type_of_sanction;
        const sactioneDate = editableRowData.sanction_date;
        const sanctionedAmt = editableRowData.sanctioned;
        const disbursedDate = editableRowData.disburseddate;
        const disbursedAmt = editableRowData.disbursed_amt;
        const balanceDisbursedAmt = editableRowData.balance_disbursed_amt;
        const nextFollowupDate = editableRowData.nextfollowupdate;
        try {
            const responce = await axios.post(`http://localhost:4306/partiallydisbursedupdate/${p_id}`, {

                borrowerId,
                borrowerName,
                lenderId,
                lenderName,
                typeOfSanction,
                sactioneDate,
                sanctionedAmt,
                disbursedAmt,
                disbursedDate,
                balanceDisbursedAmt,
                nextFollowupDate,
            })
            console.log(responce.data)
            setFeatchdetails(true)
            toast.success('Updated successfuly', {
                autoClose: 4000,
                hideProgressBar: true,
                position: 'top-right',
            })
            // featchFilteredData();
            setEditId(-1);
        } catch (error) {
            console.log(error)
        }
    };

    const handelCancel = () => {
        setEditId(-1);
    }

    // const clearSelectBoxes = () => {
    //     setSelectedborrower(null);
    //     setSelectedlenders(null);
    //     setFilterdata(allData)//it is for displaying all data
    //     setShowOnlyBalanced(false);
    //     setShowOnlyDispursed(false)
    // }

    // const genrateSeriealNo = () => {
    //     return filterdata.map((item, index) => index + 1)
    // }

    const [queryS_no, setQueryS_no] = useState('')
    const [queryborrowerName, setQueryBorrowerName] = useState('')
    const [querylenderName, setQueryLenderName] = useState('')
    const [querySanctionDate, setQuerySanctionDate] = useState('')
    const [queryTypeofSanction, setQueryTypeofSanction] = useState('')
    const [querySanctionedamt, setQuerySanctionedamt] = useState('')
    const [queryDisbursedDate, setQUeryDisbursedDate] = useState('')
    const [queryDisbursedAmount, setQueryDisbursedAmount] = useState('')
    const [queryBalanceUndisbursedamt, setQueryBalanceUndisbursedamt] = useState('')
    const [queryNextFollowupDate, setQueryNextFollowupDate] = useState('')

    const handelS_no = (event) => {
        setQueryS_no(event.target.value.toLowerCase());
    }

    const handelBorrowerNmae = (event) => {
        setQueryBorrowerName(event.target.value.toLowerCase());
    }

    const handelLenderName = (event) => {
        setQueryLenderName(event.target.value.toLowerCase());
    }

    const handelsanctionedDate = (event) => {
        setQuerySanctionDate(event.target.value.toLowerCase());
    }

    const handelTypeofsanction = (event) => {
        setQueryTypeofSanction(event.target.value.toLowerCase());
    }
    const handelSanctionedAmt = (event) => {
        setQuerySanctionedamt(event.target.value.toLowerCase());
    }
    const handelDisbursedDate = (event) => {
        setQUeryDisbursedDate(event.target.value.toLowerCase());
    }
    const handelDisbursedamt = (event) => {
        setQueryDisbursedAmount(event.target.value.toLowerCase());
    }

    const handelbalncedDisbursed = (event) => {
        setQueryBalanceUndisbursedamt(event.target.value.toLowerCase());
    }

    const handelNextFollowupDate = (event) => {
        setQueryNextFollowupDate(event.target.value.toLowerCase());
    }

    const filterPartialyDisbursed = partialyDisbuersedData.filter((partialyDisbursed) => {
        const borrower = partialyDisbursed.borrower_name ? partialyDisbursed.borrower_name?.toString().toLowerCase() : '';
        const lender = partialyDisbursed.lender_name ? partialyDisbursed.lender_name?.toString().toLowerCase() : '';
        const sanctionedDate = partialyDisbursed.sanction_date ? partialyDisbursed.sanction_date?.toString().toLowerCase() : '';
        const sanctionedAmt = partialyDisbursed.sanctioned ? partialyDisbursed.sanctioned?.toString().toLowerCase() : '';
        const typeofsanction = partialyDisbursed.type_of_sanction ? partialyDisbursed.type_of_sanction?.toString().toLowerCase() : '';
        const disbursedDate = partialyDisbursed.disbuersed_date ? partialyDisbursed.disbuersed_date?.toString().toLowerCase() : '';
        const disbursedamt = partialyDisbursed.disbursed_amt ? partialyDisbursed.disbursed_amt?.toString().toLowerCase() : '';
        const balanceDisbursedamt = partialyDisbursed.balance_disbursed_amt ? partialyDisbursed.balance_disbursed_amt.toString().toLowerCase() : '';
        const nextFollowup = partialyDisbursed.nextfollowupdate ? partialyDisbursed.nextfollowupdate.toString().toLowerCase() : '';
        return (
            borrower.includes(queryborrowerName)
            && lender.includes(querylenderName) && sanctionedDate.includes(querySanctionDate) &&
            sanctionedAmt.includes(querySanctionedamt) && typeofsanction.includes(queryTypeofSanction) &&
            disbursedDate.includes(queryDisbursedDate) && disbursedamt.includes(queryDisbursedAmount) &&
            balanceDisbursedamt.includes(queryBalanceUndisbursedamt) && nextFollowup.includes(queryNextFollowupDate)
        )
    })


    const totalsanctionedAmt = partialyDisbuersedData.reduce((total, data) => total + data.sanctioned, 0)
    const totalDispursedAmt = partialyDisbuersedData.reduce((total, data) => total + data.disbursed_amt, 0)
    const totalBalanceDispursedAmt = partialyDisbuersedData.reduce((total, data) => total + data.balance_disbursed_amt, 0)

    const handelEditableRowFields = (e, fieldname) => {
        const value = e.target.value
        const updatedpData = { ...editableRowData }
        if (fieldname === 'disbursed_amt') {
            if (value <= editableRowData.balance_disbursed_amt && value <= editableRowData.sanctioned) {
                updatedpData[fieldname] = value
                setEditableRowData(updatedpData)
                seterrormsg(false)
            } else {
                updatedpData[fieldname] = value
                setEditableRowData(updatedpData)
                seterrormsg(true)
            }
        }
        updatedpData[fieldname] = value
        setEditableRowData(updatedpData)
    }
    console.log(editableRowData)
    const formatedDate = (date) => {
        const unformatedDate = new Date(date)

        const formated_date = `${unformatedDate.getDate().toString().padStart(2, '0')}-${(unformatedDate.getMonth() + 1).toString().padStart(2, '0')}-${unformatedDate.getFullYear().toString()}`
        return formated_date
    }

    return (
        <div className='pageconteint'>
            <div className='boxcontent'>
                <div className='tablesheading'>
                    <h3>Partially Disbursed Cases</h3>
                </div>
                <div className='partialycontaint p-2'>
                    <table>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Borrower <input type='text' value={queryborrowerName} onChange={handelBorrowerNmae} className='search'></input> </th>
                                <th>Lender <input type='text' value={querylenderName} onChange={handelLenderName} className='search'></input></th>
                                <th>Sanction Date <input type='text' value={querySanctionDate} onChange={handelsanctionedDate} className='search'></input></th>
                                <th>Type of Sanction <input type='text' value={queryTypeofSanction} onChange={handelTypeofsanction} className='search'></input></th>
                                <th>Sanctioned <br /> (in crs) <input type='text' value={querySanctionedamt} onChange={handelSanctionedAmt} className='search'></input></th>
                                <th>Disbursed Date <input type='text' value={queryDisbursedDate} onChange={handelDisbursedDate} className='search'></input></th>
                                <th>Disbursed Amount <br />(in crs) <input type='text' value={queryDisbursedAmount} onChange={handelDisbursedamt} className='search'></input></th>
                                <th>Balance Undisbursed Amount<br /> (in crs)
                                    <div className='sectiont'>
                                        <input type='text' value={queryBalanceUndisbursedamt} onChange={handelbalncedDisbursed} className='search bal'></input>
                                    </div>
                                </th>
                                <th>Next Follow up date <br /> (Reminder date) <input type='text' value={queryNextFollowupDate} onChange={handelNextFollowupDate} className='search'></input></th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterPartialyDisbursed.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {editId === data.id ? (
                                            <input type='text' value={editableRowData.borrower_name} readOnly ></input>
                                        ) : (data.borrower_name)}
                                    </td>
                                    <td>
                                        {editId === data.id ? (
                                            <input type='text' value={editableRowData.lender_name} readOnly></input>
                                        ) : (data.lender_name)}
                                    </td>
                                    <td>
                                        {editId === data.id ? (
                                            <input type='text' value={editableRowData.sanction_date} onChange={(e) => handelEditableRowFields(e, 'sanction_date')}></input>
                                        ) : (formatedDate(data.sanction_date))}
                                    </td>
                                    <td>
                                        {editId === data.id ? (
                                            <Select className="list"
                                                options={actiontaken} value={selectedActions} onChange={handelActions}>
                                            </Select>
                                        ) : (data.type_of_sanction)}
                                    </td>
                                    <td>
                                        {editId === data.id ? (
                                            <input type='text' value={editableRowData.sanctioned} onChange={(e) => handelEditableRowFields(e, 'sanctioned')}></input>
                                        ) : (data.sanctioned)}
                                    </td>
                                    <td>
                                        {editId === data.id ? (
                                            <input type='date' value={editableRowData.disburseddate} onChange={(e) => handelEditableRowFields(e, 'disburseddate')}></input>
                                        ) : (formatedDate(data.disbuersed_date))}
                                    </td>
                                    <td>
                                        {editId === data.id ? (
                                            <>
                                                <input type='text' value={editableRowData.disbursed_amt} onChange={(e) => handelEditableRowFields(e, 'disbursed_amt')}></input>
                                                {errormsg && <p className='text-danger'>dispurse amount shoulb be less tahn or equal to balance disbursed amount and sactioned amount</p>}
                                            </>
                                        ) : (data.disbursed_amt)}
                                    </td>
                                    <td>
                                        {editId === data.id ? (
                                            <input type='text' value={editableRowData.balance_disbursed_amt} readOnly></input>
                                        ) : (data.balance_disbursed_amt)}
                                    </td>
                                    <td>
                                        {editId === data.id ? (
                                            <input type='date' value={editableRowData.nextfollowupdate} onChange={(e) => handelEditableRowFields(e, 'nextfollowupdate')}></input>
                                        ) : (formatedDate(data.nextfollowupdate))}
                                    </td>
                                    <td>
                                        <>
                                            {data.id === editId ? (
                                                <div className=''>
                                                    <div className='d-flex flex-row'>
                                                        <button className='deletebtn' onClick={(e) => handelUpdateChanges(e, data.id)}>Update</button>
                                                        <button className='cancel fw-bold w-100 h-100 text-white' onClick={() => handeldeleteSelectedRows(data.id)}>Delete</button>

                                                    </div>
                                                    <button className='cancel fw-bold w-100 h-100 text-white' onClick={handelCancel}>Cancel</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <button className='deletebtn' onClick={(e) => handelEditClick(e, data.id)}>Edit</button>
                                                </div>
                                            )}
                                        </>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={5}>total</td>
                                <td>{totalsanctionedAmt}</td>
                                <td></td>
                                <td>{totalDispursedAmt}</td>
                                <td>{totalBalanceDispursedAmt}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </div >
        </div >
    )
}

export default Partiallydisbursed
