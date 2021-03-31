import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/EditAbout.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAb, doneEditAb } from '../../../../actions/aboutActions'
import { useHistory } from 'react-router-dom'

import EditorJs from 'react-editor-js';
import Header from '@editorjs/header'; 
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'; 
import Quote from '@editorjs/quote'; 
import LinkTool from '@editorjs/link'; 
import Marker from '@editorjs/marker';  
import Warning from '@editorjs/warning'; 
import Delimiter from '@editorjs/delimiter'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const EditAbout = ({ match }) => {
    const warnnn = <FontAwesomeIcon icon={faExclamationTriangle} />
    
    const byWho = useSelector(store => store.auth.user)
    const aboutz = useSelector(store => store.about.ab)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ id, setId ] = useState('')
    const [ text, setText ] = useState('')
    const [ data, setData ] = useState(null)

    useEffect(() => {
        dispatch(getAb())
        aboutz.forEach(ab => {
            if(ab._id === match.params.id) {
                setId(ab._id)
                setText(ab.text)
                setData(ab.text.blocks)
            }
        })
    }, [])

    const submitEdit = (e, index) => {
        e.preventDefault()
        const editedAbout = {
            _id: id,
            text: text,
        }
        const newAb = [...aboutz];
        newAb[index] = editedAbout;
        dispatch(doneEditAb(editedAbout))
        setId('')
        setText('')
        history.push('/settings/about us')
    }
    
    const instanceRef = useRef(null)

    async function handleSave() {
        const savedData = await instanceRef.current.save()
        setText(savedData)
    }

    return (
        byWho ?
            aboutz ? aboutz.map((ab, index) => 
                ab._id === match.params.id ?
                    <div className={styles.thelist}>
                        <div key={ab._id} className={styles.addpost}>
                            <b>Edit About Us</b>
                            <div className={styles.myedit}>
                                <EditorJs
                                    instanceRef={instance => instanceRef.current = instance} 
                                    tools={{ 
                                        header: Header, 
                                        paragraph: Paragraph,
                                        list: List,
                                        quote: Quote,
                                        linkTool: LinkTool,
                                        marker: Marker,
                                        warning: Warning,
                                        delimiter: Delimiter
                                    }}
                                    data={data}
                                    onChange={handleSave}
                                />
                            </div>
                            <button onClick={e => submitEdit(e, index)}>Submit</button>
                        </div>      

                        <h1>Preview:</h1>            
                        <div className={styles.post}>
                            <div className={styles.textblocks}>
                                {text ?
                                    text.blocks ?
                                        text.blocks.map(elem =>
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
                                    : null
                                : null}
                            </div>
                        </div>

                    </div>
                : null
            ) : null
        : null
    )
}

export default EditAbout
