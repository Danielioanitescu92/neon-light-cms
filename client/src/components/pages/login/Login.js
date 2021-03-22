import React, { useState, useEffect } from 'react'
import ForgotPass from '../login/ForgotPass'
import styles from './styles/Login.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../../actions/authActions'
import { clearErrors } from '../../../actions/errorActions'
import { v4 as uuidv4 } from 'uuid'

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
            localStorage.setItem(`userId`, uuidv4())
        }
    }
    
    const toggleForg = () => {
        dispatch(clearErrors())
        setIsOpenForg(!isOpenForg)
    }

    return (
        <div>
            <div>
                {msg ? <p>{msg}</p> : null}
            </div>
            <div  className={styles.collapse}>
                <div>
                    <form onSubmit={onSubmit}>
                        <label>Email</label>
                        <input 
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Email'
                            onChange={handleChangeEmail}
                        ></input>
                        <label>Password</label>
                        <input 
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            onChange={handleChangePassword}
                        ></input>
                        <input type='submit' value='Login' disabled={userLoading ? true : false} />
                    </form>  
                </div>               
                <div>
                    {!isAuth ? <button onClick={toggleForg}>Forgot Pass</button> : null}
                </div>
            </div>
                {isOpenForg ? <ForgotPass/> : null}
        </div>
    )
}  

export default Login
