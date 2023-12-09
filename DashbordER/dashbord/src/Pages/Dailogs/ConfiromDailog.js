import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const ConfiromDailog = ({ message, open, onClose, handelOnConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <div className='dailog'>
                <DialogTitle className='dailogHeading'>Confirm</DialogTitle>
                <DialogContent>
                    <div className='dailogtext'>
                        {message}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelOnConfirm} className='dailogOk'>ok</Button>
                    <Button onClick={onClose} className='dailogCancel'>cancel</Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default ConfiromDailog
