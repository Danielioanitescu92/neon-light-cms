import React from 'react'
import styles from './styles/RoutesNav.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSpecificItems, getSpecificItemsForMe } from '../../../actions/itemActions'
import { getSpecificSubs } from '../../../actions/subActions'
import { getSpecificUsers } from '../../../actions/userActions'

import A from '../../../statics/icon_postslist.png'
import B from '../../../statics/icon_addpost.png'
import C from '../../../statics/icon_account.png'
import D from '../../../statics/icon_contact.png'
import E from '../../../statics/icon_users.png'
import F from '../../../statics/icon_subs.png'
import G from '../../../statics/icon_settings.png'

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
                <nav className={styles.navbar}>                    
                        
                    <div>
                        <Link to={'/'} className={styles.navbarlink} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}>
                            <img src={A} alt='Posts List' width="30" height="30" onClick={togglePage} className={styles.smallScreen}></img>
                            <h4 onClick={togglePage} className={styles.bigScreen}>Posts</h4>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/addpost'} className={styles.navbarlink} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}>
                            <img src={B} alt='Add Post' width="30" height="30" className={styles.smallScreen}></img>
                            <h4 onClick={togglePage} className={styles.bigScreen}>Add Post</h4>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/myaccount'} className={styles.navbarlink} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}>
                            <img src={C} alt='My Account' width="30" height="30" onClick={toggleAcc} className={styles.smallScreen}></img>
                            <h4 onClick={toggleAcc} className={styles.bigScreen}>My Account</h4>
                        </Link>
                    </div>                        
                            
                    {byWho.role === "basic" ?
                        <div>
                            <Link to={'/contact admin'} className={styles.navbarlink} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}>
                                <img src={D} alt='Contact' width="30" height="30" className={styles.smallScreen}></img>
                                <h4 className={styles.bigScreen}>Contact admin</h4>
                            </Link>
                        </div>
                    : null}
                            
                    {byWho.role === "admin" ?
                        <div>
                            <Link to={'/users'} className={styles.navbarlink} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}>
                                <img src={E} alt='Users' width="30" height="30" onClick={toggleUsr} className={styles.smallScreen}></img>
                                <h4 onClick={toggleUsr} className={styles.bigScreen}>Users</h4>
                            </Link>
                        </div>
                    : null}
                    {byWho.role === "admin" ?
                        <div>
                            <Link to={'/subslist'} className={styles.navbarlink} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}>
                                <img src={F} alt='Subscribers' width="30" height="30" onClick={toggleSubs} className={styles.smallScreen}></img>
                                <h4 onClick={toggleSubs} className={styles.bigScreen}>Subscribers</h4>
                            </Link>
                        </div>
                    : null}
                    {byWho.role === "admin" ?
                        <div>
                            <Link to={'/settings'} className={styles.navbarlink} style={{ pointerEvents: itemzLoading ? 'none' : 'auto' }}>
                                <img src={G} alt='Settings' width="30" height="30" className={styles.smallScreen}></img>
                                <h4 className={styles.bigScreen}>Settings</h4>
                            </Link>
                        </div>
                    : null}

                </nav>
            : null
    )
}

export default RoutesNav
