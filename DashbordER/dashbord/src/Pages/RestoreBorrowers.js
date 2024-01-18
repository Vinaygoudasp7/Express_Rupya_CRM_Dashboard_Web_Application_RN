import React, { useState, useEffect, useContext } from 'react';
import { entityTypes, statesByRegion, citiesByState, LonTypesData, quteryearsAum, RegionsData } from './Borrower'
import axios from 'axios';
import './TeamMembers.css'
import { TbRestore } from "react-icons/tb";
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import { splitDataIntoArray } from './Show_Lenders';
import DashbordContext from '../Context/DashbordContext';
import BACKEND_API_END_POINT from '../config';
import CommentPage from './CommentPage';


export const producttypes = ['Secured', 'Unsecured']
export const products = ['Auto Loan', 'Home Loan', 'Business Loan', 'Two Wheeler Loan', 'Gold Loan', 'MFI', 'Commercial Vehicle', 'MSME', 'LAP', 'Personal Loan', 'Agriculture Loans', 'Wholesale lending', 'Used Wheeler']
export const creditRating = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', '-AAA', '-AA', '-A', '-BBB', '-BB', '-B', 'Not Rated']
export const productTypes = ['Secured', 'Unsecured']


const RestoreBorrowers = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const featchdata = async () => {
      try {
        const responce = await axios.get(`${BACKEND_API_END_POINT}/restoreB`);
        setData(responce.data)

      } catch (error) {
        console.log(error);
      }
    };
    featchdata();
  }, [])

  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filterdata = data.filter((borrowers) => {
    const queryLower = query ? query.toLowerCase() : ''; // Set queryLower to an empty string if query is undefined

    return (
      (borrowers.Borrower_name && borrowers.Borrower_name.toLowerCase().includes(queryLower)) ||
      (borrowers.region && borrowers.region.toLowerCase().includes(queryLower)) ||
      (borrowers.city && borrowers.city.toLowerCase().includes(queryLower)) ||
      (borrowers.state && borrowers.state.toLowerCase().includes(queryLower)) ||
      (borrowers.Borrower_id && borrowers.Borrower_id.toString().toLowerCase().includes(queryLower))
      || (borrowers.loanTypes && borrowers.loanTypes.toString().toLowerCase().includes(queryLower))
    );
  });

  const [borrowerDetails, setBorrowerDetails] = useState([]);
  const [submitedit, setsubmitedit] = useState(false);
  const [filteredBorrowerDetails, setFilteredBorrowerDetails] = useState([]);
  const [editableBorrowerId, setEditableBorrowerId] = useState(1);
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
  const [showModal, setShowModal] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [owner, setOwner] = useState([])
  const [editeddata, setEditedData] = useState(false)
  const apiEndpoint = useContext(DashbordContext)
  useEffect(() => {
    const featchTeammember = async () => {
      try {
        const responce = await axios.get(`${BACKEND_API_END_POINT}/teammembers`);
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
  console.log(apiEndpoint)
  const fetchBorrowerDetails = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_END_POINT}/List_borrowers`);
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
          return parseFloat(detail.aum) <= parseFloat(filters.lessaum)
        }
      }
      );
    }

    if (filters.moreaum) {
      filteredData = filteredData.filter((detail) => {
        if (detail.aum) {
          return parseFloat(detail.aum) >= parseFloat(filters.moreaum)
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


  // const handleEditBorrower = (event, borrower_id) => {
  //   event.preventDefault();
  //   console.log(borrower_id)
  //   setEditableBorrowerId(borrower_id);
  //   const copyEditableBorrower = borrowerDetails.find((data) => data.id === borrower_id)
  //   console.log(copyEditableBorrower)

  //   let formatedintialloantypes, formatedintialowner, formatedintialproducttypes, formatedintialproducts, formatedintialintialcreditrating,
  //     formatedintialCreditratingAgency, formatedintialfinacialyearAum

  //   if (copyEditableBorrower) {
  //     formatedintialloantypes = Array.isArray(splitDataIntoArray(copyEditableBorrower?.loanTypes)) ? splitDataIntoArray(copyEditableBorrower?.loanTypes).map((loantypes) => ({
  //       value: loantypes,
  //       label: loantypes,
  //     })) : ''

  //     formatedintialowner = Array.isArray(splitDataIntoArray(copyEditableBorrower?.owner)) ? splitDataIntoArray(copyEditableBorrower?.owner).map((owner) => ({
  //       value: owner,
  //       label: owner,
  //     })) : ''

  //     formatedintialproducttypes = Array.isArray(splitDataIntoArray(copyEditableBorrower?.productType)) ? splitDataIntoArray(copyEditableBorrower?.productType).map((productType) => ({
  //       value: productType,
  //       label: productType,
  //     }
  //     )) : ''

  //     formatedintialproducts = splitDataIntoArray(copyEditableBorrower?.products) ? splitDataIntoArray(copyEditableBorrower?.products).map((prd) => ({
  //       value: prd,
  //       label: prd,
  //     }
  //     )) : ''


  //     formatedintialintialcreditrating = splitDataIntoArray(copyEditableBorrower?.creditRating) ? splitDataIntoArray(copyEditableBorrower?.creditRating).map((cr) => ({
  //       value: cr,
  //       label: cr,
  //     }
  //     )) : ''

  //     formatedintialCreditratingAgency = splitDataIntoArray(copyEditableBorrower?.creditRatingAgency) ? splitDataIntoArray(copyEditableBorrower?.creditRatingAgency).map((cra) => ({
  //       value: cra,
  //       label: cra,
  //     }
  //     )) : ''

  //     formatedintialfinacialyearAum = splitDataIntoArray(copyEditableBorrower?.financialYearAUM) ? splitDataIntoArray(copyEditableBorrower?.financialYearAUM).map((fya) => ({
  //       value: fya,
  //       label: fya,
  //     }
  //     )) : ''

  //     setEditedBorrower({
  //       editname: copyEditableBorrower?.name,
  //       editregion: copyEditableBorrower?.region,
  //       editstate: copyEditableBorrower?.state,
  //       editcity: copyEditableBorrower?.city,
  //       editaum: copyEditableBorrower?.aum,
  //       editcin: copyEditableBorrower?.cin,
  //       editcreditRatingAgency: formatedintialCreditratingAgency,
  //       editcreditRating: formatedintialintialcreditrating,
  //       editentityType: copyEditableBorrower?.entityType,
  //       editentityType: copyEditableBorrower?.entityType,
  //       editfinancialYearAUM: formatedintialfinacialyearAum,
  //       editloanTypes: formatedintialloantypes,
  //       editmaxInterestRate: copyEditableBorrower?.maxInterestRate,
  //       editminLoanAmount: copyEditableBorrower?.minLoanAmount,
  //       editowner: formatedintialowner,
  //       editproductType: formatedintialproducttypes,
  //       editproducts: formatedintialproducts,
  //       editquarterAUM: copyEditableBorrower?.quarterAUM,
  //       editNetworth: copyEditableBorrower?.netWorth,
  //       editborrowercomment: copyEditableBorrower?.borrowercomment
  //     });
  //   }
  // };
  // console.log(editedBorrower, editableBorrowerId)


  // const handleInputChange = (event, fieldname) => {
  //   const value = event.target.value
  //   const editedBorrowerCopy = { ...editedBorrower }
  //   editedBorrowerCopy[fieldname] = value
  //   setEditedBorrower(editedBorrowerCopy)
  // }
  // console.log(editedBorrower)

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


  // const handleSubmit = () => {
  //   // Implement your logic to update the edited borrower in the database
  //   // You can use Axios or fetch to send a PUT or PATCH request with `editedBorrower`
  //   // After successful update, reset the state
  //   const borrowerId = editableBorrowerId
  //   const borrowerupdateddata = JSON.stringify(editedBorrower)
  //   console.log(borrowerupdateddata)
  //   axios.put(`${BACKEND_API_END_POINT}/borrowers/${borrowerId}`, editedBorrower)
  //     .then((response) => {
  //       // Handle the response (optional)
  //       console.log('Borrower details updated successfully:', response.data,);
  //       // Reset states
  //       setsubmitedit(true);
  //       // setEditableBorrower(null);
  //       // setEditedBorrower(null);

  //       const message = response.data.message;
  //       toast.success((message), {
  //         autoClose: true,
  //         position: 'top-right',
  //         draggable: true,
  //         pauseOnHover: true,
  //         pauseOnFocusLoss: true
  //       })
  //     })
  //     .catch((error) => {
  //       // Handle errors (optional)
  //       console.error('Error updating borrower details:', error);
  //       toast.error("Error updating borrower details", {
  //         autoClose: true,
  //         hideProgressBar: true,
  //         position: 'top-right'
  //       })
  //     });
  //   // setEditableBorrowerId(-1);
  //   setEditedBorrower('');
  //   setEditableBorrowerId(null)
  // };



  const handelReadmore = () => {
    setShowModal(true)
  }

  const handelCloseModal = () => {
    setShowModal(false)
  }

  const handdelCancel = () => {
    setEditableBorrowerId(-1)
  }

  // const handelDeleteBorrower = (event, id, name) => {
  //   event.preventDefault()
  //   try {
  //     const confiorm = window.confirm(`Are you suer to delete borrower [${name}]`)
  //     if (confiorm) {
  //       axios.put(`${BACKEND_API_END_POINT}/deleteborrower/${id}`).then((responce) => {
  //         console.log(responce)
  //         toast.success(`Borrower [${name}] Deleted`, {
  //           position: 'top-right',
  //           autoClose: 3000,
  //           hideProgressBar: true
  //         })
  //       }).catch((error) => {
  //         console.log(error)
  //         toast.error(`some thing went wrong borrower [${name}] not Deleted`, {
  //           position: 'top-right',
  //           autoClose: 3000,
  //           hideProgressBar: true
  //         })
  //       })

  //     } else {
  //       toast.info(`user cancel delete`, {
  //         position: 'top-right',
  //         autoClose: 3000,
  //         hideProgressBar: true
  //       })
  //     }
  //     setsubmitedit(true);

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }



  const handleDelete = (id) => {
    const result = window.confirm("Lender id " + id + " are you continue ");
    if (result) {
      axios.delete(`http://192.168.29.250:4306/deleteB/${id}`)
        .then(res => {
          alert("Lender id " + id + " deleted successfully");
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
          alert('An error occurred while deleting.');
        });
    } else {
      alert('Deletion Cancelled!');
    }
  }

  const handleRestore = (id) => {
    const result = window.confirm("Are you suer to restore");
    if (result) {
      axios.delete(`http://192.168.29.250:4306/TempdeleteB/${id}`, { data: { isDeleted: false } }).then(res => {
        window.location.reload();
        window.alert("Borrower " + id + " restore sucessfull")
      }).catch(err => {
        console.log(err);
        alert('An error occurred while deleting.');
      })
    } else {
      alert("Restore canceled")
    }
  }


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
                style={{ width: "250px" }}>
                <div className='col-9' style={{ fontSize: '18px' }}>Name</div>
                <input
                  type="text"
                  value={filters.name}
                  className='search'
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                />
              </th>
              <th className='region'>
                <div className='col-7' style={{ fontSize: '17px' }}>Region</div>
                <input
                  type="text"
                  value={filters.region}
                  className='regionsearch'
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                />
              </th>
              <th className='region'>
                <div className='col-6' style={{ fontSize: '18px' }}>State</div>
                <input
                  type="text"
                  value={filters.state}
                  className='regionsearch'
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                />
              </th>
              <th className='region'>
                <div className='col-6' style={{ fontSize: '18px' }}>City</div>
                <input
                  type="text"
                  value={filters.city}
                  className='regionsearch'
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </th>
              <th>
                <div className='col-9 p-0 m-0' style={{ fontSize: '16px' }}>Entity Type</div>

              </th>
              <th>
                <div className='col-8' style={{ fontSize: '18px' }}>CIN</div>

              </th>
              <th>
                <div className='col-8' style={{ fontSize: '18px' }}>Loan Types</div>

              </th>
              <th>
                <div className='col-8' style={{ fontSize: '18px' }}>Owner</div>

              </th>
              <th>
                <div className='col-8 p-0 m-0' style={{ fontSize: '17px' }}>Product Type</div>

              </th>
              <th>
                <div className='col-8' style={{ fontSize: '18px' }}>Products</div>

              </th>
              <th>
                <div className='col-8' style={{ fontSize: '17px' }}>Creadit Rating </div>

              </th>
              <th
                style={{ width: '120px' }}
              >
                <div className='col-8' style={{ fontSize: '17px' }}>Credit Rating Agency</div>

              </th>
              <th>Financial year for AUM<br></br>

              </th>
              <th>
                <div className='col-8' style={{ fontSize: '17px' }}>Quarter of year for AUM</div>

              </th>
              <th>
                <div className='col-9 p-0' style={{ fontSize: '17px', }}>aum (in crores)</div>

              </th>
              <th>
                <div className='col-10 p-0 m-0'>Maximum interest Rate</div>

              </th>
              <th>
                <div className='col-10 p-0 m-0'>Minimum Loan amount (in crores)</div>

              </th>
              <th>
                GST Number
              </th>
              <th>
                <div className='col-8' style={{ fontSize: '17px' }}>Net Worth</div>

              </th>
              <th style={{ width: '440px', minWidth: '430px', maxWidth: '500px' }}>
                  <div className='col-8' style={{ fontSize: '17px' }}>Comment</div>
              </th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredBorrowerDetails.map((detail) => (
              <tr key={detail.id}>
                <td >

                  {detail.name}
                </td>
                <td
                  style={{ lineHeight: '10px' }}
                >
                  {
                    detail.region
                  }
                </td>
                <td>
                  {
                    detail.state
                  }
                </td>
                <td>
                  {
                    detail.city
                  }
                </td>
                <td>
                  {
                    detail.entityType
                  }
                </td>
                <td>
                  {
                    detail.cin
                  }
                </td>
                <td>
                  {detail.loanTypes
                  }
                </td>
                <td>
                  {
                    detail.owner
                  }
                </td>
                <td>
                  {
                    detail.productType
                  }
                </td>
                <td>
                  {
                    detail.products
                  }
                </td>
                <td>
                  {
                    detail.creditRating
                  }
                </td>
                <td>
                  {
                    detail.creditRatingAgency
                  }
                </td>

                <td>
                  {
                    detail.financialYearAUM
                  }
                </td>
                <td>
                  {
                    detail.quarterAUM
                  }
                </td>
                <td>
                  {
                    detail.aum ? parseFloat((detail.aum)).toFixed(2) : 'nill'
                  }
                </td>

                <td>
                  {
                    detail.maxInterestRate ? parseFloat(detail.maxInterestRate).toFixed(2) : 'nill'
                  }
                </td>

                <td>
                  {
                    detail.minLoanAmount ? parseFloat(detail.minLoanAmount).toFixed(2) : 'nill'
                  }
                </td>
                <td>
                  {detail?.GST_Number || 'N/A'}
                </td>
                <td>
                  {
                    detail.netWorth ? parseFloat(detail.netWorth).toFixed(2) : 'nill'
                  }
                </td>
                <td style={{ width: '440px', minWidth: '430px', maxWidth: '500px' }}>
                  {
                    detail?.borrowerComment
                  }
                </td>
                <CommentPage showModal={showModal} handelCloseModal={handelCloseModal} Comment={detail.lenderComment} />
                <td>
                  <div className='d-flex flex-row'>
                    <button className='deletebtn' onClick={(event) => handleRestore(event, detail.id)}><span>Restore</span></button>
                    <button className='cancel' onClick={(event) => handleDelete(event, detail.id, detail.name)}>Delete</button>
                  </div>
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
  )
}

export default RestoreBorrowers;
