import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { forg } from '../actions/authActions'

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
            <div>
                {msg ? <h3>{msg}</h3> : null}
            </div>
            <div className={styles.collapse}>
                <form onSubmit={sendEmail}>
                    <label>Insert your email</label>
                    <input
                        // type="email"
                        name='email'
                        value={email}
                        onChange={handleEmail}
                        placeholder="Enter Email"
                    ></input>
                    <input type="submit" value="Send Email"></input>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass
