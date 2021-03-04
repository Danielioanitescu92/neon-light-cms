import React, { useState } from 'react'
import styles from './Components.module.css'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addUser } from '../actions/userActions'

const AddUser = () => {
    const dispatch = useDispatch()
    const history = useHistory();

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
        <div className={styles.collapse}>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input 
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Name'
                        value={name}
                        onChange={handleChangeName}
                    ></input>
                    <label>Email</label>
                    <input
                        name='email'
                        id='email'
                        placeholder='Email'
                        value={email}
                        onChange={handleChangeEmail}
                    ></input>
                    <label>Password</label>
                    <input
                        name='password'
                        id='password'
                        placeholder='Password'
                        value={password}
                        onChange={handleChangePassword}
                    ></input>
                    <label>Role</label>
                    <select id="role" name="role" value={role} onChange={handleChangeRole}>
                        <option value="basic">Basic</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input type='submit' value='Register' />
                </form>
            </div>
        </div>
    )
}

export default AddUser
