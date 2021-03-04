import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAb } from '../actions/aboutActions'
import { Link } from 'react-router-dom'

const BlogAbout = () => {

    const byWho = useSelector(store => store.auth.user)
    const aboutz = useSelector(store => store.about.ab)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAb())
    }, [])

    useEffect(() => {
        dispatch(getAb())
    }, [byWho, dispatch])

    return (
        <div className={styles.thelist}>
            {byWho ?
                aboutz ?
                    aboutz.map(ab => 
                        ab._id === "1" ?
                            <div key={ab._id} className={styles.item}>
                                <div>
                                    <h1>About Us (for blog)</h1>
                                </div>
                                <div>
                                    <p>{ab.text}</p>
                                </div>
                                <div>
                                    {byWho ?
                                        byWho.role === "admin" ?
                                            <Link to={`/editabout/${ab._id}`}>
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

export default BlogAbout