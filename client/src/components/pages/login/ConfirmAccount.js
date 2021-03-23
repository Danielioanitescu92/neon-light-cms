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
        dispatch(confAcc(match.params.token))
    }, [])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    const handleProceed = () => {
        dispatch(logout())
        dispatch(goItems())
        dispatch(goComments())
        dispatch(goReplies())
        dispatch(goUsers())
        dispatch(goSubs())
        dispatch(goAb())
        dispatch(clearErrors())
        dispatch(goPp())
        dispatch(goTc())
        history.push(`/`)
    }

    return (
        <div className={styles.thecover}>
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
