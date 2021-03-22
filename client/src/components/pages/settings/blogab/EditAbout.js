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

const EditAbout = ({ match }) => {
    
    const byWho = useSelector(store => store.auth.user)
    const aboutz = useSelector(store => store.about.ab)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ id, setId ] = useState('')
    const [ text, setText ] = useState('')
    const [ data, setData ] = useState(null)

    useEffect(() => {
        dispatch(getAb())
        aboutz.map(ab => {
            if(ab._id === match.params.id) {
                setId(ab._id)
                setText(ab.text)
                setData(ab.text.blocks)
            }
        })
    }, [dispatch])

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
        <div className={styles.thelist}>
            {byWho ?
                // byWho.role === "admin" ?
                    aboutz ? aboutz.map((ab, index) => 
                        ab._id === match.params.id ?
                            <div key={ab._id} className={styles.item}>
                                <h3>Edit About Us</h3>
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
                        : null
                    ) : null
                // : null
            : null}
        </div>
    )
}

export default EditAbout
