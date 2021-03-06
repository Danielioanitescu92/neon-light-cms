import React, { useState, useEffect } from 'react'
import styles from './styles/EditProfile.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { doneEditing } from '../../../actions/userActions'
import { useHistory } from 'react-router-dom'

const EditProfile = ({ match }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const byWho = useSelector(store => store.auth.user)
    const userzLoading = useSelector(store => store.user.loading)

    const [ myUser, setMyUser ] = useState()

    useEffect(() => {
        if(byWho) {
            setMyUser(byWho)
        }
    }, [byWho])

    const handleChange = e => {
        const { name, value } = e.target
        setMyUser(prevState => ({...prevState, [name]: value}))
    }

    const submitEdit = e => {
        e.preventDefault()
        dispatch(doneEditing(myUser))
        if(!userzLoading) { history.push('/myaccount') }
    }

    return (
        <div className={styles.thelist}>

            {myUser ?
                <form id="form" onSubmit={submitEdit} className={styles.myform}>
                    <label>About me:</label>
                    <textarea name="aboutme" value={myUser.aboutme} onChange={handleChange} />
                    <label>Email:</label>
                    <input name="email" value={myUser.email} onChange={handleChange}></input>
                    <label>Facebook:</label>
                    <input name="facebook" value={myUser.facebook} onChange={handleChange}></input>
                    <label>Instagram:</label>
                    <input name="instagram" value={myUser.instagram} onChange={handleChange}></input>
                    <label>Twitter:</label>
                    <input name="twitter" value={myUser.twitter} onChange={handleChange}></input>
                    <label>Youtube:</label>
                    <input name="youtube" value={myUser.youtube} onChange={handleChange}></input>
                    <input type="submit" value={"Submit"}  className={styles.myformsub}></input>
                </form>
            : null}
            
        </div>
    )
}

export default EditProfile
