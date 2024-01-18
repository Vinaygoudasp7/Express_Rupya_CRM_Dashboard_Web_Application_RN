import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import BACKEND_API_END_POINT from '../config';

const SendDetailestoTeam = ({ pendingdata }) => {
    const [teammemberName, setTeammemberName] = useState('');
    const [selectTeammember, setSelecteammember] = useState([]);

    useEffect(() => {
        const featchteam = async () => {
            try {
                const responce = await axios.get(`${BACKEND_API_END_POINT}/teammembers`);
                const teammebers = responce.data;
                const teammemberoptions = teammebers.map((teammember) => ({
                    label: teammember.FirstName + " " + teammember.LastName,
                    value: teammember.TeamM_id
                }))
                setTeammemberName(teammemberoptions)
            } catch (error) {
                window.alert("Error while retriving teammembers");
                console.log("error while retriving teammembers", error);
            }
        }
        featchteam();
    }, [])

    const handelSelectedteammeber = (selectedTeammember) => {
        setSelecteammember(selectedTeammember);
    }
    return (
        <>
            <div className='detailessection'> 
                <Select className='selectteam'
                    options={teammemberName}
                    isSearchable={true}
                    value={selectTeammember}
                    onChange={handelSelectedteammeber}
                >

                </Select>
            </div>
        </>
    )
}

export default SendDetailestoTeam
