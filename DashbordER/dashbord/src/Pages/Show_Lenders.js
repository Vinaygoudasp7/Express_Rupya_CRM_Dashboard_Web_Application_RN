import React, { useState, useEffect } from 'react';
import './ShowBorrowers.css';
import { RegionsData, statesByRegion, citiesByState, LonTypesData } from './Borrower'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import Select from 'react-select'
import { creditRating, products, producttypes } from './Show_Borrowers';

export const splitDataIntoArray = (data) => {
  const splitedData = data?.split(', ')
  return splitedData
}

const LenderDetailsTable = () => {
  const [lenderDetails, setLenderDetails] = useState([]);
  const [submitedit, setsubmitedit] = useState(false);
  const [filteredlenderDetails, setFilteredlenderDetails] = useState([]);
  const [editableLenderId, setEditableLenderId] = useState(-1);
  const [editedLender, setEditedLender] = useState({
    editname: '',
    editregion: '',
    editstate: '',
    editcity: '',
    editloanTypes: '',
    editowner: '',
    editproductType: '',
    editborrowerregion: '',
    editproducts: '',
    editmincreditRating: '',
    editquarterAUM: '',
    editminaum: '',
    editminInterestRate: '',
    editminLoanAmount: '',
    editmaxLoanAmount: '',
    editlenderComment: '',
  });

  const [filters, setFilters] = useState({
    name: '',
    region: '',
    state: '',
    city: '',
    Borrowerregion: '',
    loanTypes: '',
    owner: '',
    productType: '',
    products: '',
    lessminCreditRating: '',
    moreminCreditRating: '',
    lessaum: '',
    moreaum: '',
    lessminInterestRate: '',
    moreminInterestRate: '',
    minLoanAmount: '',
    maxLoanAmount: '',
    lenderComment: '',
  });

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  let formatedintialborrowerregion;
  let formatedintialloantypes;
  let formatedintialowner;
  let formatedintialproducttypes;
  let formatedintialproducts;
  let formatedintialintialmincreditrating;
  const [owner, setOwner] = useState([])
  useEffect(() => {
    fetchlenderDetails();
    setsubmitedit(false);
  }, [submitedit]);


  const fetchlenderDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4306/List_Lenders");

      //format data
      const data = response.data
      const formatedData = data.map((detaile) => ({
        ...detaile,
        Borrowerregion: formatArray(detaile.Borrowerregion),
        loanTypes: formatArray(detaile.loanTypes),
        products: formatArray(detaile.products)
      }))

      formatedData.sort((a, b) => {
        const aName = a.name.toUpperCase()
        const bName = b.name.toUpperCase()
        if (aName < bName) {
          return -1
        } else if (aName > bName) {
          return 1
        } else {
          return 0
        }
      })
      setLenderDetails(formatedData);
      setFilteredlenderDetails(formatedData);
    } catch (error) {
      console.error('Error fetching lender details:', error);
    }
  };

  const formatArray = (arrayString) => {
    if (arrayString) {
      const array = arrayString.split(',').map((item) => {
        return item.replace(/\[|\]|"/g, '')
      })
      return array.join(', ')
    }
    return '';
  }

  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
  };

  const handelSort = (key) => {
    let direction = sortConfig.key === key ? (sortConfig.direction === 'asc' ? 'desc' : 'asc') : '';

    setSortConfig({ key, direction });

    const sortedData = [...filteredlenderDetails].sort((a, b) => {
      if (key === 'aum' || key === 'maxInterestRate' || key === 'minLoanAmount') {
        return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
      } else if (a[key] === undefined || b[key] === undefined) {
        return 0; // Treat undefined values as equal
      } else if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        // For case-insensitive string comparison
        const strA = a[key].toUpperCase(); // Convert to uppercase for comparison
        const strB = b[key].toUpperCase(); // Convert to uppercase for comparison
        const comparison = strA < strB ? -1 : strA > strB ? 1 : 0;
        return direction === 'asc' ? comparison : -comparison;
      } else {
        // For other types of data comparison (assuming numbers), handling ascending and descending orders
        return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setLenderDetails(sortedData)
    setFilteredlenderDetails(sortedData)
  }

  useEffect(() => {
    const featchTeammember = async () => {
      try {
        const responce = await axios.get("http://localhost:4306/teammembers");
        const teamMember = responce.data;
        const formatedOptions = teamMember.map((teamMember) => ({
          value: teamMember.TeamM_id,
          label: `${teamMember.FirstName} ${teamMember.LastName}`
        }))
        setOwner(formatedOptions);
      } catch (error) {
        console.log("Error occur while featching data ", error)
      }
    }
    featchTeammember();
  }, [])


  useEffect(() => {
    // Apply filters
    let filteredData = lenderDetails;

    if (filters.name) {
      filteredData = filteredData.filter((detail) =>
        detail.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.region) {
      filteredData = filteredData.filter((detail) =>
        detail.region.toLowerCase().includes(filters.region.toLowerCase())
      );
    }
    if (filters.state) {
      filteredData = filteredData.filter((detail) =>
        detail.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    }
    if (filters.city) {
      filteredData = filteredData.filter((detail) =>
        detail.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    if (filters.entityType) {
      filteredData = filteredData.filter((detail) =>
        detail.entityType.toLowerCase().includes(filters.entityType.toLowerCase())
      );
    }

    if (filters.loanTypes) {
      filteredData = filteredData.filter((detail) => {
        if (detail.loanTypes) {
          return detail.loanTypes.toLowerCase().includes(filters.loanTypes.toLowerCase())
        }
      }
      );
    }

    if (filters.Borrowerregion) {
      filteredData = filteredData.filter((detail) => {
        if (detail.Borrowerregion) {
          return detail.Borrowerregion.toLowerCase().includes(filters.Borrowerregion.toLowerCase())
        }
      }
      );
    }

    if (filters.owner) {
      filteredData = filteredData.filter((detail) =>
        detail.owner.toLowerCase().includes(filters.owner.toLowerCase())
      );
    }
    if (filters.productType) {
      filteredData = filteredData.filter((detail) => {
        if (detail.productType) {
          return detail.productType.toLowerCase() === filters.productType.toLowerCase()
        }
      }
      );
    }
    if (filters.products) {
      filteredData = filteredData.filter((detail) => {
        if (detail.products) {
          return detail.products.toLowerCase().includes(filters.products.toLowerCase())
        }
      }
      );
    }

    if (filters.lessminCreditRating) {
      filteredData = filteredData.filter((detail) => {
        if (detail.minCreditRating) {
          // return detail.minCreditRating.toLowerCase()<=filters.lessminCreditRating.toLowerCase()
          if (filters.lessminCreditRating.toLowerCase().includes('a')) {
            return detail.minCreditRating.toLowerCase() <= filters.lessminCreditRating.toLowerCase() || detail.minCreditRating.toLowerCase().includes('b') || detail.minCreditRating.toLowerCase().includes('not rated');
          }
          else {
            return detail.minCreditRating.toLowerCase() <= filters.lessminCreditRating.toLowerCase() && detail.minCreditRating.toLowerCase().includes('b') || detail.minCreditRating.toLowerCase().includes('not rated');;
          }

        }
      }
      );
    }

    if (filters.moreminCreditRating) {
      filteredData = filteredData.filter((detail) => {
        if (detail.minCreditRating) {
          // return detail.minCreditRating.toLowerCase()<=filters.lessminCreditRating.toLowerCase()
          if (filters.moreminCreditRating.toLowerCase().includes('b')) {
            return (detail.minCreditRating.toLowerCase() >= filters.moreminCreditRating.toLowerCase() || detail.minCreditRating.toLowerCase().includes('a')) && detail.minCreditRating != "Not Rated";
          }
          else {
            return detail.minCreditRating.toLowerCase() >= filters.moreminCreditRating.toLowerCase() && detail.minCreditRating.toLowerCase().includes('a') && detail.minCreditRating != "Not Rated";
          }

        }
      }
      );
    }

    if (filters.lessaum) {
      filteredData = filteredData.filter((detail) => {
        if (detail.aum) {
          return detail.aum <= filters.lessaum
        }
      }
      );
    }

    if (filters.moreaum) {
      filteredData = filteredData.filter((detail) => {
        if (detail.aum) {
          return detail.aum >= filters.moreaum
        }
      }
      );
    }

    if (filters.lessminInterestRate) {
      filteredData = filteredData.filter((detail) => {
        if (detail.minInterestRate) {
          return detail.minInterestRate <= filters.lessminInterestRate
        }
      }
      );
    }

    if (filters.moreminInterestRate) {
      filteredData = filteredData.filter((detail) => {
        if (detail.minInterestRate) {
          return detail.minInterestRate >= filters.moreminInterestRate
        }
      }
      );
    }

    if (filters.minLoanAmount) {
      filteredData = filteredData.filter((detail) => {
        if (detail.minLoanAmount) {
          return detail.minLoanAmount === filters.minLoanAmount
        }
      }
      );
    }

    if (filters.maxLoanAmount) {
      filteredData = filteredData.filter((detail) => {
        if (detail.maxLoanAmount) {
          return detail.maxLoanAmount === filters.maxLoanAmount
        }
      }
      );
    }
    setFilteredlenderDetails(filteredData);
  }, [filters, lenderDetails]);

  const formatedProductOptions = products.map((prd) => ({
    value: prd,
    label: prd
  }))
  const formatedborrowerregionoption = RegionsData.map((item) => ({
    value: item,
    label: item,
  }))

  const formatedproducttypesoptions = producttypes.map((item) => ({
    value: item,
    label: item,
  }))

  const formatedLoantypeoptions = LonTypesData.map((data) => ({
    value: data,
    label: data,
  }))

  const formatedCreditRateingoptions = creditRating.map((rating) => ({
    value: rating,
    label: rating
  }))

  const handleEditLender = (event, lender_Id) => {
    event.preventDefault();
    console.log(lender_Id)
    setEditableLenderId(lender_Id);
    const lenderDetailsCopy = lenderDetails.find((data) => data.id === lender_Id)
    console.log(lenderDetailsCopy)

    if (lenderDetailsCopy) {

      formatedintialloantypes = splitDataIntoArray(lenderDetailsCopy.loanTypes).map((item) => ({
        value: item,
        label: item
      }))

      formatedintialowner = splitDataIntoArray(lenderDetailsCopy.owner).map((item) => ({
        value: item,
        label: item
      }))

      formatedintialproducttypes = splitDataIntoArray(lenderDetailsCopy.productType).map((item) => ({
        value: item,
        label: item
      }))

      formatedintialproducts = splitDataIntoArray(lenderDetailsCopy.products).map((item) => ({
        value: item,
        label: item
      }))

      formatedintialintialmincreditrating = splitDataIntoArray(lenderDetailsCopy.loanTypes).map((item) => ({
        value: item,
        label: item
      }))


      formatedintialborrowerregion = splitDataIntoArray(lenderDetailsCopy.Borrowerregion).map((item) => ({
        value: item,
        label: item,
      }))

      setEditedLender({
        editname: lenderDetailsCopy.name,
        editregion: lenderDetailsCopy.region,
        editstate: lenderDetailsCopy.state,
        editcity: lenderDetailsCopy.city,
        editborrowerregion: formatedintialborrowerregion,
        editminaum: lenderDetailsCopy.aum,
        editloanTypes: formatedintialloantypes,
        editproducts: formatedintialproducts,
        editproductType: formatedintialproducttypes,
        editowner: formatedintialowner,
        editmincreditRating: formatedintialintialmincreditrating,
        editmaxLoanAmount: lenderDetailsCopy.maxLoanAmount,
        editminLoanAmount: lenderDetailsCopy.minLoanAmount,
        editminInterestRate: lenderDetailsCopy.minInterestRate,
      })
    }
  }

  const handleInputChange = (event, fieldname) => {
    const inputvalue = event.target.value
    const editedLenderDetailescopy = { ...editedLender }
    editedLenderDetailescopy[fieldname] = inputvalue
    setEditedLender(editedLenderDetailescopy)
  };
  console.log(editedLender)

  const handelBorrowerRegion = (selectedBorrowerregion) => {
    const selectedregion = selectedBorrowerregion.map((region) => (region.value))
    console.log(selectedregion)
    setEditedLender({
      ...editedLender,
      editborrowerregion: selectedBorrowerregion
    })
  }

  const handelselectLoantypes = (selectedloantypes) => {
    const selectedvalue = selectedloantypes.map((loantype) => (
      loantype.value
    ))
    console.log(selectedvalue)
    setEditedLender({
      ...editedLender,
      editloanTypes: selectedloantypes
    })
  }

  const handelSelectedOwner = (selectedowner) => {
    setEditedLender({
      ...editedLender,
      editowner: selectedowner
    })
  }
  const handelselectProducts = (selectedproducts) => {
    setEditedLender({
      ...editedLender,
      editproducts: selectedproducts
    })
  }
  const handelselectProducttype = (selectedproducttype) => {
    setEditedLender({
      ...editedLender,
      editproductType: selectedproducttype
    })
  }
  const handelselectCreditrating = (selectedcreditrating) => {
    setEditedLender({
      ...editedLender,
      editmincreditRating: selectedcreditrating
    })
  }
  // const handelselectLoantypes = (selectedloantypes) => {
  //   const selectedvalue = selectedloantypes.map((loantype) => (
  //     loantype.value
  //   ))
  //   console.log(selectedvalue)
  //   setEditedLender({
  //     ...editedLender,
  //     editloanTypes: selectedloantypes
  //   })
  // }

  const handleSubmit = () => {
    const lenderid = editableLenderId
    console.log(lenderid)
    axios.put(`http://localhost:4306/lenders/${lenderid}`, editedLender)
      .then((response) => {
        // Handle the response (optional)
        console.log('Lender details updated successfully:', response.data);
        // Reset states
        setsubmitedit(true);
        setEditableLenderId(-1);
        setEditedLender('');
        const message = response.data.message;
        toast.success((message), {
          autoClose: true,
          position: 'top-right',
          draggable: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true
        })
      })
      .catch((error) => {
        // Handle errors (optional)
        console.error('Error updating lender details:', error);
        toast.error("Error updating lender details", {
          autoClose: true,
          hideProgressBar: true,
          position: 'top-right'
        })
      })
    setEditableLenderId(-1);
    setEditedLender('');
  };

  return (
    <>

      <div className='tablesheading'>
        <h2 className='mb-0'>Lender Details Table</h2>
      </div>
      <div className='lcontaint'>
        <table id="Showborrower">
          <thead>
            <tr>
              {/* <div className='freeze-pan'> */}
              <th>
                <div className='row py-1 px-5'>
                  <div className='col-9' style={{ fontSize: '18px' }}>Name</div>
                  <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-3 px-2'>
                      <button className='btn btn-sm' onClick={() => handelSort('name')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  style={{ width: '140px' }}
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                />
              </th>
              <th>
                <div className='row'>
                  <div className='col-7' style={{ fontSize: '17px' }}>Region</div>
                  <IconContext.Provider value={{ size: '1.4rem' }}>
                    <div className='col-5 px-1'>
                      <button className='btn btn-sm' onClick={() => handelSort('region')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  style={{ width: "80px" }}
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                />
              </th>
              <th>
                <div className='row'>
                  <div className='col-6' style={{ fontSize: '18px' }}>State</div>
                  <IconContext.Provider value={{ size: '1.4rem' }}>
                    <div className='col-6 px-2'>
                      <button className='btn btn-sm' onClick={() => handelSort('state')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  style={{ width: '100px' }}
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                />
              </th>
              <th>
                <div className='row'>
                  <div className='col-6' style={{ fontSize: '18px' }}>City</div>
                  <IconContext.Provider value={{ size: '1.4rem' }}>
                    <div className='col-6 px-2'>
                      <button className='btn btn-sm' onClick={() => handelSort('city')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  style={{ width: '100px' }}
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </th>
              {/* </div> */}
              <th
                style={{ width: '100px' }}
              ><div className='row'>
                  <div className='col-9 p-0 m-0' style={{ fontSize: '16px' }}>Borrower region</div>
                  <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-3 p-0 m-0'>
                      <button className='btn btn-sm p-0 m-0 me-5' onClick={() => handelSort('Borrowerregion')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  style={{ width: '150px' }}
                  value={filters.Borrowerregion}
                  onChange={(e) => handleFilterChange('Borrowerregion', e.target.value)}
                />
              </th>

              <th><div className='row'>
                <div className='col-8' style={{ fontSize: '18px' }}>Loan Types</div>
                <IconContext.Provider value={{ size: '1.2rem' }}>
                  <div className='col-4 px-2'>
                    <button className='btn btn-sm' onClick={() => handelSort('loanTypes')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  type="text"
                  style={{ width: '349px', padding: '0px' }}
                  value={filters.loanTypes}
                  onChange={(e) => handleFilterChange('loanTypes', e.target.value)}
                />
              </th>
              <th>
                <div className='row'>
                  <div className='col-8' style={{ fontSize: '18px' }}>Owner</div>
                  <IconContext.Provider value={{ size: '1.2rem' }}>
                    <div className='col-2 px-2'>
                      <button className='btn btn-sm' onClick={() => handelSort('owner')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  style={{ width: '150px' }}
                  value={filters.owner}
                  onChange={(e) => handleFilterChange('owner', e.target.value)}
                />
              </th>
              <th>
                <div className='row'>
                  <div className='col-8 p-0 m-0' style={{ fontSize: '17px' }}>Product Type</div>
                  <IconContext.Provider value={{ size: '1.2rem' }}>
                    <div className='col-4'>
                      <button className='btn btn-sm me-5' onClick={() => handelSort('productType')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  style={{ width: '115px' }}
                  value={filters.productType}
                  onChange={(e) => handleFilterChange('productType', e.target.value)}
                />
              </th>
              <th><div className='row'>
                <div className='col-8' style={{ fontSize: '18px' }}>Products</div>
                <IconContext.Provider value={{ size: '1.2rem' }}>
                  <div className='col-4 px-2'>
                    <button className='btn btn-sm' onClick={() => handelSort('products')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  type="text"
                  style={{ width: '350px' }}
                  value={filters.products}
                  onChange={(e) => handleFilterChange('products', e.target.value)}
                />
              </th>
              <th><div className='row'>
                <div className='col-8' style={{ fontSize: '17px' }}>Creadit Rating </div>
                <IconContext.Provider value={{ size: '1.4rem' }}>
                  <div className='col-4 d-flex align-items-center justify-content-center '>
                    <button className='btn btn-sm' onClick={() => handelSort('minCreditRating')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <div className='d-flex flex-column'>
                  <input
                    style={{ width: '100px' }}
                    type="text"
                    placeholder='Less than'
                    value={filters.lessminCreditRating}
                    onChange={(e) => handleFilterChange('lessminCreditRating', e.target.value)}
                  />
                  <input
                    style={{ width: '100px' }}
                    type="text"
                    placeholder='More than'
                    value={filters.moreminCreditRating}
                    onChange={(e) => handleFilterChange('moreminCreditRating', e.target.value)}
                  />
                </div>
              </th>
              <th><div className='row'>
                <div className='col-9 p-0' style={{ fontSize: '17px', }}>Minimum aum (in crores)</div>
                <IconContext.Provider value={{ size: '1.2rem' }}>
                  <div className='col-3 d-flex align-items-center justify-content-center'>
                    <button className='btn btn-sm p-0' onClick={() => handelSort('aum')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  style={{ width: '90px' }}
                  type="decimal"
                  placeholder='less than'
                  value={filters.lessaum}
                  onChange={(e) => handleFilterChange('lessaum', e.target.value)}
                />
                <input
                  style={{ width: '90px' }}
                  type="decimal"
                  placeholder='more than'
                  value={filters.moreaum}
                  onChange={(e) => handleFilterChange('moreaum', e.target.value)}
                />
              </th>
              <th><div className='row'>
                <div className='col-10 p-1 m-0'>Minimum interest Rate</div>
                <IconContext.Provider value={{ size: '1.2rem' }}>
                  <div className='col-2 m-0 d-flex align-items-center justify-content-center'>
                    <button className='btn btn-sm me-2' onClick={() => handelSort('minInterestRate')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  style={{ width: '130px' }}
                  type="decimal"
                  placeholder='less than'
                  value={filters.lessminInterestRate}
                  onChange={(e) => handleFilterChange('lessminInterestRate', e.target.value)}
                />
                <br></br>
                <input
                  style={{ width: '130px' }}
                  type="decimal"
                  placeholder='more than'
                  value={filters.moreminInterestRate}
                  onChange={(e) => handleFilterChange('moreminInterestRate', e.target.value)}
                />
              </th>
              <th><div className='row'>
                <div className='col-10 p-1 m-0 text-start'>Minimum Loan amount (in crores)</div>
                <IconContext.Provider value={{ size: '1.3rem' }}>
                  <div className='col-2 d-flex align-items-center justify-content-center'>
                    <button className='btn btn-sm me-3 ' onClick={() => handelSort('minLoanAmount')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  type="decimal"
                  style={{ width: '130px' }}
                  // placeholder='less than'
                  value={filters.minLoanAmount}
                  onChange={(e) => handleFilterChange('minLoanAmount', e.target.value)}
                />

              </th>
              <th>
                <div className='row'>
                  <div className='col-10 p-1 m-0'>Maximum Loan amount (in crores)</div>
                  <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-2 d-flex align-items-center justify-content-center'>
                      <button className='btn btn-sm me-3 ' onClick={() => handelSort('maxLoanAmount')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  style={{ width: '130px' }}
                  type="decimal"
                  // placeholder='less than'
                  value={filters.maxLoanAmount}
                  onChange={(e) => handleFilterChange('maxLoanAmount', e.target.value)}
                />
              </th>
              <th>
                <div className='row'>
                  <div className='col-10 p-1 m-0'>Comment</div>
                  {/* <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-2 d-flex align-items-center justify-content-center'>
                      <button className='btn btn-sm me-3 ' onClick={() => handelSort('maxLoanAmount')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider> */}
                </div>
                {/* <input
                  style={{ width: '130px' }}
                  type="decimal"
                  // placeholder='less than'
                  value={filters.maxLoanAmount}
                  onChange={(e) => handleFilterChange('maxLoanAmount', e.target.value)}
                /> */}
              </th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredlenderDetails.map((detail) => (
              <tr key={detail.id}>
                {/* <div className='freeze-pan'> */}
                <td>
                  {detail.id === editableLenderId ? (
                    <input
                      type="text"
                      name="name"
                      value={editedLender.editname}
                    // onChange={(event) => handleInputChange(event, 'editname')}
                    />
                  ) : (
                    detail.name
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <select
                      name='region'
                      value={editedLender.editregion}
                      onChange={(event) => handleInputChange(event, 'editregion')}
                      required
                    >
                      <option value="">Select a region</option>
                      {RegionsData && RegionsData.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  ) : (
                    detail.region
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <select
                      name='state'
                      value={editedLender.editstate}
                      onChange={(event) => handleInputChange(event, 'editstate')}
                      required
                    >
                      <option value="">Select a state</option>
                      {
                        statesByRegion[editedLender.editregion] && statesByRegion[editedLender.editregion].map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                  ) : (
                    detail.state
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <select
                      name='city'
                      value={editedLender.editcity}
                      onChange={(event) => handleInputChange(event, 'editcity')}
                      required
                    >
                      <option value="">Select a city</option>
                      {
                        citiesByState[editedLender.editstate] && citiesByState[editedLender.editstate].map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  ) : (
                    detail.city
                  )}
                </td>
                {/* </div> */}
                <td>
                  {detail.id === editableLenderId ? (
                    <Select
                      isMulti
                      options={formatedborrowerregionoption}
                      value={editedLender.editborrowerregion}
                      onChange={handelBorrowerRegion}>
                    </Select>
                  ) : (
                    detail.Borrowerregion
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <Select
                      isMulti
                      value={editedLender.editloanTypes}
                      options={formatedLoantypeoptions}
                      onChange={handelselectLoantypes}>
                    </Select>
                  ) : (
                    detail.loanTypes
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <Select
                      value={editedLender.editowner}
                      options={owner}
                      onChange={handelSelectedOwner}>
                    </Select>
                  ) : (
                    detail.owner
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <Select
                      value={editedLender.editproductType}
                      options={formatedproducttypesoptions}
                      onChange={handelselectProducttype}>
                    </Select>
                  ) : (
                    detail.productType
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <Select
                      isMulti
                      value={editedLender.editproducts}
                      options={formatedProductOptions}
                      onChange={handelselectProducts}>
                    </Select>
                  ) : (
                    detail.products
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <Select
                      options={formatedCreditRateingoptions}
                      value={editedLender.editmincreditRating}
                      onChange={handelselectCreditrating}
                    />
                  ) : (
                    detail.minCreditRating
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <input
                      type="decimal"
                      name="aum"
                      value={editedLender.editminaum}
                      onChange={(event) => handleInputChange(event, 'editminaum')}
                    />
                  ) : (
                    detail.aum
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <input
                      type="decimal"
                      name="minInterestRate"
                      value={editedLender.editminInterestRate}
                      onChange={(event) => handleInputChange(event, 'editminInterestRate')}

                    />
                  ) : (
                    detail.minInterestRate
                  )}
                </td>

                <td>
                  {detail.id === editableLenderId ? (
                    <input
                      type="decimal"
                      name="minLoanAmount"
                      value={editedLender.editminLoanAmount}
                      onChange={(event) => handleInputChange(event, 'editminLoanAmount')}

                    />
                  ) : (
                    detail.minLoanAmount
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <input
                      type="decimal"
                      name="maxLoanAmount"
                      value={editedLender.editmaxLoanAmount}
                      onChange={(event) => handleInputChange(event, 'editmaxLoanAmount')}

                    />
                  ) : (
                    detail.maxLoanAmount
                  )}
                </td>
                <td>
                  {detail.id === editableLenderId ? (
                    <input
                      type="decimal"
                      name="maxLoanAmount"
                      value={editedLender.editlenderComment}
                      onChange={(event) => handleInputChange(event, 'editlenderComment')}

                    />
                  ) : (
                    detail.lendercomment
                  )}
                </td>

                <td>
                  {detail.id === editableLenderId ? (
                    <button className='deletebtn' onClick={handleSubmit}>Submit</button>
                  ) : (
                    <button className='deletebtn' onClick={(event) => handleEditLender(event, detail.id)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer
          autoClose={5000}
          position={toast.POSITION.TOP_RIGHT}
          hideProgressBar={true}
          draggable={true}
          pauseOnHover={true}
          pauseOnFocusLoss={true}
        />
      </div>
    </>
  );
};

export default LenderDetailsTable;
