import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Select from "react-select"
import { Fragment } from 'react';

const Partiallydisbursed = () => {
    const [filterdata, setFilterdata] = useState([]);
    const [specificdata, setSpecificdata] = useState([]);
    const [allData, setAllData] = useState([]);
    const [showOnlyBalanced, setShowOnlyBalanced] = useState(false);
    const [showOnlyDispursed, setShowOnlyDispursed] = useState(false);

    useEffect(() => {
        const featchData = async () => {
            try {
                const responce = await axios.get("http://localhost:4306/retrivepartiallydispursed");
                setFilterdata(responce.data);
                setAllData(responce.data);
            } catch (error) {
                console.log("Error while featching data", error)
                window.alert("Error while featching data");
            }
        }
        featchData();
    }, [])
    // console.log(filterdata)




    const handleFilterButtonClick = () => {
        const uniqueLenderBorrowerPairs = {};
        // Filter rows based on conditions and store unique lender-borrower pairs
        filterdata.forEach(row => {
            const key = `${row.borrower_id}-${row.lender_id}`;
            uniqueLenderBorrowerPairs[key] = row;
        });
        const lastRowArray = [];
        console.log(" unique ids " + JSON.stringify(uniqueLenderBorrowerPairs, null, 2));

        const filtereduniqueRows = Object.values(uniqueLenderBorrowerPairs);
        // Print uniqueLenderBorrowerPairs to console with proper formatting
        console.log("uniqueLenderBorrowerPairs:", JSON.stringify(uniqueLenderBorrowerPairs, null, 2));
        console.log("uniqueLenderBorrowerPairs:", JSON.stringify(filtereduniqueRows, null, 2));

        // Iterate through the filtereduniqueRows to store the last row for each pair
        filtereduniqueRows.forEach(uniquerow => {
            const { borrower_id, lender_id } = uniquerow;
            console.log("unique row ", JSON.stringify(uniquerow, null, 2));
            console.log(" lender_id and borrower_id " + borrower_id, lender_id)

            // Select rows from filterdata that match the current unique pair
            const matchingrows = filterdata.filter(
                row => row.borrower_id === borrower_id && row.lender_id === lender_id
            );

            if (matchingrows.length > 0) {
                // Select the last row from matchingRows
                const lastrow = matchingrows[matchingrows.length - 1];
                // Display the selected last row
                console.log("Last Row:", JSON.stringify(lastrow, null, 2));
                if (lastrow.isDisbursed === 0) {
                    lastRowArray.push(lastrow);
                }

            }
        });

        let totalUnDispursed = lastRowArray.reduce((total, row) => {
            const disbursedamt = parseFloat(row.balance_disbursed_amt);
            return isNaN(disbursedamt) ? total : total + disbursedamt
        }, 0);
        console.log(totalUnDispursed);
        setShowOnlyBalanced(totalUnDispursed);
        setShowOnlyDispursed(" ");
        setFilterdata(lastRowArray)
    }

    let totalDispursed = filterdata.reduce((total, item) => total + item.disbursed_amt, 0)
    console.log(totalDispursed)
    let totalSactioned = filterdata.reduce((total, item) => total + item.sanctioned, 0)
    console.log(totalSactioned)
    let totalBalance = totalSactioned - totalDispursed

    const [borrower, setBorrower] = useState([]);
    const [selectedborrower, setSelectedborrower] = useState(null);

    // for lenders
    const [lenders, setLenders] = useState([]);
    const [selectedlenders, setSelectedlenders] = useState(null);

    //borrowers
    useEffect(() => {
        const featchdata = async () => {
            try {
                const response = await axios.get("http://localhost:4306/retrivepartiallydispursed");

                const borrowers = response.data;

                borrowers.sort((a, b) => {
                    const nameA = a.borrower_name.toUpperCase()
                    const nameB = b.borrower_name.toUpperCase()
                    if (nameA < nameB) {
                        return -1
                    } else if (nameB > nameA) {
                        return 1
                    }
                    return 0
                })
                const formattedOptions = borrowers.map((borrower) => ({
                    value: borrower.borrower_id,
                    label: borrower.borrower_name
                }));
                setBorrower(formattedOptions);
            }
            catch (error) {
                console.log(error)
            }
        };
        featchdata();
    }, [])

    console.log(borrower)
    const handelChangeBorrower = (selectedOption) => {
        setSelectedborrower(selectedOption)
    }

    //for lenders
    useEffect(() => {
        const featchdata = async () => {
            try {
                const response = await axios.get("http://localhost:4306/retrivepartiallydispursed");
                const lenders = response.data;


                lenders.sort((a, b) => {
                    const nameA = a.lender_name.toUpperCase()
                    const nameB = b.lender_name.toUpperCase()
                    if (nameA < nameB) {
                        return -1
                    } else if (nameB > nameA) {
                        return 1
                    }
                    return 0
                })

                const formattedOptions = lenders.map((lender) => ({
                    value: lender.lender_id,
                    label: lender.lender_name,
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


    let selectborrower = selectedborrower?.value
    let selectlender = selectedlenders?.value
    console.log("borrower " + selectborrower)
    console.log("lender" + selectlender)
    const featchFilteredData = () => {
        try {
            if (selectborrower && selectlender) {
                const filteredData = filterdata.filter(
                    item => item.borrower_id === selectborrower && item.lender_id === selectlender
                )
                setFilterdata(filteredData);
                setSpecificdata(filteredData)
            }
        } catch (error) {
            window.alert("select borrower and lender")
        }
    }
    useEffect(() => {
        featchFilteredData();

    }, [selectedborrower, selectedlenders])
    console.log(filterdata)


    const deleteSelectedRows = async () => {
        const selectborrowerId = selectedborrower.value;
        const selectlenderId = selectedlenders.value;

        let result = window.confirm("are you suer to delete data ?");
        if (result) {
            try {
                const responce = await axios.delete(`http://localhost:4306/deleteRow/${selectborrowerId}/${selectlenderId}`);
                const message = responce.data.message;
                window.alert(message);
            } catch (error) {
                console.error('Error while deleting row', error);
            }
        }
    }

    const [editingIndex, setEditingIndex] = useState(-1);
    const [editableRowData, setEditableRowData] = useState({
        id: specificdata.id,
        borrower_name: specificdata.borrower_name,
        borrower_id: specificdata.borrower_id,
        lender_id: specificdata.lender_id,
        lender_name: specificdata.lender_name,
        type_of_sanction: specificdata.type_of_sanction,
        sanction_date: specificdata.sanction_date,
        sanctioned: specificdata.sanctioned,
        disburseddate: specificdata.disburseddate,
        disbursed_amt: specificdata.disbursed_amt,
        balance_disbursed_amt: specificdata.balance_disbursed_amt,
        nextfollowupdate: specificdata.nextfollowupdate,
    });
    console.log(editableRowData)

    const handelEditClick = (index) => {
        setEditingIndex(index);
        setEditableRowData({ ...specificdata[index] })
    }

    const [error, setError] = useState('');
    const handelEditFiledChange = (e) => {
        const filedname = e.target.name;
        const value = e.target.value;
        console.log("Current editableRowData state:", editableRowData);

        if (filedname === 'disbursed_amt' && parseFloat(value) > parseFloat(editableRowData.balance_disbursed_amt)) {
            setError('Disbursed amount cannot be greater than balance disbursed amount.');
            return;
        }

        setEditableRowData((prevData) => ({
            ...prevData,
            [filedname]: value,
        }))
    }

    const handleSaveClick = async () => {
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

        const responce = await axios.post("http://localhost:4306/partiallydisbursedupdate", {
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

        const message = responce.data.message
        window.alert(message);

        featchFilteredData();
        setEditingIndex(-1);
    };

    const handelCancel = () => {
        setEditingIndex(-1);
    }

    const clearSelectBoxes = () => {
        setSelectedborrower(null);
        setSelectedlenders(null);
        setFilterdata(allData)//it is for displaying all data
        setShowOnlyBalanced(false);
        setShowOnlyDispursed(false)
    }

    const genrateSeriealNo = () => {
        return filterdata.map((item, index) => index + 1)
    }

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

    const filterPartialyDisbursed = filterdata.filter((partialyDisbursed, index) => {
        //const S_no = genrateSeriealNo()[index].toString();

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



    // setFilterdata(filterPartialyDisbursed)
    return (
        <div className='pageconteint m-2'>
            {/* <div className='button'>
                <button className='createbutton'><Link to={'/CreatePartiallyDissbursedrec'}>Create New</Link></button>
            </div> */}

            <div className='selectboxs'>
                <div className='select1'>
                    <label>Borrower</label>
                    <Select placeholder="Search... or Select"
                        isSearchable={true} options={borrower} onChange={handelChangeBorrower} value={selectedborrower} required>
                    </Select>
                </div>
                <div className='select2'>
                    <label>Lender</label>
                    <Select placeholder="Search... or Select" options={lenders} value={selectedlenders} onChange={handelChangeLender} isSearchable={true} required></Select>
                </div>
                <div className='select3'><button className='submitbuttonC' onClick={clearSelectBoxes}>Clear</button></div>

            </div>
            <div className='boxcontent mx-2'>
                <div className='tablesheading'>
                    <h3>Partially Disbursed Cases</h3>
                </div>
                <div className='containt'>
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
                                        <button className='submitbuttonC S' onClick={handleFilterButtonClick}>Show Only</button>
                                    </div>
                                </th>
                                <th>Next Follow up date <br /> (Reminder date) <input type='text' value={queryNextFollowupDate} onChange={handelNextFollowupDate} className='search'></input></th>
                                {/* <th>IS disbursed</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {filterPartialyDisbursed.length > 0 ? (
                                filterPartialyDisbursed.map((partiallysiburseddata, index) => (
                                    <Fragment key={partiallysiburseddata.id} >
                                        <tr >
                                            <td>{genrateSeriealNo()[index]}</td>
                                            <td>{partiallysiburseddata.borrower_name}</td>
                                            <td>{partiallysiburseddata.lender_name}</td>
                                            <td>{partiallysiburseddata.sanction_date}</td>
                                            <td>{partiallysiburseddata.type_of_sanction}</td>
                                            <td>{partiallysiburseddata.sanctioned}</td>
                                            <td>{partiallysiburseddata.disbuersed_date}</td>
                                            <td>{partiallysiburseddata.disbursed_amt}</td>
                                            <td>{partiallysiburseddata.balance_disbursed_amt}</td>
                                            <td>{partiallysiburseddata.nextfollowupdate}</td>
                                            {/* <td>{partiallysiburseddata.isDisbursed}</td> */}
                                        </tr>
                                        {index === filterdata.length - 1 && (
                                            <Fragment>
                                                {index === editingIndex ? (
                                                    <tr>
                                                        <td><input type='text' className='entryfiled' name='id' value={editableRowData.id} onChange={handelEditFiledChange} readOnly></input></td>
                                                        <td><input type='text' className='entryfiled' name='borrower_name' value={editableRowData.borrower_name} onChange={handelEditFiledChange} readOnly></input></td>
                                                        <td><input type='text' className='entryfiled' name='lender_name' value={editableRowData.lender_name} onChange={handelEditFiledChange} readOnly ></input></td>
                                                        <td><input type='text' className='entryfiled' name='sanction_date' value={editableRowData.sanction_date} onChange={handelEditFiledChange} readOnly></input></td>
                                                        <td><input type='text' className='entryfiled' name='type_of_sanction' value={editableRowData.type_of_sanction} onChange={handelEditFiledChange} readOnly></input></td>
                                                        <td><input type='text' className='entryfiled' name='sanctioned' value={editableRowData.sanctioned} onChange={handelEditFiledChange} readOnly ></input></td>
                                                        <td><input type='date' className='entryfiled' name='disburseddate' min={editableRowData.sanction_date} value={editableRowData.disburseddate} onChange={handelEditFiledChange} ></input></td>
                                                        <td>{error && <div style={{ color: "red" }}>{error}</div>}
                                                            <input type='text' className='entryfiled' style={{ borderColor: error ? 'red' : 'black' }} name='disbursed_amt' value={editableRowData.disbursed_amt} max={editableRowData.balance_disbursed_amt} onChange={handelEditFiledChange} ></input></td>
                                                        <td><input type='text' className='entryfiled' name='balance_disbursed_amt' value={editableRowData.balance_disbursed_amt} onChange={handelEditFiledChange} readOnly ></input></td>
                                                        <td><input type='date' className='entryfiled' name='nextfollowupdate' min={editableRowData.sanction_date} value={editableRowData.nextfollowupdate} onChange={handelEditFiledChange} ></input></td>
                                                        <td>
                                                            <button className='createbutton' onClick={handleSaveClick}>Save</button>
                                                            <button className='createbutton' onClick={handelCancel}>Cancel</button>

                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <>
                                                        <tr>
                                                            <td colSpan={5}></td>
                                                            <td >
                                                                <span style={{ textAlign: 'left', fontWeight: 'bolder', color: 'black' }}>{showOnlyDispursed ? ` ` : ` Total= ${totalSactioned} crs`}</span>
                                                            </td>
                                                            <td></td>
                                                            <td >
                                                                <span style={{ textAlign: 'left', fontWeight: 'bolder', color: 'black' }}> {showOnlyDispursed ? ` ` : ` Total= ${totalDispursed} crs`}</span>
                                                            </td>
                                                            <td >
                                                                <span style={{ textAlign: 'left', fontWeight: 'bolder', color: 'black' }}> {showOnlyBalanced ? `Total = ${showOnlyBalanced} crs` : ` Total= ${totalBalance} crs`} </span>
                                                            </td>
                                                        </tr>
                                                        {selectedborrower && selectedlenders ? (
                                                            <tr>
                                                                <td colSpan={10}>
                                                                    <button className='createbutton' onClick={() => handelEditClick(index)} >Edit</button>
                                                                </td >
                                                                <td colSpan={10}>
                                                                    <button className='createbutton' onClick={deleteSelectedRows}>Delete</button>
                                                                </td >
                                                            </tr>
                                                        ) : (
                                                            ''
                                                        )

                                                        }

                                                    </>
                                                )}
                                            </Fragment>
                                        )}
                                    </Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10}>No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    )
}

export default Partiallydisbursed
