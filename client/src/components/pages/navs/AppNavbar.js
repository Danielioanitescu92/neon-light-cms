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
    const filezLoading = useSelector(store => store.file.loadingAv)
    const userzLoading = useSelector(store => store.user.loading)
    const piczLoading = useSelector(store => store.file.loadingIt)
    const itemzLoading = useSelector(store => store.item.loading)

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
                <Link to={piczLoading ? "#" : itemzLoading ? "#" : filezLoading ? "#" : userzLoading ? "#" : '/dashboard'} className={styles.navbarlink}> <h1>Dashboard</h1> </Link>                
                <div className={styles.navbarInfoDiv}>
                    {user ? <p className={styles.smallScreen}>Welcome, { user.name }!</p> : null}
                    {isAuth ? <Logout/> : <Link to={'/'}> <button onClick={toggleLog} className={styles.logger} disabled={piczLoading ? true : itemzLoading ? true : filezLoading ? true : userzLoading ? true : false}>Login</button> </Link>}
                </div>
            </div>
            {isOpenLog ? <Login/> : null}
        </header>
    )
}

export default AppNavbar
