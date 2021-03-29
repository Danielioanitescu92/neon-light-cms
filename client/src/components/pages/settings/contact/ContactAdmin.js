import React, { useState, useEffect } from 'react'
import styles from '../styles/ContactAdmin.module.css'
import { getUsers, getThisUser, contAdmin } from '../../../../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'

const ContactAdmin = () => {
    
    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)

    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ subject, setSubject ] = useState('')
    const [ text, setText ] = useState('')
    const [ msg, setMsg ] = useState('')
    const dispatch = useDispatch()
    
    const err = useSelector(store => store.error)

    const assingUser = () => {
        if(userz) {
            userz.map(user => {
                if(user._id === byWho._id) {
                    setName(user.name)
                    setEmail(user.email)
                }
            })
        }
    }

    useEffect(() => {
        dispatch(getThisUser(byWho.name))
        assingUser()
    }, [byWho])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    useEffect(() => {
        if(msg || msg !== null || msg !== '') {
            setTimeout(() => { setMsg('') }, 9000)
        }
    }, [msg])
        
    const handleSubject = e => setSubject(e.target.value) 
    const handleText = e => setText(e.target.value) 
    
    const submitEdit = e => {
        e.preventDefault()
        const emailToAdmin = { 
            email: email,
            name: name,
            subject: subject,
            text: text
        }
        dispatch(contAdmin(emailToAdmin))
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

export default ContactAdmin