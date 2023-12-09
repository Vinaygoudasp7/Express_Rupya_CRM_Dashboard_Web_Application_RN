import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './lenderClassification.css'
import { toast } from 'react-toastify'

const LenderClassification = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [selectedBorrower, setSelectedBorrower] = useState(null)
  const [Lenderdetailes, setLenderDeatailes] = useState([])
  const [lenderClassification, setLenderClassification] = useState([])
  const [isBorrowerSelected, setIsBorrowerSelected] = useState(false)

  useEffect(() => {
    const featchDetailes = async () => {
      try {
        const responce = await axios.get("http://localhost:4306/List_borrowers")
        const borrowers = responce.data
        console.log(borrowers)
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

      } catch (error) {
        console.log(error)
      }
    }
    featchDetailes()
  }, [])

  const handelSelectedBorrowers = (selectedBorrower) => {
    setSelectedBorrower(selectedBorrower)
    setIsBorrowerSelected(true)
  }
  console.log(isBorrowerSelected)
  useEffect(() => {
    const featchLenderDetailes = async () => {
      try {
        const responce = await axios.get("http://localhost:4306/List_Lenders")
        const lender_data = responce.data
        console.log(lender_data)

        lender_data.sort((a, b) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if (nameA < nameB) {
            return -1
          } else if (nameB > nameA) {
            return 1
          }
          return 0
        })
        setLenderData(lender_data)
        setLenderDeatailes(lender_data)
        const intiallenderClassification = lender_data.map((data) => (
          {
            lender_id: data.id,
            classification: 'Not Classified'
          }
        ))
        setLenderClassification(intiallenderClassification)
      } catch (error) {
        console.log(error)
      }
    }
    featchLenderDetailes()
  }, [])
  console.log(lenderClassification)

  const handelLenderClasiification = (e, index, lender_id) => {
    const selectedValue = e.target.value
    setLenderClassification((prevClassification) => {
      const lenderClassificationCopy = [...prevClassification]
      lenderClassificationCopy[index] = {
        lender_id: lender_id,
        classification: selectedValue
      }
      return lenderClassificationCopy
    })
  }

  console.log(lenderClassification)

  useEffect(() => {
    const borrower_id = selectedBorrower != null ? selectedBorrower.value : ''
    console.log(borrower_id)
    if (isBorrowerSelected) {
      const featchDetailes = async () => {
        const responce = await axios.get(`http://localhost:4306/retrivelenderclassification/${borrower_id}`)
        const lender_data = responce.data
        console.log(lender_data)
        setLenderClassification(lender_data)
      }
      featchDetailes()
    } else {
      return
    }
  }, [selectedBorrower])

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
      const deleteresponce = await axios.delete(`http://localhost:4306/delete_lender_classification/${borrower_id}`)
      const response = await axios.post(`http://localhost:4306/add_lender_classification/${borrower_id}`, lenderclassificationData)
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

      // Reset lender classification details (if it's a state variable)
      setLenderClassificationDetails([]);

      // Reset lender details to initial state or empty array
      // setLenderDeatailes([]);
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
                {Lenderdetailes.map((lender, index) => {
                  if (lender.id !== null) {
                    const classificationValue = selectedBorrower != null ? lenderClassification.find((data) =>
                      data.lender_id == lender.id
                    ) : null
                    return (
                      <div className='row-content' key={index} >
                        <div className='input-group'>
                          <div className='row w-100 my-1'>
                            <div className='col-5 '>
                              <input className='form-control input-group-text text-start mb-0 fw-normal w-100' value={lender.name} style={{ fontSize: '16px', maxWidth: '450px' }} readOnly></input>
                            </div>
                            <div className='col-7'>
                              <select className='form-select form-select-sm mb-1'
                                value={classificationValue ? classificationValue.classification : ""}
                                onChange={(e) => handelLenderClasiification(e, index, lender.id)}>
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
                  }
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
