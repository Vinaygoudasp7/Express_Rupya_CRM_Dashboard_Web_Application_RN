import React from 'react';
import { Outlet, useLocation, } from 'react-router-dom';
import "../App.css";
import "./Dashbord.css"
import PageRoutes from "./PageRoutes";
import "../Pages/Borrower.css"
import Header from '../Components/Header';


const Dashbord = () => {

  return (
    <div className='dashbord-container'>
      <div className='d-header p-0 m-0'>
        <Header />
      </div>
      <div className='d-body'>
        <div className="Selectboxs">
          <PageRoutes />
        </div>
      </div>
    </div>
  )
};

export default Dashbord;
