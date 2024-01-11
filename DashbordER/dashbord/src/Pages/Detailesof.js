import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Detailesof = () => {

  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const featchdata = (id) => {
      axios.get(`http://192.168.29.250:4306/read/${id}`)
        .then(responce => {
          setData(responce.data);
        }).catch(error => {
          console.error('Error featching data', error)
        })
    }
  }, [id]);

  
  return (
    <div>
        <h2>Detailes for ID:{id}</h2>
        <table>
          <thead>
            <tr>
              <th>lender_id </th>
              <th>lender_name </th>
              <th>lender_id </th>
              <th>lender_id </th>
            </tr>
          </thead>
          <tbody>
            {data.map(item=>(
              <tr key={item.Borrower_id}>
                <td>{item.Borrower_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Detailesof
