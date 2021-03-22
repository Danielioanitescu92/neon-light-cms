import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { confAcc } from '../../../actions/userActions'

const ConfirmAccount = ({ match }) => {

    const [ msg, setMsg ] = useState('')
    const dispatch = useDispatch()
    
    const err = useSelector(store => store.error)

    useEffect(() => {
        console.log("TOKEN: ", match.params.token)
        dispatch(confAcc(match.params.token))
    }, [])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    return (
        <div>
            {msg ? <h3>{msg}</h3> : null}
        </div>
    )
}

export default ConfirmAccount
