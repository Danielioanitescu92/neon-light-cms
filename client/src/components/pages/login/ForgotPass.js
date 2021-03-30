import React, { useState, useEffect } from 'react'
import styles from './styles/ForgotPass.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { forg } from '../../../actions/authActions'

const ForgotPass = () => {

    const [ email, setEmail ] = useState('')
    const [ msg, setMsg ] = useState('')
    const dispatch = useDispatch()    

    const handleEmail = e => setEmail(e.target.value)

    const err = useSelector(store => store.error)

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    const sendEmail = e => {
        e.preventDefault()
        dispatch(forg(email))
    }

    return (
        <div>
            <div className={styles.forg}>
                <div className={styles.blurer}></div>
                <div className={styles.former}>
                    {msg ? <h3 className={styles.messg}>{msg}</h3> : null}
                    <input
                        type="email"
                        name='email'
                        value={email}
                        onChange={handleEmail}
                        placeholder="Enter Email"
                    ></input>
                    <input onClick={sendEmail} className={styles.formersubmit} type="submit" value="Send Email"></input>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass
