import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Borrower.css';
import Select from 'react-select'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AleartDailog from "./Dailogs/AleartDailog"

export const regions = ['East', 'West', 'North', 'South',];

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

const Lender = () => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [loanTypes, setLoanTypes] = useState([]);
  const [Borrowerregion, setBorrowerregion] = useState([]);
  const [owner, setOwner] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');
  const [productType, setProductType] = useState('');
  const [products, setProducts] = useState([]);
  const [aum, setAum] = useState('');
  const [mincreditRating, setminCreditRating] = useState('');
  const [minInterestRate, setminInterestRate] = useState('');
  const [showMfiGrading, setShowMfiGrading] = useState(false);
  const [minLoanAmount, setMinLoanAmount] = useState('');
  const [maxLoanAmount, setMaxLoanAmount] = useState('');
  const [mfiGrading, setMfiGrading] = useState('');
  const [message, setMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [nameerrorMessage, setNameErrorMessage] = useState('')
  const [AUMerrorMessage, setAUMErrorMessage] = useState('')
  const [minInterrorMessage, setMinIntErrorMessage] = useState('')
  const [MAXInterrorMessage, setMaxIntErrorMessage] = useState('')
  const [MinloanerrorMessage, setMinloanerrorMessage] = useState('')
  const [maxloanerrorMessage, setMaxloanerrorMessage] = useState('')



  const handleNameChange = (event) => {
    const inputValue = event.target.value
    setName(inputValue);
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

  const handleBorrowerregionChange = (event) => {
    const selectedBorrowerregion = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setBorrowerregion([...Borrowerregion, selectedBorrowerregion]);
    } else {
      setBorrowerregion(Borrowerregion.filter((type) => type !== selectedBorrowerregion));
    }
  };

  const handleOwnerChange = (selectedOwner) => {
    setSelectedOwner(selectedOwner);
  };

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
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

  const handleAumChange = (event) => {
    const inputValue = event.target.value

    if (/^[0-9.]*$/.test(inputValue)) {
      setAum(inputValue);
      setAUMErrorMessage('');
    } else {
      setAUMErrorMessage("Please enter valid input '[do not enter the (%-+*/$@)]'")
    }
  };

  const handleminCreditRatingChange = (event) => {
    setminCreditRating(event.target.value);
  };

  const handleminInterestRateChange = (event) => {
    const inputValue = event.target.value

    if (/^[0-9.]*$/.test(inputValue)) {
      setminInterestRate(inputValue);
      setMinIntErrorMessage('');
    } else {
      setMinIntErrorMessage("Please enter valid input '[do not enter the (%-+*/$@)]'")
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

  const handleMaxLoanAmountChange = (event) => {
    const inputValue = event.target.value;

    if (/^[0-9.]*$/.test(inputValue)) {
      setMaxLoanAmount(inputValue);
      // Clear any previous error message
      setMaxloanerrorMessage('');
    } else {
      // Set an error message
      setMaxloanerrorMessage("Please enter a valid numeric input (e.g., 123.45)");
    }
  };


  const handleMfiGradingChange = (event) => {
    setMfiGrading(event.target.value);
  };

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
  })

  const handelOpenAlert = () => {
    setIsAlertOpen(true);
  }

  const handelCLoseAlert = () => {
    setIsAlertOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission here
    if (name.length === 0 || region.length === 0 || state.length === 0 || city.length === 0 || loanTypes.length === 0 || owner.length === 0 || productType.length === 0 || products.length === 0
      || mincreditRating.length === 0 || minInterestRate.length === 0 || aum.length === 0 || maxLoanAmount.length === 0 || minLoanAmount.length === 0) {
      setMessage('Please fill all required detailes ');
      handelOpenAlert();
    } else {

      try {
        // Send a POST request to the backend API
        Axios.post("http://localhost:4306/insertlenderdetailes", {
          name: name,
          region: region,
          state: state,
          city: city,
          loanTypes: JSON.stringify(loanTypes),
          owner: selectedOwner.label,
          productType: productType,
          products: JSON.stringify(products),
          mincreditRating: mincreditRating,
          minInterestRate: minInterestRate,
          mfiGrading: mfiGrading,
          aum: aum,
          minLoanAmount: minLoanAmount,
          maxLoanAmount: maxLoanAmount,
          Borrowerregion: JSON.stringify(Borrowerregion),
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
          setOwner('');
          setProductType('');
          setProducts([]);
          setminCreditRating('');
          setminInterestRate('');
          setMfiGrading('');
          setAum('');
          setMinLoanAmount('');
          setMaxLoanAmount('');
          setBorrowerregion([]);
          setShowMfiGrading(false);
          const message = response.data.message;
          toast.success(message);
          // Display success message or perform other actions
          console.log('Lender data submitted successfully!');
        });
      } catch (error) {
        // Handle error response
        console.error('Error submitting Lender data:', error);
        toast.error("Error while Submiting lender detailes");
        // Display error message or perform other actions
      }

      // Reset form fields
    }
  };

  return (
    <div id="form1">
      <div className="tablesheading">Lender's Details</div>
      <form className="form1" onSubmit={handleSubmit}>
        <div id="name">
          <label htmlFor="name">Name of Lender:</label>
          <p className='text-danger'>{nameerrorMessage}</p>
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
            {regions.map((region) => (
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
            <option value="">Select a state</option>
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
            <option value="">Select a city </option>
            {state !== '' &&
              citiesByState[state].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>

        <div id="Loan-type">
          <label>Loan Types:</label>
          <div>
            <label>
              <input
                type="checkbox"
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
                type="checkbox"
                value="Other type"
                checked={loanTypes.includes('Other type')}
                onChange={handleLoanTypeChange}
              />
              Other type
            </label>
          </div>
        </div>

        <div id="Owner_name">
          <label htmlFor="Ownername">Owner of lender:</label>
          {/* <input
            type="text"

            value={owner}
            onChange={handleOwnerChange}
            required
          /> */}

          <Select value={selectedOwner} isSearchable={true} onChange={handleOwnerChange} options={owner} ></Select>

        </div>

        <div>
          <label htmlFor="productType">Product Type:</label>
          <select
            id="productType"
            value={productType}
            onChange={handleProductTypeChange}
          >
            <option value="">Select Product Type</option>
            <option value="Secured">Secured</option>
            <option value="Unsecured">Unsecured</option>
          </select>
        </div>

        <div className="borrowerregion">
          <label>Borrower region:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="North"
                checked={Borrowerregion.includes('North')}
                onChange={handleBorrowerregionChange}
              />
              North
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="South"
                checked={Borrowerregion.includes('South')}
                onChange={handleBorrowerregionChange}
              />
              South
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="East"
                checked={Borrowerregion.includes('East')}
                onChange={handleBorrowerregionChange}
              />
              East
            </label>
          </div><div>
            <label>
              <input
                type="checkbox"
                value="West"
                checked={Borrowerregion.includes('West')}
                onChange={handleBorrowerregionChange}
              />
              West
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="products">Products:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="Auto Loan"
                checked={products.includes('Auto Loan')}
                onChange={handleProductChange}
              />
              Auto Loan
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="Bussiness Loan"
                checked={products.includes('Bussiness Loan')}
                onChange={handleProductChange}
              />
              Bussiness Loan
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
           <div>
            <label>
              <input
                type="checkbox"
                value="Home Loan"
                checked={products.includes('Home Loan')}
                onChange={handleProductChange}
              />
              Home Loan
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
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
                value="Agriculture Loans"
                checked={products.includes('Agriculture Loans')}
                onChange={handleProductChange}
              />
              Agriculture Loans
            </label>
            {/* Repeat the above label and input elements for other products */}
          </div>
        </div>

        <div>
          <label htmlFor="creditRating">Minimum Credit Rating:</label>
          <select
            id="creditRating"
            value={mincreditRating}
            onChange={handleminCreditRatingChange}

          >
            <option value="">Select Credit Rating</option>
            <option value="AAA">AAA</option>
            <option value="AA">AA</option>
            <option value="A">A</option>
            <option value="BBB">BBB</option>
            <option value="BB">BB</option>
            <option value="B">B</option>
            <option value="Not Rated">Not Rated</option>
          </select>
        </div>

        <div>
          <label htmlFor="aum">Minimum AUM ( in crores):</label>
          <p className='text-danger'>{AUMerrorMessage}</p>
          <input
            type="decimal"
            id="aum"
            value={aum}
            onChange={handleAumChange}
          />
        </div>

        <div>
          <label htmlFor="minLoanAmount">Minimum Loan Amount (in crores):</label>
          <p className='text-danger'>{MinloanerrorMessage}</p>
          <input
            type="decimal"
            id="minLoanAmount"
            value={minLoanAmount}
            onChange={handleMinLoanAmountChange}
          />
        </div>

        <div>
          <label htmlFor="maxLoanAmount">Maximum Loan Amount (in crores):</label>
          <p className='text-danger'>{maxloanerrorMessage}</p>
          <input
            type="decimal"
            id="maxLoanAmount"
            value={maxLoanAmount}
            onChange={handleMaxLoanAmountChange}
          />
        </div>

        <div>
          <label htmlFor="minInterestRate">Minimum Interest Rate (%):</label>
          <p className='text-danger'>{minInterrorMessage}</p>
          <input
            type="decimal"
            id="minInterestRate"
            value={minInterestRate}
            onChange={handleminInterestRateChange}
          />
        </div>

        {showMfiGrading && (
          <div>
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
    </div>
  );
};

export default Lender;
