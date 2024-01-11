import React from 'react'
import { useState } from 'react';
import "./Region.css"
import { Sidebaritems, Regions } from '../Components/Sidebaritems';
import { Regionchildren } from '../Components/Regionchildren';
import axios from 'axios';

function Region() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [data, setData] = useState([]);
  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value
    setSelectedRegion(selectedRegion);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value
    setSelectedState(selectedState);
    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const getStatesByRegion = (region) => {
    const selectedRegionItem = Regionchildren.find((item) => item.title === region);
    return selectedRegionItem?.Childrens || [];
  };

  const getCitiesByState = (state) => {
    const selectedStateItem = getStatesByRegion(selectedRegion).find(
      (item) => item.title === state
    );
    return selectedStateItem?.Childrens || [];
  };


  const featchData = () => {
    axios.get('http://192.168.29.250:4306/retrive', {
      params: {
        region: selectedRegion,
        state: selectedState,
        city: selectedCity
      }
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  return (
    <>
      <header className='head'>
        REGION
      </header>
      <div className='selectboxes' >
        <div className='box1'>
          <select value={selectedRegion} onChange={handleRegionChange} className='Region' >
            <option value="" className='children'>Select Region</option>
            {Regionchildren.map((item) => (
              <option key={item.title} value={item.title}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className='box2'>
          <select value={selectedState} onChange={handleStateChange} className='state'>
            <option value="" className='children'>Select State</option>
            {getStatesByRegion(selectedRegion).map((state) => (
              <option key={state.title} value={state.title}>{state.title}</option>
            ))}
          </select>
        </div>
        <div className='box3'>
          <select value={selectedCity} onChange={handleCityChange} className='city'>
            <option value="" className='children'>Select City</option>
            {getCitiesByState(selectedState).map((City) => (
              <option key={City.title} value={City.title}>{City.title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit" onClick={featchData}>Featch data</button>
      </div>
      <div>
        <div>
          <div>
            <div className='table'>
              <table>
                <thead className='tableheadrow'>
                  <tr >
                    <th>Borrower ID</th>
                    <th>Name of the Borrower</th>
                    <th>Region</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Name of the Lender</th>
                    <th>Action Taken</th>
                    <th>Pending With</th>
                    <th>Proposal Status</th>
                  </tr>
                </thead>
                <tbody className='tablebody'>
                  {data && data.map((borrowers) => {
                    return (<tr key={borrowers.Borrower_id} className='bodyrow'>
                      <td>{borrowers.Borrower_id}</td>
                      <td>{borrowers.Borrower_name}</td>
                      <td>{borrowers.Region}</td>
                      <td>{borrowers.State}</td>
                      <td>{borrowers.City}</td>
                      <td>{borrowers.Name_of_the_Lender}</td>
                      <td>{borrowers.Action_Taken}</td>
                      <td>{borrowers.Pending_With}</td>
                      <td>{borrowers.Proposal_Status}</td>
                    </tr>)
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Region;
