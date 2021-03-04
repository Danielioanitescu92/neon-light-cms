import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPp } from '../actions/ppActions'
import { Link } from 'react-router-dom'

const BlogPP = () => {

    const byWho = useSelector(store => store.auth.user)
    const privPolz = useSelector(store => store.privpol.pp)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPp())
    }, [])

    useEffect(() => {
        dispatch(getPp())
    }, [byWho, dispatch])

    return (
        <div className={styles.thelist}>
            {byWho ?
                privPolz ?
                    privPolz.map(pp => 
                        pp._id === "1" ?
                            <div key={pp._id} className={styles.item}>
                                <div>
                                    <h1>Privacy Policies for blog</h1>
                                </div>
                                <div>
                                    <p>{pp.text}</p>
                                </div>
                                <div>
                                    {byWho ?
                                        byWho.role === "admin" ?
                                            <Link to={`/editpp/${pp._id}`}>
                                                <p>Edit</p>
                                            </Link>
                                        : null
                                    : null}
                                </div>
                            </div>
                        : null
                    )
                : null
            : null}
        </div>
    )
}

export default BlogPP