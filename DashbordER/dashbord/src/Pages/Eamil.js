import React, { useEffect, useState } from 'react'
import "./Email.css"
import Modal from 'react-modal'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import TostNotification from './ReminderNotification';
import 'react-toastify/dist/ReactToastify.css';

const Eamil = ({ handelClose, open }) => {

  const [email, setEmail] = useState("");
  const [CC, setCC] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handelToChange = (event) => {
    setEmail(event.target.value);
  }
  const handelSubjectChange = (event) => {
    setSubject(event.target.value);
  }
  const handelMessageChange = (event) => {
    setMessage(event.target.value);
  }
  const handelCCChange = (event) => {
    setCC(event.target.value);
  }

  const handelAttachmentchange = (event) => {
    const files = event.target.files;
    const newAttachments = [...attachments];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        const content = reader.result;
        const blob = new Blob([content], { type: file.type })
        newAttachments.push({ file, content: blob });
        setAttachments(newAttachments)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const removeAttachments = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments)
  }


  const sendMail = async (event) => {
    if (event) {
      event.preventDefault();
      const tostId = toast.info('Sending mail...', { autoClose: false })
      const data = new FormData();
      data.append('to', email);
      data.append('cc', CC);
      data.append('subject', subject);
      data.append('message', message);

      for (let i = 0; i < attachments.length; i++) {
        const file = attachments[i].file;
        const content = attachments[i].content;

        data.append("attachment", content, file.name)
      }
      console.log(data)

      try {
        const response = await axios.post("http://localhost:4306/sendemail", data, {
          headers: {
            "Content-Type": "multipart/form-data; boundary=<boundary>",
          },
        })
        // Handle the response here
        console.log(response);
        toast.update(tostId, {
          render: "Email sent",
          position: 'top-right',
          type:toast.TYPE.SUCCESS,
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true
        })
      } catch (error) {
        // Handle errors here
       
        console.log("Error while sending email", error);
        toast.error("Fail to send email", {
          autoClose: 4000,
          position: 'top-right',
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true
        })
      }
    } else {
      console.log("event is not found")
    }
  };

  return (
    <>
      <Modal isOpen={open} style={{
        content: { top: "150px", left: "30%", right: "30%", backgroundColor: "white" }
      }} >

        <div className='maincontent'>
          <button className='modalclose' onClick={handelClose}>X</button>
          <div className='emailform'>
            <div className='emailheading'>
              Drop A Mail
            </div>
            <form>
              <div className='emailbody'>
                <label>To</label>{email}
                <input type='email' name="to" value={email} onChange={handelToChange} placeholder='Enter email id' required></input>
                <label>CC</label>
                <input type='text' name="cc" value={CC} onChange={handelCCChange} placeholder='Enter email id' required></input>
                <label>Subject</label>
                <input type='text' name='subject' value={subject} onChange={handelSubjectChange} placeholder='Enter Status update' required></input>
                <label>message</label>
                <section className='textarea'>
                  <input type='file' name='attachment' onChange={handelAttachmentchange} multiple></input>
                  {attachments.length > 0 && (
                    <div className='attachments'>
                      <ul>
                        {attachments.map((file, index) => (
                          <li key={index}>
                            {file.name} <button onClick={() => removeAttachments(index)}>X</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                  }
                  <textarea placeholder='Enter detailes' value={message} name='message' onChange={handelMessageChange} ></textarea>
                  <ToastContainer
                    className="custompopup"  autoClose={4000}
                    closeOnClick={true} hideProgressBar={true} pauseOnHover rtl pauseOnFocusLoss draggable
                  />
                </section>
              </div>
              <button type='submit' onClick={sendMail} className='submitbutton'>SEND</button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}


export default Eamil
