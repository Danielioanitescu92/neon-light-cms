import React, { useEffect } from 'react'
import styles from '../styles/BlogAbout.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAb } from '../../../../actions/aboutActions'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const BlogAbout = () => {
    const warnnn = <FontAwesomeIcon icon={faExclamationTriangle} />

    const byWho = useSelector(store => store.auth.user)
    const aboutz = useSelector(store => store.about.ab)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAb())
    }, [])

    useEffect(() => {
        dispatch(getAb())
    }, [byWho])

    return (
        <main className={styles.itemz}>
            {byWho ?
                aboutz ?
                    aboutz.map(ab => 
                        ab._id === "1" ?
                            <div key={ab._id} className={styles.post}>
                                <h1>About Us (for blog)</h1>
                                <div className={styles.textblocks}>
                                    {ab.text ?
                                        ab.text.blocks ?
                                            ab.text.blocks.map(elem =>
                                                elem.type === 'header' ?
                                                    <h3 className={styles.blockheader} key={elem.data.text}>{elem.data.text}</h3>
                                                : elem.type === 'paragraph' ?
                                                    <p className={styles.blockparagraph} key={elem.data.text}>{elem.data.text}</p>
                                                : elem.type === 'list' ?
                                                    elem.data.style === 'ordered' ?
                                                        <ol className={styles.blocklist} key={Math.floor(Math.random() * 99)}>
                                                            {elem.data.items.map(it => <li className={styles.listitem} key={it.slice('0,10')}>{it}</li>)}
                                                        </ol>
                                                : 
                                                        <ul className={styles.blocklist} key={Math.floor(Math.random() * 99)}>
                                                            {elem.data.items.map(it => <li className={styles.listitem} key={it.slice('0,10')}>{it}</li>)}
                                                        </ul>
                                                : elem.type === 'delimiter' ?
                                                    <h2 className={styles.delimiter} key='delimiter'>* * *</h2>
                                                : elem.type === 'quote' ?
                                                    <div className={styles.quote} key='quote'>
                                                        <div className={styles.quotequote}>
                                                            <h2 className={styles.firstq}>"</h2>
                                                            <blockquote>{elem.data.text}</blockquote>
                                                            <h2 className={styles.secondq}>"</h2>
                                                        </div>
                                                        <div className={styles.quoteby}>
                                                            <i>{elem.data.caption}</i>
                                                        </div>
                                                    </div>
                                                : elem.type === 'linkTool' ?
                                                    <a className={styles.linktool} href={elem.data.link} key={elem.data.link}>
                                                        <b>{elem.data.link}</b>
                                                    </a>
                                                : elem.type === 'warning' ?
                                                    <div className={styles.warning} key='warning'>
                                                        <h2 className={styles.warnsign}>{warnnn}</h2>
                                                        <div className={styles.warndiv}>
                                                            <b>{elem.data.title}</b>
                                                            <p>{elem.data.message}</p>
                                                        </div>
                                                    </div>
                                                : null
                                            )
                                        : <p>{ab.text}</p>
                                    : null}

                                </div>
                                {byWho ?
                                    byWho.role === "admin" ?
                                        <Link to={`/editabout/${ab._id}`}>
                                            <button className={styles.butt}>Edit</button>
                                        </Link>
                                    : null
                                : null}
                            </div>
                        : null
                    )
                : null
            : null}
        </main>
    )
}

export default BlogAbout