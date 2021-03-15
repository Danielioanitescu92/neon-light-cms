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
                                    {/* <p>{pp.text}</p> */}
                                    
                                    {pp.text ?
                                        pp.text.blocks ?
                                            pp.text.blocks.map(elem =>
                                                elem.type === 'header' ?
                                                    <h3 key={elem.data.text}>{elem.data.text}</h3>
                                                : elem.type === 'paragraph' ?
                                                    <p key={elem.data.text}>{elem.data.text}</p>
                                                : elem.type === 'list' ?
                                                    elem.data.style === 'ordered' ?
                                                        <ol key={elem._id}>
                                                            {elem.data.items.map((it, index) => <li key={index}>{it}</li>)}
                                                        </ol>
                                                : 
                                                        <ul key={elem._id}>
                                                            {elem.data.items.map((it, index) => <li key={index}>{it}</li>)}
                                                        </ul>
                                                : elem.type === 'delimiter' ?
                                                    <h2 key='delimiter'>* * *</h2>
                                                : elem.type === 'quote' ?
                                                    <div key='quote'>
                                                        <div>
                                                            <span><h2>"</h2></span>
                                                            <span><p>{elem.data.text}</p></span>
                                                            <span><h2>"</h2></span>
                                                        </div>
                                                        <div>
                                                            <span><h2>By </h2></span>
                                                            <span><p>{elem.data.caption}</p></span>
                                                        </div>
                                                    </div>
                                                : elem.type === 'linkTool' ?
                                                    <a href={elem.data.link} key={elem.data.link}>
                                                        <b>{elem.data.link}</b>
                                                    </a>
                                                : elem.type === 'warning' ?
                                                    <div key='warning'>
                                                        <span><h2>! </h2></span>
                                                        <span>
                                                            <div>
                                                                <b>{elem.data.title}</b>
                                                            </div>
                                                            <div>
                                                                <p>{elem.data.message}</p>
                                                            </div>
                                                        </span>
                                                    </div>
                                                : null
                                            )
                                        : <p>{pp.text}</p>
                                    : null}

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