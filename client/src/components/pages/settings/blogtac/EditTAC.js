import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/EditTAC.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTc, doneEditTc } from '../../../../actions/tcActions'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

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

const EditTAC = ({ match }) => {
    const warnnn = <FontAwesomeIcon icon={faExclamationTriangle} />
    
    const byWho = useSelector(store => store.auth.user)
    const termsConz = useSelector(store => store.termscons.tc)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ id, setId ] = useState('')
    const [ text, setText ] = useState('')
    const [ data, setData ] = useState(null)

    useEffect(() => {
        dispatch(getTc())
        termsConz.map(tc => {
            if(tc._id === match.params.id) {
                setId(tc._id)
                setText(tc.text)
                setData(tc.text.blocks)
            }
        })
    }, [dispatch])

    const submitEdit = (e, index) => {
        e.preventDefault()
        const editedTc = {
            _id: id,
            text: text,
        }
        const newTc = [...termsConz];
        newTc[index] = editedTc;
        dispatch(doneEditTc(editedTc))
        setId('')
        setText('')
        history.push('/settings/blog terms and conditions')
    }
    
    const instanceRef = useRef(null)

    async function handleSave() {
        const savedData = await instanceRef.current.save()
        setText(savedData)
    }

    return (
        byWho ?
            termsConz ? termsConz.map((tc, index) => 
                tc._id === match.params.id ?
                    <div className={styles.thelist}>
                        <div key={tc._id} className={styles.addpost}>
                            <b>Edit Terms and Conditions</b>
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
                                                    <ol className={styles.blocklist} key={uuidv4()}>
                                                        {elem.data.items.map(it => <li className={styles.listitem} key={it.slice('0,10')}>{it}</li>)}
                                                    </ol>
                                            : 
                                                    <ul className={styles.blocklist} key={uuidv4()}>
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

export default EditTAC
