import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import "./Email.css"

const ReminderNotification = ({ message }) => {
    const [displayState, setDisplayState] = useState('Setting Reminder on ');

    useEffect(() => {
        // Set a timeout to change the display state after a certain time (e.g., 2000ms)
        const timer = setTimeout(() => {
            setDisplayState('Set At');
        }, 4000);

        // Clean up the timeout when the component is unmounted
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className='CustomTost'>
            <AccessAlarmIcon className='Customalarm' />
            <span className='customtext'>{displayState} {message}</span>
        </div>
    )
}

export const showToast = (message) => {
    toast.info(<ReminderNotification message={message} status="Setting" />, {
        className: 'Customreminder'
    })
}

const TostNotification = () => {
    return <ToastContainer autoClose={6000}  enableMultiContainer={false}/>;
}
export default TostNotification;
