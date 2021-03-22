import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/EditPP.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPp, doneEditPp } from '../../../../actions/ppActions'
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

const EditPp = ({ match }) => {
    
    const byWho = useSelector(store => store.auth.user)
    const privPolz = useSelector(store => store.privpol.pp)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ id, setId ] = useState('')
    const [ text, setText ] = useState('')
    const [ data, setData ] = useState(null)

    useEffect(() => {
        dispatch(getPp())
        privPolz.map(pp => {
            if(pp._id === match.params.id) {
                setId(pp._id)
                setText(pp.text)
                setData(pp.text.blocks)
            }
        })
    }, [dispatch])

    const submitEdit = (e, index) => {
        e.preventDefault()
        const editedPp = {
            _id: id,
            text: text,
        }
        const newPp = [...privPolz];
        newPp[index] = editedPp;
        dispatch(doneEditPp(editedPp))
        setId('')
        setText('')
        history.push('/settings/blog privacy policies')
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
                    privPolz ? privPolz.map((pp, index) => 
                        pp._id === match.params.id ?
                            <div key={pp._id} className={styles.item}>
                                <h3>Edit Privacy Policies</h3>
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

export default EditPp
