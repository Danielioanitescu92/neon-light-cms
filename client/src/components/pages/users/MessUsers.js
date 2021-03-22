import React, { useState } from 'react'
import styles from './styles/MessUsers.module.css'
import { useDispatch } from 'react-redux'
import { sendMessage } from '../../../actions/userActions'

const MessUsers = () => {
    const dispatch = useDispatch()
    
    const [ subject, setSubject ] = useState('')
    const [ text, setText ] = useState('')
        
    const handleSubject = e => setSubject(e.target.value) 
    const handleText = e => setText(e.target.value)     

    const submitMess = e => {
        e.preventDefault()
        const emailToSubs = { 
            subject: subject,
            text: text
        }
        dispatch(sendMessage(emailToSubs))
        setSubject('')
        setText('')
    }

    return (
        <div className={styles.collapse}>
            <div className={styles.collapse}>
                <form id="form" onSubmit={submitMess}>
                    <label>Subject</label>
                    <input name="subject" value={subject} onChange={handleSubject}></input>
                    <label>Text</label>
                    <textarea name="text" value={text} onChange={handleText} />
                    <input type="submit" value={"Submit"} ></input>
                </form>
            </div>
        </div>
    )
}

export default MessUsers
