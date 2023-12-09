import React, { useState } from 'react'
import Borrower from './Borrower';
import Lender from "./Lender"
import './Borrower.css'
import "./TeamMembers.css"
import CreateTeamMember from './CreateTeammember'
import CreatePartiallyDissbursedrec from './CreatePartiallyDissbursedrec'
import Statusupdateform from './Statusupdateform'
import LenderAprovalform from './LenderAprovalform'
import ContactDetailes from './ContactDetails'
import Contactdetaileslender from './ContactDetailslender';
import TeamMemberReg from './TeamMemberReg'
import LenderClassification from './LenderClassification';

const CreateBorrowerandLenderDetailes = () => {

  const [activeComponent, setActivecomponent] = useState('borrower');
  const [isBorrowerActive, setIsBorrowerActive] = useState(true);
  const [isLenderActive, setIsLenderActive] = useState(false);
  const [isTeammemberactive, setIsTeammemberActive] = useState(false);
  const [isContactActive, setContactActive] = useState(false);
  const [isLenderContactActive, setLenderContactActive] = useState(false);
  const [isParctialydisbursed, setPractialydisbursed] = useState(false);
  const [isStatusUpdateform, setIsStatusUpdateform] = useState(false);
  const [isLenderformActive, setLenderFormActive] = useState(false);
  const [isTeamMemberRegisterActive, setIsTeamMemberRegistaerActive] = useState(false)
  const [isLenderClassification, setIsLenderClassification] = useState(false)

  const handelCreateBorrower = () => {
    setActivecomponent("borrower");
    setIsBorrowerActive(!isBorrowerActive);
    setIsLenderActive(false);
    setIsTeammemberActive(false);
    setPractialydisbursed(false);
    setIsStatusUpdateform(false);
    setLenderFormActive(false);
    setContactActive(false);
    setLenderContactActive(false);
    setIsTeamMemberRegistaerActive(false)
    setIsLenderClassification(false)
  }

  const handelCreateLender = () => {
    setActivecomponent("lender");
    setIsLenderActive(!isLenderActive);
    setIsBorrowerActive(false);
    setIsTeammemberActive(false);
    setPractialydisbursed(false);
    setIsStatusUpdateform(false);
    setLenderFormActive(false);
    setContactActive(false);
    setLenderContactActive(false);
    setIsTeamMemberRegistaerActive(false)
    setIsLenderClassification(false)
  }

  const handelCreateTeammember = () => {
    setActivecomponent("teammember");
    setIsTeammemberActive(!isTeammemberactive)
    setIsBorrowerActive(false);
    setIsLenderActive(false);
    setPractialydisbursed(false);
    setIsStatusUpdateform(false);
    setLenderFormActive(false);
    setContactActive(false);
    setLenderContactActive(false);
    setIsTeamMemberRegistaerActive(false)
    setIsLenderClassification(false)
  }

  const handelCreatePartiallyDissbursedrec = () => {
    setActivecomponent("paritialydisbursed");
    setPractialydisbursed(!isParctialydisbursed);
    setIsBorrowerActive(false);
    setIsTeammemberActive(false);
    setIsStatusUpdateform(false);
    setLenderFormActive(false);
    setContactActive(false);
    setLenderContactActive(false);
    setIsTeamMemberRegistaerActive(false)
    setIsLenderClassification(false)
  }

  const handelStatusupdateform = () => {
    setActivecomponent("statusupdateform");
    setIsStatusUpdateform(!isStatusUpdateform)
    setIsBorrowerActive(false);
    setIsTeammemberActive(false);
    setPractialydisbursed(false);
    setLenderFormActive(false);
    setContactActive(false);
    setLenderContactActive(false);
    setIsTeamMemberRegistaerActive(false)
    setIsLenderClassification(false)
  }

  const handelLenderAprovalform = () => {
    setActivecomponent("lenderaproval");
    setLenderFormActive(!isLenderformActive);
    setIsBorrowerActive(false);
    setIsTeammemberActive(false);
    setPractialydisbursed(false);
    setIsStatusUpdateform(false);
    setContactActive(false);
    setLenderContactActive(false);
    setIsTeamMemberRegistaerActive(false)
    setIsLenderClassification(false)
  }

  const handelContactDetailes = () => {
    setActivecomponent('ContactDetailes');
    setContactActive(!isContactActive);
    setIsLenderActive(false)
    setLenderFormActive(false);
    setIsBorrowerActive(false);
    setIsTeammemberActive(false);
    setPractialydisbursed(false);
    setIsStatusUpdateform(false);
    setLenderContactActive(false);
    setIsTeamMemberRegistaerActive(false)
    setIsLenderClassification(false)

  }

  const handelContactDetailesLender = () => {
    setActivecomponent('ContactDetailesLender');
    setContactActive(false);
    setIsLenderActive(false)
    setLenderFormActive(false);
    setIsBorrowerActive(false);
    setIsTeammemberActive(false);
    setPractialydisbursed(false);
    setIsStatusUpdateform(false);
    setLenderContactActive(!isLenderContactActive);
    setIsTeamMemberRegistaerActive(false)
    setIsLenderClassification(false)
  }

  const handelTeamMemberRegistration = () => {
    setActivecomponent('TeamMemmberReg');
    setContactActive(false);
    setIsLenderActive(false)
    setLenderFormActive(false);
    setIsBorrowerActive(false);
    setIsTeammemberActive(false);
    setPractialydisbursed(false);
    setIsStatusUpdateform(false);
    setLenderContactActive(false);
    setIsTeamMemberRegistaerActive(!isTeamMemberRegisterActive)
    setIsLenderClassification(false)
  }

  const handelLenderClassification = () => {
    setActivecomponent('lenderclassification');
    setContactActive(false);
    setIsLenderActive(false)
    setLenderFormActive(false);
    setIsBorrowerActive(false);
    setIsTeammemberActive(false);
    setPractialydisbursed(false);
    setIsStatusUpdateform(false);
    setLenderContactActive(false);
    setIsTeamMemberRegistaerActive(false)
    setIsLenderClassification(!isLenderClassification)
  }

  return (
    <>
      <div className='page-container'>
        <div className='createitems'>
          <ul className='links'>
            <li onClick={() => handelCreateBorrower()}>
              <div className={`currentlink ${isBorrowerActive ? 'activelink' : ''}`}>
                Borrower
              </div>
            </li>
            <li onClick={() => handelCreateLender()}>
              <div className={`currentlink ${isLenderActive ? 'activelink' : ''}`}>
                Lender
              </div>
            </li>
            <li onClick={() => handelContactDetailes()}>
              <div className={`currentlink ${isContactActive ? 'activelink' : ''}`}>
                Borrower - Contact Detailes
              </div>
            </li>
            <li onClick={() => handelContactDetailesLender()}>
              <div className={`currentlink ${isLenderContactActive ? 'activelink' : ''}`}>
                Lender - Contact Detailes
              </div>
            </li>
            <li onClick={handelLenderClassification}>
              <div className={`currentlink ${isLenderClassification ? 'activelink' : ''}`}>
                Lender Classification
              </div>
            </li>
            <li onClick={() => handelCreateTeammember()}>
              <div className={`currentlink ${isTeammemberactive ? 'activelink' : ''}`}>
                Team Member
              </div>
            </li>
            <li onClick={() => handelCreatePartiallyDissbursedrec()}>
              <div className={`currentlink ${isParctialydisbursed ? 'activelink' : ''}`}>
                Partialy disbursed Recods
              </div>
            </li>
            <li onClick={() => handelStatusupdateform()}>
              <div className={`currentlink ${isStatusUpdateform ? 'activelink' : ''}`}>
                Create Status for Updates
              </div>
            </li>
            <li onClick={() => handelLenderAprovalform()}>
              <div className={`currentlink ${isLenderformActive ? 'activelink' : ''}`}>
                Lender Approval Form
              </div>
            </li>
            <li onClick={() => handelTeamMemberRegistration()}>
              <div className={`currentlink ${isTeamMemberRegisterActive ? 'activelink' : ''}`}>
                Team Memmber Registration
              </div>
            </li>
          </ul>
        </div>
        <div className='Createpages'>
          {activeComponent === 'borrower' && <Borrower />}
          {activeComponent === 'lender' && <Lender />}
          {activeComponent === 'ContactDetailes' && <ContactDetailes />}
          {activeComponent === 'teammember' && <CreateTeamMember />}
          {activeComponent === 'paritialydisbursed' && <CreatePartiallyDissbursedrec />}
          {activeComponent === 'statusupdateform' && <Statusupdateform />}
          {activeComponent === 'lenderaproval' && <LenderAprovalform />}
          {activeComponent === 'ContactDetailesLender' && <Contactdetaileslender />}
          {activeComponent === 'TeamMemmberReg' && <TeamMemberReg />}
          {activeComponent === 'lenderclassification' && <LenderClassification />}
        </div>
      </div>
    </>
  )
}

export default CreateBorrowerandLenderDetailes
