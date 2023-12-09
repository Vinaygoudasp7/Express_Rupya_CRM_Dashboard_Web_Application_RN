import React, { useState } from 'react'
import "./TeamMembers.css"
import Modal from 'react-modal'


const Readonlyrow = ({ statusupdates, handelEditClick }) => {
    const { St_id, Date_of_Creation, lastupdate, borrower_name, lender_name, action_Taken,
        Praposal_status, Pending_with, Comment, updated_by,Next_followup_Date } = statusupdates;

    const [showfullcontent, setShowfullcontent] = useState(false)
    const handelReadmore = () => {
        setShowfullcontent(true);
    }

    const handelclose = () => {
        setShowfullcontent(false)
    }
    
    return (
        <tr key={St_id}>
            {/* <td>{statusupdates.St_id}</td> */}
            <td>{Date_of_Creation}</td>
            <td>{lastupdate}</td>
            <td>{borrower_name}</td>
            <td>{lender_name}</td>
            <td>{action_Taken}</td>
            <td>{Pending_with}</td>
            <td>{Praposal_status}</td>
            <td className='content'>
                {showfullcontent ? (
                    Comment
                ) : (
                    <>
                        {Comment.length > 300 ? `${Comment.slice(0, 300)}....` : Comment}
                        {Comment.length > 300 && (
                            <button onClick={handelReadmore} className='readmore'>
                                Read more....
                            </button>
                        )}
                    </>
                )}
            </td>
            <td>{updated_by}</td>
            <td>{Next_followup_Date}</td>
            <td><button type='button' className='approvals' onClick={(event) => handelEditClick(event, statusupdates)}>Edit</button></td>
            {showfullcontent && (
                <Modal isOpen={true} onRequestClose={handelclose}
                    style={{
                        content: {
                            border: '6px solid blue', borderRadius: '20px',
                            width: '800px', height: '450px',
                            position: 'fixed', placeContent: 'center', marginLeft: '180px', top: '180px'
                        }
                    }}
                >
                    <button className='close' onClick={handelclose}>X</button>
                    <div className='comment'>
                        {Comment}
                        {Comment && (
                            <button type='button' className='readmore' onClick={handelclose}>Read less....</button>
                        )
                        }
                    </div>
                </Modal>
            )}
        </tr>
    )
}



export default Readonlyrow
