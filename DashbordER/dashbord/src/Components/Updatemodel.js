import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "../Pages/TeamMembers.css";

const Assign = () => {
  const [borrower, setBorrower] = useState([]);
  const [selectedborrower, setSelectedborrower] = useState(null);

  const [lenders, setLenders] = useState([]);
  const [selectedlenders, setSelectedlenders] = useState(null);

  const [teammember, setTeammember] = useState([]);
  const [selectedteammember, setSelectedteammember] = useState(null);

  const [editableRow, setEditableRow] = useState(null);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const borrowerResponse = await axios.get("http://192.168.29.250:4306/borrowers");
        const lenderResponse = await axios.get("http://192.168.29.250:4306/lenders");
        const teammemberResponse = await axios.get("http://192.168.29.250:4306/teammembers");

        const borrowerOptions = borrowerResponse.data.map((borrower) => ({
          value: borrower.Borrower_id,
          label: borrower.Borrower_name
        }));

        const lenderOptions = lenderResponse.data.map((lender) => ({
          value: lender.Lender_Id,
          label: lender.lender_Name,
        }));

        const teammemberOptions = teammemberResponse.data.map((teammember) => ({
          value: teammember.TeamM_id,
          label: teammember.FirstName,
        }));

        setBorrower(borrowerOptions);
        setLenders(lenderOptions);
        setTeammember(teammemberOptions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleBorrowerChange = (selectedOption) => {
    setSelectedborrower(selectedOption);
  };

  const handleLenderChange = (selectedOption) => {
    setSelectedlenders(selectedOption);
  };

  const handleTeammemberChange = (selectedOption) => {
    setSelectedteammember(selectedOption);
  };

  const optionslist = [
    { value: "Existing", label: "Existing" },
    { value: "Negtive", label: "Negtive" },
    { value: "Approval Given", label: "Approval Given" },
    { value: "Approval Not Taken", label: "Approval Not Taken" },
  ];

  const [selectedOption, setSelectedOptions] = useState({});
  const handleOptionsChange = (option) => {
    setSelectedOptions(option);
  };

  const handleAssignToTable = () => {
    const borrowerIdToUpdate = selectedborrower.value;
    const borrowerNameToUpdate = selectedborrower.label;
    const lenderIdToUpdate = selectedlenders.value;
    const lenderNameToUpdate = selectedlenders.label;
    const teammemberIdToUpdate = selectedteammember.value;
    const teammemberNameToUpdate = selectedteammember.label;
    const selectedOptionToUpdated = selectedOption.value;

    axios.post("http://192.168.29.250:4306/assign", {
      borrowerId: borrowerIdToUpdate,
      borrowerName: borrowerNameToUpdate,
      lenderId: lenderIdToUpdate,
      lenderName: lenderNameToUpdate,
      teammemberId: teammemberIdToUpdate,
      teammemberName: teammemberNameToUpdate,
      option: selectedOptionToUpdated,
    })
      .then((response) => {
        console.log("Submitted successfully");
        window.alert("Submitted successfully");
      })
      .catch((error) => {
        console.error("Error while assigning:", error);
        window.alert("Error while assigning");
      });

    setSelectedborrower(null);
    setSelectedlenders(null);
    setSelectedteammember(null);
    setSelectedOptions({});
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.29.250:4306/retriveApprovals");
        setData(response.data);
      } catch (error) {
        console.log(error);
        window.alert("Error while updating");
      }
    };

    fetchData();

    const pollingInterval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  const [queryID, setQueryID] = useState('');
  const [queryborrower, setQueryBorrower] = useState('');
  const [querylender, setQueryLender] = useState('');
  const [queryapproval, setQueryApproval] = useState('');
  const [queryupdatedby, setQueryUpdatedBy] = useState('');

  const handleFilterId = (event) => {
    setQueryID(event.target.value.toLowerCase());
  };

  const handleFilterBorrower = (event) => {
    setQueryBorrower(event.target.value.toLowerCase());
  };

  const handleFilterLender = (event) => {
    setQueryLender(event.target.value.toLowerCase());
  };

  const handleFilterApproval = (event) => {
    setQueryApproval(event.target.value.toLowerCase());
  };

  const handleFilterUpdatedBy = (event) => {
    setQueryUpdatedBy(event.target.value.toLowerCase());
  };

  const clearFilters = () => {
    setQueryID('');
    setQueryBorrower('');
    setQueryLender('');
    setQueryApproval('');
    setQueryUpdatedBy('');
  };

  const filterData = data.filter((approvals) => {
    const approvalid = approvals.Approval_id ? approvals.Approval_id.toString().toLowerCase() : '';
    const borrowerName = approvals.borrower_name ? approvals.borrower_name.toLowerCase() : '';
    const lendername = approvals.lender_name ? approvals.lender_name.toLowerCase() : '';
    const approval = approvals.lender_approval ? approvals.lender_approval.toLowerCase() : '';
    const updatedby = approvals.updated_by ? approvals.updated_by.toLowerCase() : '';

    return (
      approvalid.includes(queryID) &&
      borrowerName.includes(queryborrower) &&
      lendername.includes(querylender) &&
      approval.includes(queryapproval) &&
      updatedby.includes(queryupdatedby)
    );
  });

  const handleUpdate = (approvalId) => {
    if (editableRow === approvalId) {
      // Cancel editing
      setEditableRow(null);
      setUpdateData({});
    } else {
      // Start editing
      setEditableRow(approvalId);
    }
  };

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setUpdateData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSave = (approvalId) => {
    const borrowerIdToUpdate = updateData.borrowerIdToUpdate;
    const borrowerNameToUpdate = updateData.borrowerNameToUpdate;
    const lenderIdToUpdate = updateData.lenderIdToUpdate;
    const lenderNameToUpdate = updateData.lenderNameToUpdate;
    const teammemberIdToUpdate = updateData.teammemberIdToUpdate;
    const teammemberNameToUpdate = updateData.teammemberNameToUpdate;
    const selectedOptionToUpdated = updateData.lender_approval;

    axios.post(`http://192.168.29.250:4306/updatetoAproval/${approvalId}`, {
      borrowerId: borrowerIdToUpdate,
      borrowerName: borrowerNameToUpdate,
      lenderId: lenderIdToUpdate,
      lenderName: lenderNameToUpdate,
      teammemberId: teammemberIdToUpdate,
      teammemberName: teammemberNameToUpdate,
      option: selectedOptionToUpdated,
      approval_Id: approvalId
    })
      .then((response) => {
        console.log("Status updated successfully");
        window.alert("Status updated successfully");
      })
      .catch((error) => {
        console.error("Error while updating:", error);
        window.alert("Error while updating");
      });

    setEditableRow(null);
    setUpdateData({});
  };

  const handleCancel = () => {
    // Cancel editing
    setEditableRow(null);
    setUpdateData({});
  };

  return (
    <div className='assignformandtable'>
      <div className='assignform'>
        <h3>Lender Approvals </h3>
        <div className='fileds'>
          <div className='borrowerlist'>
            <label>Borrower:</label>
            <div className='input'>
              <Select
                className='list'
                placeholder="Search..."
                isSearchable={true}
                options={borrower}
                onChange={handleBorrowerChange}
                value={selectedborrower}
                required
              />
            </div>
          </div>
          <div className='lenderlist'>
            <label>Lenders:</label>
            <div className='input'>
              <Select
                className='list'
                placeholder="Search...."
                isSearchable={true}
                options={lenders}
                onChange={handleLenderChange}
                value={selectedlenders}
              />
            </div>
          </div>
          <div className='approval'>
            <label>Lender Approval</label>
            <div className=''>
              <Select
                className='list'
                value={selectedOption}
                onChange={handleOptionsChange}
                options={optionslist}
                placeholder="Select... "
              />
            </div>
          </div>
          <div className='teamlist'>
            <label>Updated by:</label>
            <div className='input'>
              <Select
                className='list'
                placeholder="Search...."
                isSearchable={true}
                options={teammember}
                onChange={handleTeammemberChange}
                value={selectedteammember}
              />
            </div>
          </div>
          <button className='createbutton' onClick={handleAssignToTable}>Submit</button>
        </div>
      </div>

      <div className='approvaltable'>
        <div><h3>Lender Approval Records</h3></div>
        <table>
          <thead>
            <tr>
              <th>
                Approval Id{' '}
                <input
                  type='text'
                  value={queryID}
                  onChange={handleFilterId}
                  placeholder='ID'
                  className='search'
                />
              </th>
              <th>
                Borrower Name{' '}
                <input
                  type='text'
                  value={queryborrower}
                  onChange={handleFilterBorrower}
                  placeholder='Name'
                  className='search'
                />
              </th>
              <th>
                Lender Name{' '}
                <input
                  type='text'
                  value={querylender}
                  onChange={handleFilterLender}
                  placeholder='Name'
                  className='search'
                />
              </th>
              <th>
                Lender Approval{' '}
                <input
                  type='text'
                  value={queryapproval}
                  onChange={handleFilterApproval}
                  placeholder='Approval'
                  className='search'
                />
              </th>
              <th>
                Updated By{' '}
                <input
                  type='text'
                  value={queryupdatedby}
                  onChange={handleFilterUpdatedBy}
                  placeholder='Name'
                  className='search'
                />
              </th>
              <th>
                <button onClick={clearFilters} className='approvals'>CLEAR</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((approvals) => {
              const { Approval_id, borrower_name, lender_name, lender_approval, updated_by } = approvals;
              const isEditable = editableRow === Approval_id;

              return (
                <React.Fragment key={Approval_id}>
                  <tr>
                    <td>{approvals.Approval_id}</td>
                    <td>{approvals.borrower_name}</td>
                    <td>{approvals.lender_name}</td>
                    <td>{approvals.lender_approval}</td>
                    <td>{approvals.updated_by}</td>
                    <td>
                      <button onClick={() => handleUpdate(Approval_id)}>
                        {isEditable ? 'Cancel' : 'Update'}
                      </button>
                    </td>
                  </tr>
                  {/* Editable row */}
                  {isEditable && (
                    <tr>
                      <td>
                        <input
                          type='text'
                          value={updateData.Approval_id || Approval_id}
                          onChange={(e) => handleChange(e, 'Approval_id')}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          value={updateData.borrower_name || borrower_name}
                          onChange={(e) => handleChange(e, 'borrower_name')}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          value={updateData.lender_name || lender_name}
                          onChange={(e) => handleChange(e, 'lender_name')}
                        />
                      </td>
                      <td>
                        <select
                          value={updateData.lender_approval || ''}
                          onChange={(e) => handleChange(e, 'lender_approval')}
                        >
                          <option>Select</option>
                          {optionslist.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type='text'
                          value={updateData.updated_by || updated_by}
                          onChange={(e) => handleChange(e, 'updated_by')}
                        />
                      </td>
                      <td>
                        <div>
                          <button onClick={() => handleSave(Approval_id)}>Save</button>
                          <button onClick={handleCancel}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assign;
