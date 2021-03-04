import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { goAb } from '../actions/aboutActions'
import { logout } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import { goPp } from '../actions/ppActions'
import { goTc } from '../actions/tcActions'
import { goItems } from '../actions/itemActions'
import { goComments } from '../actions/commentActions'
import { goReplies } from '../actions/replyActions'
import { goUsers } from '../actions/userActions'
import { goSubs } from '../actions/subActions'

const Logout = () => {
    
    const dispatch = useDispatch()

    const handleLogout = () => {
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
    }

    return (
        <div>
            <Link to={'/'}>
                <button onClick={handleLogout}>Logout</button>
            </Link>
        </div>
    )
}

export default Logout
