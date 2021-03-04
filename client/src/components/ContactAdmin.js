import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { getUsers, getThisUser, contAdmin } from '../actions/userActions'
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
        // dispatch(getUsers())
        assingUser()
    }, [byWho])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])
        
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
            <div>
                <div>
                    {msg ? <h3>{msg}</h3> : null}
                </div>
                <div>
                    <div className={styles.collapse}>
                        <h1>Contact admin</h1>
                    </div>
                    <div className={styles.collapse}>
                        <form id="form" onSubmit={submitEdit}>
                            <label>Subject</label>
                            <input name="subject" value={subject} onChange={handleSubject}></input>
                            <label>Text</label>
                            <textarea name="text" value={text} onChange={handleText} />
                            <input type="submit" value={"Submit"} ></input>
                        </form>
                    </div>
                </div>
            </div>
        : null
    )
}

export default ContactAdmin