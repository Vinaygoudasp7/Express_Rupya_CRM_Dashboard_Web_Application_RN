import React from 'react'
import Modal from 'react-bootstrap/Modal'
const CommentPage = ({ showModal, handelCloseModal, Comment }) => {
    return (
        <Modal
            show={showModal}
            onHide={handelCloseModal}
            backdrop='static'
            keyboard='false'
        >
            <Modal.Header closeButton>
                <Modal.Title>Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Comment}
            </Modal.Body>
        </Modal>
    )
}

export default CommentPage
