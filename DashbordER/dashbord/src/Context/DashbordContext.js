import React, { createContext } from 'react'
import BACKEND_API_END_POINT from '../config'

export const CreateDashbordContext = createContext()


const DashbordContext = ({ children }) => {

    return (
        <CreateDashbordContext.Provider>
            {children}
        </CreateDashbordContext.Provider>
    )
}

export default DashbordContext
