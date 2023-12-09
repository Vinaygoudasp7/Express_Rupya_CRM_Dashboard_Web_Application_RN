
import moment from 'moment'
import React from 'react'

const Editabletorow = ({ editTableRow, handeleditrowchange, handelEditrowsave, handelCancel }) => {

    const actiontaken = [
        { value: "Initial Documents List Sent to Borrower", label: "Initial Documents List Sent to Borrower" },
        { value: "Initial Documents Received from Borrower", label: "Initial Documents Received from Borrower" },
        { value: "Proposal Sent to Lender", label: "Proposal Sent to Lender" },
        { value: "Reminder Sent to Lender", label: "Reminder Sent to Lender" },
        { value: "Queries Sent to Borrower", label: "Queries Sent to Borrower" },
        { value: "Reminder Sent to Borrower", label: "Reminder Sent to Borrower" },
        { value: "Documents Received from Borrower", label: "Documents Received from Borrower" },
        { value: "Queries Replied to Lender", label: "Queries Replied to Lender" },
    ]

    // const [selectedActions, setSelectedActions] = useState({});
    // const [selectedpraposalstatus, setselectedPraposalstatus] = useState({});
    // const [selectedpendingwith, setselectedpendingWith] = useState({});

    // const handelActions = (option) => {
    //     setSelectedActions(option);
    // }

    // const handelActions = (option) => {
    //     const updatedEditTableRow = { ...editTableRow, action_Taken: option.value };
    //     editTableRow(updatedEditTableRow);
    // }

    // const handelpendings = (option) => {
    //     const updatedEditTableRow = { ...editTableRow, Pending_with: option.value };
    //     editTableRow(updatedEditTableRow);
    // }

    // const handelpraposalActions = (option) => {
    //     const updatedEditTableRow = { ...editTableRow, Praposal_status: option.value };
    //     editTableRow(updatedEditTableRow);
    // }

    const pendingwith = [
        { value: 'Borrower', label: 'Borrower' },
        { value: 'Lender', label: 'Lender' },
        { value: 'Express Rupya', label: 'Express Rupya' },
    ]

    // const handelpendings = (option) => {
    //     setselectedpendingWith(option);
    // }

    const praposalstatus = [
        { value: 'Work in Progress', label: 'Work in Progress' },
        { value: 'Sanctioned', label: 'Sanctioned' },
        { value: 'Disbursed', label: 'Disbursed' },
        { value: 'Partially Disbursed', label: 'Partially Disbursed' },
        { value: 'Declined', label: 'Declined' },
    ]

    // const handelpraposalActions = (option) => {
    //     setselectedPraposalstatus(option);
    // }

    return (
        <tr>
            <td><input type='text' name='Date_of_Creation' onChange={handeleditrowchange} value={editTableRow.Date_of_Creation} readOnly></input></td>
            <td><input type='date' name='lastupdate' htmlFor='lastupdate' min={editTableRow.Date_of_Creation} max={new Date().toISOString().split("T")[0]} onChange={handeleditrowchange} value={editTableRow.lastupdate}></input></td>
            <td><input type='text' name='borrower_name' onChange={handeleditrowchange} value={editTableRow.borrower_name} readOnly></input></td>
            <td><input type='text' name='lender_name' onChange={handeleditrowchange} value={editTableRow.lender_name} readOnly></input></td>
            <td>
                <select className="" name='action_Taken' value={editTableRow.action_Taken}
                    onChange={handeleditrowchange}  >
                    <option value="">Select </option>
                    {actiontaken.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        )
                    })}
                </select>
            </td>
            <td>
                <select className='' name='Pending_with' value={editTableRow.Pending_with}
                    onChange={handeleditrowchange}>
                    <option value=''>select</option>
                    {pendingwith.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        )
                    })}
                </select>
            </td>
            <td>
                <select className="" name='Praposal_status' value={editTableRow.Praposal_status}
                    onChange={handeleditrowchange}>
                    <option value="">Select </option>
                    {praposalstatus.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>{option.value}</option>
                        )
                    })}
                </select>
            </td>
            <td><textarea name='Comment' onChange={handeleditrowchange} defaultValue={editTableRow.Comment} ></textarea></td>
            <td><input type='text' name='updated_by' onChange={handeleditrowchange} value={editTableRow.updated_by} readOnly></input></td>
            <td><input type='date' htmlFor='Next_followup_Date' min={editTableRow.lastupdate} name='Next_followup_Date' onChange={handeleditrowchange} value={editTableRow.Next_followup_Date} /></td>
            <td>
                <button type='button' className='approvals' onClick={handelEditrowsave}>Save</button>
                <button type='button' className='cancel' onClick={handelCancel}>Cancel</button>
            </td>
        </tr>
    )
}



export default Editabletorow
