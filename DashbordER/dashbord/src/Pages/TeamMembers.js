import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import BACKEND_API_END_POINT from '../config';

const TeamMembers = () => {
    // filtering data
    const [inputvalue, setInputvalue] = useState('');
    const [teamMemberdata, setTeamMemberdata] = useState([]);

    //for displaying lender and borrower detailes associated with team member id
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${BACKEND_API_END_POINT}/assignment`);
    //             setTeamMemberdata(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchData();
    // }, [inputvalue]);


    const handelSearch = () => {
        const filteredData = teamMemberdata.filter((assignment) => {
            const teammeberid = assignment.teammember_id.toString();
            const firstName = assignment.teammember?.FirstName.toLowerCase();

            const searchTerm = inputvalue.toLowerCase();

            return (
                teammeberid.includes(searchTerm) || firstName.includes(searchTerm)
            )

        })

        return filteredData;
    }


    //for dispalying data of team members
    const [data, setData] = useState([])
    console.log(BACKEND_API_END_POINT)
    useEffect(() => {
        const featchdata = async () => {
            try {
                const responce = await axios.get(`${BACKEND_API_END_POINT}/retrivedata`);
                setData(responce.data);
            } catch (error) {
                console.log(error);
            }
        };
        featchdata()
    }, [])

    return (
        <div className='TMmainpage'>
            <div className='tabel'>
                <div className='tablesheading  '>
                    <h3 className='col-6 text-center'>Team members</h3>
                </div>
                <div className='containt'>
                    <table >
                        <thead>
                            <tr className='teammembers'>
                                <th>Team Member ID</th>
                                <th>First Name</th>
                                <th>Last name</th>
                                <th colSpan={2}>Full Name</th>
                                <th>Email address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((teammembers) => {
                                return (<tr key={teammembers.TeamM_id} className='teammembers'>
                                    <td>{teammembers.TeamM_id}</td>
                                    <td>{teammembers.FirstName}</td>
                                    <td>{teammembers.LastName}</td>
                                    <td colSpan={2}>{`${teammembers.FirstName} ${teammembers.LastName}`}</td>
                                    <td>{teammembers.Email_address}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TeamMembers
