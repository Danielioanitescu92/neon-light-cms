import React from 'react'
import styles from './Components.module.css'
import { useSelector } from 'react-redux'
import MyAccount from './MyAccount'
import SubsList from './SubsList'
import UsersList from './UsersList'
import AddPost from './AddPost'
import PostsList from './PostsList'

const MyList = () => {     
    
    const isAuth = useSelector(store => store.auth.isAuthenticated)

    return (
        <div>

            {isAuth ? 

                <div className={styles.container}>

                    <MyAccount/>
                    
                    <SubsList/>
                    
                    <UsersList/>

                    <AddPost/>

                    <PostsList/>

                </div>

            : <h3>Please log in to manage items</h3>}

        </div>
    )
}

export default MyList
