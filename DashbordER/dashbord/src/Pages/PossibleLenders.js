import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Select from 'react-select'
import './PossiblelenderBorrowerstyle.css'
import BACKEND_API_END_POINT from '../config'

const PossibleLender = () => {
    const [borrower, setBorrower] = useState([])
    const [formatedborrower, setFormatedborrower] = useState([])
    const [selectedBorrower, setSelectedBorrower] = useState([])
    const [possibleLenderDetails, setPossibleLenderDetails] = useState([])
    const [mandateGiven, setMandateGiven] = useState([])
    const [notClassified, setNotClassified] = useState([])
    const [existingLender, setExistingLender] = useState([])
    const [existingThrowUs, setExistingThrowUs] = useState([])
    const [negtiveLender, setNegitiveLender] = useState([])
    const [lender, setLender] = useState([])
    const [mandateGiventotalMaxAmt, setMandateGiventotalMaxAmt] = useState(0)
    const [notClassifiedtotalMaxAmt, setNotClassifiedtotalMaxAmt] = useState(0)
    const [existingLendertotalMaxAmt, setExistingLendertotalMaxAmt] = useState(0)
    const [existingThrowUstotalMaxAmt, setExistingThrowUstotalMaxAmt] = useState(0)
    const [negtiveLendertotalMaxAmt, setNegitiveLendertotalMaxAmt] = useState(0)
    const [featchData, setFeatchData] = useState([])
    const [totalLoanAmount, setTotalLoanAmount] = useState(0)

    useEffect(() => {
        const fetchBorrowerDetails = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_END_POINT}/List_borrowers`);
                const lenderresponse = await axios.get(`${BACKEND_API_END_POINT}/List_lenders`);
                console.log(lenderresponse.data)
                const lenderdetails = lenderresponse.data
                lenderdetails.sort((a, b) => {
                    const aName = a.name.toLowerCase()
                    const bName = b.name.toLowerCase()
                    if (aName < bName) {
                        return -1
                    } else if (aName > bName) {
                        return 1
                    }
                    else {
                        return 0
                    }
                })
                setLender(lenderdetails)

                const borrowerdata = response.data
                setBorrower(borrowerdata)
                const formatedBorrower = borrowerdata.map((data) => ({
                    value: data.id,
                    label: data.name
                }))
                formatedBorrower.sort((a, b) => {
                    const aName = a.label.toLowerCase()
                    const bName = b.label.toLowerCase()
                    if (aName < bName) {
                        return -1
                    } else if (aName > bName) {
                        return 1
                    }
                    else {
                        return 0
                    }
                })
                setFormatedborrower(formatedBorrower)
            } catch (error) {
                console.error('Error fetching borrower or lender details:', error);
            }
        };
        fetchBorrowerDetails()
    }, [])
    console.log(lender)


    const handelSelectedBorrower = async (selectedborrower) => {
        setSelectedBorrower(selectedborrower)
        setFeatchData(true)
    }

    const getFeatchPossibleLenderData = async () => {
        const borrower_id = selectedBorrower?.value
        console.log(borrower_id)
        try {
            const lenderclassification = await axios.get(`${BACKEND_API_END_POINT}/retrivelenderclassificationofborrower/${borrower_id}`)
            const lenderClassificationsData = lenderclassification.data
            console.log(lenderClassificationsData)
            // logic for the matching the selected borrower with all lenders
            const selectedBorrowerDetails = borrower.find((data) => data.id === borrower_id)
            console.log(selectedBorrowerDetails)

            const selectedborrowerregion = selectedBorrowerDetails?.region
            const borrowerloantypes = Array.isArray(selectedBorrowerDetails?.loanTypes) ? selectedBorrowerDetails?.loanTypes : selectedBorrowerDetails?.loanTypes.split(',')
            const borrowerproducts = Array.isArray(selectedBorrowerDetails?.products) ? selectedBorrowerDetails?.products : selectedBorrowerDetails?.products.split(',')
            const borrowercreditrating = selectedBorrowerDetails?.creditRating
            const borrowermaxintrestrate = selectedBorrowerDetails?.maxInterestRate
            const borrowerminloanamt = selectedBorrowerDetails?.minLoanAmount
            // console.log(typeof (borrowerloantypes), borrowerloantypes)


            const passibleLenders = lender.filter((data) => {
                const lenderregion = data?.Borrowerregion
                const lenderloantypes = Array.isArray(data?.loanTypes) ? data?.loanTypes : data.loanTypes.split(',')
                const lenderproducts = Array.isArray(data?.products) ? data?.products : data.products.split(',')
                const lendercreditrating = data?.minCreditRating
                const lenderminIntrestrate = data?.minInterestRate
                const lenderminloanamt = data?.minLoanAmount
                const lendermaxloanamt = data?.maxLoanAmount

                const possibleLenderRegions = lenderregion.includes(selectedborrowerregion)
                const possibleLenderLoanTypes = !borrowerloantypes ? [] : lenderloantypes
                    .some(lenderLoanType =>
                        borrowerloantypes.includes(lenderLoanType)
                    );
                // console.log(possibleLenderLoanTypes)

                const possibleLenderProducts = !lenderproducts ? [] : lenderproducts.some(lenderproduct =>
                    borrowerproducts.includes(lenderproduct)
                )
                // console.log(possibleLenderProducts)

                const possibleLenderCreditRating = lendercreditrating <= borrowercreditrating
                const possibleclenderIntrestrate = lenderminIntrestrate <= borrowermaxintrestrate
                const possiblelenderLoanAmt = lenderminloanamt >= borrowerminloanamt && borrowerminloanamt <= lendermaxloanamt
                return (
                    possibleLenderRegions && possibleLenderLoanTypes && possibleclenderIntrestrate && possiblelenderLoanAmt && possibleLenderProducts && possibleLenderCreditRating
                )
            })
            console.log(passibleLenders)
            setPossibleLenderDetails(passibleLenders)


            //fillter lenders according to classification
            const filterMandateGivenLender = lenderClassificationsData.filter((data) => (
                data.classification === "Mandate Given"
            ))
            console.log(filterMandateGivenLender)
            const mandateGivenLenders = filterMandateGivenLender.reduce((acc, lenderdata) => {
                const foundLender = passibleLenders.find((data) => data.id === lenderdata.lender_id)
                if (foundLender !== undefined) {
                    acc.push(foundLender)
                }
                return acc
            }, [])
            console.log(mandateGivenLenders)
            setMandateGiven(mandateGivenLenders)

            const filterExistingLender = lenderClassificationsData.filter((data) => (
                data.classification === "Existing lender"
            ))
            const existingLenders = filterExistingLender.reduce((acc, lenderdata) => {
                const foundLender = passibleLenders.find((data) => data.id === lenderdata.lender_id)
                if (foundLender !== undefined) {
                    acc.push(foundLender)
                }
                return acc
            }, [])
            console.log(existingLenders)
            setExistingLender(existingLenders)

            const filterExistingThrowUsLender = lenderClassificationsData.filter((data) => (
                data.classification === "Existing through Us"
            ))

            const existingthrowUsLender = filterExistingThrowUsLender.reduce((acc, lenderdata) => {
                const foundLender = passibleLenders.find((data) => data.id === lenderdata.lender_id)
                if (foundLender !== undefined) {
                    acc.push(foundLender)
                }
                return acc
            }, [])
            console.log(existingthrowUsLender)
            setExistingThrowUs(existingthrowUsLender)

            const filterNotClassifiedLender = lenderClassificationsData.filter((data) => (
                data.classification === "Not Classified"
            ))
            const notClassifiedLender = filterNotClassifiedLender.reduce((acc, lenderdata) => {
                const foundLender = passibleLenders.find((data) => data.id === lenderdata.lender_id);
                if (foundLender !== undefined) {
                    acc.push(foundLender);
                }
                return acc;
            }, []);

            console.log(notClassifiedLender)
            setNotClassified(notClassifiedLender)

            const filterNegitiveLender = lenderClassificationsData.filter((data) => (
                data.classification === "Negative Lender"
            ))
            const negtiveLender = filterNegitiveLender.reduce((acc, lenderdata) => {
                const foundLender = passibleLenders.find((data) => data.id === lenderdata.lender_id)
                if (foundLender !== undefined) {
                    acc.push(foundLender)
                }
                return acc
            }, [])
            console.log(negtiveLender)
            setNegitiveLender(negtiveLender)

        } catch (error) {
            console.log(error)
        }
    }
    if (featchData) {
        getFeatchPossibleLenderData()
        setFeatchData(false)
    }
    console.log(possibleLenderDetails)

    // const totalNoOfLenders = existingLender.length + existingThrowUs.length + negtiveLender.length + notClassified.length + mandateGiven.length

    useEffect(() => {
        const totalExistingLenderMaxAmt = existingLender.reduce((total, data) => (total + parseFloat(data.maxLoanAmount)), 0)
        console.log(typeof (totalExistingLenderMaxAmt))
        setExistingLendertotalMaxAmt(totalExistingLenderMaxAmt)

        const totalExistingThrowusLenderMaxAmt = existingThrowUs.reduce((total, data) => (total + parseFloat(data.maxLoanAmount)), 0)
        setExistingThrowUstotalMaxAmt(totalExistingThrowusLenderMaxAmt)

        const totalnotClassifiedLenderMaxAmt = notClassified.reduce((total, data) => (total + parseFloat(data.maxLoanAmount)), 0)
        setNotClassifiedtotalMaxAmt(totalnotClassifiedLenderMaxAmt)

        const totalMandategivenMaxAmt = mandateGiven.reduce((total, data) => (total + parseFloat(data.maxLoanAmount)), 0)
        setMandateGiventotalMaxAmt(totalMandategivenMaxAmt)

        const totalnegtiveLenderMaxLoanamt = negtiveLender.reduce((total, data) => (total + parseFloat(data.maxLoanAmount)), 0)
        setNegitiveLendertotalMaxAmt(totalnegtiveLenderMaxLoanamt)

        const totalloanAmt = totalExistingLenderMaxAmt + totalExistingThrowusLenderMaxAmt + totalnotClassifiedLenderMaxAmt + totalMandategivenMaxAmt +
            totalnegtiveLenderMaxLoanamt
        console.log(totalloanAmt)
        setTotalLoanAmount(totalloanAmt)
    }, [existingLender])

    const totalNoOfPossibleLender = existingLender.length + existingThrowUs.length + negtiveLender.length + mandateGiven.length + notClassified.length
    return (
        <div className='customcontainer'>
            <div className='p-borrower '>
                <div className='w-100'>
                    <div className='select-b d-flex flex-row align-items-start justify-content-start w-100 m-2 p-1' style={{ maxWidth: '500px', margin: 'auto' }}>
                        <div className='pb-label form-label m-2  text-center'>Borrower Name</div>
                        <div className='selectcontainer w-100' style={{ zIndex: 10 }}>
                            <Select
                                options={formatedborrower}
                                value={selectedBorrower}
                                onChange={handelSelectedBorrower}
                                placeholder="Select Borrower"
                                isSearchable
                                styles={{ zIndex: 3 }}
                            />
                        </div>
                    </div>
                    <div className='m-2 '>
                        <h4 className='fs-4 text-center fw-bolder'>{selectedBorrower.value > 0 ? <span className='borrower-name'>{(selectedBorrower.label).toUpperCase()}</span> : '_'} Possible Lender Data analysis</h4>
                    </div>
                    <section className='table-group-divider pl-section my-2'>
                        <div className='pltop-section float-end px-2 w-100'>
                            <div className='row w-100'>
                                <div className='p-1 col-6 w-auto'>
                                    <div className='lender-total'>
                                        <p className='w-auto fs-4 m-2'>
                                            <span className='form-label fs-4'>Total Lenders : </span>
                                            <span>{lender.length}</span>
                                        </p>
                                        <p className='w-auto fs-4 m-2'>
                                            <span className='form-label fs-4'>Possible Lenders : </span>
                                            <span>{totalNoOfPossibleLender}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <table className='lender-clsfn table table-striped table-hover'>
                                        <thead>
                                            <tr >
                                                <th></th>
                                                <th className='text-dark'>No of Lenders</th>
                                                <th className='text-dark' style={{ width: '200px' }}>Maximum Loan Amount (crs)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='fw-bold fs-5'>Existing Lender</td>
                                                <td>{existingLender.length}</td>
                                                <td>{parseFloat(existingLendertotalMaxAmt).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold fs-5'>Existing Through us</td>
                                                <td>{existingThrowUs.length}</td>
                                                <td>{parseFloat(existingThrowUstotalMaxAmt).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold fs-5'>Mandate Given</td>
                                                <td>{mandateGiven.length}</td>
                                                <td>{parseFloat(mandateGiventotalMaxAmt).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold fs-5'>Not classificed</td>
                                                <td>{notClassified.length}</td>
                                                <td>{parseFloat(notClassifiedtotalMaxAmt).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold fs-5'>Negative lender</td>
                                                <td>{negtiveLender.length}</td>
                                                <td>{parseFloat(negtiveLendertotalMaxAmt).toFixed(2)}</td>
                                            </tr>
                                            <tr className='fs- fw-bold table-group-divider'>
                                                <td>Total</td>
                                                <td>{totalNoOfPossibleLender}</td>
                                                <td>{parseFloat(totalLoanAmount).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <section className='pltable w-100 px-2'>
                    <div className='pl-tablecontainer m-1 p-1'>
                        <div className='pl-content d-flex flex-row align-items-start w-100'>
                            <div className='classfnt-table mx-2'>
                                <div className='coloumn1'>
                                    <h5>Existing throw us</h5>
                                </div>
                                <table className='pllender-clf m-0 table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '60px' }}>S.No</th>
                                            <th>Name Of Lender</th>
                                            <th style={{ maxWidth: '100%', width: 'max-content' }}>Maximum Loan Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {existingThrowUs.length > 0 ? (existingThrowUs.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '60px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td style={{ maxWidth: '100%', width: 'max-content' }}>{parseFloat(data.maxLoanAmount).toFixed(2)}</td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={3}><p className='text-danger mb-0 fs-5 fw-bolder'>lendrs not found</p></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className='classfnt-table mx-2'>
                                <div className='coloumn1'>
                                    <h5>Existing Lender</h5>
                                </div>
                                <table className='pllender-clf m-0 table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '60px' }}>S.No</th>
                                            <th>Name Of Lender</th>
                                            <th style={{ maxWidth: '100%', width: 'max-content' }}>Maximum Loan Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {existingLender.length > 0 ? (existingLender.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '60px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td style={{ maxWidth: '100%', width: 'max-content' }}>{parseFloat(data.maxLoanAmount).toFixed(2)}</td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={3}><p className='text-danger mb-0 fs-5 fw-bolder'>lendrs not found</p></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className='classfnt-table mx-2'>
                                <div className='coloumn1'>
                                    <h5>Mandate Given</h5>
                                </div>
                                <table className='pllender-clf m-0 table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '60px' }}>S.No</th>
                                            <th>Name Of Lender</th>
                                            <th style={{ maxWidth: '100%', width: 'max-content' }}>Maximum Loan Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mandateGiven.length ? (mandateGiven.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '60px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td style={{ maxWidth: '100%', width: 'max-content' }}>{parseFloat(data.maxLoanAmount).toFixed(2)}</td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={3}><p className='text-danger mb-0 fs-5 fw-bolder'>lendrs not found</p></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className='classfnt-table mx-2'>
                                <div className='coloumn1'>
                                    <h5>Not Classified</h5>
                                </div>
                                <table className='pllender-clf m-0 table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '60px' }}>S.No</th>
                                            <th>Name Of Lender</th>
                                            <th style={{ maxWidth: '100%', width: 'max-content' }}>Maximum Loan Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notClassified.length > 0 ? (notClassified.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '60px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td style={{ maxWidth: '100%', width: 'max-content' }}>{parseFloat(data.maxLoanAmount).toFixed(2)}</td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={3}><p className='text-danger mb-0 fs-5 fw-bolder'>lendrs not found</p></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className='classfnt-table mx-2'>
                                <div className='coloumn1'>
                                    <h5>Negative Lender</h5>
                                </div>
                                <table className='pllender-clf m-0 table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '60px' }}>S.No</th>
                                            <th>Name Of Lender</th>
                                            <th style={{ maxWidth: '100%', width: 'max-content' }}>Maximum Loan Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {negtiveLender.length > 0 ? (negtiveLender.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '60px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td style={{ maxWidth: '100%', width: 'max-content' }}>{parseFloat(data.maxLoanAmount).toFixed(2)}</td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={3}><p className='text-danger mb-0 fs-5 fw-bolder'>lendrs not found</p></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='d-flex table-group-divider mt-2 fs-5 fw-bold'>
                            <div className='w-100 row'>
                                <span className='col-6 text-end'>Total Amount :</span>
                                <span className='col-6 text-start'>{parseFloat(existingThrowUstotalMaxAmt).toFixed(2)}</span>
                            </div>
                            <div className='w-100 row'>

                                <span className='col-6 text-end'>Total Amount :</span>
                                <span className='col-6 text-start'>{parseFloat(existingLendertotalMaxAmt).toFixed(2)}</span>
                            </div>
                            <div className='w-100 row'>
                                <span className='col-6 text-end'>Total Amount :</span>
                                <span className='col-6 text-start'>{parseFloat(mandateGiventotalMaxAmt).toFixed(2)}</span>
                            </div>
                            <div className='w-100 row'>
                                <span className='col-6 text-end'>Total Amount :</span>
                                <span className='col-6 text-start'>{parseFloat(notClassifiedtotalMaxAmt).toFixed(2)}</span>
                            </div>
                            <div className='w-100 row'>
                                <span className='col-6 text-end'>Total Amount :</span>
                                <span className='col-6 text-start'>{parseFloat(negtiveLendertotalMaxAmt).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    )
}

export default PossibleLender
