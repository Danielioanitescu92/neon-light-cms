import React, { useState, useEffect } from 'react'
import ForgotPass from '../login/ForgotPass'
import styles from './styles/Login.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../../actions/authActions'
import { clearErrors } from '../../../actions/errorActions'

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ msg, setMsg ] = useState(null)
    const [ isOpenForg, setIsOpenForg ] = useState(false)
    const dispatch = useDispatch()

    const handleChangeEmail = e => setEmail(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)
    
    const isAuth = useSelector(store => store.auth.isAuthenticated)
    const userLoading = useSelector(store => store.auth.isLoading)
    const err = useSelector(store => store.error)

    useEffect(() => {
        if(err.id === 'LOGIN_FAIL') {
            setMsg(err.msg.msg)
        } else {
            setMsg(null)
        }
    }, [err, isAuth])

    const onSubmit = e => {
        e.preventDefault()
        const user = {
            email, password
        }
        dispatch(login(user))
        if (!localStorage.getItem(`userId`)) {
            localStorage.setItem(`userId`, Math.floor(Math.random() * 999999))
        }
    }
    
    const toggleForg = () => {
        dispatch(clearErrors())
        setIsOpenForg(!isOpenForg)
    }

    return (
        <div>
            <div className={styles.logger}>
                <div className={styles.blurer}>
                    <div className={styles.former}>
                        {msg ? <h3 className={styles.msg}>{msg}</h3> : null}
                        <form>
                            <input 
                                className={styles.formeripnut}
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Email'
                                onChange={handleChangeEmail}
                            ></input>
                            <input 
                                className={styles.formeripnut}
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Password'
                                onChange={handleChangePassword}
                            ></input>
                            <input className={styles.formersubmit} onClick={onSubmit} type='submit' value='Login' disabled={userLoading ? true : false} />
                        </form>
                        {!isAuth ? <p className={styles.formerforg} onClick={toggleForg}>Forgot password?</p> : null}
                        {isOpenForg ? <ForgotPass/> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}  

export default Login
