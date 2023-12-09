import React, { useState } from 'react'
import Dailog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button } from '@mui/base';
import "./Daillogs.css"

const AleartDailog = ({ open, onClose, message }) => {
    return (
        <Dailog open={open} onClose={onclose} message={message} >
            <div className="dailog">
                <DialogTitle className='dailogHeading'>Alert</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        <div className='dailogtext'>
                            {message}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} className='dailogOk'>ok</Button>
                </DialogActions>
            </div>
        </Dailog>
    )
}

export default AleartDailog
