import React, { useState } from 'react'
import styles from './styles/MessUsers.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../../../actions/userActions'

const MessUsers = () => {
    const dispatch = useDispatch()
    
    const filezLoading = useSelector(store => store.file.loadingAv)
    const userzLoading = useSelector(store => store.user.loading)
    const piczLoading = useSelector(store => store.file.loadingIt)
    const itemzLoading = useSelector(store => store.item.loading)
    
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
                <input type="submit" value={"Submit"} disabled={piczLoading ? true : itemzLoading ? true : userzLoading ? true : filezLoading ? true : false}></input>
            </form>
        </section>
    )
}

export default MessUsers
