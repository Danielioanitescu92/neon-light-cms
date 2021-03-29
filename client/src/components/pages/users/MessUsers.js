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
        <section className={styles.filtersDiv}>

            <header>
                <h1>CAMPAGNE MAIL</h1>
            </header>
                            
            <div className={styles.divider}></div>

            <form className={styles.searchform} id="form" onSubmit={submitMess}>
                <label>Subject</label>
                <input className={styles.anyinput} name="subject" value={subject} onChange={handleSubject}></input>
                <label>Text</label>
                <textarea className={styles.anyinput} name="text" value={text} onChange={handleText}/>
                <input type="submit" value={"Submit"}></input>
            </form>
        </section>
    )
}

export default MessUsers
