import React from 'react'
const data = [
    { "id": 1, "name": "Vinaygouda Patil", "region": "South", "state": "Telangana", "city": "Warangal", "entityType": "Proprietorship", "cin": "25askasl1236", "loanTypes": "[\"Term Loan\"]", "owner": "Niddhi Panchal", "productType": "Secured", "products": "[\"Auto Loan\"]", "creditRating": "AAA", "aum": 45, "maxInterestRate": 8, "minLoanAmount": 80, "mfiGrading": "", "quarterAUM": null, "financialYearAUM": "2022-2023", "createdAt": "2023-08-26T06:46:24.000Z", "updatedAt": "2023-08-26T06:46:24.000Z", "creditRatingAgency": "CRISIL" }, { "id": 2, "name": "SBI", "region": "South", "state": "Karnataka", "city": "Mysore", "entityType": "Company", "cin": "25askasl1236", "loanTypes": "[\"Term Loan\",\"BC\",\"PTC\"]", "owner": "Riddhi Panchal", "productType": "Secured", "products": "[\"Auto Loan\",\"Two wheeler loan\",\"MFI\"]", "creditRating": "AAA", "aum": 45, "maxInterestRate": 9, "minLoanAmount": 25, "mfiGrading": "mfR1", "quarterAUM": "june", "financialYearAUM": "2023-2024", "createdAt": "2023-08-26T06:49:29.000Z", "updatedAt": "2023-08-26T06:49:29.000Z", "creditRatingAgency": "'CRISIL'" }, { "id": 3, "name": "Vinaygouda Patil", "region": "South", "state": "Telangana", "city": "Warangal", "entityType": "Proprietorship", "cin": "25askasl1236", "loanTypes": "[\"Term Loan\"]", "owner": "Diya Limbachiya", "productType": "Unsecured", "products": "[\"Auto Loan\",\"Two wheeler loan\",\"MFI\",\"Agriculture Loans\"]", "creditRating": "AAA", "aum": 60, "maxInterestRate": 15, "minLoanAmount": 10, "mfiGrading": "mfR5", "quarterAUM": "june", "financialYearAUM": "2024-2025", "createdAt": "2023-08-26T07:12:02.000Z", "updatedAt": "2023-08-26T07:12:02.000Z", "creditRatingAgency": "" }, { "id": 4, "name": "Tata", "region": "South", "state": "Tamil Nadu", "city": "Madurai", "entityType": "Trust", "cin": "25askasl1236", "loanTypes": "[\"Term Loan\",\"BC\",\"Other type\"]", "owner": "Bhavih Poojari", "productType": "Secured", "products": "[\"Auto Loan\",\"Two wheeler loan\"]", "creditRating": "AA", "aum": 60, "maxInterestRate": 9, "minLoanAmount": 25, "mfiGrading": "", "quarterAUM": "september", "financialYearAUM": "2022-2023", "createdAt": "2023-08-26T07:24:11.000Z", "updatedAt": "2023-08-26T07:24:11.000Z", "creditRatingAgency": "" }, { "id": 5, "name": "Union bank", "region": "South", "state": "Karnataka", "city": "Bengaluru", "entityType": "Proprietorship", "cin": "25askasl1236", "loanTypes": "[\"Term Loan\",\"BC\"]", "owner": "Bhavih Poojari", "productType": "Secured", "products": "[\"Auto Loan\",\"Two wheeler loan\"]", "creditRating": "AAA", "aum": 45, "maxInterestRate": 9, "minLoanAmount": 20, "mfiGrading": "", "quarterAUM": "september", "financialYearAUM": "2022-2023", "createdAt": "2023-08-27T08:49:36.000Z", "updatedAt": "2023-08-27T08:49:36.000Z", "creditRatingAgency": "" }, { "id": 6, "name": "Ajit s k", "region": "North", "state": "Punjab", "city": "Chandigarh", "entityType": "Proprietorship", "cin": "25askasl1236", "loanTypes": "[\"BC\",\"Term Loan\",\"Venture Debt\"]", "owner": "Taniya Vergesh", "productType": "Secured", "products": "[\"Auto Loan\",\"Two wheeler loan\",\"Gold Loan\"]", "creditRating": "AAA", "aum": 45, "maxInterestRate": 10, "minLoanAmount": 1, "mfiGrading": "", "quarterAUM": "march", "financialYearAUM": "2022-2023", "createdAt": "2023-08-28T11:23:47.000Z", "updatedAt": "2023-08-28T11:23:47.000Z", "creditRatingAgency": "" }, { "id": 7, "name": "Abhinav patil", "region": "North", "state": "Jammu and Kashmir", "city": "Srinagar", "entityType": "Partnership Firm", "cin": "25askasl1236", "loanTypes": "[\"Term Loan\",\"BC\"]", "owner": "Eesha Pandya", "productType": "Secured", "products": "[\"Auto Loan\",\"Two wheeler loan\",\"Gold Loan\"]", "creditRating": "AAA", "aum": 60, "maxInterestRate": 9, "minLoanAmount": 6, "mfiGrading": "", "quarterAUM": "june", "financialYearAUM": "2022-2023", "createdAt": "2023-08-28T11:30:34.000Z", "updatedAt": "2023-08-28T11:30:34.000Z", "creditRatingAgency": "" }, { "id": 8, "name": "Abhishek ", "region": "North", "state": "Himachal Pradesh", "city": "Shimla", "entityType": "Proprietorship", "cin": "25askasl1236", "loanTypes": "[\"Venture Debt\",\"Other type\"]", "owner": "Eesha Pandya", "productType": "Unsecured", "products": "[\"Auto Loan\",\"Two wheeler loan\",\"MSME\",\"MFI\"]", "creditRating": "AAA", "aum": 100, "maxInterestRate": 10, "minLoanAmount": 5, "mfiGrading": "mfR8", "quarterAUM": "march", "financialYearAUM": "2022-2023", "createdAt": "2023-08-28T11:38:54.000Z", "updatedAt": "2023-08-28T11:38:54.000Z", "creditRatingAgency": "" }, { "id": 9, "name": "Suchit S", "region": "East", "state": "Jharkhand", "city": "Jamshedpur", "entityType": "Proprietorship", "cin": "25askasl1236", "loanTypes": "[\"Term Loan\",\"DA\"]", "owner": "Bhavih Poojari", "productType": "Secured", "products": "[\"Auto Loan\",\"Gold Loan\",\"MFI\",\"Commercial Vehicle\"]", "creditRating": "A", "aum": 45, "maxInterestRate": 12, "minLoanAmount": 10, "mfiGrading": "mfR3", "quarterAUM": "september", "financialYearAUM": "2022-2023", "createdAt": "2023-08-28T11:44:55.000Z", "updatedAt": "2023-08-28T11:44:55.000Z", "creditRatingAgency": "" }, { "id": 10, "name": "kalamesh k", "region": "North", "state": "Chandigarh", "city": "Chandigarh", "entityType": "Company", "cin": "2153gfsd", "loanTypes": "[\"Term Loan\",\"Other type\"]", "owner": "Riddhi Panchal", "productType": "Secured", "products": "[\"Auto Loan\",\"Two wheeler loan\"]", "creditRating": "Not Rated", "aum": 55, "maxInterestRate": 10, "minLoanAmount": 5, "mfiGrading": "", "quarterAUM": "march", "financialYearAUM": "2023-2024", "createdAt": "2023-08-28T11:54:26.000Z", "updatedAt": "2023-08-28T11:54:26.000Z", "creditRatingAgency": "" }
]
const ReadFormat = () => {
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
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Loan Types</th>
                        <th>Products</th>
                        {/* Add other table headers here */}
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{formatArray(item.loanTypes)}</td>
                            <td>{formatArray(item.products)}</td>
                            {/* Add other table data cells here */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReadFormat
