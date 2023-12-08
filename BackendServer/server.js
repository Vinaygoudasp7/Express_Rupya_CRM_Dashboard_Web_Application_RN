import express, { response } from "express";
import mysql from "mysql";
import cors from "cors";
import lenders from "./models/lenders.js";
import borrowers from "./models/borrower.js";
import teammembers from "./models/teammembers.js";
import Approval_table from "./models/Aproval.js";
import { EventEmitter } from 'events';
import Status_updates from "./models/Status_updates.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
import multer from "multer";
import bodyParser from "body-parser";
import path, { basename } from "path";
import { File } from "buffer";
import { error, info } from "console";
import BorrowerContactDetails from "./models/BorrowerContactDetails.js";
import LenderContactDetailes from "./models/LenderContactDetailes.js";
import partiallyDisbersedTable from "./models/Partiallydispersed.js";
import LenderClassification from './models/LenderClassified.js'
import LenderClassified from "./models/LenderClassified.js";
import EmailReminder from "./models/ReminderModel.js";
import { DATE, where } from "sequelize";
import { isDate } from "util/types";
import cron from 'node-cron'



const bus = new EventEmitter();
bus.setMaxListeners(25);

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root@12345",
    database: "agmr_college",

})

// //defien assocition for lenders and borrowers one to one maping
// lenders.belongsTo(teammembers, { foreignKey: "Teammember_id" });
// borrowers.belongsTo(teammembers, { foreignKey: "Teammember_id" });

// //defien assocition for teammember to lenders and borrowers one to many maping
// teammembers.hasMany(lenders, { foreignKey: "Teammember_id" });
// teammembers.hasMany(borrowers, { foreignKey: "Teammember_id" });


app.post('/insertborrowerdetailes', async (req, res) => {
    const { name, region, state, city, loanTypes, entityType, cin, owner, productType, products, creditRating, creditRatingAgency, aum, maxInterestRate, minLoanAmount, mfiGrading, quarterAUM, financialYearAUM } = req.body;
    try {
        await borrowers.create({
            name: name,
            region: region,
            state: state,
            city: city,
            loanTypes: loanTypes,
            entityType: entityType,
            cin: cin,
            owner: owner,
            productType: productType,
            products: products,
            creditRating: creditRating,
            creditRatingAgency: creditRatingAgency,
            aum: aum,
            maxInterestRate: maxInterestRate,
            minLoanAmount: minLoanAmount,
            mfiGrading: mfiGrading,
            quarterAUM: quarterAUM,
            financialYearAUM: financialYearAUM,
        })

        res.json({ message: 'Borrower details is created successfully ' })
    } catch (error) {
        console.error('Error querying team members:', error);
        return res.json({ error: 'An error occurred while querying team members.' });

    }
})


app.post('/insertlenderdetailes', async (req, res) => {
    const { name, region, state, city, loanTypes, mincreditRating, owner, productType, products, aum, minInterestRate, minLoanAmount, mfiGrading, maxLoanAmount, Borrowerregion } = req.body;
    try {
        await lenders.create({
            name: name,
            region: region,
            state: state,
            city: city,
            loanTypes: loanTypes,
            owner: owner,
            productType: productType,
            products: products,
            aum: aum,
            minCreditRating: mincreditRating,
            minInterestRate: minInterestRate,
            minLoanAmount: minLoanAmount,
            maxLoanAmount: maxLoanAmount,
            mfiGrading: mfiGrading,
            Borrowerregion: Borrowerregion,
        })

        res.json({ message: 'Lender details is created successfully' })
    } catch (error) {
        console.error('Error querying team members:', error);
        return res.json({ error: 'An error occurred while querying team members.' });
    }
})


app.get('/List_borrowers', (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const query = 'SELECT * FROM borrowers';

        connection.query(query, (error, results) => {
            connection.release();

            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.json(results);
        });
    });
});


app.put('/lenders/:id', async (req, res) => {
    const lenderId = req.params.id;
    const updatedLender = req.body;
    console.log(lenderId, updatedLender)
    try {
        const lender = await lenders.findByPk(lenderId)
        if (!lender) {
            return res.status(404).json({ error: 'Borrower not found' });
        }

        lender.name = updatedLender.editname,
            lender.region = updatedLender.editregion,
            lender.state = updatedLender.editstate,
            lender.city = updatedLender.editcity,
            lender.Borrowerregion = updatedLender.editborrowerregion.map((item) => (item.value)).join(', '),
            lender.loanTypes = updatedLender.editloanTypes.map(item => item.value).join(', '),
            lender.owner = JSON.stringify(updatedLender.editowner.value),
            lender.productType = updatedLender.editproductType.value,
            lender.products = updatedLender.editproducts.map(item => item.value).join(', '),
            lender.minCreditRating = updatedLender.editmincreditRating.value,
            lender.aum = updatedLender.editminaum,
            lender.minInterestRate = updatedLender.editminInterestRate,
            lender.minLoanAmount = updatedLender.editminLoanAmount,
            lender.maxLoanAmount = updatedLender.editmaxLoanAmount,

            await lender.save()
        console.log('Borrower Details updated successfully');
        res.status(200).json({ message: 'Lender Details updated successfully' });
    } catch (error) {
        console.log('Error updating borrower:', error);
        res.status(500).json({ error: 'Error updating borrower' });
    }
});

app.put('/borrowers/:id', async (req, res) => {
    const borrowerId = req.params.id;
    const updatedBorrower = req.body;
    console.log(updatedBorrower)

    try {
        const borrower = await borrowers.findByPk(borrowerId)

        if (!borrower) {
            return res.status(404).json({ error: 'Borrower not found' });
        }

        borrower.name = updatedBorrower.editname,
            borrower.region = updatedBorrower.editregion,
            borrower.state = updatedBorrower.editstate,
            borrower.city = updatedBorrower.editcity,
            borrower.entityType = updatedBorrower.editentityType,
            borrower.cin = updatedBorrower.editcin,
            borrower.loanTypes = updatedBorrower.editloanTypes.map(item => item.value).join(', '),
            borrower.owner = updatedBorrower.editowner.label,
            borrower.productType = updatedBorrower.editproductType.map(item => item.value).join(', '),
            borrower.products = updatedBorrower.editproducts.map(item => item.value).join(', '),
            borrower.creditRating = updatedBorrower.editcreditRating.value,
            borrower.creditRatingAgency = JSON.stringify(updatedBorrower.editcreditRatingAgency.value),
            borrower.aum = updatedBorrower.editaum,
            borrower.maxInterestRate = updatedBorrower.editmaxInterestRate,
            borrower.minLoanAmount = updatedBorrower.editminLoanAmount,
            // updatedBorrower.editmfiGrading,
            borrower.quarterAUM = updatedBorrower.editquarterAUM,
            borrower.financialYearAUM = JSON.stringify(updatedBorrower.editfinancialYearAUM.value),

            await borrower.save()
        console.log('Borrower Details updated successfully');
        res.status(200).json({ message: 'Borrower Details updated successfully' });
    } catch (err) {
        console.error('Error updating borrower:', err);
        res.status(500).json({ error: 'Error updating borrower' });
    }
});

app.get('/List_Lenders', (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const query = 'SELECT * FROM lenders';

        connection.query(query, (error, results) => {
            connection.release();

            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.json(results);
        });
    });
});

app.get('/lenderDetailesOf/:id', async (req, res) => {

    const id = req.params.id;
    //get detailes of lender of id
    try {
        const lenderDetails = await lenders.findByPk(id);
        res.json(lenderDetails);
    } catch (error) {
        console.error('Error fetching lender details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

app.post('/contactsborrower', async (req, res) => {
    const { id, name, emailAddress, mailType, designation, mobileNumber, region } = req.body;

    // Perform the database query to store the data
    try {
        await BorrowerContactDetails.create({
            C_id: id,
            name: name,
            emailAddress: emailAddress,
            mailType: mailType,
            designation: designation,
            mobileNumber: mobileNumber,
            region: region,
        })

        return res.json({ message: `Contact detailes entered succesfully` })
    } catch (error) {
        console.log("Error while entering to the customer detailes", error);
        return res.json({ message: "Error while entering to the customer detailes", error })
    }


});

app.get('/contact-details-borrower/:selectedBorrower', (req, res) => {
    const selectedBorrower = req.params.selectedBorrower;
    console.log(selectedBorrower + "hi");

    const query = `SELECT * FROM borrowercontactdetailes WHERE C_id = ${selectedBorrower}`;

    db.query(query, (error, results) => {
        if (error) {
            console.log('Error fetching contact details:', error);
            res.status(500).json({ error: 'Error fetching contact details' });
        } else {
            res.json(results);
        }
    });
});


app.delete('/contactdetailsborrower/:id', (req, res) => {
    // const name = req.params.id;
    const id = req.params.id;
    console.log(id);
    // Perform the database delete operation
    const deleteQuery = 'DELETE FROM BorrowercontactDetailes WHERE  id = ?';
    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error('Error deleting contact detail:', err);
            res.status(500).json({ error: 'Error deleting contact detail' });
        } else {
            console.log('Contact detail deleted successfully in server');
            res.status(200).json({ message: 'Contact detail deleted successfully' });
        }
    });
});

app.post('/contactslender', async (req, res) => {
    const { id, name, emailAddress, mailType, designation, mobileNumber, region } = req.body;

    // Perform the database query to store the data
    try {
        await LenderContactDetailes.create({
            C_id: id,
            name: name,
            emailAddress: emailAddress,
            mailType: mailType,
            designation: designation,
            mobileNumber: mobileNumber,
            region: region
        })
        return res.json({ message: 'Data created successfully' })
    } catch (error) {
        return res.json({ message: 'error while enter data ' })
    }

});

app.get('/contact-details-lender/:selectedlender', (req, res) => {
    const selectedLender = req.params.selectedlender;
    // console.log(selectedBorrower+"hi");

    const query = `SELECT * FROM lendercontactdetailes WHERE C_id = ${selectedLender}`;

    db.query(query, (error, results) => {
        if (error) {
            console.log('Error fetching contact details:', error);
            res.status(500).json({ error: 'Error fetching contact details' });
        } else {
            res.json(results);
        }
    });
});

app.delete('/contactdetailslender/:id', (req, res) => {
    // const name = req.params.id;
    const phone = req.params.id;

    // Perform the database delete operation
    const deleteQuery = 'DELETE FROM lendercontactdetailes WHERE  id = ?';
    db.query(deleteQuery, [phone], (err, result) => {
        if (err) {
            console.error('Error deleting contact detail:', err);
            res.status(500).json({ error: 'Error deleting contact detail' });
        } else {
            console.log('Contact detail deleted successfully in server');
            res.status(200).json({ message: 'Contact detail deleted successfully' });
        }
    });
});

//to retrive team members data
app.get('/teammembers', (req, res) => {
    const sql = "select * from teammembers";
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return res.status(500).json({ error: 'An error occurred while connecting to the database.' });
        }
        connection.query(sql, (err, result) => {
            connection.release();
            if (err) {
                console.error('Error querying team members:', err);
                return res.status(500).json({ error: 'An error occurred while querying team members.' });
            }
            return res.json(result);
        })
    })
})

app.put('/attachPassword/:id', (req, res) => {
    const id = req.params.id;
    const password = req.body.password;
    const region = req.body.region
    const userType = req.body.userType
    const sqlQuery = "update teammembers set password=?,region=? where TeamM_id=?";
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return res.status(500).json({ error: 'An error occurred while connecting to the database.' });
        }
        connection.query(sqlQuery, [password, region, userType, id], (err, result) => {
            connection.release();
            if (err) {
                return res.status(500).json({ message: "no such team member found" })
            }
            return res.status(200).json({ message: "updated successfully", result })

        })
    })
})


app.get('/read/:id', (req, res) => {
    //setting id for retriving data
    const sql = "select * from borrowers where Borrower_ID = ?";
    const id = req.params.id;

    //retriving data on the bases of id
    db.query(sql, [id], (err, result) => {
        if (err) return res.json();
        return res.json(result);
    })
})

app.get('/readlender/:id', (req, res) => {
    //setting id for retriving data
    const sql = "select * from lenders where Lender_Id = ?";
    const id = req.params.id;

    //retriving data on the bases of id
    db.query(sql, [id], (err, result) => {
        if (err) return res.json();
        return res.json(result);
    })
})


app.put('/update/:id', (req, res) => {
    const { Name_of_the_Borrower, Region, State, City } = req.body;
    const id = req.params.id;
    const sql = 'update borrowers set `Borrower_name`= ?, `region`= ? ,`state`=?, `city`= ?   where Borrower_id=?';

    console.log(req.body)
    db.query(sql, [Name_of_the_Borrower, Region, State, City, id], (err, result) => {
        if (err) {
            console.log(err)
            return alert("Error inside server");

        }
        console.log("SQL Query Result:", result);
        return res.json(result);
    })
});

// logic for temprovary deletd of lender
app.delete('/TempdeleteL/:id', (req, res) => {
    // Perform the update operation in your database.
    // Make sure you have appropriate error handling and validation as needed.

    const sql = "update lenders set isDeleted = ?  WHERE Lender_Id = ?";
    const id = req.params.id;
    const deletedFlag = req.body.isDeleted; // Modify this line to use req.body.isDeleted

    db.query(sql, [deletedFlag, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Something went wrong.' });
        }
        return res.json(result)
    })
})

// logic for temprovary deletd of Borrower
app.delete('/TempdeleteB/:id', (req, res) => {
    // Perform the update operation in your database.
    // Make sure you have appropriate error handling and validation as needed.

    const sql = "update borrowers set isDeleted =?  WHERE Borrower_id = ?";
    const id = req.params.id;
    const deletedFlag = req.body.isDeleted; // Modify this line to use req.body.isDeleted

    db.query(sql, [deletedFlag, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Something went wrong.' });
        }
        return res.json(result)
    })
})

app.get('/restoreL', (req, res) => {
    const sql = "select * from lenders where isDeleted=1";
    db.query(sql, (err, result) => {
        if (err) return res.json();
        return res.json(result);
    })
})

app.get('/restoreB', (req, res) => {
    const sql = "select * from borrowers where isDeleted=1";
    db.query(sql, (err, result) => {
        if (err) return res.json();
        return res.json(result);
    })
})

app.delete('/deleteB/:id', (req, res) => {
    const sql = 'delete from borrowers where Borrower_id=?';
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Something went wrong.' });
        }
        return res.json(result)
    })
})

app.delete('/deleteL/:id', (req, res) => {
    const sql = 'delete from lenders where Lender_Id=?';
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Something went wrong.' });
        }
        return res.json(result)
    })
})



// Use body-parser to parse incoming JSON data


//api handel for insertion in teammembers tabel
app.post('/insertdata', (req, res) => {
    const { fname, lname, email } = req.body;
    // create sql
    const sql = "insert into teammembers ( FirstName, LastName, Email_address) values (  ?, ?, ?)";
    //execuet query
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return res.status(500).json({ error: 'An error occurred while connecting to the database.' });

        }

        connection.query(sql, [fname, lname, email], (err, result) => {
            connection.release();
            if (err) {
                console.error("error while inserting data");
                return res.status(500).json({ error: 'An error occured while inserting' })
            }
            console.log("data inserted successfully", result);
            return res.json({ message: "data inserted successfully", result });

        })
    })

})

//api for selecting data from team members tabel
app.get('/retrivedata', (req, res) => {
    const sql = "select * from teammembers";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("error while retriving data");
            return err.json(err);
        }
        console.log("data retrived successfully");
        return res.json(result);
    })
})

app.get('/borrowers/:id', (req, res) => {
    const id = req.params.id;
    const sql = "select * from borrowers where Borrower_id=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json();
        return res.json(result);
    })
})

app.get('/lenders/:id', (req, res) => {
    const id = req.params.id;
    const sql = "select * from lenders where lender_Id=?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.json();
        return res.json(result);
    })
})

app.patch('/borrowers/:id', (req, res) => {
    const id = req.params.id;
    const { teammemberId, teammemberName } = req.body;
    const sql = "UPDATE borrowers SET teammember_id = ?, team_member_name = ? WHERE Borrower_id = ?";

    db.query(sql, [teammemberId, teammemberName, id], (err, result) => {
        if (err) return res.json();
        return res.json(result);
    });
});

app.patch('/lenders/:id', (req, res) => {

    const id = req.params.id;
    const { teammemberId, teammemberName } = req.body;
    const sql = "update lenders set Teammember_id =?, team_member_name=? where Lender_Id=?";

    db.query(sql, [teammemberId, teammemberName, id], (err, result) => {
        if (err) return res.json();
        return res.json(result);
    })
});


//handleing Aproval_table
app.post('/checkforApprovalTABEL', async (req, res) => {
    const { borrowerId, lenderId } = req.body;
    try {
        const borrowerExists = await Approval_table.findOne({
            where: { borrower_id: borrowerId, lender_id: lenderId }
        });
        res.json({ borrowerExists });
    } catch (error) {
        console.error('Error while checking borrower and lender:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

app.post('/assign', async (req, res) => {
    const { Date_of_creation, lastupDate, borrowerId, borrowerName, lenderId, lenderName, teammemberId, teammemberName, option, } = req.body;

    try {
        const existingAssignment = await Approval_table.findOne({
            where: { borrower_id: borrowerId, lender_id: lenderId }
        })

        if (existingAssignment) {
            await Approval_table.update({
                lastupdate: lastupDate,
                Date_of_creation: existingAssignment.Date_of_creation,
                borrower_id: borrowerId,
                borrower_name: borrowerName,
                lender_id: lenderId,
                lender_name: lenderName,
                teammember_id: teammemberId,
                updated_by: teammemberName,
                lender_approval: option
            }, {
                where: { lender_id: lenderId, borrower_id: borrowerId }
            })
            return res.json({ message: "Assignment updated" })
        } else {
            // Assignment does not exist, create a new entry

            await Approval_table.create({
                // Provide the appropriate assignment ID for the new entry
                Date_of_creation: Date_of_creation,
                lastupdate: lastupDate,
                borrower_id: borrowerId,
                borrower_name: borrowerName,
                lender_id: lenderId,
                lender_name: lenderName,
                teammember_id: teammemberId,
                updated_by: teammemberName,
                lender_approval: option
            });
            return res.json({ message: "New assignment created" });
        }
    } catch (error) {
        console.error('Error while creating assignment:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
})

app.post('/updatetoAproval/:id', async (req, res) => {

    const id = req.params.id;
    const { Approval_id, lastupdate, Date_of_creation, borrower_name, lender_name, lender_approval, updated_by } = req.body;
    db.getConnection(async (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return res.status(500).json({ error: 'An error occurred while connecting to the database.' });
        }

        try {
            await Approval_table.update(
                {
                    Approval_id,
                    Date_of_creation,
                    lastupdate,
                    borrower_name,
                    lender_name,
                    updated_by,
                    lender_approval
                },
                { where: { Approval_id: id } } // Provide the appropriate condition to update the specific assignment
            );

            connection.commit();
            connection.release();
            return res.json({ message: "Assignment Updated" });

        } catch (error) {
            console.error('Error while updating assignment:', error);
            connection.rollback();
            connection.release();
            return res.status(500).json({ error: 'Something went wrong' });
        }
    })
})

app.get('/retriveApprovals', async (req, res) => {
    try {
        const result = await Approval_table.findAll();
        res.json(result);
    } catch (error) {
        console.error('Error while fetching Approval table data:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

//for handling status_table
app.post('/checkforstatusupdatetable', async (req, res) => {
    const { borrowerId, lenderId } = req.body;

    try {
        const BorroweandLenderrExists = await Status_updates.findOne({
            where: { borrower_id: borrowerId, lender_id: lenderId }
        });

        res.json(BorroweandLenderrExists);

    } catch (error) {
        console.error('Error while checking borrower and lender:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});


app.post('/assignStatusupdate', async (req, res) => {
    const { date, lenderId, borrowerId, borrowerName, lenderName, teammemberId, updateedperson, actions, pendingwith, comment, PraposalStatus, nextFollowup } = req.body;
    try {
        //check if the assignment exists
        const existingAssignment = await Status_updates.findOne({
            where: { borrower_id: borrowerId, lender_id: lenderId }
        })
        if (existingAssignment) {
            await Status_updates.update({
                Date_of_Creation: existingAssignment.Date_of_Creation,
                lastupdate: date,
                borrower_id: borrowerId,
                borrower_name: borrowerName,
                lender_id: lenderId,
                lender_name: lenderName,
                teammember_id: teammemberId,
                updated_by: updateedperson,
                action_Taken: actions,
                Pending_with: pendingwith,
                Comment: comment,
                Praposal_status: PraposalStatus,
                Next_followup_Date: nextFollowup,

            }, {
                where: { lender_id: lenderId, borrower_id: borrowerId }
            }
            )


            return res.json({ message: "Assignment updated" })
        } else {
            // Assignment does not exist, create a new entry
            await Status_updates.create({
                Date_of_Creation: date,
                lastupdate: date,
                borrower_id: borrowerId,
                borrower_name: borrowerName,
                lender_id: lenderId,
                lender_name: lenderName,
                teammember_id: teammemberId,
                updated_by: updateedperson,
                action_Taken: actions,
                Pending_with: pendingwith,
                Comment: comment,
                Praposal_status: PraposalStatus,
                Next_followup_Date: nextFollowup,
            });
            return res.json({ message: "New assignment created" });
        }
    } catch (error) {
        console.error('Error while creating assignment:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
})

app.get('/retrivestatus', async (req, res) => {
    try {
        const result = await Status_updates.findAll({
            include: [
                {
                    model: teammembers,
                    attributes: ['TeamM_id', 'FirstName', 'LastName', 'Email_address']
                }
            ]
        });
        res.json(result);
    } catch (error) {
        console.log("error while retriving ", error)
    }
})

app.post('/statusupdateData/:id', async (req, res) => {
    const id = req.params.id;
    const { Date_of_Creation, lastupdate, borrower_name, lender_name, action_Taken, Pending_with, Praposal_status, Comment, updated_by, Next_followup_Date } = req.body;

    //update data  
    try {
        const existingdate = await Status_updates.findOne(
            { where: { St_id: id } }
        )
        if (existingdate) {

            await Status_updates.update({
                Date_of_Creation,
                lastupdate,
                borrower_name,
                lender_name,
                action_Taken,
                Pending_with,
                Praposal_status,
                Comment,
                updated_by,
                Next_followup_Date,
            },
                {
                    where: { St_id: id }
                }
            );

            const existingstatus_id = await EmailReminder.findOne({
                where: { Status_id: id, }
            })
            console.log(existingstatus_id)
            if (existingstatus_id) {
                await EmailReminder.update({
                    nextFollowUpdate: Next_followup_Date
                }, {
                    where: { Status_id: id }
                })
                return res.json({ "message": "Status arlerdy updated updated successfully" })
            } else {
                await EmailReminder.create({
                    Status_id: id,
                    nextFollowUpdate: Next_followup_Date,
                    teamMember: updated_by,
                })
                res.json({ "message": "Status updated successfully" })
            }
        }
        else {
            res.json({ "message": "date not found" })
        }
    } catch (error) {
        console.log("error while updateing data", error)
        res.json({ "error": "Error while updateing status" })
    }
})

app.get('/getreminderdetails', async (req, res) => {
    try {
        const reminderdetails = await EmailReminder.findAll({
            include: Status_updates,
        })
        res.status(200).json(reminderdetails)
    } catch (error) {
        console.log(error)
    }
})

const updatedStatusData = await Status_updates.findAll({
    include: [
        {
            model: teammembers,
            attributes: ['TeamM_id', 'FirstName', 'LastName', 'Email_address']
        }
    ]
})
console.log(updatedStatusData)
// console.log('filter', filterteammemberData)

const sentEmailreminderToTeamMember = (teamMember) => {

    const filterteammemberData = updatedStatusData.filter((status) => (
        status.updated_by === teamMember
    ));

    console.log('fi;', filterteammemberData)

    var table = `
    <table border="1" style='border-collapse: collapse;'>
        <thead style='background-color: aquamarine; border: 2px solid rgb(0, 204, 255);'>
            <tr>
                <th style='padding: 5px;'>Date of creation</th>
                <th style='padding: 5px;'>Last update</th>
                <th style='padding: 5px;'>Borrower Name</th>
                <th style='padding: 5px;'>Lender Name</th>
                <th style='padding: 5px;'>Action Taken</th>
                <th style='padding: 5px;'>Pending with</th>
                <th style='padding: 5px;'>Proposal Status</th>
                <th style='padding: 5px;'>Comment/Query</th>
                <th style='padding: 5px;'>Updated By</th>
                <th style='padding: 5px;'>Next Follow-up Date</th>
            </tr>
        </thead>
        <tbody style='border: 2px solid rgb(0, 204, 255); padding: 5px;'>`;

    filterteammemberData.map((statusdetailes) => {
        return (
            table += `<tr key=${statusdetailes.St_id}>
            <td style='padding: 5px;'>${statusdetailes.Date_of_Creation}</td>
            <td style='padding: 5px;'>${statusdetailes.lastupdate}</td>
            <td style='padding: 5px;'>${statusdetailes.borrower_name}</td>
            <td style='padding: 5px;'>${statusdetailes.lender_name}</td>
            <td style='padding: 5px;'>${statusdetailes.action_Taken}</td>
            <td style='padding: 5px;'>${statusdetailes.Pending_with}</td>
            <td style='padding: 5px;'>${statusdetailes.Praposal_status}</td>
            <td style='padding: 5px;'>please refer status table</td>
            <td style='padding: 5px;'>${statusdetailes.updated_by}</td>
            <td style='padding: 5px;'>${statusdetailes.Next_followup_Date}</td>
        </tr>`
        );
    });

    table += `</tbody></table>`;

    // console.log(table);
    const toEmailAddress = filterteammemberData.map((member) => member.teammember.Email_address)
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    const to = filterteammemberData.map((email) => email.teammember.Email_address)
    console.log(to)
    const mailOptions = {
        from: process.env.EMAIL,
        to: toEmailAddress,
        cc: ['statusexpressrupya@gmail.com', 'Vinaysp254@gmail.com', 'expressrupya@gmail.com'],
        subject: 'Follow-Up the Lenders/Borrowers',
        html: table,
    }

    console.log(mailOptions);
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error while sending", error)
            res.json("error while sending", error);
        } else {
            console.log("email sent successfully" + info.response);
            res.json(info);
        }
    })
}

const filteringNextFollwupDate = async () => {
    //from filtering to nextfollupdate using curent date
    const emailReminder = await EmailReminder.findAll()
    const datewiseEmailReminder = emailReminder.filter((reminder) => {
        // Define your conditions to filter 'updatedStatusData' based on EmailReminder data
        const curentDate = new Date();
        curentDate.setHours(0, 0, 0, 0)
        const reminderDate = new Date(reminder.nextFollowUpdate);
        reminderDate.setHours(0, 0, 0, 0); // Set time part to midnight for comparison
        console.log(reminderDate)
        return (
            reminderDate.getFullYear() <= curentDate.getFullYear() &&
            reminderDate.getMonth() <= curentDate.getMonth() &&
            reminderDate.getDate() <= curentDate.getDate()
        );
    });

    console.log('dataes', datewiseEmailReminder)

    // identifying uniqe team member and send reminder
    const uniqeTeamMember = new Set()
    const formatedDatewiseEmailReminder = datewiseEmailReminder.map((data) => {
        const teammember = data.teamMember
        const status_id = data.Status_id

        uniqeTeamMember.add(teammember)
    })

    uniqeTeamMember.forEach((member) => {
        sentEmailreminderToTeamMember(member)
    })
    console.log('date', uniqeTeamMember)
    console.log('Email sent.........')
}

cron.schedule('0 6 * * *', filteringNextFollwupDate)

var to;
var cc;
var subject;
var body;
var path1;


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './files')
    },
    filename: function (req, file, callback) {
        const fileName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, fileName)
    }
});

var upload = multer({
    storage: storage
}).array('attachment', 10);


app.post("/sendemail", (req, res) => {
    // const { email, CC, subject, message, attachments } = req.body;
    // console.log(email, CC, subject, message)
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                //handel multer errors if any
                console.log('Error while uploading attachment', err);
                return res.status(500).json({ error: 'Error while uploading attachment', err });
            } else {
                to = req.body.to
                cc = req.body.cc
                subject = req.body.subject
                body = req.body.message

                // Extract file paths from req.files and add them as attachments
                const attachments = req.files
                    ? req.files.map((file) => ({
                        filename: file.filename,
                        content: file.buffer,
                        contentType: file.mimetype // Make sure the path to the file is correct
                    }))
                    : [];

                if (req.files) {
                    for (const file of req.files) {
                        if (file.path) {
                            path1 = file.path;
                            console.log(path1)
                        }
                    }
                } else {
                    console.log('No file uploaded or invalid file');
                }
                console.log(to, cc, subject, body, path1)

                //file have ben uploaded successfully prepare email
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: to,
                    cc: cc,
                    subject: subject,
                    text: body,
                    attachments: attachments,
                }
                console.log(mailOptions);

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error while sending", error)
                        res.json("error while sending", error);
                    } else {
                        console.log("email sent successfully" + info.response);
                        res.json(info);
                    }
                })
            }
        })
    } catch (error) {
        console.log("error while sending", error)
    }
})

// const sendEmailReminderToTeam = () => {
app.post("/sendEmailreminder", (req, res) => {
    const { emaillist, cclist, subject, message } = req.body;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: emaillist,
        cc: cclist,
        subject: subject,
        html: table,
    }

    console.log(mailOptions);
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error while sending", error)
            res.json("error while sending", error);
        } else {
            console.log("email sent successfully" + info.response);
            res.json(info);
        }
    })
})

app.post("/partiallydisbursed", async (req, res) => {
    const { borrowerId, borrowerName, lenderId, lenderName, typeOfSanction, sactionDate, sactionAmount,
        dispursedDate, dispursedAmount, nextFollowup } = req.body;
    const balance = sactionAmount - dispursedAmount;

    await partiallyDisbersedTable.create({
        borrower_id: borrowerId,
        borrower_name: borrowerName,
        lender_name: lenderName,
        lender_id: lenderId,
        sanction_date: sactionDate,
        type_of_sanction: typeOfSanction,
        sanctioned: sactionAmount,
        disbuersed_date: dispursedDate,
        disbursed_amt: dispursedAmount,
        balance_disbursed_amt: balance,
        nextfollowupdate: nextFollowup,

    });
    return res.json({ message: "Data is created" })
})

app.post("/partiallydisbursedupdate", async (req, res) => {
    const {
        borrowerId,
        borrowerName,
        lenderId,
        lenderName,
        typeOfSanction,
        sactioneDate,
        sanctionedAmt,
        disbursedAmt,
        disbursedDate,
        balanceDisbursedAmt,
        nextFollowupDate } = req.body;
    console.log(borrowerId, lenderId)


    const balance = balanceDisbursedAmt - disbursedAmt;
    let isDisbursedamt = 0;
    if (balanceDisbursedAmt === 0) {
        isDisbursedamt = 1
    }
    await partiallyDisbersedTable.create({
        borrower_id: borrowerId,
        borrower_name: borrowerName,
        lender_name: lenderName,
        lender_id: lenderId,
        sanction_date: sactioneDate,
        type_of_sanction: typeOfSanction,
        sanctioned: 0,
        disbuersed_date: disbursedDate,
        disbursed_amt: disbursedAmt,
        balance_disbursed_amt: balance,
        nextfollowupdate: nextFollowupDate,
        isDisbursed: isDisbursedamt,
    });
    return res.json({ message: "Data is updated" })
    // }
})

app.delete("/deleteRow/:selectborrowerId/:selectlenderId", (req, res) => {
    const borrowerId = req.params.selectborrowerId;
    const lenderId = req.params.selectlenderId

    //implement delet logic
    const sqlquery = 'delete from partiallydisbersedtables where borrower_id=? and lender_id=?';
    db.query(sqlquery, [borrowerId, lenderId], (err, result) => {
        if (err) {
            console.error('Error deleting row from the database:', err);
            res.status(500).json({ message: 'Error deleting row from the database' });
        }
        else {
            console.log('Row deleted successfully!');
            res.status(200).json({ message: 'Row deleted successfully' });

        }
    })
})

app.get("/retrivepartiallydispursed", async (req, res) => {
    try {
        const result = await partiallyDisbersedTable.findAll();
        return res.json(result);
    } catch (error) {
        return res.json({ message: "Error while retrivieng data", error })
    }
})

app.post('/add_lender_classification/:borrower_id', async (req, res) => {
    try {
        const lenderclassificationData = req.body
        const lenderClassification = lenderclassificationData.lenderClassificationData
        const borrower_id = req.params.borrower_id

        for (const data of lenderClassification) {
            await LenderClassified.create({
                borrower_id: borrower_id,
                lender_id: data.lender_id,
                classification: data.classification
            })
        }
        return res.json({ 'message': 'Data inserted' })
    } catch (error) {
        console.log(error)
        return res.json({ 'error': 'error occuerd and data not created' })
    }
})

app.delete('/delete_lender_classification/:borrower_id', async (req, res) => {
    try {
        const borrower_id = req.params.borrower_id;

        // Delete lender classification data associated with the borrower ID
        await LenderClassified.destroy({ where: { borrower_id } });

        return res.json({ 'message': 'Data deleted' });
    } catch (error) {
        console.error(error);
        return res.json({ 'error': 'Error occurred and data not deleted' });
    }
});


app.get('/retrivelenderclassification/:borrower_id', async (req, res) => {
    try {
        const borrower_id = req.params.borrower_id
        const result = await LenderClassification.findAll({
            where:{borrower_id:borrower_id}
        })
        return res.json(result);
    } catch (error) {
        return res.json({ message: "Error while retrivieng data", error })
    }
})
app.listen(4306, () => {
    console.log("listening..............", 4306);
});