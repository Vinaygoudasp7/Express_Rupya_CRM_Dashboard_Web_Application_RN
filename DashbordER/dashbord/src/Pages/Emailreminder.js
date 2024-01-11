import React, { useEffect, useState } from 'react'
import PendingwithER from './PendingwithER';
import Pendingwithborrowe from './Pendingwithborrowe';
import Pendingwithlender from './Pendingwithlender';
import axios from 'axios';
import "./Email.css"
import SendDetailestoTeam from './SendDetailestoTeam';

const Emailreminder = () => {

    const [activecomponent, setActivecomponent] = useState(null);

    const handeShowTableofER = () => {
        setActivecomponent("PendingwithER");
    }

    const handeShowTableofborrower = () => {
        setActivecomponent("Pendingwithborrower");
    }

    const handeShowTableoflender = () => {
        setActivecomponent("Pendingwithlender")
    }

    const handelteammember = () => {
        setActivecomponent("SendDetails")
    }
    const handelClose = () => {
        setActivecomponent(null);
    }

    const [pendingdata, setPendingdata] = useState([]);
    useEffect(() => {
        const featchpendingdata = async () => {
            try {
                const responce = await axios.get("http://192.168.29.250:4306/retrivestatus");
                setPendingdata(responce.data);

            } catch (error) {
                console.log("Error while retriving ", error);
            }
        }
        featchpendingdata()
    }, [])

    return (
        <>

            <div className='emailmaincontent'>
                <div className='tablebuttons'>
                    <button onClick={handeShowTableofER}>Express Rupaya</button>
                    <button onClick={handeShowTableofborrower}>Borrower</button>
                    <button onClick={handeShowTableoflender}>Lender</button>
                    {/* <button onClick={handelteammember}>Send Details</button> */}
                </div>
                <section className='displaytable'>
                    {activecomponent === "PendingwithER" && (
                        <>
                            <button className="closebtn" onClick={handelClose}>X</button>
                            <PendingwithER pendingdata={pendingdata} />
                        </>
                    )}
                    {activecomponent === "Pendingwithborrower" && (
                        <>
                            <button className="closebtn" onClick={handelClose}>X</button>
                            <Pendingwithborrowe pendingdata={pendingdata} />

                        </>
                    )}
                    {activecomponent === "Pendingwithlender" && (
                        <>
                            <button className="closebtn" onClick={handelClose}>X</button>
                            <Pendingwithlender pendingdata={pendingdata} />

                        </>
                    )}

                    {activecomponent === "SendDetails" && (
                        <>
                            <button className="closebtn" onClick={handelClose}>X</button>
                            <SendDetailestoTeam pendingdata={pendingdata} />
                        </>
                    )}
                </section>
            </div>
        </>
    )
}
export default Emailreminder
