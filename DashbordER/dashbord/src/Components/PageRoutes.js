import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Region from "../Pages/Region";
import Delete from '../Pages/Delete';
import RestoreLenders from '../Pages/RestoreLenders';
import RestoreBorrowers from '../Pages/RestoreBorrowers';
import TeamMembers from '../Pages/TeamMembers';
import CreateTeammember from '../Pages/CreateTeammember';
import Detailesof from '../Pages/Detailesof';
import Assign from '../Pages/Assign';
import Updatemodel from './Updatemodel';
import StatusUpdate from '../Pages/StatusUpdate';
import Statusupdateform from '../Pages/Statusupdateform';
import LenderAprovalform from '../Pages/LenderAprovalform';
import Emailreminder from '../Pages/Emailreminder';
import Partiallydisbursed from '../Pages/Partiallydisbursed';
import CreatePartiallyDissbursedrec from '../Pages/CreatePartiallyDissbursedrec';
import LoginPage from '../Pages/LoginPage';
import Borrower from '../Pages/Borrower'
import CreateBorrowerandLenderDetailes from '../Pages/CreateBorrowerandLenderDetailes';
import Lender from '../Pages/Lender';
import Show_Lenders from '../Pages/Show_Lenders'
import Show_Borrowers from '../Pages/Show_Borrowers'
import Contactdetailes from '../Pages/ContactDetails';
import Contactdetaileslender from '../Pages/ContactDetailslender'
import PossibleBorrower from '../Pages/PossibleBorrower';
import PossibleLenders from '../Pages/PossibleLenders';
import Registrationpage from '../Pages/Registrationpage';

const PageRoutes = () => {
  return (
    <Routes>
      <Route path='/Show_Borrowers' element={<Show_Borrowers />}></Route >
      <Route path='/Show_Lenders' element={<Show_Lenders />}></Route>
      <Route path='/Lender' element={<Lender />} />
      <Route path='/Borrower' element={<Borrower />}></Route>
      <Route path='/CreateBorrowerandLenderDetailes' element={<CreateBorrowerandLenderDetailes />}></Route>
      <Route path="/Region" element={<Region />} />
      <Route path="/Delete/:S_id" element={<Delete />} />
      <Route path="/RestoreLenders" element={<RestoreLenders />} />
      <Route path="/RestoreBorrowers" element={<RestoreBorrowers />} />
      <Route path="/TeamMembers" element={<TeamMembers />} />
      <Route path="/CreateTeammember" element={<CreateTeammember />} />
      <Route path='/Assign' element={<Assign />} />
      <Route path="/Detailesof/:Borrower_id" element={<Detailesof />} />
      <Route path='/Updatemodel' element={<Updatemodel />} />
      <Route path='/StatusUpdate' element={<StatusUpdate />}></Route>
      <Route path='/Statusupdateform' element={<Statusupdateform />}></Route>
      <Route path='/LenderAprovalform' element={<LenderAprovalform />}></Route>
      <Route path='/Emailreminder' element={<Emailreminder />}></Route>
      <Route path='/Partiallydisbursed' element={<Partiallydisbursed />}></Route>
      <Route path='/CreatePartiallyDissbursedrec' element={<CreatePartiallyDissbursedrec />}></Route>
      <Route path='/LoginPage' element={<LoginPage />}></Route>
      <Route path='/ContactDetailes' element={<Contactdetailes />}></Route>
      <Route path='/ContactDetailesLender' element={<Contactdetaileslender />}></Route>
      <Route path='/PossibleBorrowers' element={<PossibleBorrower />}></Route>
      <Route path='/PossibleLenders' element={<PossibleLenders />}></Route>
      <Route path='/registration' element={<Registrationpage />}></Route>
    </Routes>
  )
}

export default PageRoutes;
