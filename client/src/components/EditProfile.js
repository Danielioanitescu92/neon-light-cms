import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, getThisUser, doneEditing } from '../actions/userActions'
import { useHistory } from 'react-router-dom'

const EditProfile = ({ match }) => {
    
    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ id, setId ] = useState('')
    const [ avatar, setAvatar ] = useState('')
    const [ name, setName ] = useState('')
    const [ aboutme, setAboutme ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ role, setRole ] = useState('')
    const [ register_date, setRegister_date ] = useState('')
    const [ facebook, setFacebook ] = useState('')
    const [ instagram, setInstagram ] = useState('')
    const [ twitter, setTwitter ] = useState('')
    const [ youtube, setYoutube ] = useState('')

    useEffect(() => {
        dispatch(getThisUser(byWho.name))
        // dispatch(getUsers())
        userz.map(user => {
            if(user._id === match.params.id) {
                setId(user._id)
                setAvatar(user.avatar)
                setName(user.name)
                setAboutme(user.aboutme)
                setEmail(user.email)
                setRole(user.role)
                setRegister_date(user.register_date)
                setFacebook(user.facebook)
                setInstagram(user.instagram)
                setTwitter(user.twitter)
                setYoutube(user.youtube)
            }
        })
    }, [dispatch])

    const handleAvatar = e => setAvatar(e.target.value)   
    const handleAboutMe = e => setAboutme(e.target.value)    
    const handleEmail = e => setEmail(e.target.value)     
    const handleFacebook = e => setFacebook(e.target.value)  
    const handleInstragram = e => setInstagram(e.target.value)  
    const handleTwitter = e => setTwitter(e.target.value)  
    const handleYoutube = e => setYoutube(e.target.value) 

    const submitEdit = (e, index) => {
        e.preventDefault()
        const editedProfile = {
            _id: id,
            avatar: avatar,
            name: name,
            aboutme: aboutme,
            email: email,
            role: role,
            register_date: register_date,
            facebook: facebook,
            instagram: instagram,
            twitter: twitter,
            youtube: youtube
        }
        const newUserz = [...userz];
        newUserz[index] = editedProfile;
        dispatch(doneEditing(editedProfile))
        setId('')
        setAvatar('')
        setName('')
        setAboutme('')
        setEmail('')
        setRole('')
        setRegister_date('')
        setFacebook('')
        setInstagram('')
        setTwitter('')
        setYoutube('')
        history.push('/myaccount')
    }

    return (
        <div className={styles.thelist}>

            {userz ? userz.map((user, index) =>
                user._id === match.params.id ?
                    <div key={user._id} className={styles.item}>
                        <h3>Edit Profile</h3>
                        <form id="form" onSubmit={e => submitEdit(e, index)}>
                            <label>Avatar URL:</label>
                            <input name="avatar" value={avatar} onChange={handleAvatar} />
                            <label>About me:</label>
                            <textarea name="aboutme" value={aboutme} onChange={handleAboutMe} />
                            <label>Email:</label>
                            <input name="email" value={email} onChange={handleEmail}></input>
                            <b>socials:</b> 
                            <div>
                                <label>Facebook:</label>
                                <input name="facebook" value={facebook} onChange={handleFacebook}></input>
                                <label>Instagram:</label>
                                <input name="instagram" value={instagram} onChange={handleInstragram}></input>
                                <label>Twitter:</label>
                                <input name="twitter" value={twitter} onChange={handleTwitter}></input>
                                <label>Youtube:</label>
                                <input name="youtube" value={youtube} onChange={handleYoutube}></input>
                            </div>
                            <input type="submit" value={"Submit"} ></input>
                        </form>
                    </div>
                : null
            ) : null}
            
        </div>
    )
}

export default EditProfile
