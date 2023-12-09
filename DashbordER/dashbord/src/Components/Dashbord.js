import React from 'react';
import { Outlet, useLocation, } from 'react-router-dom';
import "../App.css";
import "./Dashbord.css"
import PageRoutes from "./PageRoutes";
import "../Pages/Borrower.css"
import Header from '../Components/Header';


const Dashbord = () => {

  return (
    <div className='container p-0 m-0' style={{maxWidth:'100vw'}}>
      <div className='mainpage row'>
        <div className='Header p-0 m-0'>
          <Header />
        </div>
        <div className='Body p-0'>
          <div className="Selectboxs w-100">
            <PageRoutes />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashbord;
