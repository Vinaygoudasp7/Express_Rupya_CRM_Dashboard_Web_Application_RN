import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './lenderClassification.css'
import { toast } from 'react-toastify'
import BACKEND_API_END_POINT from '../config'

const LenderClassification = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [selectedBorrower, setSelectedBorrower] = useState(null)
  const [Lenderdetailes, setLenderDeatailes] = useState([])
  const [lenderClassification, setLenderClassification] = useState([])
  const [filterdlenderCLassification, setFilterdLenderClassification] = useState([])
  const [isBorrowerSelected, setIsBorrowerSelected] = useState(false)

  useEffect(() => {
    const featchDetailes = async () => {
      try {
        const responce = await axios.get(`${BACKEND_API_END_POINT}/List_borrowers`)
        const lenderresponce = await axios.get(`${BACKEND_API_END_POINT}/List_Lenders`)
        const borrowers = responce.data
        const lenders = lenderresponce.data
        console.log(borrowers)
        console.log(lenders)
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

        const formatedBorrowers = borrowers.map((borrower) => ({
          value: borrower.id,
          label: borrower.name
        }))
        setBorrowers([{ value: '', label: 'Select Borrower' }, ...formatedBorrowers])

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

        setLenderDeatailes(lenders)

        const borrower_id = selectedBorrower ? selectedBorrower.value : 0
        const lenderclassification = await axios.get(`${BACKEND_API_END_POINT}/retrivelenderclassificationofborrower/${borrower_id}`)
        const lenderclassificationData = lenderclassification.data
        console.log(lenderclassificationData)
        if (lenderclassificationData.length !== 0) {
          const formatedlenderclassification = lenderclassificationData.map((data) => ({
            id: data.lender_id,
            name: lenders.find((lenderdata) => lenderdata.id === data.lender_id)?.name || '',
            classification: data.classification
          }))
          setLenderClassification(formatedlenderclassification)
          console.log(formatedlenderclassification)
        } else {
          const formatedlenderclassification = lenders.map((data) => ({
            id: data.id,
            name: data.name,
            classification: 'Not Classified'
          }))
          setLenderClassification(formatedlenderclassification)
          console.log(formatedlenderclassification)
        }
      } catch (error) {
        console.log(error)
      }
    }
    featchDetailes()
  }, [selectedBorrower])



  const handelLenderClasiification = (e, index, lender_id) => {
    const selectedValue = e.target.value
    const copyoflenderclassification = [...lenderClassification]
    console.log(copyoflenderclassification)
    const lenderclassificationdetails = copyoflenderclassification.map((data) => {
      if (data.id === lender_id) {
        return {
          ...data,
          classification: selectedValue
        }
      }
      return data
    })
    console.log(lenderclassificationdetails)
    setLenderClassification(lenderclassificationdetails)
  }
  console.log(lenderClassification)

  const handelSelectedBorrowers = (selectedBorrower) => {
    setSelectedBorrower(selectedBorrower)
  }

  const handelSubmit = async (e, borrower) => {
    e.preventDefault()
    const borrower_id = borrower.value
    console.log(borrower_id)
    if (selectedBorrower.length === 0 || lenderClassification.length === 0) {
      toast.error('field should not be empty', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true
      })
      return
    }
    console.log(selectedBorrower.value)
    const lenderclassificationData = {
      lenderClassificationData: lenderClassification,
      borrower_id: selectedBorrower.value
    }
    console.log(lenderclassificationData)
    try {
      const deleteresponce = await axios.delete(`${BACKEND_API_END_POINT}/delete_lender_classification/${borrower_id}`)
      const response = await axios.post(`${BACKEND_API_END_POINT}/add_lender_classification/${borrower_id}`, lenderclassificationData)
      console.log(deleteresponce.data)
      const message = response.data
      if ('message' in message) {
        toast.success(message.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true
        })
      } else {
        toast.error(message.error, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true
        })
      }

      // Reset the selected borrower (if it's a state variable)
      setSelectedBorrower(null);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container px-1' style={{ maxHeight: '100%', height: '100%' }} >
      <div className='main-container px-2 ' style={{ height: '100%' }}>
        <form onSubmit={(e) => handelSubmit(e, selectedBorrower)} style={{ maxWidth: '100%', height: '100%', }} >
          <div className='top-section d-flex align-items-center justify-content-center'>
            <div className='formlabel p-1'>
              <label className='form-label fs-5 fw-bolder mx-2 fw-normal'>Borrowers</label>
            </div>
            <div className='select-borrower' style={{ width: '350px', }}>
              <Select isSearchable onChange={handelSelectedBorrowers} value={selectedBorrower} options={borrowers}></Select>
            </div>
          </div>
          <div className='container form-content-body mx-auto w-100'>
            <div className='form-body  p-1'  >
              <div className='container'>
                {lenderClassification.map((lender, index) => {
                  return (
                    <div className='row-content' key={index} >
                      <div className='input-group'>
                        <div className='row w-100 my-1'>
                          <div className='col-5 '>
                            <div className='form-control input-group-text text-start mb-0 fw-normal w-100'
                              style={{ fontSize: '16px', maxWidth: '450px' }}
                            >{lender.name}</div>
                          </div>
                          <div className='col-7'>
                            <select className='form-select form-select-sm mb-1'
                              value={lender.classification ? lender.classification : 'Not Classified'}
                              onChange={(e) => handelLenderClasiification(e, index, lender.id)}
                            >
                              <option value=''>Select Classification</option>
                              <option value='Existing lender'>Existing lender</option>
                              <option value='Negative Lender'>Negative Lender</option>
                              <option value='Not Classified'>Not Classified</option>
                              <option value='Mandate Given'>Mandate Given</option>
                              <option value='Existing through Us'>Existing through Us</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='form-bottom-section'>
            <button className='Submitbutton float-end m-1' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div >
  )
}

export default LenderClassification
