import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAb, doneEditAb } from '../actions/aboutActions'
import { useHistory } from 'react-router-dom'

const EditAbout = ({ match }) => {
    
    const byWho = useSelector(store => store.auth.user)
    const aboutz = useSelector(store => store.about.ab)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ id, setId ] = useState('')
    const [ text, setText ] = useState('')

    useEffect(() => {
        dispatch(getAb())
        aboutz.map(ab => {
            if(ab._id === match.params.id) {
                setId(ab._id)
                setText(ab.text)
            }
        })
    }, [dispatch])
        
    const handleText = e => setText(e.target.value) 

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

    return (
        <div className={styles.thelist}>
            {byWho ?
                // byWho.role === "admin" ?
                    aboutz ? aboutz.map((ab, index) => 
                        ab._id === match.params.id ?
                            <div key={ab._id} className={styles.item}>
                                <h3>Edit About Us</h3>
                                <form id="form" onSubmit={e => submitEdit(e, index)}>
                                    <textarea name="text" value={text} onChange={handleText} />
                                    <input type="submit" value={"Submit"} ></input>
                                </form>
                            </div>
                        : null
                    ) : null
                // : null
            : null}
        </div>
    )
}

export default EditAbout
