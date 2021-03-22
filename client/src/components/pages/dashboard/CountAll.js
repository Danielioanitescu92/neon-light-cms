import React, { useState, useEffect } from 'react'
import styles from './styles/CountAll.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getCountAll } from '../../../actions/itemActions'

const CountAll = ({ match }) => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const countAll = useSelector(store => store.item.countAll)
    const [ author, setAuthor ] = useState(match.url.includes('/myaccount') ? byWho.name : 'all')

    useEffect(() => {
        if(byWho) {
            dispatch(getCountAll(author))
        }
    }, [byWho])

    return (
        countAll ?
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
                    <h3>COMMENTS</h3>
                    <h1>{countAll.Comms}</h1>
                </div>
                {!match.url.includes('/myaccount') ?
                    <div className={styles.diva}>
                        <h3>USERS</h3>
                        <h1>{countAll.Users}</h1>
                    </div>
                : null}
                {!match.url.includes('/myaccount') ?
                    <div className={styles.diva}>
                        <h3>SUBSCRIBERS</h3>
                        <h1>{countAll.Subs}</h1>
                    </div>
                : null}
            </div>
        : null
    )
}

export default CountAll
