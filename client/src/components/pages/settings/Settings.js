import React from 'react'
import styles from './styles/Settings.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Settings = () => {

    const byWho = useSelector(store => store.auth.user)

    return (
        byWho ?
            <main className={styles.mymain}>
                <Link to={'/settings/about us'}>
                    <h3>About Us</h3>
                </Link>
                <Link to={'/settings/blog privacy policies'}>
                    <h3>Privacy Policies</h3>
                </Link>
                <Link to={'/settings/blog terms and conditions'}>
                    <h3>Terms and Conditions</h3>
                </Link>
                <Link to={'/settings/contact developer'}>
                    <h3>Contact developer</h3>
                </Link>
            </main>
        : null
    )
}

export default Settings
