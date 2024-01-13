import React, { useEffect, useState, } from 'react';
import Axios from 'axios';
import './Borrower.css';
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AleartDailog from './Dailogs/AleartDailog';
import { useNavigate } from 'react-router-dom'

export const entityTypes = ['Company', 'Partnership Firm', 'Proprietorship', 'Sec 8 company', 'Society', 'Trust',];
export const RegionsData = ['East', 'West', 'North', 'South'];
export const quteryearsAum = ['March', 'June', 'September', 'December']
export const statesByRegion = {
  North: [
    'Chandigarh',
    'Delhi',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Madhya Pradesh',
    'Punjab',
    'Rajasthan',
    'Uttarakhand',
    'Uttar Pradesh',

  ],
  South: [
    'Andhra Pradesh',
    'Karnataka',
    'Kerala',
    'Puducherry',
    'Tamil Nadu',
    'Telangana',

  ],
  East: ['Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Jharkhand', 'Manipur', 'Mizoram', 'Nagaland', 'Odisha/Orissa', 'Sikkim', 'West Bengal'],
  West: [
    'Daman and Diu',
    'Dadra and Nagar Haveli',
    'Gujarat',
    'Goa',
    'Maharashtra',
  ],
};

export const citiesByState = {
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Kathua'],
  'Himachal Pradesh': ['Shimla', 'Kullu', 'Manali', 'Dharamshala', 'Kangra', 'Mandi', 'Sirmaur'],
  'Punjab': ['Amritsar', 'Batala', 'Bathinda', 'Chandigarh', 'Faridkot', 'Firozpur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Mohali', 'Pathankot', 'Patiala', 'PHAGWARA', 'Rupnagar', 'Sangrur', 'Sri Muktsar Sahib', 'ZIRAKPUR', 'Others'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'KASHIPUR', 'Mussoorie', 'Nagar', 'Nainital', 'Rishikesh', 'Rudrapur', 'Udham Singh Nagar'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hissar', 'Jhajjar', 'Jind', 'Karnal', 'Kurukshetra', 'Mandi', 'Panchkula', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamuna Nagar'],
  'Delhi': ['New Delhi', 'Delhi', 'Noida', 'Ghaziabad', 'Faridabad', 'Gurugram'],
  'Uttar Pradesh': ['Agra', 'ALIGANJ', 'Aligarh', 'Allahabad', 'Bahraich', 'Bareilly', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Etah', 'Etawah', 'Faizabad', 'Firozabad', 'Gautam Budh Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'HAPUR', 'Jaunpur', 'Jhansi', 'Kanpur', 'KASGANJ', 'KASHIPUR', 'Kaushambi', 'Kushinagar', 'Lucknow', 'Mathura', 'Meerut', 'Modinagar', 'Moradabad', 'Muzaffarnagar', 'Najibabad', 'NOIDA', 'Pilibhit', 'PRAYAGRAJ', 'Rae Bareli', 'Rampur', 'Saharanpur', 'SAMBHAL', 'Shahjahanpur', 'Udham Singh Nagar', 'Unnao', 'Varanasi',],
  'Rajasthan': ['ABU ROAD', 'Ajmer', 'Alwar', 'Baran', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Chomu', 'Churu', 'Dholpur ', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jhalawar', 'Jodhpur', 'KISHANGARH', 'Kota', 'Mandi', 'MANSAROVAR', 'Murlipura', 'Nagaur', 'Pali', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur',],
  'Madhya Pradesh': ['Barwani', 'Betul', 'Bhopal', 'Dehri', 'Dewas', 'Dhar', 'Gwalior', 'Hoshangabad', 'Indore', 'Jabalpur', 'Katni', 'Khargone', 'Morena', 'Narsinghpur', 'Neemuch', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Shivpuri', 'Ujjain'],
  'Chandigarh': ['Chandigarh', 'Others'],
  'Chhattisgarh': ['Bastar', 'BHILAI', 'Bilaspur', 'Durg', 'Korba', 'Mahasamund', 'Raigarh', 'Raipur', 'Rajnandgaon'],
  'Assam': ['Barpeta', 'Bongaigaon', 'Cachar', 'Darrang', 'Dibrugarh', 'Golaghat', 'Guwahati', 'Jorhat', 'Kamrup', 'Karbi Anglong', 'Nagaon', 'Sivasagar', 'Sonitpur', 'Tinsukia', 'Others'],
  'Arunachal Pradesh': ['Changlang', 'Dibang Valley', 'Itanagar', 'Papum Pare', 'Tirap', 'West Siang', 'Others'],
  'Andhra Pradesh': ['Adilabad(U)', 'Bapatla', 'Bheemavaram', 'CHILAKALURIPET', 'Chittoor', 'East Godavari', 'Eluru', 'Guntur', 'Hyderabad', 'Kadapa', 'Kakinada', 'Karimnagar', 'Krishna', 'Kurnool', 'Madhapur', 'Nagar', 'Nellore', 'RAJAHMUNDRY', "Secunderabad", 'Srikakulam', 'TIRUPATHI', 'Visakhapatnam', 'Vijayawada', 'Vizianagaram', 'West Godavari', 'Others'],
  'Telangana': ['Adilabad', 'BALANAGAR', 'Bowenpally', 'GACHIBOWLI', 'Hanamkonda', 'Hyderabad', 'Karimnagar', 'Khammam', 'Kondapur', 'Kothapet', 'kukatpally', 'Madhapur', 'Mahbubnagar', 'Malkajgiri', 'Medak', 'Medchal', 'Nagaram', 'Nalgonda', 'Nizamabad', 'RANGA REDDY', 'Secunderabad', 'Thimmapur', 'Warangal', 'Zahirabad'],
  'Karnataka': ['ADONI', 'Bagalkot', 'Ballari', 'Bengaluru', 'Belgaum', 'Bidar', 'Chikmagalur', 'Davanagere', 'Gangavathi', 'Gulbarga', 'HALLI', 'Hubli', 'Hassan', 'Haveri', 'Kodagu', 'Kolar', 'MANGALORE', 'Manipal', 'Mysore', 'Raichur', 'RAMNAGAR', 'Shivamogga', 'SIRSI', 'Udupi', 'Uttara Kannada', 'Vijayapura'],
  'Tamil Nadu': ['AMBASAMUDRAM', 'ARCOT', 'Bhavani Nagar', 'Chennai', 'Chidambaram', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'HOSUR', 'Kancheepuram', 'Kanyakumari', 'KARAIKUDI', 'Karur', 'KOVILPATTI', 'Kumbakonam', 'Madurai', 'Nagapattinam', 'Nagercoil', 'Namakkal', 'Nilgiris', 'OOTY', 'Perambalur', 'PERIYAKULAM', 'POLLACHI', 'Pudukkottai', 'Salem', 'Sivaganga', 'SIVAKASI', 'Thanjavur', 'Theni', 'THIRUVARUR', 'Thoothukudi', 'TIRUCHENGODE', 'TIRUCHENGODE', 'Tiruchirappalli', 'Tirunelveli', 'Tirupur', 'Trichy', 'Vellore', 'Viluppuram', 'Virudhunagar'],
  'Kerala': ['Alappuzha', 'CALICUT', 'CHENGANNUR', 'COCHIN', 'Ernakulam', 'Idukki', 'IRINJALAKUDA', 'KAKKANAD', 'Kannur', 'Kasaragod', 'Kattappana', 'Kochi', 'Kozhikode', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'OTTAPALAM', 'Palakkad', 'Pathanamthitta', 'SULTHAN BATHERY', 'THIRUVALLA', 'Thiruvananthapuram', 'Thrissur', 'THODUPUZHA', 'Thrissur', 'TRICHUR', 'TRIVANDRUM', 'VAZHUTHACAUD', 'Wayanad'],
  'Puducherry': ['Puducherry', 'Yanam'],
  'West Bengal': ['AGARPARA', 'ASANSOL', 'Ballygunge', 'Bankura', 'Birbhum', 'Burdwan', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Durgapur', 'Hooghly', 'Howrah', 'Islampur', 'Jalpaiguri', 'katwa', 'Kolkata', 'Midnapore', 'Murshidabad', 'Nadia', 'North Twenty Four Parganas', 'PANCHASAYAR', 'PARGANAS North', 'Purulia', 'RANAGHAT', 'Siliguri', 'Sonarpur', 'South 24 Parganas', 'Uttar Dinajpur', 'Others'],
  'Odisha/Orissa': ['Balasore', 'BERHAMPUR', 'Bhadrak', 'BHAWANIPATNA', 'Bhubaneswar', 'Brahmapur', 'Cuttack', 'Ganjam', 'Kalahandi', 'Keonjhar', 'Puri', 'Rourkela', 'Sambalpur', 'Sundergarh'],
  'Jharkhand': ['Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Koderma', 'Purba Singhbhum', 'Ranchi'],
  'Bihar': ['Aurangabad', 'Bhagalpur', 'Bihar Sharif', 'Darbhanga', 'Gaya', 'Gopalganj', 'Muzaffarpur', 'Patna', 'Rohtas', 'Samastipur', 'Vaishali Nagar'],
  'Sikkim': ['Gangtok', 'Namchi', 'Jorethang', 'Mangan', 'Rangpo'],
  'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'ANKLESHWAR', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'BHUJ', 'GANDHIDHAM', 'Gandhinagar', 'Halvad', 'Himatnagar', 'Jamnagar', 'Junagadh', 'Kachchh', 'KALOL', 'Mehsana', 'Morbi', 'Navsari', 'PALANPUR', 'Patan', 'Rajkot', 'Sabarkatha', 'Sagar', 'Surat', 'Vadodara', 'Veraval',],
  'Maharashtra': ['Ahmednagar', 'Akola', 'Ambad', 'Amravati', 'Aurangabad', 'Bhandara', 'Bhiwadi', 'BHOSARI', 'BORIVALI', 'Chandrapur', 'Dhule', 'Gadchandur', 'Ghorpadi', 'Girgaon', 'Hingoli', 'Mumbai', 'Jalgaon', 'Jalna', 'KALAMBOLI', 'KALYAN', 'KAMPTEE', 'Kolhapur', 'Latur', 'MIRAJ', 'Mumbai', 'Nagpur', 'Nanded', 'Narhe', 'Nashik', 'Navi Mumbai', 'NIGDI', 'Niphad', 'PALGHAR', 'PANDHARPUR', 'Panvel', 'Parbhani', 'Parli Vaijnath', 'Pune', 'Raigad', 'Raigarh', 'SANGAMNER', 'Sangli', 'Satara', 'SHAHAPUR', 'Satara', 'SHAHAPUR', 'SHEGAON', 'Sindhudurg', 'Solapur', 'TALEGAON DABHADE', 'Thane', 'ULHASNAGAR', 'Wardha', 'Washim', 'Yavatmal'],
  'Goa': ['Goa', 'Panaji', 'Madgaon', 'Vasco da Gama', 'Ponda', 'Mapusa'],
  'Daman and Diu': ['Daman', 'Diu', 'other'],
  'Dadra and Nagar Haveli': ['Dadra & Nagar Haveli', 'Silvassa', 'Valsad', 'Others'],
  'Manipur': ['Imphal', 'Thoubal'],
  'Mizoram': ['Aizawl'],
  'Nagaland': ['Dimapur']
};

export const LonTypesData = ['Term Loan', 'BC', 'PTC', 'DA', 'Venture Debt', 'Other type']

const Borrower = () => {
  const [entityType, setEntityType] = useState('');
  const [cin, setCIN] = useState(null);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [loanTypes, setLoanTypes] = useState('');
  const [owner, setOwner] = useState('');
  const [selectedOwner, setSelectedOwner] = useState([]);
  const [productType, setProductType] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState('');
  const [products, setProducts] = useState([]);
  const [creditRating, setCreditRating] = useState('');
  const [creditRatingAgency, setCreditRatingAgency] = useState('');
  const [quarterAUM, setQuarterAUM] = useState('');
  const [financialYearAUM, setFinancialYearAUM] = useState('');
  const [aum, setAum] = useState('');
  const [maxInterestRate, setMaxInterestRate] = useState('');
  const [minLoanAmount, setMinLoanAmount] = useState('');
  const [mfiGrading, setMfiGrading] = useState('');
  const [showMfiGrading, setShowMfiGrading] = useState(false);
  const [message, setMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [nameerrorMessage, setNameErrorMessage] = useState('')
  const [AUMerrorMessage, setAUMErrorMessage] = useState('')
  const [networtherrorMessage, setnetworthErrorMessage] = useState('')
  const [netWorth, setNetWorth] = useState('')
  const [MAXInterrorMessage, setMaxIntErrorMessage] = useState('')
  const [MinloanerrorMessage, setMinloanerrorMessage] = useState('')
  const [GST_number, setGST_number] = useState('')
  const [borrowrcomment, setBorrowercomment] = useState('')
  const navigate = useNavigate()


  const handleEntityTypeChange = (event) => {
    const selectedEntityType = event.target.value;
    setEntityType(selectedEntityType);
  };

  const handleCINChange = (event) => {
    const enteredCIN = event.target.value;
    setCIN(enteredCIN);
  };

  const handleNameChange = (event) => {

    const inputValue = event.target.value
    setName(inputValue);
  };

  const handleOwnerChange = (selectedOwner) => {
    setSelectedOwner(selectedOwner);
  };

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);
    setState('');
    setCity('');
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    setCity('');
  };

  const handleCityChange = (event) => {

    setCity(event.target.value);
  };


  const handleLoanTypeChange = (event) => {
    const selectedLoanType = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setLoanTypes([...loanTypes, selectedLoanType]);
    } else {
      setLoanTypes(loanTypes.filter((type) => type !== selectedLoanType));
    }
  };

  const handleProductTypeChange = (event) => {

    const { value } = event.target;
    if (productType.includes(value)) {
      // If the value is already in selectedProductType, remove it
      setProductType((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );

    } else {
      // If the value is not in selectedProductType, add it
      setProductType((prevSelected) => [...prevSelected, value]);
    }

  };



  const handleProductChange = (event) => {
    const selectedProduct = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setProducts([...products, selectedProduct]);
      if (selectedProduct === "MFI") {
        setShowMfiGrading(true);
      }
    } else {
      if (products.map((product) => product !== "MFI")) {
        setShowMfiGrading(false);
      }

      setProducts(
        products.filter((product) => product !== selectedProduct)
      );
    }
  };



  const handleCreditRatingChange = (event) => {
    setCreditRating(event.target.value);
  };

  const handelCreditratingAgency = (event) => {
    setCreditRatingAgency(event.target.value)
  }

  const handleFinancialYearAUMchange = (event) => {
    const FinancialYearAUM = event.target.value;
    setFinancialYearAUM(FinancialYearAUM);
  };

  const handleQuarterAUMchange = (event) => {
    const quarterAUM = event.target.value;
    setQuarterAUM(quarterAUM);
  };

  const handleAumChange = (event) => {
    const inputValue = event.target.value

    if (/^[0-9.]*$/.test(inputValue)) {
      setAum(inputValue);
      setAUMErrorMessage('');
    } else {
      setAUMErrorMessage("Please enter valid input '[do not enter the (%-+*/$@)]'")
    }
  };

  const handleMaxInterestRateChange = (event) => {

    const inputValue = event.target.value

    if (/^[0-9.]*$/.test(inputValue)) {
      setMaxInterestRate(inputValue);
      setMaxIntErrorMessage('');
    } else {
      setMaxIntErrorMessage("Please enter valid input '[do not enter the (%-+*/$@)]'")
    }
  };

  const handleNetworthChange = (event) => {

    const inputValue = event.target.value

    if (/^[0-9.]*$/.test(inputValue)) {
      setNetWorth(inputValue);
      setnetworthErrorMessage('');
    } else {
      setnetworthErrorMessage("Please enter valid input '[do not enter the (%-+*/$@)]'")
    }
  };

  const handleMinLoanAmountChange = (event) => {
    const inputValue = event.target.value

    if (/^[0-9.]*$/.test(inputValue)) {
      setMinLoanAmount(inputValue);
      setMinloanerrorMessage('');
    } else {
      setMinloanerrorMessage("Please enter valid input '[do not enter the (%-+*/$@)]'")
    }
  };

  const handleMfiGradingChange = (event) => {
    setMfiGrading(event.target.value);
  };


  useEffect(() => {
    const featchTeammember = async () => {
      try {
        const responce = await axios.get("http://192.168.29.250:4306/teammembers");
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


  const handelOpenAlert = () => {
    setIsAlertOpen(true);
  }

  const handelCLoseAlert = () => {
    setIsAlertOpen(false);
  }

  const handelGstNumber = (event) => {
    setGST_number(event.target.value)
  }

  const handelChangeComment = (event) => {
    setBorrowercomment(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (entityType.length === 0 || name.length === 0 || region.length === 0 || state.length === 0 || creditRatingAgency.length === 0 ||
      loanTypes.length === 0 || owner.length === 0 || products.length === 0
      || creditRating.length === 0 || financialYearAUM.length === 0 || quarterAUM.length === 0 || aum.length === 0 || maxInterestRate.length === 0 ||
      minLoanAmount.length === 0) {
      setMessage('Please fill all required detailes ');
      handelOpenAlert();
    } else {
      try {
        // Send a POST request to the backend API

        Axios.post("http://192.168.29.250:4306/insertborrowerdetailes", {
          entityType: entityType,
          cin: cin,
          name: name,
          region: region,
          state: state,
          city: city,
          loanTypes: JSON.stringify(loanTypes),
          owner: selectedOwner.label,
          productType: JSON.stringify(productType),
          products: JSON.stringify(products),
          creditRating: creditRating,
          creditRatingAgency: creditRatingAgency,
          financialYearAUM: financialYearAUM,
          quarterAUM: quarterAUM,
          aum: aum,
          netWorth: netWorth,
          maxInterestRate: maxInterestRate,
          minLoanAmount: minLoanAmount,
          mfiGrading: mfiGrading,
          GST_number: GST_number,
          borrowrcomment: borrowrcomment,
        }, {
          headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
          // Handle the response from the server
          console.log('Response:', response.data);

          // Reset form fields
          setName('');
          setRegion('');
          setState('');
          setCity('');
          setLoanTypes([]);
          setEntityType('');
          setCIN('');
          setProductType('');
          setProducts([]);
          setCreditRating('');
          setCreditRatingAgency('');
          setQuarterAUM('');
          setAum('');
          setMaxInterestRate('');
          setMinLoanAmount('');
          setMfiGrading('');
          setShowMfiGrading(false);
          setGST_number('')
          setBorrowercomment('')
          setOwner('')
          const message = response.data.message;
          toast.success(message);
          // Display success message or perform other actions
          console.log('Borrower data submitted successfully!');
          // navigate('/Show_Borrowers')
        });
      } catch (error) {
        // Handle error response
        console.error('Error submitting borrower data:', error);
        toast.error("Error while Submiting borrower detailes");
        // Display error message or perform other actions
      }
      // Reset form fields
    };
  }

  return (
    <>
      <div className="tablesheading">Borrower's Details</div>
      <div id="form1">
        <form className='form1' onSubmit={handleSubmit}>

          <div id="entityType" >
            <label htmlFor="entityType">Entity Type:</label>
            <select
              className='form-select'
              value={entityType}
              onChange={handleEntityTypeChange}
            >
              <option value="">Select entity type</option>
              {entityTypes.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          {entityType === 'Company' && (
            <div id="cin">
              <label htmlFor="cin">CIN:</label>
              <input
                type="text"
                value={cin}
                onChange={handleCINChange}
              />
            </div>
          )}

          <div id="name" className='mb-1'>
            <label htmlFor="name">Name of borrower:</label>
            <p className='text-danger mb-0'>{nameerrorMessage}</p>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div id="region">
            <label htmlFor="region">Region:</label>
            <select

              value={region}
              onChange={handleRegionChange}
            >
              <option value="">Select a region</option>
              {RegionsData.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div id="state">
            <label htmlFor="state">State:</label>
            <select

              value={state}
              onChange={handleStateChange}
            >
              <option value="">Select state</option>
              {region !== '' &&
                statesByRegion[region].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>

                ))}
            </select>
          </div>

          <div id="city">
            <label htmlFor="city">City:</label>
            <select
              value={city}
              onChange={handleCityChange}
            >
              <option value="">Select a city</option>
              {state !== '' &&
                citiesByState[state].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>

          <div id="Loan-type" className='mb-1'>
            <label>Loan Types:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Term Loan"
                  checked={loanTypes.includes('Term Loan')}
                  onChange={handleLoanTypeChange}
                />
                Term Loan
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="BC"
                  checked={loanTypes.includes('BC')}
                  onChange={handleLoanTypeChange}
                />
                BC
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="PTC"
                  checked={loanTypes.includes('PTC')}
                  onChange={handleLoanTypeChange}
                />
                PTC
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="DA"
                  checked={loanTypes.includes('DA')}
                  onChange={handleLoanTypeChange}
                />
                DA
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Venture Debt"
                  checked={loanTypes.includes('Venture Debt')}
                  onChange={handleLoanTypeChange}
                />
                Venture Debt
              </label>
            </div>
            <div>
              <label>
                <input
                  className='form-check-input me-1'
                  type="checkbox"
                  value="Other type"
                  checked={loanTypes.includes('Other type')}
                  onChange={handleLoanTypeChange}
                />
                Other type
              </label>
            </div>
          </div>

          <div id="Owner_name" className='mb-1'>
            <label htmlFor="Ownername">Owner of borrower:</label>
            {/* <input
              type="text"

              value={owner}
              onChange={handleOwnerChange}
              required
            /> */}
            {/* {owner.length > 0 && ( */}
            <Select value={selectedOwner} isSearchable={true} onChange={handleOwnerChange} options={owner} ></Select>
            {/* )} */}
          </div>

          <div className='mb-1'>
            <label htmlFor="productType">Product Type:
              <br />
              <input
                type='checkbox'
                className='form-check-input me-1'
                value="secuerd"
                checked={productType.includes('secuerd')}
                onChange={handleProductTypeChange} /> Secured
              <br />
              <input
                type='checkbox'
                className='form-check-input me-1'
                value="Unsecuerd"
                checked={productType.includes("Unsecuerd")}
                onChange={handleProductTypeChange} /> Unsecuerd
            </label>
            {/* <select
              id="productType"
              value={productType}
              onChange={handleProductTypeChange}

            >
              <option value="">Select Product Type</option>
              <option value="Secured">Secured</option>
              <option value="Unsecured">Unsecured</option>
            </select> */}
          </div>

          <div className='mb-1'>
            <label htmlFor="products">Products:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Auto Loan"
                  checked={products.includes('Auto Loan')}
                  onChange={handleProductChange}
                />
                Auto Loan
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div className='mb-1'>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Home Loan"
                  checked={products.includes('Home Loan')}
                  onChange={handleProductChange}
                />
                Home Loan
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div >
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Business Loan"
                  checked={products.includes('Business Loan')}
                  onChange={handleProductChange}
                />
                Business Loan
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Two wheeler loan"
                  checked={products.includes('Two wheeler loan')}
                  onChange={handleProductChange}
                />
                Two Wheeler Loan
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Gold Loan"
                  checked={products.includes('Gold Loan')}
                  onChange={handleProductChange}
                />
                Gold Loan
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="MFI"
                  checked={products.includes('MFI')}
                  onChange={handleProductChange}
                />
                MFI
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div>
              <label>
                <input
                  className='form-check-input me-1'
                  type="checkbox"
                  value="Commercial Vehicle"
                  checked={products.includes('Commercial Vehicle')}
                  onChange={handleProductChange}
                />
                Commercial Vehicle
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div>
              <label>
                <input
                  className='form-check-input me-1'
                  type="checkbox"
                  value="MSME"
                  checked={products.includes('MSME')}
                  onChange={handleProductChange}
                />
                MSME
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="LAP"
                  checked={products.includes('LAP')}
                  onChange={handleProductChange}
                />
                LAP
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Personal Loan"
                  checked={products.includes('Personal Loan')}
                  onChange={handleProductChange}
                />
                Personal Loan
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Agriculture Loans"
                  checked={products.includes('Agriculture Loans')}
                  onChange={handleProductChange}
                />
                Agriculture Loans
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Used Wheeler"
                  checked={products.includes('Used Wheeler')}
                  onChange={handleProductChange}
                />
                Used Wheeler

              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  className='form-check-input me-1'
                  value="Wholesale lending"
                  checked={products.includes('Wholesale lending')}
                  onChange={handleProductChange}
                />
                Wholesale lending
              </label>
              {/* Repeat the above label and input elements for other products */}
            </div>
          </div>

          <div>
            <label htmlFor="creditRating">Credit Rating:</label>
            <select
              id="creditRating"
              value={creditRating}
              onChange={handleCreditRatingChange}
            >
              <option value="">Select Credit Rating</option>
              <option value="AAA">AAA</option>
              <option value="AA">AA</option>
              <option value="A">A</option>
              <option value="BBB">BBB</option>
              <option value="BB">BB</option>
              <option value="B">B</option>
              <option value="-AAA">-AAA</option>
              <option value="-AA">-AA</option>
              <option value="-A">-A</option>
              <option value="-BBB">-BBB</option>
              <option value="-BB">-BB</option>
              <option value="-B">-B</option>
              <option value="Not Rated">Not Rated</option>
            </select>
          </div>
          <div>
            <label htmlFor='CreditRatingAgency' >Credit Rating Agency:</label>
            <select id='CreditRatingAgency' value={creditRatingAgency} onChange={handelCreditratingAgency}>
              <option value="">Select Credit Rating Agency</option>
              <option value="ACUITE">ACUITE</option>
              <option value="Brickwork">Brickwork</option>
              <option value="CRISIL">CRISIL</option>
              <option value="CARE">CARE</option>
              <option value="ICRA">ICRA</option>
              <option value="SMERA">SMERA</option>
              <option value="India Rating">India Rating</option>
              <option value="Infomerics">Infomerics</option>
              <option value="NIL">NIL</option>
            </select>
          </div>
          <div>
            <label htmlFor="Financial Year">Financial year for AUM</label>
            <select
              id="FinancialYearAUM"
              value={financialYearAUM}
              onChange={handleFinancialYearAUMchange}
            >
              <option value="">financial year</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
              <option value="2027-2028">2027-2028</option>
              <option value="2028-2029">2028-2029</option>
              <option value="2029-2030">2029-2030</option>
              <option value="2030-2031">2030-2031</option>
              <option value="2031-2032">2031-2032</option>
              <option value="2032-2033">2032-2033</option>
            </select>
          </div>
          <div>
            <label htmlFor="QuarterAUM">Quarte of year for AUM</label>
            <select
              id="QuarterAUM"
              value={quarterAUM}
              onChange={handleQuarterAUMchange}
            >
              <option value="">Quarter of year</option>
              <option value="March">March</option>
              <option value="June">June</option>
              <option value="September">September</option>
              <option value="December">December</option>
            </select>
          </div>

          <div className='mb-1'>
            <label htmlFor="aum">AUM ( in crores):</label>
            <p className='text-danger mb-0'>{AUMerrorMessage}</p>
            <input
              type="decimal"
              id="aum"
              value={aum}
              onChange={handleAumChange}
            />
          </div>
          <div className='mb-1'>
            <label htmlFor="Comment">Comment:</label>
            <textarea className='form-control' cols={30} rows={3} value={borrowrcomment} onChange={handelChangeComment}></textarea>
          </div>
          <div className='mb-1'>
            <label htmlFor="networth">Net worth ( in crores):</label>
            <p className='text-danger mb-0'>{networtherrorMessage}</p>
            <input
              type="decimal"
              id="aum"
              value={netWorth}
              onChange={handleNetworthChange}
            />
          </div>
          <div className='mb-1'>
            <label htmlFor="maxInterestRate">Maximum Interest Rate (%):</label>
            <p className='text-danger mb-0'>{MAXInterrorMessage}</p>
            <input
              type="decimal"
              id="maxInterestRate"
              value={maxInterestRate}
              onChange={handleMaxInterestRateChange}
            />
          </div>

          <div className='mb-1'>
            <label htmlFor="minLoanAmount">Minimum Loan Amount (in crores):</label>
            <p className='text-danger mb-0'>{MinloanerrorMessage}</p>
            <input
              type="decimal"
              id="minLoanAmount"
              value={minLoanAmount}
              onChange={handleMinLoanAmountChange}
            />
          </div>

          <div className='mb-1'>
            <label htmlFor="minLoanAmount">GST Number:</label>
            <input
              type="text"
              id="GST_Number"
              value={GST_number}
              onChange={handelGstNumber}
            />
          </div>

          {/* Show MFI Grading field only if MFI is chosen as entity type */}
          {showMfiGrading && (
            <div >
              <label htmlFor="mfiGrading">MFI Grading:</label>
              <select
                id="mfiGrading"
                value={mfiGrading}
                onChange={handleMfiGradingChange}
              >
                <option value="">Select MFI Grading</option>
                <option value="mfR1">mfR1</option>
                <option value="mfR2">mfR2</option>
                <option value="mfR3">mfR3</option>
                <option value="mfR4">mfR4</option>
                <option value="mfR5">mfR5</option>
                <option value="mfR6">mfR6</option>
                <option value="mfR7">mfR7</option>
                <option value="mfR8">mfR8</option>
                <option value="Not Graded">Not Graded</option>
              </select>
            </div>
          )}
          <button type="submit" className='Submitbutton'>Submit</button>
        </form>
      </div>

      <AleartDailog open={isAlertOpen} onClose={handelCLoseAlert} message={message} />

      <ToastContainer
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </>
  );
};

export default Borrower;
