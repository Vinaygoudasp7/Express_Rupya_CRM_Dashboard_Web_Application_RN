import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Select from 'react-select'
import './PossiblelenderBorrowerstyle.css'

const PossibleBorrower = () => {
    const [borrower, setBorrower] = useState([])
    const [formatedLender, setFormatedLender] = useState([])
    const [selectedLender, setSelectedLender] = useState([])
    const [possibleBorrowerDetails, setPossibleBorrowerDetails] = useState([])
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
                const response = await axios.get("http://192.168.29.250:4306/List_borrowers");
                const lenderresponse = await axios.get("http://192.168.29.250:4306/List_lenders");
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

                const formatedLender = lenderdetails.map((data) => ({
                    value: data.id,
                    label: data.name
                }))
                setFormatedLender(formatedLender)

                const borrowerdata = response.data

                borrowerdata.sort((a, b) => {
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
                setBorrower(borrowerdata)
            } catch (error) {
                console.error('Error fetching borrower or lender details:', error);
            }
        };
        fetchBorrowerDetails()
    }, [])
    console.log(borrower)


    const handelSelectedLender = async (selectedLender) => {
        setSelectedLender(selectedLender)
        setFeatchData(true)
    }

    const getFeatchPossibleLenderData = async () => {
        const lender_id = selectedLender?.value
        console.log(lender_id)
        try {
            const lenderclassification = await axios.get(`http://192.168.29.250:4306/retrivelenderclassificationoflender/${lender_id}`)
            console.log(lenderclassification.data)

            const lenderClassificationsData = lenderclassification.data
            console.log(lenderClassificationsData)
            // logic for the matching the selected borrower with all lenders
            const selectedLenderdetailes = lender.find((data) => data.id === lender_id)
            console.log(selectedLenderdetailes)

            const lenderregion = selectedLenderdetailes?.Borrowerregion
            const lenderloantypes = Array.isArray(selectedLenderdetailes?.loanTypes) ? selectedLenderdetailes?.loanTypes : selectedLenderdetailes?.loanTypes.split(',')
            const lenderproducts = Array.isArray(selectedLenderdetailes?.products) ? selectedLenderdetailes?.products : selectedLenderdetailes?.products.split(',')
            const lendercreditrating = selectedLenderdetailes?.minCreditRating
            const lenderminintrestrate = selectedLenderdetailes?.minInterestRate
            const lenderminloanamt = selectedLenderdetailes?.minLoanAmount
            const lendermaxloanamt = selectedLenderdetailes?.maxLoanAmount

            const possibleborrower = borrower.filter((data) => {
                const borrowerregion = data?.region
                const borrowerloantypes = Array.isArray(data?.loanTypes) ? data?.loanTypes : data?.loanTypes.split(',')
                const borrowerproducts = Array.isArray(data?.products) ? data?.products : data?.products.split(',')
                const borrowercreditrating = data?.creditRating
                const borrowermaxIntrestrate = data?.maxInterestRate
                const borrowerminloanamt = data?.minLoanAmount

                const possibleborrowerRegions = lenderregion.includes(borrowerregion)
                const possibleborrowerLoanTypes = !borrowerloantypes ? [] : borrowerloantypes
                    .some(borrowerloantype =>
                        lenderloantypes.includes(borrowerloantype)
                    )
                console.log(possibleborrowerLoanTypes)
                const possibleborrowerProducts = !borrowerproducts ? [] : borrowerproducts.some(borrowerproduct =>
                    lenderproducts.includes(borrowerproduct)
                )
                console.log(possibleborrowerProducts)

                const possibleborrowerCreditRating = lendercreditrating <= borrowercreditrating
                const possiblecborrowerIntrestrate = lenderminintrestrate <= borrowermaxIntrestrate
                const possibleborrowerLoanAmt = lenderminloanamt >= borrowerminloanamt && borrowerminloanamt <= lendermaxloanamt
                return (
                    possibleborrowerLoanTypes && possibleborrowerRegions && possibleborrowerCreditRating && possiblecborrowerIntrestrate &&
                    possibleborrowerLoanAmt
                )
            })
            console.log(possibleborrower)
            setPossibleBorrowerDetails(possibleborrower)


            //fillter lenders according to classification
            const filterMandateGivenLender = lenderClassificationsData.filter((data) => (
                data.classification === "Mandate Given"
            ))
            console.log(filterMandateGivenLender)
            const mandateGivenLenders = filterMandateGivenLender.reduce((acc, borrowerdata) => {
                const foundLender = possibleborrower.find((data) => data.id === borrowerdata.borrower_id)
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
            const existingLenders = filterExistingLender.reduce((acc, borrowerdata) => {
                const foundLender = possibleborrower.find((data) => data.id === borrowerdata.borrower_id)
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

            const existingthrowUsLender = filterExistingThrowUsLender.reduce((acc, borrowerdata) => {
                const foundLender = possibleborrower.find((data) => data.id === borrowerdata.borrower_id)
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
            const notClassifiedLender = filterNotClassifiedLender.reduce((acc, borrowerdata) => {
                const foundLender = possibleborrower.find((data) => data.id === borrowerdata.borrower_id);
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
            const negtiveLender = filterNegitiveLender.reduce((acc, borrowerdata) => {
                const foundLender = possibleborrower.find((data) => data.id === borrowerdata.borrower_id)
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

    // const totalNoOfLenders = existingLender.length + existingThrowUs.length + negtiveLender.length + notClassified.length + mandateGiven.length

    useEffect(() => {
        const totalExistingLenderMaxAmt = existingLender.reduce((total, data) => (total + data.minLoanAmount), 0)
        console.log(totalExistingLenderMaxAmt)
        setExistingLendertotalMaxAmt(totalExistingLenderMaxAmt)

        const totalExistingThrowusLenderMaxAmt = existingThrowUs.reduce((total, data) => (total + data.minLoanAmount), 0)
        setExistingThrowUstotalMaxAmt(totalExistingThrowusLenderMaxAmt)

        const totalnotClassifiedLenderMaxAmt = notClassified.reduce((total, data) => (total + data.minLoanAmount), 0)
        setNotClassifiedtotalMaxAmt(totalnotClassifiedLenderMaxAmt)

        const totalMandategivenMaxAmt = mandateGiven.reduce((total, data) => (total + data.minLoanAmount), 0)
        setMandateGiventotalMaxAmt(totalMandategivenMaxAmt)

        const totalnegtiveLenderMaxLoanamt = negtiveLender.reduce((total, data) => (total + data.minLoanAmount), 0)
        setNegitiveLendertotalMaxAmt(totalnegtiveLenderMaxLoanamt)

        const totalloanAmt = totalExistingLenderMaxAmt + totalExistingThrowusLenderMaxAmt + totalnotClassifiedLenderMaxAmt + totalMandategivenMaxAmt +
            totalnegtiveLenderMaxLoanamt
        setTotalLoanAmount(totalloanAmt)
    }, [existingLender])

    const totalNoOfPossibleBorrower = existingLender.length + existingThrowUs.length + negtiveLender.length + mandateGiven.length + notClassified.length

    return (
        <div className='customcontainer'>
            <div className='p-borrower '>
                <div className='w-100'>
                    <div className='select-b d-flex flex-row align-items-start justify-content-start w-100 m-2 p-1' style={{ maxWidth: '500px', margin: 'auto' }}>
                        <div className='pb-label form-label m-2  text-center'>Lender Name</div>
                        <div className='selectcontainer w-100' style={{ zIndex: 10 }}>
                            <Select
                                options={formatedLender}
                                value={selectedLender}
                                onChange={handelSelectedLender}
                                placeholder="Select Lender"
                                isSearchable
                                styles={{ zIndex: 3 }}
                            />
                        </div>
                    </div>
                    <div className='m-2 '>
                        <h4 className='fs-4 text-center fw-bolder'>{selectedLender.value > 0 ? <span className='borrower-name'>{(selectedLender.label).toUpperCase()}</span> : '_'} Possible Borrower Data anlysis</h4>
                    </div>
                    <section className='table-group-divider pl-section my-2'>
                        <div className='pltop-section float-end px-2 w-100'>
                            <div className='row w-100'>
                                <div className='p-1 col-6 w-auto'>
                                    <div className='lender-total'>
                                        <p className='w-auto fs-4 m-2'>
                                            <span className='form-label fs-4'>Total Borrowers : </span>
                                            <span>{borrower.length}</span>
                                        </p>
                                        <p className='w-auto fs-4 m-2'>
                                            <span className='form-label fs-4'>Possible Borrower : </span>
                                            <span>{totalNoOfPossibleBorrower}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <table className='lender-clsfn table table-striped table-hover'>
                                        <thead>
                                            <tr >
                                                <th></th>
                                                <th className='text-dark'>No of Borrower</th>
                                                <th className='text-dark' style={{ width: '200px' }}>Minimum Loan Amount (crs)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='fw-bold fs-5'>Existing borrower</td>
                                                <td>{existingLender.length}</td>
                                                <td>{existingLendertotalMaxAmt}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold fs-5'>Existing Through us</td>
                                                <td>{existingThrowUs.length}</td>
                                                <td>{existingThrowUstotalMaxAmt}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold fs-5'>Mandate Given</td>
                                                <td>{mandateGiven.length}</td>
                                                <td>{mandateGiventotalMaxAmt}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold fs-5'>Not classificed</td>
                                                <td>{notClassified.length}</td>
                                                <td>{notClassifiedtotalMaxAmt}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold fs-5'>Negative Borrower</td>
                                                <td>{negtiveLender.length}</td>
                                                <td>{negtiveLendertotalMaxAmt}</td>
                                            </tr>
                                            <tr className='fs- fw-bold table-group-divider'>
                                                <td>Total</td>
                                                <td>{totalNoOfPossibleBorrower}</td>
                                                <td>{totalLoanAmount}</td>
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
                                            <th >Name of Borrowers</th>
                                            <th style={{ maxWidth: '100%', width: 'max-content' }}>Minimum Loan Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {existingThrowUs.length > 0 ? (existingThrowUs.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '60px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td style={{ maxWidth: '100%', width: 'max-content' }}>{data.minLoanAmount}</td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={3}><p className='text-danger mb-0 fs-5 fw-bolder'>Borrowers not found</p></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className='classfnt-table mx-2'>
                                <div className='coloumn1'>
                                    <h5>Existing Borrower</h5>
                                </div>
                                <table className='pllender-clf m-0 table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '60px' }}>S.No</th>
                                            <th >Name of Borrowers</th>
                                            <th style={{ maxWidth: '100%', width: 'max-content' }}>Minimum Loan Amount</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {existingLender.length > 0 ? (existingLender.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '60px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td style={{ maxWidth: '100%', width: 'max-content' }}>{data.minLoanAmount}</td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={3}><p className='text-danger mb-0 fs-5 fw-bolder'>Borrower not found</p></td>
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
                                            <th >Name of Borrowers</th>
                                            <th style={{ maxWidth: '100%', width: 'max-content' }}>Minimum Loan Amount</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mandateGiven.length ? (mandateGiven.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '60px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td style={{ maxWidth: '100%', width: 'max-content' }}>{data.minLoanAmount}</td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={3}><p className='text-danger mb-0 fs-5 fw-bolder'>Borrowers not found</p></td>
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
                                            <th >Name of Borrowers</th>
                                            <th style={{ maxWidth: '100%', width: 'max-content' }}>Minimum Loan Amount</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notClassified.length > 0 ? (notClassified.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '60px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td style={{ maxWidth: '100%', width: 'max-content' }}>{data.minLoanAmount}</td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={3}><p className='text-danger mb-0 fs-5 fw-bolder'>Borrowers not found</p></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className='classfnt-table mx-2'>
                                <div className='coloumn1'>
                                    <h5>Negative Borrowers</h5>
                                </div>
                                <table className='pllender-clf m-0 table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '60px' }}>S.No</th>
                                            <th >Name of Borrowers</th>
                                            <th style={{ maxWidth: '100%', width: 'max-content' }}>Minimum Loan Amount</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {negtiveLender.length > 0 ? (negtiveLender.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '60px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td style={{ maxWidth: '100%', width: 'max-content' }}>{data.minLoanAmount}</td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={3}><p className='text-danger mb-0 fs-5 fw-bolder'>Borrowers not found</p></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='d-flex table-group-divider mt-2 fs-5 fw-bold'>
                            <div className='w-100 row'>

                                <span className='col-6 text-end'>Total Amount :</span>
                                <span className='col-6 text-start'>{existingThrowUstotalMaxAmt}</span>
                            </div>
                            <div className='w-100 row'>

                                <span className='col-6 text-end'>Total Amount :</span>
                                <span className='col-6 text-start'>{existingLendertotalMaxAmt}</span>
                            </div>
                            <div className='w-100 row'>

                                <span className='col-6 text-end'>Total Amount :</span>
                                <span className='col-6 text-start'>{mandateGiventotalMaxAmt}</span>
                            </div>
                            <div className='w-100 row'>

                                <span className='col-6 text-end'>Total Amount :</span>
                                <span className='col-6 text-start'>{notClassifiedtotalMaxAmt}</span>
                            </div>
                            <div className='w-100 row'>

                                <span className='col-6 text-end'>Total Amount :</span>
                                <span className='col-6 text-start'>{negtiveLendertotalMaxAmt}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    )
}

export default PossibleBorrower
