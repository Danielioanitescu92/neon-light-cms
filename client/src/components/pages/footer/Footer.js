import React from 'react'
import { useSelector } from "react-redux"
import styles from './styles/Footer.module.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    const byWho = useSelector(store => store.auth.user)

    return (
        <div className={byWho ? styles.footerNormal : styles.footerDown}>
            <div>
                <h4 className={styles.footerlink}>Developed by Daniel</h4>
            </div>
            <div>
                <h4 className={styles.footerlink}>© mern-cms 2020</h4>
            </div>
            <div className={styles.inline}>
                <Link className={styles.footerlink} to={'/'}> <h4>Home</h4> </Link>
                <Link className={styles.footerlink} to={'/privacypolicies'}> <h4>Privacy Policies</h4> </Link>                    
                <Link className={styles.footerlink} to={'/termsandconditions'}> <h4>Terms and Conditions</h4> </Link>                    
            </div>
        </div>
    )
}

export default Footer
