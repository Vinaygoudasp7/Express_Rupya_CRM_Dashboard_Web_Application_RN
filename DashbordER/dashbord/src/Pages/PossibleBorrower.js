import React, { useEffect, useState } from 'react'
import './TeamMembers.css'
import "./PossiblelenderBorrowerstyle.css"
import Select from 'react-select'
import axios from 'axios'
import "./ShowBorrowers.css"



const PossibleBorrower = () => {
  const [lender, setLender] = useState([])
  const [selectedlender, setSelectedLender] = useState('');
  const [lenderDetailes, setLenderDetailes] = useState([]);
  const [borrowersDetailes, setBorrowerDetails] = useState([]);
  const [filterdBorrowerDetailes, setFilterBorrowerdetailes] = useState([])

  useEffect(() => {
    const featchBorrowersDetailes = async () => {
      const responce = await axios.get("http://localhost:4306/List_borrowers");
      const data = responce.data
      console.log(data)
      setBorrowerDetails(data)
    }
    featchBorrowersDetailes();
  }, [])

  useEffect(() => {
    const featchLenders = async () => {
      const response = await axios.get("http://localhost:4306/List_Lenders");
      const lenders = response.data;
      // Define the empty value option
      console.log(lenders)
      const emptyOption = { value: '', label: 'Select lender' };

      lenders.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA < nameB) {
          return -1
        } else if (nameB > nameA) {
          return 1
        }
        return 0
      })
      // Map the lenders data and concatenate it with the empty option
      const mapedOptions = lenders.map((lender) => ({
        value: lender.id,
        label: lender.name
      }));

    
      const formattedOptions = [emptyOption, ...mapedOptions]
      setLender(formattedOptions)
    }
    featchLenders();
  }, [])

  console.log(lender)

  const handelSelectedLender = (selectedlender) => {
    setSelectedLender(selectedlender);
  }


  useEffect(() => {
    const fetchLenderDetails = async () => {
      if (selectedlender.value) {
        const response = await axios.get(`http://localhost:4306/lenderDetailesOf/${selectedlender.value}`);
        const lenderDetails = response.data;
        // Assuming you have fetched borrowersDetails as well.
        // If not, you need to fetch it here.
        // const borrowersResponse = await axios.get('http://localhost:4306/List_borrowers');
        // const borrowersData = borrowersResponse.data;

        const filteredBorrowers = borrowersDetailes.filter((borrower) => {
          const lenderRegion = lenderDetails.Borrowerregion;
          const lenderLoanTypes = lenderDetails.loanTypes;
          const lenderProducts = lenderDetails.products;

          return (
            lenderRegion.includes(borrower.region) &&
            lenderLoanTypes.includes(borrower.loanTypes) &&
            lenderProducts.includes(borrower.products) &&
            borrower.creditRating >= lenderDetails.minCreditRating &&
            borrower.maxInterestRate >= lenderDetails.minInterestRate &&
            borrower.aum >= lenderDetails.aum &&
            borrower.minLoanAmount >= lenderDetails.minLoanAmount &&
            borrower.minLoanAmount <= lenderDetails.maxLoanAmount
          );
        });

        setFilterBorrowerdetailes(filteredBorrowers);
      } else {
        // If no lender is selected, show all borrowers
        setFilterBorrowerdetailes(borrowersDetailes);
      }
    };
    fetchLenderDetails();
  }, [selectedlender.value, borrowersDetailes]);

  // console.log(selectedlender.length)


  return (
    <div className='customcontainer'>
      <div className='row'>
        <div className='col'>
          <div className='container text-center'>
            <div className='tablesheading' style={{ marginLeft: "130px" }}>
              <h3>List of Possible Borrower</h3>
            </div>
          </div>
          <div className='container d-flex align-items-center justify-content-center'>
            <div className='d-flex align-items-center'>
              <div className='Ltext'>Lender</div>
              <div className='selectcontainer' style={{ zIndex: 10 }}>
                <Select options={lender} value={selectedlender} onChange={handelSelectedLender} placeholder="Select Lenders" styles={{ zIndex: 3 }}></Select>
              </div>
            </div>
          </div>
          <div className='tableContaient m-3' style={{ zIndex: 2, width: "120%" }}>
            <table id='Showborrower'>
              <thead className='tablehead'>
                <tr>
                  <th>Id</th>
                  <th
                    style={{ width: "250px" }}
                  >Name</th>
                  <th>Region</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Entity Type</th>
                  <th>CIN</th>
                  <th style={{ width: '350px' }}>Loan Types</th>
                  <th style={{ width: '200px' }}>Owner</th>
                  <th  >Product Type</th>
                  <th style={{ width: '449px' }} >Products</th>
                  <th style={{ width: '120px' }} >Credit Rating</th>
                  <th style={{ width: '120px' }} > CreditRatingAgency</th>
                  <th style={{ width: '120px' }} >Financial year for AUM</th>
                  <th style={{ width: '120px' }} >Quarter of year for AUM</th>
                  <th style={{ width: '120px' }} >aum (in crores)</th>
                  <th style={{ width: '120px' }}>Maximum interest Rate</th>
                  <th style={{ width: '120px' }}>Minimum Loan amount (in crores)</th>
                </tr>
              </thead>
              <tbody>
                {filterdBorrowerDetailes && filterdBorrowerDetailes.length > 0 ? (
                  filterdBorrowerDetailes.map((detail) => (
                    <tr key={detail.id}>
                      <td>
                        {detail.id}
                      </td>
                      <td>
                        {detail.name}
                      </td>
                      <td>
                        {detail.region}
                      </td>
                      <td>
                        {detail.state}
                      </td>
                      <td>
                        {detail.city}
                      </td>
                      <td>
                        {detail.entityType}
                      </td>
                      <td>
                        {detail.cin}
                      </td>
                      <td>
                        {detail.loanTypes}
                      </td>
                      <td>
                        {detail.owner}
                      </td>
                      <td>
                        {detail.productType}
                      </td>
                      <td>
                        {detail.products}
                      </td>
                      <td>
                        {detail.creditRating}
                      </td>
                      <td>
                        {detail.creditRatingAgency}
                      </td>
                      <td>
                        {detail.financialYearAUM}
                      </td>
                      <td>
                        {detail.quarterAUM}
                      </td>
                      <td>
                        {detail.aum}
                      </td>
                      <td>
                        {detail.maxInterestRate}
                      </td>
                      <td>
                        {detail.minLoanAmount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={18} style={{ fontFamily: "Times roman", fontWeight: "bolder", fontSize: "30px", color: 'red' }}>
                      No borrowers are currently seeking loans from {`${selectedlender.label}`} lender
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PossibleBorrower
