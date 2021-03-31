import React, { useState } from 'react'
import styles from './styles/AddUser.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addUser } from '../../../actions/userActions'

const AddUser = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    
    const filezLoading = useSelector(store => store.file.loadingAv)
    const userzLoading = useSelector(store => store.user.loading)
    const piczLoading = useSelector(store => store.file.loadingIt)
    const itemzLoading = useSelector(store => store.item.loading)

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ role, setRole ] = useState('basic')

    const handleChangeName = e => setName(e.target.value)
    const handleChangeEmail = e => setEmail(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)
    const handleChangeRole = e => setRole(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        const newUser = {
            name: name,
            email: email,
            password: password,
            role: role
        }
        dispatch(addUser(newUser))
        setName('')
        setEmail('')
        setPassword('')
        setRole('basic')
        history.push(`/users`)
    }

    return (
        <section className={styles.filtersDiv}>

            <header>
                <h1>ADD NEW USER</h1>
            </header>
                            
            <div className={styles.divider}></div>

            <form className={styles.searchform} onSubmit={handleSubmit}>
                <label>Name</label>
                <input className={styles.anyinput}
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Name'
                    value={name}
                    onChange={handleChangeName}
                ></input>
                <label>Email</label>
                <input className={styles.anyinput}
                    name='email'
                    id='email'
                    placeholder='Email'
                    value={email}
                    onChange={handleChangeEmail}
                ></input>
                <label>Password</label>
                <input className={styles.anyinput}
                    name='password'
                    id='password'
                    placeholder='Password'
                    value={password}
                    onChange={handleChangePassword}
                ></input>
                <label>Role</label>
                <div className={styles.underform}>
                    <select  className={styles.anyinput} id="role" name="role" value={role} onChange={handleChangeRole}>
                        <option value="basic">Basic</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <input type='submit' value='Register' disabled={piczLoading ? true : itemzLoading ? true : userzLoading ? true : filezLoading ? true : false}/>
            </form>
        </section>
    )
}

export default AddUser
