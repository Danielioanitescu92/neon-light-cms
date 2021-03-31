import React, { useEffect, useState } from 'react'
import styles from './styles/MyAccount.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PostsList from '../home/PostsList'
import unknown from '../../../unknown.png'

import { getAvatarsFile, addUserFile, deleteAvatarFile } from '../../../actions/fileActions'
import { doneEditing } from '../../../actions/userActions'
import { editAvatar } from '../../../actions/authActions'

import ViewsSource from '../dashboard/ViewsSource'
import ViewsTime from '../dashboard/ViewsTime'
import ViewsUsers from '../dashboard/ViewsUsers'
import CountAll from '../dashboard/CountAll'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

const MyAccount = ({match}) => {    
    const fb = <FontAwesomeIcon icon={faFacebook} />
    const inst = <FontAwesomeIcon icon={faInstagram} />
    const tw = <FontAwesomeIcon icon={faTwitter} />
    const yt = <FontAwesomeIcon icon={faYoutube} />
    const editacc = <FontAwesomeIcon icon={faEdit} />
    const passacc = <FontAwesomeIcon icon={faKey} />
    const delav = <FontAwesomeIcon icon={faTimesCircle} />

    const dispatch = useDispatch()
    const byWho = useSelector(store => store.auth.user)
    const filez = useSelector(store => store.file.files.avatars)
    const piczLoading = useSelector(store => store.file.loadingAv)

    const [ myFile, setMyFile ] = useState('')
    const [ myUser, setMyUser ] = useState()

    useEffect(() => {
        if(byWho) {
            setMyUser(byWho)
            if(byWho.avatar !== 'unknown.png') {
                dispatch(getAvatarsFile([byWho.avatar]))
            }
        }
    }, [byWho])

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
        if(e.target.id) {
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
            dispatch(editAvatar(byWho._id, 'unknown.png'))
            dispatch(doneEditing(editedProfile))
            dispatch(deleteAvatarFile(e.target.id))
        }
    }

    return (
        byWho ?
            <div key={byWho._id} className={styles.myprofile}>

                <div className={styles.accinfos}>
                
                    {/* AVATAR */}
                    {myUser ?
                        myUser.avatar === 'unknown.png' ?
                            <div className={styles.relav}>
                                <div className={styles.picdiv}>
                                    <img className={styles.avatar} src={unknown} alt={byWho.name} width="50" height="50"></img>
                                </div>
                                <div className={styles.chooseavatar}>
                                    <div className={styles.fileInputDiv}>
                                        Select
                                        <input name="myFile" type="file" placeholder="Select Image" onChange={onFileChange}></input>
                                    </div>
                                    <button disabled={piczLoading ? true : false} onClick={handleSubmit}>Add image</button>
                                </div>
                            </div>
                        : filez ?
                            filez.map(file =>
                                file === null ?
                                    null
                                : file.filename === myUser.avatar ?
                                    <div key={file._id} className={styles.relav}>
                                        <div key={file._id} className={styles.picdiv}>
                                            <img className={styles.avatar} src={`/api/uploads/image/${file.filename}`} alt={byWho.name} width="50" height="50"></img>
                                        </div>
                                        <button className={styles.delavatar} disabled={piczLoading ? true : false} id={file.filename} onClick={handleDelAvatar}>{delav}</button>
                                    </div>
                                : <img className={styles.avatar} src={unknown} alt={byWho.name} width="50" height="50"></img>
                            )
                        : <img className={styles.avatar} src={unknown} alt={byWho.name} width="50" height="50"></img>
                    : <img className={styles.avatar} src={unknown} alt={byWho.name} width="50" height="50"></img>}
                    {/* AVATAR */}

                    <div className={styles.info}>
                        {byWho.facebook ? <a className={styles.social} href={`http://${byWho.facebook}`}> {fb} Facebook </a> : null}
                        {byWho.instagram ? <a className={styles.social} href={`http://${byWho.instagram}`}> {inst} Instagram </a> : null}
                        {byWho.twitter ? <a className={styles.social} href={`http://${byWho.twitter}`}> {tw} Twitter </a> : null}
                        {byWho.youtube ? <a className={styles.social} href={`http://${byWho.youtube}`}> {yt} Youtube </a> : null}
                    </div>

                    <div className={styles.underinfo}>
                        <h3>ABOUT ME:</h3> <p>{byWho.aboutme}</p>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.underinfo}>
                        <h3>EMAIL:</h3> <p>{byWho.email}</p>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.underinfo}>
                        <h3>SINCE:</h3> <p>{byWho.register_date.slice(0,10)} {byWho.register_date.slice(11,19)}</p>
                    </div>
                    <div className={styles.divider}></div>
                    
                </div>
                


                <div className={styles.rest}>

                    <div className={styles.toprest}>

                        <div className={styles.userinfo}>
                            <div className={styles.info} style={{margin: '0px'}}>
                                <h1 className={styles.detail}>{byWho.name}</h1>
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.detail}>{byWho.role}</h3>
                            </div>
                        </div>

                        <div className={styles.userbuttons}>
                            <Link className={styles.alink} to={`/editprofile/${byWho._id}`}>
                                <p className={styles.plink}> {editacc} Edit Account</p>
                            </Link>
                            <Link className={styles.alink} to={`/changepass/${byWho._id}`}>
                                <p className={styles.plink}> {passacc} Change password</p>
                            </Link>
                        </div>

                    </div>

                    <div className={styles.listings}>
                        <PostsList match={match}/>

                        <div className={styles.userdash}>
                            <CountAll match={match}/>
                            <div className={styles.divider}></div>
                            <ViewsSource match={match}/>
                            <div className={styles.divider}></div>
                            <ViewsTime match={match}/>
                            <div className={styles.divider}></div>
                            <ViewsUsers match={match}/>
                        </div>
                    </div>

                </div>

            </div>
        : null
    )
}

export default MyAccount
