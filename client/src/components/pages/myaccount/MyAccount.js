import React, { useEffect, useState } from 'react'
import styles from './styles/MyAccount.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PostsList from '../home/PostsList'
import unknown from '../../../unknown.png'

import { getAvatarsFile, addUserFile, deleteAvatarFile } from '../../../actions/fileActions'
import { doneEditing } from '../../../actions/userActions'

const MyAccount = ({match}) => {    
    const dispatch = useDispatch()
    const byWho = useSelector(store => store.auth.user)
    const filez = useSelector(store => store.file.files.avatars)
    const piczLoading = useSelector(store => store.file.loadingAv)

    const [ myFile, setMyFile ] = useState('')
    const [ myUser, setMyUser ] = useState()

    useEffect(() => {
        if(byWho) {
            setMyUser(byWho)
        }
    }, [byWho])

    useEffect(() => {
        if(byWho) {
            if(byWho.avatar !== 'unknown.png') {
                dispatch(getAvatarsFile([byWho.avatar]))
            }
        }
    }, [myUser])

    const onFileChange = e => setMyFile(e.target.files[0])

    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', myFile)
        const editedProfile = {
            _id: byWho._id,
            avatar: myFile.name,
            name: byWho.name,
            aboutme: byWho.aboutme,
            email: byWho.email,
            role: byWho.role,
            register_date: byWho.register_date,
            facebook: byWho.facebook,
            instagram: byWho.instagram,
            twitter: byWho.twitter,
            youtube: byWho.youtube
        }
        setMyUser(editedProfile)
        dispatch(addUserFile(formData, editedProfile))
    }

    const handleDelAvatar = e => {
        e.preventDefault()
        const editedProfile = {
            _id: byWho._id,
            avatar: 'unknown.png',
            name: byWho.name,
            aboutme: byWho.aboutme,
            email: byWho.email,
            role: byWho.role,
            register_date: byWho.register_date,
            facebook: byWho.facebook,
            instagram: byWho.instagram,
            twitter: byWho.twitter,
            youtube: byWho.youtube
        }
        setMyUser(editedProfile)
        dispatch(doneEditing(editedProfile))
        dispatch(deleteAvatarFile(e.target.id))
    }

    return (
        <div>

            {byWho ?
                <div key={byWho._id} className={styles.myprofile}>
                    
                    {myUser ?
                        myUser.avatar === 'unknown.png' ?
                            <div>
                                <img src={unknown} alt={byWho.name} width="50" height="50"></img>
                                <div>
                                    <input name="myFile" type="file" placeholder="Select Image" onChange={onFileChange}></input>
                                    <button disabled={piczLoading ? true : false} onClick={handleSubmit}>Add image</button>
                                </div>
                            </div>
                        : filez ?
                            filez.map(file =>
                                file === null ?
                                    null
                                : file.filename === myUser.avatar ?
                                    <div key={file._id}>
                                        <img src={`/api/uploads/image/${file.filename}`} alt={byWho.name} width="50" height="50"></img>
                                        <button disabled={piczLoading ? true : false} id={file._id} onClick={handleDelAvatar}>Delete image</button>
                                    </div>
                                : null
                            )
                        : null
                    : null}

                    <br></br>
                    <b>Name:</b> <p>{byWho.name}</p>
                    <b>Aboutme:</b> <p>{byWho.aboutme}</p>
                    <b>Email:</b> <p>{byWho.email}</p>
                    <b>Role:</b> <p>{byWho.role}</p>
                    <b>Register date:</b> <p>{byWho.register_date.slice(0,10)} {byWho.register_date.slice(11,19)}</p>
                    <b>socials:</b>
                        {byWho.facebook ? <a href={byWho.facebook} target="_blank"> Facebook </a> : null}
                        {byWho.instagram ? <a href={byWho.instagram} target="_blank"> Instagram </a> : null}
                        {byWho.twitter ? <a href={byWho.twitter} target="_blank"> Twitter </a> : null}
                        {byWho.youtube ? <a href={byWho.youtube} target="_blank"> Youtube </a> : null}
                    
                    <Link to={`/editprofile/${byWho._id}`}>
                        <p>Edit</p>
                    </Link>

                    <Link to={`/changepass/${byWho._id}`}>
                        <p>Change password</p>
                    </Link>
                    
                    <PostsList match={match}/>

                </div>
            : null}

        </div>
    )
}

export default MyAccount
