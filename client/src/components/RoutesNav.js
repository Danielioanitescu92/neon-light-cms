import React from 'react'
import styles from './Components.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSpecificItems, getSpecificItemsForMe } from '../actions/itemActions'
import { getSpecificSubs } from '../actions/subActions'
import { getSpecificUsers } from '../actions/userActions'

const RoutesNav = () => {
    const dispatch = useDispatch()
    const byWho = useSelector(store => store.auth.user)
    const itemzLoading = useSelector(store => store.item.loading)

    const togglePage = () => {
        dispatch(getSpecificItems(null, null, null, null))
    }
    const toggleAcc = () => {
        if(window.location.href.includes(`/myaccount`)) {
            dispatch(getSpecificItemsForMe(null, byWho.name, null, null))
        }
    }
    const toggleUsr = () => {
        if(window.location.href.includes(`/users`)) {
            dispatch(getSpecificUsers(null, null, null, null))
        }
    }
    const toggleSubs = () => {
        if(window.location.href.includes(`/subslist`)) {
            dispatch(getSpecificSubs(null, null, null))
        }
    }

    return (
            byWho ?
                <div className={styles.navbar}>
                    <div className={styles.routesnav}>
                        
                        <div>
                            <Link to={'/'} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}> <h4 onClick={togglePage}>Posts</h4> </Link>
                        </div>
                        <div>
                            <Link to={'/myaccount'} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}> <h4 onClick={toggleAcc}>My Account</h4> </Link>
                        </div>                        
                                
                        {byWho.role === "basic" ?
                            <div>
                                <Link to={'/contact admin'} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}> <h4>Contact admin</h4> </Link>
                            </div>
                        : null}
                                
                        {byWho.role === "admin" ?
                            <div>
                                <Link to={'/users'} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}> <h4 onClick={toggleUsr}>Users</h4> </Link>
                            </div>
                        : null}
                        {byWho.role === "admin" ?
                            <div>
                                <Link to={'/subslist'} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}> <h4 onClick={toggleSubs}>Subscribers</h4> </Link>
                            </div>
                        : null}
                        {byWho.role === "admin" ?
                            <div>
                                <Link to={'/settings'} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}> <h4>Settings</h4> </Link>
                            </div>
                        : null}

                    </div>
                </div>
            : null
    )
}

export default RoutesNav
