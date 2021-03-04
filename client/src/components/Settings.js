import React from 'react'
import styles from './Components.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Settings = () => {

    const byWho = useSelector(store => store.auth.user)

    return (
        <div>
            {byWho?
                <div>
                    <div>
                        <Link to={'/settings/about us'}> <h4>About Us</h4> </Link>
                    </div>
                    <div>
                        <Link to={'/settings/blog privacy policies'}> <h4>Privacy Policies</h4> </Link>
                    </div>
                    <div>
                        <Link to={'/settings/blog terms and conditions'}> <h4>Terms and Conditions</h4> </Link>
                    </div>
                    <div>
                        <Link to={'/settings/contact developer'}> <h4>Contact developer</h4> </Link>
                    </div>
                </div>
            : null}            
        </div>
    )
}

export default Settings
