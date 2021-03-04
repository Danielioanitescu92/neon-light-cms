import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTc, doneEditTc } from '../actions/tcActions'
import { useHistory } from 'react-router-dom'

const EditTAC = ({ match }) => {
    
    const byWho = useSelector(store => store.auth.user)
    const termsConz = useSelector(store => store.termscons.tc)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ id, setId ] = useState('')
    const [ text, setText ] = useState('')

    useEffect(() => {
        dispatch(getTc())
        termsConz.map(tc => {
            if(tc._id === match.params.id) {
                setId(tc._id)
                setText(tc.text)
            }
        })
    }, [dispatch])
        
    const handleText = e => setText(e.target.value) 

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

    return (
        <div className={styles.thelist}>
            {byWho ?
                // byWho.role === "admin" ?
                    termsConz ? termsConz.map((tc, index) => 
                        tc._id === match.params.id ?
                            <div key={tc._id} className={styles.item}>
                                <h3>Edit Terms and Conditions</h3>
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

export default EditTAC
