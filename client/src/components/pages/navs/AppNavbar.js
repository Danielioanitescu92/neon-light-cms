import React, { useState, useEffect } from 'react'
import styles from './styles/AppNavbar.module.css'
import { Link } from 'react-router-dom'
import Logout from '../login/Logout'
import Login from '../login/Login'
import { useSelector, useDispatch } from 'react-redux'

import { clearErrors } from '../../../actions/errorActions'

const AppNavbar = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector(store => store.auth.isAuthenticated)
    const user = useSelector(store => store.auth.user)

    const [ isOpenLog, setIsOpenLog ] = useState(false)

    useEffect(() => {
        if(isOpenLog) {
            if(isAuth) {
                toggleLog()
            }
        }
    }, [isAuth])
    
    const toggleLog = () => {
        dispatch(clearErrors())
        setIsOpenLog(!isOpenLog)
    }

    return (
        <header>
            <div className={styles.navbar}>
                <div>
                    <Link to={'/dashboard'}> <h1>Dashboard</h1> </Link>
                </div>
                <div>
                    <div>
                        {user ? <p>Welcome, { user.name }!</p> : null}
                    </div>                    
                    <div>
                        {isAuth ? <Logout/> : <Link to={'/'}> <button onClick={toggleLog}>Login</button> </Link>}
                    </div>
                </div>
            </div>
            {isOpenLog ? <Login/> : null}
        </header>
    )
}

export default AppNavbar