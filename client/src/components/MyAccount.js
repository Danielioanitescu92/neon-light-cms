import React from 'react'
import styles from './Components.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostsList from './PostsList'

const MyAccount = ({match}) => {    
    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)

    return (
        <div>

            {byWho ?
                userz ?
                    userz.results ?
                        null
                    : userz.map((user, index) =>
                        user._id === byWho._id ? 
                            <div key={user._id} className={styles.myprofile}>
                                
                                <div>
                                    <img src={user.avatar} alt={user.avatar} width="50" height="50"></img>
                                </div>
            
                                <br></br>
                                <b>Name:</b> <p>{user.name}</p>
                                <b>Aboutme:</b> <p>{user.aboutme}</p>
                                <b>Email:</b> <p>{user.email}</p>
                                <b>Role:</b> <p>{user.role}</p>
                                <b>Register date:</b> <p>{user.register_date.slice(0,10)} {user.register_date.slice(11,19)}</p>
                                <b>socials:</b>
                                    {user.facebook ? <a href={user.facebook} target="_blank"> Facebook </a> : null}
                                    {user.instagram ? <a href={user.instagram} target="_blank"> Instagram </a> : null}
                                    {user.twitter ? <a href={user.twitter} target="_blank"> Twitter </a> : null}
                                    {user.youtube ? <a href={user.youtube} target="_blank"> Youtube </a> : null}
                                
                                <Link to={`/editprofile/${user._id}`}>
                                    <p>Edit</p>
                                </Link>
            
                                <Link to={`/changepass/${user._id}`}>
                                    <p>Change password</p>
                                </Link>
                                
                                <PostsList match={match}/>
            
                            </div>
                        : null
                    )
                : null
            : null}

        </div>
    )
}

export default MyAccount
