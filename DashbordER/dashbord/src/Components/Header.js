import { React, useState } from 'react'
import { useLocation, useNavigate, } from 'react-router-dom';
import { Sidebaritems } from './Sidebaritems';
import "../App.css";
import "./Dashbord.css"
import "../Pages/Borrower.css"
import LogoutIcon from '@mui/icons-material/Logout';
import ConfiromDailog from '../Pages/Dailogs/ConfiromDailog';
import { ToastContainer, toast } from 'react-toastify';


const Header = () => {
    const [isConfiormopen, setConfiormOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const navigate = useNavigate()

    const handleMenuClick = (link) => {
        // console.log(link)
        // let location = useLocation();
        // console.log(location)
        navigate(link);
        setActiveTab(link)
    };
    // let location = useLocation();
    // console.log(location)


    const message = "Confirm Signout";

    const handelCancelLogout = () => {
        setConfiormOpen(false)
    }

    const handelLogout = () => {
        setConfiormOpen(true)
    }

    const handelLogoutUser = () => {
        toast.info("Logout successfully.", {
            autoClose: true,
            position: toast.POSITION.TOP_RIGHT,
        })
        setTimeout(() => {
            navigate('/LoginPage');
        }, 2000);

    }

    return (
        <>
            {/* <div> */}
            <div className="sidebar">
                <div className='topsection w-100'>
                    <div className='logo'>
                        <img src="images/ER.jpeg" alt=''></img>
                    </div>
                    <div className='Logotext'>
                        <div className='Express'>
                            <span className='E'>E</span>
                            <span>xpress</span>
                        </div>
                        <div className='rupaya'>
                            <span className='E'>R</span>
                            <span>upya</span>
                        </div>
                    </div>
                    <div className='dashbord w-100 text-center'>
                        <h2>DASHBOARD</h2>
                    </div>
                    <div className='buttonsection w-100 me-2'>
                        <button className='p-2 logout_btn float-end' onClick={handelLogout}>
                            <span className='btn_lg_text mx-2 fw-bolder fs-5'>
                                <span>Sign out</span> <span><LogoutIcon /></span>
                            </span>
                        </button>
                    </div>
                </div>

            </div>
            <ul className='sidebarList w-100'>
                {Sidebaritems.map((val, key) => (
                    <li
                        key={key}
                        className={`row ${val.link === activeTab ? "sideactivelink" : ""}`}
                        onClick={() => handleMenuClick(val.link)}
                    >
                        <div className='section1'>
                            <div id='icon'>{val.icon}</div>
                            <div id='title'>{val.title}</div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* </div> */}
            <ConfiromDailog open={isConfiormopen} onClose={handelCancelLogout} handelOnConfirm={handelLogoutUser} message={message} />
            <ToastContainer
                autoClose={5000}
                position='top-right' />
        </>
    )
}

export default Header
