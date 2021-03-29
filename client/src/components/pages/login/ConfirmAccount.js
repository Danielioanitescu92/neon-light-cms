import React, { useState, useEffect } from 'react'
import styles from './styles/ConfirmAccount.module.css'
import { useSelector, useDispatch } from 'react-redux'

import { confAcc } from '../../../actions/userActions'

const ConfirmAccount = ({ match }) => {

    const [ msg, setMsg ] = useState('')
    const dispatch = useDispatch()
    
    const err = useSelector(store => store.error)

    useEffect(() => {
        dispatch(confAcc(match.params.token))
    }, [])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    return (
        <div className={styles.thelist}>
            {msg ?
                <h3 className={styles.messg}>{msg}</h3>
            : null}
        </div>
    )
}

export default ConfirmAccount
