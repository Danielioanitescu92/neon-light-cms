import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/EditTAC.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTc, doneEditTc } from '../../../../actions/tcActions'
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

const EditTAC = ({ match }) => {
    
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
        <div className={styles.thelist}>
            {byWho ?
                // byWho.role === "admin" ?
                    termsConz ? termsConz.map((tc, index) => 
                        tc._id === match.params.id ?
                            <div key={tc._id} className={styles.item}>
                                <h3>Edit Terms and Conditions</h3>
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

export default EditTAC
