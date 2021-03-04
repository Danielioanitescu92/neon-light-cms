import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPar, reset } from '../actions/authActions'

const ResetPass = ({ match }) => {

    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ msg, setMsg ] = useState('')
    const dispatch = useDispatch() 
    
    const err = useSelector(store => store.error)
    const username = useSelector(store => store.auth.forToken)

    useEffect(() => {
        dispatch(getPar(match.params.token))
    }, [])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    const handlePassword = e => setPassword(e.target.value)
    const handleConfPassword = e => setConfirmPassword(e.target.value)

    const updatePassword = e => {
        e.preventDefault()
        const toResset = {
            username,
            password,
            confirmPassword
        }
        dispatch(reset(toResset))
    }

    return (
        <div>
            <div>
                {msg ? <h3>{msg}</h3> : null}
            </div>
            <div className={styles.collapse}>
                <form onSubmit={updatePassword} className={styles.collapse}>
                    <label>New Password</label>
                    <input type="password" value={password} onChange={handlePassword}></input>
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={handleConfPassword}></input>
                    <input type="submit" value="Update Password"></input>
                </form>
            </div>
        </div>
    )
}

export default ResetPass
