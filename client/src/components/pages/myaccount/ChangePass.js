import React, { useState, useEffect } from 'react'
import styles from './styles/ChangePass.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getThisUser, donePass } from '../../../actions/userActions'
import { useHistory } from 'react-router-dom'

const ChangePass = ({ match }) => {
    
    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ id, setId ] = useState('')
    const [ avatar, setAvatar ] = useState('')
    const [ name, setName ] = useState('')
    const [ aboutme, setAboutme ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ oldPassword, setOldPassword ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const [ role, setRole ] = useState('')
    const [ register_date, setRegister_date ] = useState('')
    const [ facebook, setFacebook ] = useState('')
    const [ instagram, setInstagram ] = useState('')
    const [ twitter, setTwitter ] = useState('')
    const [ youtube, setYoutube ] = useState('')

    useEffect(() => {
        if(byWho) {
            dispatch(getThisUser(byWho.name))
            userz.forEach(user => {
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
        }
    }, [])

    const handleOldPass = e => setOldPassword(e.target.value)
    const handleNewPass = e => setNewPassword(e.target.value)

    const submitEdit = (e, index) => {
        e.preventDefault()
        const editedProfile = {
            _id: id,
            avatar: avatar,
            name: name,
            aboutme: aboutme,
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword,
            role: role,
            register_date: register_date,
            facebook: facebook,
            instagram: instagram,
            twitter: twitter,
            youtube: youtube
        }
        const newUserz = [...userz];
        newUserz[index] = editedProfile;
        dispatch(donePass(editedProfile))
        setId('')
        setAvatar('')
        setName('')
        setAboutme('')
        setEmail('')
        setOldPassword('')
        setNewPassword('')
        setRole('')
        setRegister_date('')
        setFacebook('')
        setInstagram('')
        setTwitter('')
        setYoutube('')
        history.push('/')
    }

    return (
        <div className={styles.thelist}>

            {userz ? userz.map((user, index) =>
                user._id === match.params.id ?
                    <form key={user._id} id="form" onSubmit={e => submitEdit(e, index)} className={styles.myform}>
                        <label>Old Password</label>
                        <input name="oldPassword" value={oldPassword} onChange={handleOldPass}></input>
                        <label>New Password</label>
                        <input name="newPassword" value={newPassword} onChange={handleNewPass}></input>
                        <input type="submit" value={"Submit"}  className={styles.myformsub}></input>
                    </form>
                : null
            ) : null}
            
        </div>
    )
}

export default ChangePass
