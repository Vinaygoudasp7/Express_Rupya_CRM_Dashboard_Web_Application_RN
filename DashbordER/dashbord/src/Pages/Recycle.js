import React from 'react'
import { Link } from 'react-router-dom'
import './TeamMembers.css'
import "./Borrower.css"


const Recycle = () => {
   
  return (
    <div className='buttons'>
        <div className='Lender'>
            <button className='createbutton'><Link to={`/RestoreLenders`}>Lender</Link></button>
        </div>
        <div className='Borrower'>
            <button className='createbutton'><Link to={`/RestoreBorrowers`}>Borrower</Link></button>
        </div>
    </div>
  )
}

export default Recycle
