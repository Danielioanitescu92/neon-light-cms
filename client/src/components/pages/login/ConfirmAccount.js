import React, { useState, useEffect } from 'react'
import styles from './styles/ConfirmAccount.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { confAcc } from '../../../actions/userActions'

const ConfirmAccount = ({ match }) => {

    const [ msg, setMsg ] = useState('')
    const dispatch = useDispatch()
    const history = useHistory();
    
    const err = useSelector(store => store.error)

    useEffect(() => {
        console.log("TOKEN: ", match.params.token)
        dispatch(confAcc(match.params.token))
    }, [])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    return (
        <div className={styles.thecover}>
            {msg ?
                <div>
                    <h3>{msg}</h3>
                    <button onClick={() => history.push(`/`)}>Proceed to Login</button>
                </div>
            : null}
        </div>
    )
}

export default ConfirmAccount
