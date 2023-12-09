import React, { useEffect, useState } from 'react'
import './TeamMembers.css'
import "./PossiblelenderBorrowerstyle.css"
import Select from 'react-select'
import axios from 'axios'
import "./ShowBorrowers.css"


const PossibleLenders = () => {
    const [borrower, setBorrower] = useState([])
    const [selectedBorrower, setSelectedBorrower] = useState([]);
    const [lenderDetailes, setLenderDetailes] = useState([]);
    const [filterdLenderDetailes, setFilterLenderdetailes] = useState([])

    useEffect(() => {
        const featchBorrowersDetailes = async () => {
            const responce = await axios.get("http://localhost:4306/List_lenders");
            const data = responce.data
            console.log(data)
            setLenderDetailes(data)
        }
        featchBorrowersDetailes();
    }, [])

    useEffect(() => {
        const featchLenders = async () => {
            const response = await axios.get("http://localhost:4306/List_borrowers");
            const borrowers = response.data;


            borrowers.sort((a, b) => {
                const nameA = a.name.toUpperCase()
                const nameB = b.name.toUpperCase()
                if (nameA < nameB) {
                    return -1
                } else if (nameB > nameA) {
                    return 1
                }
                return 0
            })

            // Define the empty value option
            const emptyOption = { value: '', label: 'Select Borrower' };

            // Map the lenders data and concatenate it with the empty option
            const mapedOptions = borrowers.map((borrower) => ({
                value: borrower.id,
                label: borrower.name
            }));
            const formattedOptions = [emptyOption, ...mapedOptions]
            setBorrower(formattedOptions)
        }
        featchLenders();
    }, [])

    const handelSelectedBorrower = (selectedBorrower) => {
        setSelectedBorrower(selectedBorrower);
    }


    useEffect(() => {
        const fetchLenderDetails = async () => {
            if (selectedBorrower.value) {
                const response = await axios.get(`http://localhost:4306/lenderDetailesOf/${selectedBorrower.value}`);
                const Borrowerdetaile = response.data;
                // Assuming you have fetched borrowersDetails as well.
                // If not, you need to fetch it here.
                // const borrowersResponse = await axios.get('http://localhost:4306/List_borrowers');
                // const borrowersData = borrowersResponse.data;

                const filteredLendersDetailes = lenderDetailes.filter((lender) => {
                    const borrowerRegion = Borrowerdetaile.Borrowerregion;
                    const borrowerLontype = Borrowerdetaile.loanTypes;
                    const borrowerproducts = Borrowerdetaile.products;

                    return (
                        borrowerRegion.includes(lender.region) &&
                        borrowerLontype.includes(lender.loanTypes) &&
                        borrowerproducts.includes(lender.products) &&
                        lender.creditRating >= Borrowerdetaile.minCreditRating &&
                        lender.maxInterestRate >= Borrowerdetaile.minInterestRate &&
                        lender.aum >= Borrowerdetaile.aum &&
                        lender.minLoanAmount >= Borrowerdetaile.minLoanAmount &&
                        lender.minLoanAmount <= Borrowerdetaile.maxLoanAmount
                    );
                });

                setFilterLenderdetailes(filteredLendersDetailes);
            } else {
                // If no lender is selected, show all borrowers
                setFilterLenderdetailes(lenderDetailes);
            }
        };
        fetchLenderDetails();
    }, [selectedBorrower.value, lenderDetailes]);

    // console.log(selectedlender.length)

    return (
        <div className='container customcontainer'>
            <div className='row'>
                <div className='col'>
                    <div className='container text-center'>
                        <div className='tablesheading' style={{ marginLeft: "130px" }}>
                            <h3>List of Possible Lenders</h3>
                        </div>
                    </div>
                    <div className='container d-flex align-items-center justify-content-center'>
                        <div className='d-flex align-items-center'>
                            <div className='Ltext'>Borrower</div>
                            <div className='selectcontainer' style={{ zIndex: 10 }}>
                                <Select options={borrower} value={selectedBorrower} onChange={handelSelectedBorrower} placeholder="Select Lenders" styles={{ zIndex: 3 }}></Select>
                            </div>
                        </div>
                    </div>
                    <div className='tableContaient m-3' style={{ zIndex: 2, width: "120%" }}>
                        <table id='Showborrower'>
                            <thead className='tablehead'>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Region</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Borrower Region</th>
                                    <th>Loan Types</th>
                                    <th>Owner</th>
                                    <th>Product Type</th>
                                    <th>Products</th>
                                    <th>Credit Rating</th>
                                    <th>aum (in crores)</th>
                                    <th>Minimum interest Rate</th>
                                    <th>Maximum Loan amount (in crores)</th>
                                    <th>Minimum Loan amount (in crores)</th>

                                </tr>
                            </thead>
                            <tbody>
                                {filterdLenderDetailes && filterdLenderDetailes.length > 0 ? (
                                    filterdLenderDetailes.map((detail) => (
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
                                                {detail.Borrowerregion}
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
                                                {detail.minCreditRating}
                                            </td>
                                            <td>
                                                {detail.aum}
                                            </td>
                                            <td>
                                                {detail.minInterestRate}
                                            </td>
                                            <td>
                                                {detail.maxLoanAmount}
                                            </td>
                                            <td>
                                                {detail.minLoanAmount}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={18} style={{ fontFamily: "Times roman", fontWeight: "bolder", fontSize: "30px", color: 'red' }}>
                                            No borrowers are currently seeking loans from {`${selectedBorrower.label}`} lender
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

export default PossibleLenders
