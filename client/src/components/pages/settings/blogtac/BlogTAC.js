import React, { useEffect } from 'react'
import styles from '../styles/BlogTAC.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTc } from '../../../../actions/tcActions'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const BlogTAC = () => {
    const warnnn = <FontAwesomeIcon icon={faExclamationTriangle} />

    const byWho = useSelector(store => store.auth.user)
    const termsConz = useSelector(store => store.termscons.tc)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTc())
    }, [])

    useEffect(() => {
        dispatch(getTc())
    }, [byWho])

    return (
        <main className={styles.itemz}>
            {byWho ?
                termsConz ?
                    termsConz.map(tc => 
                        tc._id === "1" ?
                            <div key={tc._id} className={styles.post}>
                                <h1>Terms and Conditions (for blog)</h1>
                                <div className={styles.textblocks}>
                                    {tc.text ?
                                        tc.text.blocks ?
                                            tc.text.blocks.map(elem =>
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
                                        : <p>{tc.text}</p>
                                    : null}

                                </div>
                                {byWho ?
                                    byWho.role === "admin" ?
                                        <Link to={`/edittc/${tc._id}`}>
                                            <p className={styles.butt}>Edit</p>
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

export default BlogTAC