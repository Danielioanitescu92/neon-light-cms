import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <div>
            <div className={styles.footer}>
                <div>
                    <h4>Developed by Daniel</h4>
                </div>
                <div>
                    <h4>© mern-cms 2020</h4>
                </div>
                <div className={styles.inline}>
                    <div>
                        <Link to={'/'}> <h4>Home</h4> </Link>
                    </div>
                    <div>
                        <Link to={'/privacypolicies'}> <h4>Privacy Policies</h4> </Link>                    
                    </div>
                    <div>
                        <Link to={'/termsandconditions'}> <h4>Terms and Conditions</h4> </Link>                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
