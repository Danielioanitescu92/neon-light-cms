import React, { useState, useEffect } from 'react'
import styles from '../styles/ContactDev.module.css'
import { getUsers, getThisUser, contDev } from '../../../../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'

const ContactDev = () => {
    
    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)

    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ subject, setSubject ] = useState('')
    const [ text, setText ] = useState('')
    const [ msg, setMsg ] = useState('')
    const dispatch = useDispatch()
    
    const err = useSelector(store => store.error)

    useEffect(() => {
        dispatch(getThisUser(byWho.name))
        if(byWho) {
            setName(byWho.name)
            setEmail(byWho.email)
        }
    }, [byWho])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    useEffect(() => {
        if(msg !== '' || msg !== null) {
            setTimeout(() => { setMsg('') }, 5000)
        }
    }, [msg])
        
    const handleSubject = e => setSubject(e.target.value) 
    const handleText = e => setText(e.target.value) 
    
    const submitEdit = e => {
        e.preventDefault()
        const emailToDev = { 
            email: email,
            name: name,
            subject: subject,
            text: text
        }
        dispatch(contDev(emailToDev))
        setSubject('')
        setText('')
    }

    return (
        byWho ?
            <div className={styles.contact}>
                <div className={styles.contactdiv}>
                    {msg ? <h3 className={styles.msg}>{msg}</h3> : null}
                    <form className={styles.myform} id="form" onSubmit={submitEdit}>
                        <label>Subject</label>
                        <input
                            className={styles.formeripnut}
                            type='text'
                            name="subject"
                            value={subject}
                            onChange={handleSubject}
                            placeholder='Subject'
                        ></input>
                        <label>Text</label>
                        <textarea
                            className={styles.formeripnut}
                            type='text'
                            name="text"
                            value={text}
                            onChange={handleText}
                            placeholder='Insert text here'
                        />
                        <input className={styles.formersubmit} type="submit" value={"Submit"} ></input>
                    </form>
                </div>
            </div>
        : null
    )
}

export default ContactDev