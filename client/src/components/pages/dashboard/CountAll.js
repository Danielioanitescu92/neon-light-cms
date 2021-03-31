import React, { useEffect } from 'react'
import styles from './styles/CountAll.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getCountAll } from '../../../actions/itemActions'

const CountAll = ({ match }) => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const countAll = useSelector(store => store.item.countAll)
    const author = match.url.includes('/myaccount') ? byWho.name : 'all'

    useEffect(() => {
        if(byWho) {
            dispatch(getCountAll(author))
        }
    }, [byWho])

    return (
        countAll ?
            match.url.includes('/myaccount') ?
                <div className={styles.myaccarange}>
                    <div className={styles.myaccdiva}>
                        <h3>POSTS</h3>
                        <p>{countAll.Posts}</p>
                    </div>
                    <div className={styles.myaccdiva}>
                        <h3>VIEWS</h3>
                        <p>{countAll.Views}</p>
                    </div>
                    <div className={styles.myaccdiva}>
                        <h3>COMMS</h3>
                        <p>{countAll.Comms}</p>
                    </div>
                </div>
            : 
            <div className={styles.arange}>
                <div className={styles.diva}>
                    <h3>POSTS</h3>
                    <h1>{countAll.Posts}</h1>
                </div>
                <div className={styles.diva}>
                    <h3>VIEWS</h3>
                    <h1>{countAll.Views}</h1>
                </div>
                <div className={styles.diva}>
                    <h3>COMMS</h3>
                    <h1>{countAll.Comms}</h1>
                </div>
                <div className={styles.diva}>
                    <h3>USERS</h3>
                    <h1>{countAll.Users}</h1>
                </div>
                <div className={styles.diva}>
                    <h3>SUBS</h3>
                    <h1>{countAll.Subs}</h1>
                </div>
            </div>
        : null
    )
}

export default CountAll
