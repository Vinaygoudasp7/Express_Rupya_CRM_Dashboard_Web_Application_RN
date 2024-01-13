import React, { useState, useEffect } from 'react';
import { entityTypes, statesByRegion, citiesByState, LonTypesData, quteryearsAum, RegionsData } from './Borrower'
import axios from 'axios';
import './TeamMembers.css'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import { splitDataIntoArray } from './Show_Lenders';

export const producttypes = ['Secured', 'Unsecured']
export const products = ['Auto Loan', 'Home Loan', 'Business Loan', 'Two Wheeler Loan', 'Gold Loan', 'MFI', 'Commercial Vehicle', 'MSME', 'LAP', 'Personal Loan', 'Agriculture Loans', 'Wholesale lending', 'Used Wheeler']
export const creditRating = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', '-AAA', '-AA', '-A', '-BBB', '-BB', '-B', 'Not Rated']
export const productTypes = ['Secured', 'Unsecured']

const BorrowerDetailsTable = () => {
  const [borrowerDetails, setBorrowerDetails] = useState([]);
  const [submitedit, setsubmitedit] = useState(false);
  const [filteredBorrowerDetails, setFilteredBorrowerDetails] = useState([]);
  const [editableBorrowerId, setEditableBorrowerId] = useState(null);
  const [editedBorrower, setEditedBorrower] = useState({
    editname: '',
    editregion: '',
    editstate: '',
    editcity: '',
    editentityType: '',
    editloanTypes: '',
    editcin: '',
    editowner: '',
    editproductType: '',
    editproducts: '',
    editcreditRatingAgency: '',
    editcreditRating: '',
    editfinancialYearAUM: '',
    editquarterAUM: '',
    editaum: '',
    editmaxInterestRate: '',
    editminLoanAmount: '',
    editNetworth: '',
    editborrowercomment: '',
  });
  const [filters, setFilters] = useState({
    name: '',
    region: '',
    state: '',
    city: '',
    entityType: '',
    loanTypes: '',
    cin: '',
    owner: '',
    productType: '',
    products: '',
    creditRatingAgency: '',
    lesscreditRating: '',
    morecreditRating: '',
    financialYearAUM: '',
    quarterAUM: '',
    lessaum: '',
    moreaum: '',
    lessmaxInterestRate: '',
    moremaxInterestRate: '',
    lessminLoanAmount: '',
    moreminLoanAmount: '',
    networth: '',
    borrowercomment: '',
  });

  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [owner, setOwner] = useState([])
  const [editeddata, setEditedData] = useState(false)

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
    fetchBorrowerDetails();
    setsubmitedit(false);
  }, [submitedit]);

  const formatedLoantypeoptions = LonTypesData.map((data) => ({
    value: data,
    label: data,
  }))

  const formatedProductTypeoptions = productTypes.map((option) => ({
    value: option,
    label: option
  }))

  const handelProductTypes = (selectedproductType) => {
    setEditedBorrower({
      ...editedBorrower,
      editproductType: selectedproductType
    })
  }

  const formatedProductOptions = products.map((prd) => ({
    value: prd,
    label: prd
  }))

  const handelProducts = (selectedProducts) => {
    setEditedBorrower({
      ...editedBorrower,
      editproducts: selectedProducts
    })
  }

  const formatedCreditRateing = creditRating.map((rating) => ({
    value: rating,
    label: rating
  }))

  const handelCreditRating = (selectedCreditrating) => {
    setEditedBorrower({
      ...editedBorrower,
      editcreditRating: selectedCreditrating
    })
  }

  const creditRatingAgency = ['ACUITE', 'Brickwork', 'CRISIL', 'CARE', 'ICRA', 'SMERA', 'India Rating', 'Infomerics', 'NILL']
  const formatedCreditRateingAgency = creditRatingAgency.map((agency) => ({
    value: agency,
    label: agency
  }))

  const handelCreditRatingAgency = (selectedCreditratingAgency) => {
    setEditedBorrower({
      ...editedBorrower,
      editcreditRatingAgency: selectedCreditratingAgency
    })
  }

  const finacialYears = ['2023-2024', '2024-2025', '2025-2026', '2026-2027', '2028-2029', '2030-2031', '2031-2032', '2032-2033', '2034-2035']
  const formatedFinacialYears = finacialYears.map((year) => ({
    value: year,
    label: year
  }))

  const handleFinancialYearAUMchange = (selectedfinacialyearaum) => {
    setEditedBorrower({
      ...editedBorrower,
      editfinancialYearAUM: selectedfinacialyearaum
    })
  }
  const handelFinacialyear = (event) => {
    setEditedBorrower({
      ...editedBorrower,
      editquarterAUM: event.target.value
    })
  }
  const handleOwnerChange = (selectedOwner) => {
    setEditedBorrower({
      ...editedBorrower,
      editowner: selectedOwner
    })
  }

  const fetchBorrowerDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4306/List_borrowers");
      const data = response.data
      const formattedData = data.map((detail) => ({
        ...detail,
        loanTypes: formatArray(detail.loanTypes),
        products: formatArray(detail.products),
        productType: formatArray(detail.productType),
        creditRatingAgency: formatArray(detail.creditRatingAgency),
        financialYearAUM: formatArray(detail.financialYearAUM)
      }));
      console.log(formattedData)
      formattedData.sort((a, b) => {
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
      setBorrowerDetails(formattedData);
      setFilteredBorrowerDetails(formattedData);
    } catch (error) {
      console.error('Error fetching borrower details:', error);
    }
  };

  const formatArray = (arrayString) => {
    if (arrayString) {
      const array = arrayString.split(',').map((item) => {
        // Remove square brackets and double quotes
        return item.replace(/\[|\]|"/g, '').trim();
      });
      return array.join(', ');
    }
    return '';
  };

  const handelSort = (key) => {
    let direction = sortConfig.key === key ? (sortConfig.direction === 'asc' ? 'desc' : 'asc') : '';

    setSortConfig({ key, direction });

    const sortedData = [...filteredBorrowerDetails].sort((a, b) => {
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

    setFilteredBorrowerDetails(sortedData);
  };





  console.log(filteredBorrowerDetails)
  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
  };

  useEffect(() => {
    // Apply filters
    let filteredData = borrowerDetails;

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

    if (filters.cin) {
      filteredData = filteredData.filter((detail) => {
        if (detail.cin) {
          return detail.cin === filters.cin.toLowerCase()
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

    if (filters.lesscreditRating) {
      filteredData = filteredData.filter((detail) => {
        if (detail.creditRating) {
          if (filters.lesscreditRating.toLowerCase().includes('a')) {
            return detail.creditRating.toLowerCase() <= filters.lesscreditRating.toLowerCase() || detail.creditRating.toLowerCase().includes('b') || detail.creditRating.toLowerCase().includes('not rated');
          }
          else {
            return detail.creditRating.toLowerCase() <= filters.lesscreditRating.toLowerCase() && detail.creditRating.toLowerCase().includes('b') || detail.creditRating.toLowerCase().includes('not rated');;
          }
        }

      }
      );
    }

    if (filters.morecreditRating) {
      filteredData = filteredData.filter((detail) => {
        if (detail.creditRating) {
          if (filters.morecreditRating.toLowerCase().includes('b')) {
            return (detail.creditRating.toLowerCase() >= filters.morecreditRating.toLowerCase() || detail.creditRating.toLowerCase().includes('a')) && detail.creditRating != "Not Rated"
          }
          else {
            return detail.creditRating.toLowerCase() >= filters.morecreditRating.toLowerCase() && (detail.creditRating.toLowerCase().includes('a') && detail.creditRating != "Not Rated");
          }
        }
      }
      );
    }

    if (filters.creditRatingAgency) {
      filteredData = filteredData.filter((detail) => {
        if (detail.creditRatingAgency) {
          return detail.creditRatingAgency.toLowerCase() === filters.creditRatingAgency.toLowerCase()
        }
      })
    }

    if (filters.financialYearAUM) {
      filteredData = filteredData.filter((detail) => {
        if (detail.financialYearAUM) {
          return detail.financialYearAUM.toLowerCase() === filters.financialYearAUM.toLowerCase()
        }
      }
      );
    }
    if (filters.quarterAUM) {
      filteredData = filteredData.filter((detail) => {
        if (detail.quarterAUM) {
          return detail.quarterAUM.toLowerCase() === filters.quarterAUM.toLowerCase()
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

    if (filters.lessmaxInterestRate) {
      filteredData = filteredData.filter((detail) => {
        if (detail.maxInterestRate) {
          return detail.maxInterestRate <= filters.lessmaxInterestRate
        }
      }
      );
    }

    if (filters.moremaxInterestRate) {
      filteredData = filteredData.filter((detail) => {
        if (detail.maxInterestRate) {
          return detail.maxInterestRate >= filters.moremaxInterestRate
        }
      }
      );
    }

    if (filters.lessminLoanAmount) {
      filteredData = filteredData.filter((detail) => {
        if (detail.minLoanAmount) {
          return detail.minLoanAmount <= filters.lessminLoanAmount
        }
      }
      );
    }

    if (filters.moreminLoanAmount) {
      filteredData = filteredData.filter((detail) => {
        if (detail.minLoanAmount) {
          return detail.minLoanAmount >= filters.moreminLoanAmount
        }
      }
      );
    }

    if (filters.networth) {
      filteredData = filteredData.filter((detail) => {
        if (detail.netWorth) {
          return detail.netWorth >= filters.networth
        }
      }
      );
    }

    if (filters.borrowercomment) {
      filteredData = filteredData.filter((detail) => {
        if (detail.borrowercomment) {
          return detail.borrowercomment >= filters.borrowercomment
        }
      }
      );
    }


    setFilteredBorrowerDetails(filteredData);
  }, [filters, borrowerDetails]);


  const handleEditBorrower = (event, borrower_id) => {
    event.preventDefault();
    console.log(borrower_id)
    setEditableBorrowerId(borrower_id);
    const copyEditableBorrower = borrowerDetails.find((data) => data.id === borrower_id)
    console.log(copyEditableBorrower)

    let formatedintialloantypes, formatedintialowner, formatedintialproducttypes, formatedintialproducts, formatedintialintialcreditrating,
      formatedintialCreditratingAgency, formatedintialfinacialyearAum

    if (copyEditableBorrower) {
      formatedintialloantypes = Array.isArray(splitDataIntoArray(copyEditableBorrower?.loanTypes)) ? splitDataIntoArray(copyEditableBorrower?.loanTypes).map((loantypes) => ({
        value: loantypes,
        label: loantypes,
      })) : ''

      formatedintialowner = Array.isArray(splitDataIntoArray(copyEditableBorrower?.owner)) ? splitDataIntoArray(copyEditableBorrower?.owner).map((owner) => ({
        value: owner,
        label: owner,
      })) : ''

      formatedintialproducttypes = Array.isArray(splitDataIntoArray(copyEditableBorrower?.productType)) ? splitDataIntoArray(copyEditableBorrower?.productType).map((productType) => ({
        value: productType,
        label: productType,
      }
      )) : ''

      formatedintialproducts = splitDataIntoArray(copyEditableBorrower?.products) ? splitDataIntoArray(copyEditableBorrower?.products).map((prd) => ({
        value: prd,
        label: prd,
      }
      )) : ''


      formatedintialintialcreditrating = splitDataIntoArray(copyEditableBorrower?.creditRating) ? splitDataIntoArray(copyEditableBorrower?.creditRating).map((cr) => ({
        value: cr,
        label: cr,
      }
      )) : ''

      formatedintialCreditratingAgency = splitDataIntoArray(copyEditableBorrower?.creditRatingAgency) ? splitDataIntoArray(copyEditableBorrower?.creditRatingAgency).map((cra) => ({
        value: cra,
        label: cra,
      }
      )) : ''

      formatedintialfinacialyearAum = splitDataIntoArray(copyEditableBorrower?.financialYearAUM) ? splitDataIntoArray(copyEditableBorrower?.financialYearAUM).map((fya) => ({
        value: fya,
        label: fya,
      }
      )) : ''

      setEditedBorrower({
        editname: copyEditableBorrower?.name,
        editregion: copyEditableBorrower?.region,
        editstate: copyEditableBorrower?.state,
        editcity: copyEditableBorrower?.city,
        editaum: copyEditableBorrower?.aum,
        editcin: copyEditableBorrower?.cin,
        editcreditRatingAgency: formatedintialCreditratingAgency,
        editcreditRating: formatedintialintialcreditrating,
        editentityType: copyEditableBorrower?.entityType,
        editfinancialYearAUM: formatedintialfinacialyearAum,
        editloanTypes: formatedintialloantypes,
        editmaxInterestRate: copyEditableBorrower?.maxInterestRate,
        editminLoanAmount: copyEditableBorrower?.minLoanAmount,
        editowner: formatedintialowner,
        editproductType: formatedintialproducttypes,
        editproducts: formatedintialproducts,
        editquarterAUM: copyEditableBorrower?.quarterAUM,
        editNetworth: copyEditableBorrower?.netWorth,
        editborrowercomment:copyEditableBorrower?.borrowercomment
      });
    }
  };
  console.log(editedBorrower, editableBorrowerId)


  const handleInputChange = (event, fieldname) => {
    const value = event.target.value
    const editedBorrowerCopy = { ...editedBorrower }
    editedBorrowerCopy[fieldname] = value
    setEditedBorrower(editedBorrowerCopy)
  }
  console.log(editedBorrower)

  const handelselectLoantypes = (selectedloantypes) => {
    const selectedvalue = selectedloantypes.map((loantype) => (
      loantype.value
    ))
    console.log(selectedvalue)
    setEditedBorrower({
      ...editedBorrower,
      editloanTypes: selectedloantypes
    })
  }


  const handleSubmit = () => {
    // Implement your logic to update the edited borrower in the database
    // You can use Axios or fetch to send a PUT or PATCH request with `editedBorrower`
    // After successful update, reset the state
    const borrowerId = editableBorrowerId
    const borrowerupdateddata = JSON.stringify(editedBorrower)
    console.log(borrowerupdateddata)
    axios.put(`http://localhost:4306/borrowers/${borrowerId}`, editedBorrower)
      .then((response) => {
        // Handle the response (optional)
        console.log('Borrower details updated successfully:', response.data,);
        // Reset states
        setsubmitedit(true);
        // setEditableBorrower(null);
        // setEditedBorrower(null);

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
        console.error('Error updating borrower details:', error);
        toast.error("Error updating borrower details", {
          autoClose: true,
          hideProgressBar: true,
          position: 'top-right'
        })
      });
    // setEditableBorrowerId(-1);
    setEditedBorrower('');
    setEditableBorrowerId(null)
  };

  return (
    <>
      <div className='tablesheading'>
        <h2 className='text-center'>Borrower Details Table</h2>
      </div>
      <div className='bcontaint'>
        <table id="Showborrower">
          <thead>
            <tr>
              <th
                style={{ width: "250px" }}
              ><div className='row py-1 px-5'>
                  <div className='col-9' style={{ fontSize: '18px' }}>Name</div>
                  <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-3 px-2'>
                      <button className='btn btn-sm' onClick={() => handelSort('name')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  value={filters.name}
                  className='search'
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                />
              </th>
              <th className='region'>
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
                  value={filters.region}
                  className='regionsearch'
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                />
              </th>
              <th className='region'>

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
                  value={filters.state}
                  className='regionsearch'
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                />
              </th>
              <th className='region'>
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
                  value={filters.city}
                  className='regionsearch'
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </th>
              <th>
                <div className='row'>
                  <div className='col-9 p-0 m-0' style={{ fontSize: '16px' }}>Entity Type</div>
                  <IconContext.Provider value={{ size: '1.3rem' }}>
                    <div className='col-3 p-0 m-0'>
                      <button className='btn btn-sm p-0 m-0 me-5' onClick={() => handelSort('entityType')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  value={filters.entityType}
                  className='search'
                  style={{ width: '120px' }}
                  onChange={(e) =>
                    handleFilterChange('entityType', e.target.value)
                  }
                />
              </th>
              <th><div className='row'>
                <div className='col-8' style={{ fontSize: '18px' }}>CIN</div>
                <IconContext.Provider value={{ size: '1.2rem' }}>
                  <div className='col-4 px-2'>
                    <button className='btn btn-sm' onClick={() => handelSort('products')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  type="text"
                  value={filters.cin.toString()}
                  className='search'
                  onChange={(e) => handleFilterChange('cin', e.target.value)}
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
                  value={filters.loanTypes}
                  style={{ width: '350px' }}
                  className='search'
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
                  value={filters.owner}
                  style={{ width: '200px' }}
                  className='search'
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
                  value={filters.productType}
                  style={{ width: '180px' }}
                  className='search'
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
                  value={filters.products}
                  style={{ width: '449px' }}
                  className='search'
                  onChange={(e) => handleFilterChange('products', e.target.value)}
                />
              </th>
              <th><div className='row'>
                <div className='col-8' style={{ fontSize: '17px' }}>Creadit Rating </div>
                <IconContext.Provider value={{ size: '1.4rem' }}>
                  <div className='col-4 d-flex align-items-center justify-content-center '>
                    <button className='btn btn-sm' onClick={() => handelSort('creditRating')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  type="text"
                  placeholder='less than'
                  value={filters.lesscreditRating}
                  style={{ width: '140px' }}
                  className='search'
                  onChange={(e) => handleFilterChange('lesscreditRating', e.target.value)}
                />
                <input
                  type="text"
                  placeholder='More than'
                  value={filters.morecreditRating}
                  style={{ width: '140px' }}
                  className='search'
                  onChange={(e) => handleFilterChange('morecreditRating', e.target.value)}
                />
              </th>
              <th
                style={{ width: '120px' }}
              > <div className='row'>
                  <div className='col-8' style={{ fontSize: '17px' }}>Credit Rating Agency</div>
                  <IconContext.Provider value={{ size: '1.4rem' }}>
                    <div className='col-4 d-flex align-items-center justify-content-center'>
                      <button className='btn btn-sm' onClick={() => handelSort('creditRatingAgency')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type='text'
                  value={filters.creditRatingAgency}
                  style={{ width: '120px' }}
                  className='search'
                  onChange={(e) => handleFilterChange('creditRatingAgency', e.target.value)} />
              </th>
              <th>Financial year for AUM<br></br>
                <input
                  type="text"
                  value={filters.financialYearAUM}
                  style={{ width: '140px' }}
                  className='search'
                  onChange={(e) => handleFilterChange('financialYearAUM', e.target.value)}
                />
              </th>
              <th><div className='row'>
                <div className='col-8' style={{ fontSize: '17px' }}>Quarter of year for AUM</div>
                <IconContext.Provider value={{ size: '1.4rem' }}>
                  <div className='col-4 d-flex align-items-center justify-content-center'>
                    <button className='btn btn-sm' onClick={() => handelSort('quarterAUM')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  type="text"
                  value={filters.quarterAUM}
                  style={{ width: '120px' }}
                  className='search'
                  onChange={(e) => handleFilterChange('quarterAUM', e.target.value)}
                />
              </th>
              <th><div className='row'>
                <div className='col-9 p-0' style={{ fontSize: '17px', }}>aum (in crores)</div>
                <IconContext.Provider value={{ size: '1.2rem' }}>
                  <div className='col-3 d-flex align-items-center justify-content-center'>
                    <button className='btn btn-sm p-0' onClick={() => handelSort('aum')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  type="number"
                  placeholder='less than'
                  style={{ width: '130px' }}
                  value={filters.lessaum}
                  className='search'
                  onChange={(e) => handleFilterChange('lessaum', e.target.value)}
                />
                <input
                  type="number"
                  placeholder='more than'
                  style={{ width: '120px' }}
                  value={filters.moreaum}
                  className='search'
                  onChange={(e) => handleFilterChange('moreaum', e.target.value)}
                />
              </th>
              <th><div className='row'>
                <div className='col-10 p-0 m-0'>Maximum interest Rate</div>
                <IconContext.Provider value={{ size: '1.2rem' }}>
                  <div className='col-2 m-0 d-flex align-items-center justify-content-center'>
                    <button className='btn btn-sm me-2' onClick={() => handelSort('maxInterestRate')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  type="number"
                  placeholder='less than'
                  value={filters.lessmaxInterestRate}
                  className='search'
                  style={{ width: '140px' }}
                  onChange={(e) => handleFilterChange('lessmaxInterestRate', e.target.value)}
                />
                <input
                  type="number"
                  placeholder='more than'
                  style={{ width: '140px' }}
                  value={filters.moremaxInterestRate}
                  className='search'
                  onChange={(e) => handleFilterChange('moremaxInterestRate', e.target.value)}
                />
              </th>
              <th><div className='row'>
                <div className='col-10 p-0 m-0'>Minimum Loan amount (in crores)</div>
                <IconContext.Provider value={{ size: '1.3rem' }}>
                  <div className='col-2 d-flex align-items-center justify-content-center'>
                    <button className='btn btn-sm me-3 ' onClick={() => handelSort('minLoanAmount')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                  </div>
                </IconContext.Provider>
              </div>
                <input
                  type="number"
                  placeholder='less than'
                  style={{ width: '140px' }}
                  value={filters.lessminLoanAmount}
                  className='search'
                  onChange={(e) => handleFilterChange('lessminLoanAmount', e.target.value)}
                />
                <input
                  type="number"
                  placeholder='more than'
                  style={{ width: '140px' }}
                  value={filters.moreminLoanAmount}
                  className='search'
                  onChange={(e) => handleFilterChange('moreminLoanAmount', e.target.value)}
                />
              </th>
              <th>
                GST Number
              </th>
              <th>
                <div className='row'>
                  <div className='col-8' style={{ fontSize: '17px' }}>Net Worth</div>
                  <IconContext.Provider value={{ size: '1.4rem' }}>
                    <div className='col-4 d-flex align-items-center justify-content-center'>
                      <button className='btn btn-sm' onClick={() => handelSort('quarterAUM')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  value={filters.networth}
                  style={{ width: '120px' }}
                  className='search'
                  onChange={(e) => handleFilterChange('networth', e.target.value)}
                />
              </th>
              <th>
                <div className='row'>
                  <div className='col-8' style={{ fontSize: '17px' }}>Comment</div>
                  <IconContext.Provider value={{ size: '1.4rem' }}>
                    <div className='col-4 d-flex align-items-center justify-content-center'>
                      <button className='btn btn-sm' onClick={() => handelSort('quarterAUM')}>{sortConfig.direction === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</button>
                    </div>
                  </IconContext.Provider>
                </div>
                <input
                  type="text"
                  value={filters.networth}
                  style={{ width: '120px' }}
                  className='search'
                  onChange={(e) => handleFilterChange('borr', e.target.value)}
                />
              </th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredBorrowerDetails.map((detail) => (
              <tr key={detail.id}>
                <td >
                  {detail.id === editableBorrowerId ? (
                    <input
                      type="text"
                      name="name"
                      value={editedBorrower.editname}
                      onChange={(event) => handleInputChange(event, 'editname')}
                    />
                  ) : (
                    detail.name
                  )}
                </td>
                <td
                  style={{ lineHeight: '10px' }}
                >
                  {detail.id === editableBorrowerId ? (
                    <select
                      name='region'
                      value={editedBorrower.editregion}
                      onChange={(event) => handleInputChange(event, 'editregion')}
                    >
                      <option value="">Select a region</option>
                      {RegionsData.map((region) => (
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
                  {detail.id === editableBorrowerId ? (
                    <select
                      name='state'
                      value={editedBorrower.editstate}
                      onChange={(event) => handleInputChange(event, 'editstate')}
                      required
                    ><option value="">Select a state</option>
                      {statesByRegion[editedBorrower.editregion] && statesByRegion[editedBorrower.editregion].map((state) => (
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
                  {detail.id === editableBorrowerId ? (
                    <select
                      name='city'
                      value={editedBorrower.editcity}
                      onChange={(event) => handleInputChange(event, 'editcity')}
                      required
                    >
                      <option value="">Select a city</option>
                      {
                        citiesByState[editedBorrower.editstate] && citiesByState[editedBorrower.editstate].map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  ) : (
                    detail.city
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <select
                      value={editedBorrower.editentityType}
                      onChange={(event) => handleInputChange(event, 'editentityType')}
                    >
                      <option value="">Select entity type</option>
                      {entityTypes.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  ) : (
                    detail.entityType
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <input
                      type="text"
                      name="cin"
                      value={editedBorrower.editcin}
                      onChange={(event) => handleInputChange(event, 'editcin')}
                    />
                  ) : (
                    detail.cin
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <Select
                      isMulti
                      value={editedBorrower.editloanTypes}
                      onChange={handelselectLoantypes}
                      options={formatedLoantypeoptions}
                    >
                    </Select>
                  ) : (
                    // readableFormat(detail.loanTypes)
                    detail.loanTypes
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <Select
                      value={editedBorrower.editowner}
                      onChange={handleOwnerChange}
                      options={owner}
                    >
                    </Select>
                  ) : (
                    detail.owner
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <Select
                      options={formatedProductTypeoptions}
                      isSearchable={true} isMulti
                      value={editedBorrower.editproductType}
                      onChange={handelProductTypes}></Select>
                  ) : (
                    detail.productType
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <Select options={formatedProductOptions} isSearchable={true} isMulti value={editedBorrower.editproducts} onChange={handelProducts}></Select>
                  ) : (
                    detail.products
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <Select options={formatedCreditRateing} isSearchable={true} value={editedBorrower.editcreditRating} onChange={handelCreditRating}></Select>

                  ) : (
                    detail.creditRating
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <Select options={formatedCreditRateingAgency} isSearchable={true} value={editedBorrower.editcreditRatingAgency} onChange={handelCreditRatingAgency}></Select>
                  ) : (
                    detail.creditRatingAgency
                  )}
                </td>

                <td>
                  {detail.id === editableBorrowerId ? (
                    <Select options={formatedFinacialYears} isSearchable={true} value={editedBorrower.editfinancialYearAUM} onChange={handleFinancialYearAUMchange}></Select>
                  ) : (
                    detail.financialYearAUM
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <select
                      value={editedBorrower.editquarterAUM}
                      onChange={(event) => handleInputChange(event, 'editquarterAUM')}
                    >
                      <option value=''>Select Quter Year Month  </option>
                      {quteryearsAum.map((month) => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  ) : (
                    detail.quarterAUM
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <input
                      type="number"
                      value={editedBorrower.editaum} onChange={(e) => handleInputChange(e, 'editaum')}
                    />
                  ) : (
                    detail.aum
                  )}
                </td>

                <td>
                  {detail.id === editableBorrowerId ? (
                    <input
                      type="number"
                      value={editedBorrower.editmaxInterestRate} onChange={(e) => handleInputChange(e, 'editmaxInterestRate')}

                    />
                  ) : (
                    detail.maxInterestRate
                  )}
                </td>

                <td>
                  {detail.id === editableBorrowerId ? (
                    <input
                      type="number"
                      value={editedBorrower.editminLoanAmount} onChange={(e) => handleInputChange(e, 'editminLoanAmount')}
                    />
                  ) : (
                    detail.minLoanAmount
                  )}
                </td>
                <td>
                  {detail?.GST_Number || 'N/A'}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <input
                      type="number"
                      value={editedBorrower.editNetworth} onChange={(e) => handleInputChange(e, 'editNetworth')}
                    />
                  ) : (
                    detail.netWorth
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <input
                      type="number"
                      value={editedBorrower.editborrowercomment} onChange={(e) => handleInputChange(e, 'editborrowercomment')}
                    />
                  ) : (
                    detail.borrowercomment
                  )}
                </td>
                <td>
                  {detail.id === editableBorrowerId ? (
                    <button className='deletebtn' onClick={handleSubmit}>Submit</button>
                  ) : (
                    <button className='deletebtn' onClick={(event) => handleEditBorrower(event, detail.id)}>Edit</button>
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

export default BorrowerDetailsTable;
