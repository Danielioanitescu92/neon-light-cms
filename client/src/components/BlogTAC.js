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
                                    {/* <p>{tc.text}</p> */}
                                    
                                    {tc.text ?
                                        tc.text.blocks ?
                                            tc.text.blocks.map(elem =>
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
                                        : <p>{tc.text}</p>
                                    : null}

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