import React, { useState, useEffect } from 'react'
import styles from './styles/ConfirmAccount.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { confAcc } from '../../../actions/userActions'
import { logout } from '../../../actions/authActions'
import { clearErrors } from '../../../actions/errorActions'

const ConfirmAccount = ({ match }) => {

    const [ msg, setMsg ] = useState('')
    const dispatch = useDispatch()
    const history = useHistory();
    
    const err = useSelector(store => store.error)

    useEffect(() => {
        dispatch(confAcc(match.params.token))
        dispatch(logout())
    }, [])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    const handleProceed = () => {
        // dispatch(logout())
        // dispatch(clearErrors())
        history.push(`/`)
    }

    return (
        <div>
            {/* className={styles.thecover} */}
            {msg ?
                <div>
                    <h3>{msg}</h3>
                    <button onClick={handleProceed}>Proceed to Login</button>
                </div>
            : null}
        </div>
    )
}

export default ConfirmAccount
