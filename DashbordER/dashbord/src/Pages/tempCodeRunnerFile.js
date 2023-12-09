 <div className='assignTable'>
                <div className='tabelheading'>
                    <h2>Assignment table</h2>
                </div>
                <div className='searching'>
                    <div className='searchID'>
                        <input type='text'
                            value={inputvalue} onChange={(e) => setInputvalue(e.target.value)} placeholder='Search....ID or Name of  Team member'></input>
                    </div>

                    <div className='table'>
                        <table >
                            <thead className='headrow'>
                                <tr>
                                    <th colSpan={2}>Team member Id and Name</th>
                                    <th colSpan={2} >Borrower Id and Name</th>
                                    <th colSpan={2} >Lender Id and Name</th>
                                </tr>
                            </thead>
                            <tbody className='bodyrow'>

                                {inputvalue.length > 0 ? (
                                    handelSearch().length > 0 ? (
                                        handelSearch().map((assignments) => {
                                            return (<tr key={assignments.Assignment_id}>
                                                <td >{assignments.teammember_id}</td>
                                                <td>{assignments.teammember?.FirstName}</td>
                                                <td>{assignments.borrower.Borrower_id}</td>
                                                <td>{assignments.borrower.Borrower_name}</td>
                                                <td>{assignments.lender?.Lender_Id}</td>
                                                <td>{assignments.lender?.lender_Name}</td>
                                            </tr>)
                                        })) : (
                                        <tr>
                                            <td colSpan={6}> No data find </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan={6}>Search Team Member Id or Name </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>