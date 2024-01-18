import React from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import ApprovalIcon from '@mui/icons-material/Approval';
import EmailIcon from '@mui/icons-material/Email';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { GiReceiveMoney } from 'react-icons/gi';
import { GiPayMoney } from 'react-icons/gi';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MdOutlineRestorePage } from "react-icons/md";
import { FaTrashRestoreAlt } from 'react-icons/fa';
export const Sidebaritems = [

    {
        title: "Create Details",
        icon: <AddIcon />,
        link: "/CreateBorrowerandLenderDetailes"
    },
    {
        title: " Borrower Dashboard",
        icon: <GiReceiveMoney />,
        link: "/Show_Borrowers"

    },
    {
        title: " Lender Dashboard",
        icon: <GiPayMoney />,
        link: "/Show_Lenders"

    }, {
        title: "Team Members",
        icon: <GroupsIcon />,
        link: "/TeamMembers"
    },
    {
        title: "Status Update",
        icon: <ApprovalIcon />,
        link: "/StatusUpdate"

    },

    {
        title: "Partially Disbursed",
        icon: <AssuredWorkloadIcon />,
        link: "/Partiallydisbursed"
    },
    {
        title: "Possible Borrowers",
        icon: <PersonIcon />,
        link: "/PossibleBorrowers"
    },
    {
        title: "Possible Lenders",
        icon: <PersonIcon />,
        link: "/PossibleLenders"
    },
    {
        title: "Approvals",
        icon: <CheckCircleIcon />,
        link: "/Assign"
    },
    {
        title: "Email Reminder",
        icon: <EmailIcon />,
        link: "/Emailreminder"
    },
    {
        title: "Restore Data",
        icon: <FaTrashRestoreAlt/>,
        link: "/restoredata"
    },
];



