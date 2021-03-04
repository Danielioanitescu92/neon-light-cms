import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getCountAll } from '../actions/itemActions'

const ViewsUser = ({ match }) => {
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
            <div>
                <div>
                    <h3>POSTS</h3>
                    <h1>{countAll.Posts}</h1>
                </div>
                <div>
                    <h3>VIEWS</h3>
                    <h1>{countAll.Views}</h1>
                </div>
                <div>
                    <h3>COMMENTS</h3>
                    <h1>{countAll.Comms}</h1>
                </div>
                {!match.url.includes('/myaccount') ?
                    <div>
                        <h3>USERS</h3>
                        <h1>{countAll.Users}</h1>
                    </div>
                : null}
                {!match.url.includes('/myaccount') ?
                    <div>
                        <h3>SUBSCRIBERS</h3>
                        <h1>{countAll.Subs}</h1>
                    </div>
                : null}
            </div>
        : null
    )
}

export default ViewsUser
