import React, { useState } from 'react'
import "./TeamMembers.css"
import CommentPage from './CommentPage';


const Readonlyrow = ({ statusupdates, handelEditClick }) => {
    const { St_id, Date_of_Creation, lastupdate, borrower_name, lender_name, action_Taken,
        Praposal_status, Pending_with, Comment, updated_by, Next_followup_Date } = statusupdates;

    const [showfullcontent, setShowfullcontent] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handelReadmore = () => {
        setShowModal(true)
    }

    const handelCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <tr key={St_id}>
                {/* <td>{statusupdates.St_id}</td> */}
                <td>{Date_of_Creation}</td>
                <td>{lastupdate}</td>
                <td>{borrower_name}</td>
                <td>{lender_name}</td>
                <td>{action_Taken}</td>
                <td>{Pending_with}</td>
                <td>{Praposal_status}</td>
                <td className='content' style={{ width: '450px', minWidth: '450px', maxWidth: '500px' }}>
                    {showfullcontent ? (
                        Comment
                    ) : (
                        <>
                            {Comment.length > 80 ? `${Comment.slice(0, 80)}....` : Comment}
                            {Comment.length > 80 && (
                                <button onClick={handelReadmore} className='readmore'>
                                    Read more....
                                </button>
                            )}
                        </>
                    )}
                </td>
                <td>{updated_by}</td>
                <td>{Next_followup_Date}</td>
                <td><button type='button' className='deletebtn' onClick={(event) => handelEditClick(event, statusupdates)}>Edit</button></td>
                <CommentPage showModal={showModal} handelCloseModal={handelCloseModal} Comment={Comment} />
            </tr>

        </>
    )
}



export default Readonlyrow
