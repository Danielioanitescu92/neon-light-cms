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

    // const assingUser = () => {
    //     if(userz) {
    //         userz.map(user => {
    //             if(user._id === byWho._id) {
    //                 setName(user.name)
    //                 setEmail(user.email)
    //             }
    //         })
    //     }
    // }

    useEffect(() => {
        dispatch(getThisUser(byWho.name))
        // dispatch(getUsers())
        if(byWho) {
            setName(byWho.name)
            setEmail(byWho.email)
        }
    }, [byWho])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])
        
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
            <div>
                <div>
                    {msg ? <h3>{msg}</h3> : null}
                </div>
                <div>
                    <div className={styles.collapse}>
                        <h1>Contact developer</h1>
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

export default ContactDev