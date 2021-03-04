import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPp, doneEditPp } from '../actions/ppActions'
import { useHistory } from 'react-router-dom'

const EditPp = ({ match }) => {
    
    const byWho = useSelector(store => store.auth.user)
    const privPolz = useSelector(store => store.privpol.pp)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ id, setId ] = useState('')
    const [ text, setText ] = useState('')

    useEffect(() => {
        dispatch(getPp())
        privPolz.map(pp => {
            if(pp._id === match.params.id) {
                setId(pp._id)
                setText(pp.text)
            }
        })
    }, [dispatch])
        
    const handleText = e => setText(e.target.value) 

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

    return (
        <div className={styles.thelist}>
            {byWho ?
                // byWho.role === "admin" ?
                    privPolz ? privPolz.map((pp, index) => 
                        pp._id === match.params.id ?
                            <div key={pp._id} className={styles.item}>
                                <h3>Edit Privacy Policies</h3>
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

export default EditPp
