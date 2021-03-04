import React from 'react'
import styles from './Components.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSpecificItems, getSpecificItemsForMe } from '../actions/itemActions'
import { getSpecificSubs } from '../actions/subActions'
import { getUsers, getSpecificUsers } from '../actions/userActions'

const RoutesNav = () => {
    const dispatch = useDispatch()
    const byWho = useSelector(store => store.auth.user)
    const itemzLoading = useSelector(store => store.item.loading)

    const togglePage = () => {
        if(!window.location.pathname.includes('/myaccount') ||
            !window.location.pathname.includes('/users') ||
            !window.location.pathname.includes('/subslist') ||
            !window.location.pathname.includes('/post') ||
            !window.location.pathname.includes('/addpost') ||
            !window.location.pathname.includes('/settings')) {
                dispatch(getSpecificItems(null, null, null, null))
        }
    }
    const toggleAcc = () => {
        dispatch(getUsers())
        if(window.location.pathname.includes(`/myaccount`)) {
            dispatch(getSpecificItemsForMe(null, byWho.name, null, null))
        }
    }
    const toggleUsr = () => {
        if(window.location.pathname.includes(`/users`)) {
            dispatch(getSpecificUsers(null, null, null, null))
        }
    }
    const toggleSubs = () => {
        if(window.location.pathname.includes(`/subslist`)) {
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
