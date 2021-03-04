import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTc } from '../actions/tcActions'
import { Link } from 'react-router-dom'

const BlogTAC = () => {

    const byWho = useSelector(store => store.auth.user)
    const termsConz = useSelector(store => store.termscons.tc)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTc())
    }, [])

    useEffect(() => {
        dispatch(getTc())
    }, [byWho, dispatch])

    return (
        <div className={styles.thelist}>
            {byWho ?
                termsConz ?
                    termsConz.map(tc => 
                        tc._id === "1" ?
                            <div key={tc._id} className={styles.item}>
                                <div>
                                    <h1>Terms and Conditions for blog</h1>
                                </div>
                                <div>
                                    <p>{tc.text}</p>
                                </div>
                                <div>
                                    {byWho ?
                                        byWho.role === "admin" ?
                                            <Link to={`/edittc/${tc._id}`}>
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

export default BlogTAC