import React, { useState, useEffect } from 'react'
import styles from './styles/UsersList.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSpecificUsers, deleteUser, doneEditing } from '../../../actions/userActions'
import { getAvatarsFile, deleteAvatarFile, goAvatarsFile } from '../../../actions/fileActions'

import unknown from '../../../unknown.png'

import AddUser from './AddUser'
import MessUsers from './MessUsers'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const UsersList = ({ match }) => {
    const delpost = <FontAwesomeIcon icon={faTrash} />

    const dispatch = useDispatch()
    const history = useHistory();

    const byWho = useSelector(store => store.auth.user)

    const previous = useSelector(store => store.user.users.previous)
    const userz = useSelector(store => store.user.users.results)
    const next = useSelector(store => store.user.users.next)
    const filez = useSelector(store => store.file.files.avatars)
    const filezLoading = useSelector(store => store.file.loadingAv)
    const userzLoading = useSelector(store => store.user.loading)

    const [ query, setQuery ] = useState('')
    const [ search, setSearch ] = useState(match.params.search ? match.params.search : null)
    const [ rl, setRl ] = useState(match.params.rl ? match.params.rl : null)
    const [ page, setPage ] = useState(match.params.page ? match.params.page : null)
    const [ sort, setSort ] = useState(match.params.sort ? match.params.sort : null)
    const [ finder, setFinder ] = useState(false)
    const [ isOpenFilters, setIsOpenFilters ] = useState(false)
    const [ isOpenRl, setIsOpenRl ] = useState(false)
    const [ isOpenSort, setIsOpenSort ] = useState(false)

    const jump = (search, rl, page, sort) => {

        if(byWho) {
            if (!search && !rl && !page && !sort) { // if everything is NULL (USERS) / or coming from another page (to USERS)
                history.push(`/users`)
            }                
            if (search || rl || page || sort) { // if one of them isn't NULL (changing any filter)
                history.push(        
                    search ?
                        rl ?
                            page ?
                                sort ?
                                    `/users/search/${search}/rl/${rl}/page/${page}/sort/${sort}`
                                : `/users/search/${search}/rl/${rl}/page/${page}`
                            : sort ?
                                `/users/search/${search}/rl/${rl}/sort/${sort}`
                            : `/users/search/${search}/rl/${rl}`
                        : page ?
                            sort ?
                                `/users/search/${search}/page/${page}/sort/${sort}`
                            : `/users/search/${search}/page/${page}`
                        : sort ?
                            `/users/search/${search}/sort/${sort}`
                        : `/users/search/${search}`
            
                    : rl ?
                        page ?
                            sort ?
                                `/users/rl/${rl}/page/${page}/sort/${sort}`
                            : `/users/rl/${rl}/page/${page}`
                        : sort ?
                            `/users/rl/${rl}/sort/${sort}`
                        : `/users/rl/${rl}`
            
                    : page ?
                        sort ?
                            `/users/page/${page}/sort/${sort}`
                        : `/users/page/${page}`
            
                    : sort ?
                        `/users/sort/${sort}`
            
                    : `/users`
                )
            }
            dispatch(getSpecificUsers(search, rl, page, sort))
        }
    }

    useEffect(() => {
        if(byWho) {
            if(window.location.pathname === '/users') {
                setQuery('')
                setSearch(null)
                setRl(null)
                setPage(null)
                setSort(null)
            }
        }
    }, [window.location.pathname])

    useEffect(() => {
        jump(search, rl, page, sort)
    }, [byWho, finder])

    useEffect(() => {
        if(!filezLoading) {
            if(!userzLoading) {
                if(userz) {
                    dispatch(goAvatarsFile())
                    if(userz.length > 0) {
                        userz.map(user =>
                            user.avatar !== 'unknown.png' ?
                                dispatch(getAvatarsFile([user.avatar]))
                            : null
                        )
                    }
                }
            }
        }
    }, [userz])

    const handleDelUser = e => {
        if(e.target.id) {
            if(e.target.value) {
                dispatch(deleteUser(e.target.id))
                if(e.target.value !== 'unknown.png') {
                    if(!filezLoading) {
                        if(!userzLoading) {
                            dispatch(deleteAvatarFile(e.target.value))
                        }
                    }
                }
                setFinder(!finder)
            }
        }
    }

    const promote = e => {
        userz.forEach((usr, index) => {
            if(usr._id === e.target.id) {
                const editedProfile = {
                    _id: usr._id,
                    avatar: usr.avatar,
                    name: usr.name,
                    aboutme: usr.aboutme,
                    email: usr.email,
                    role: 'admin',
                    register_date: usr.register_date,
                    facebook: usr.facebook,
                    instagram: usr.instagram,
                    twitter: usr.twitter,
                    youtube: usr.youtube
                }
                const newUserz = [...userz];
                newUserz[index] = editedProfile;
                dispatch(doneEditing(editedProfile))
                setFinder(!finder)
            }
        })
    }

    const demote = e => {
        userz.forEach((usr, index) => {
            if(usr._id === e.target.id) {
                const editedProfile = {
                    _id: usr._id,
                    avatar: usr.avatar,
                    name: usr.name,
                    aboutme: usr.aboutme,
                    email: usr.email,
                    role: 'basic',
                    register_date: usr.register_date,
                    facebook: usr.facebook,
                    instagram: usr.instagram,
                    twitter: usr.twitter,
                    youtube: usr.youtube
                }
                const newUserz = [...userz];
                newUserz[index] = editedProfile;
                dispatch(doneEditing(editedProfile))
                setFinder(!finder)
            }
        })
    }

    // SEARCH
    const handleSearch = e => {
        setQuery(e.target.value)
    }
    const handleSubmitQuery = e => {
        e.preventDefault()
        setSearch(query)
        setPage(1)
        setFinder(!finder)
    }
    
    // ROLE
    const toggleFilters = () => {
        setIsOpenFilters(!isOpenFilters)
    }
    const toggleRl = () => {
        setIsOpenRl(!isOpenRl)
    }
    const handleRl = e => {
        setRl(e.target.value)
        setPage(1)
        setIsOpenFilters(!isOpenFilters)
        setIsOpenRl(!isOpenRl)
        setFinder(!finder)
    }

    // SORT
    const toggleSort = () => {
        setIsOpenSort(!isOpenSort)
    }
    const handleAscending = e => {
        setSort(e.target.value)
        setPage(1)
        setIsOpenSort(!isOpenSort)
        setFinder(!finder)
    }
    const handleDescending = e => {
        setSort(e.target.value)
        setPage(1)
        setIsOpenSort(!isOpenSort)
        setFinder(!finder)
    }

    // PAGE
    const togglePage = e => {
        setPage(e.target.value)
        setFinder(!finder)
    }

    return (
            byWho ?
                // byWho.role === "admin" ?

                    <main className={styles.thelist}>

                        <AddUser/>

                        <section className={styles.myacclist}>

                            <header>
                                <h1>USERS LIST</h1>
                            </header>
                            
                            <div className={styles.divider}></div>
        
                            <section className={styles.filtersDiv}>

                                <form className={styles.searchform} onSubmit={handleSubmitQuery}>
                                    <input type="text" value={query} onChange={handleSearch}></input>
                                    <input type="submit" value="Search"></input>
                                </form>

                                <div className={styles.filters}>
                                    <div>
                                        <button onClick={toggleFilters}>Filters</button>
                                        {isOpenFilters ?
                                            <div className={styles.isopenfilters}>
                                                <button onClick={toggleRl}>Role</button>
                                                {isOpenRl ?
                                                    <div className={styles.isopenauthor}>
                                                        {/* HERE */}                                            
                                                            <input className={styles.authorinput}
                                                                type="checkbox" 
                                                                name="admin"
                                                                value={
                                                                    match.params.rl ?
                                                                        
                                                                        match.params.rl === "admin" ?
                                                                            ''
                                                                        : match.params.rl.includes(`admin,`) ?
                                                                            match.params.rl.replace(`admin,`,'')
                                                                        : match.params.rl.includes(`,admin`) ?
                                                                            match.params.rl.replace(`,admin`,'')
                                                                        : `${match.params.rl},admin`

                                                                    : "admin"}
                                                                onChange={handleRl}
                                                                defaultChecked={
                                                                    match.params.rl ?
                                                                        match.params.rl.includes("admin") ?
                                                                            true
                                                                        : match.params.rl === "admin" ?
                                                                            true
                                                                        : false
                                                                    : false
                                                                }
                                                            ></input>
                                                            <p>Admin</p>
                                                                                                        
                                                            <input className={styles.authorinput}
                                                                type="checkbox" 
                                                                name="basic"
                                                                value={
                                                                    match.params.rl ?
                                                                        
                                                                        match.params.rl === "basic" ?
                                                                            ''
                                                                        : match.params.rl.includes(`basic,`) ?
                                                                            match.params.rl.replace(`basic,`,'')
                                                                        : match.params.rl.includes(`,basic`) ?
                                                                            match.params.rl.replace(`,basic`,'')
                                                                        : `${match.params.rl},basic`

                                                                    : "basic"}
                                                                onChange={handleRl}
                                                                defaultChecked={
                                                                    match.params.rl ?
                                                                        match.params.rl.includes("basic") ?
                                                                            true
                                                                        : match.params.rl === "basic" ?
                                                                            true
                                                                        : false
                                                                    : false
                                                                }
                                                            ></input>
                                                            <p>Basic</p>
                                                        {/* HERE */}
                                                    </div>
                                                : null}
                                            </div>
                                        : null}
                                    </div>

                                    <div>
                                        <button style={{ marginRight: '0px', marginLeft: '0px' }} onClick={toggleSort}>Sort</button>
                                        {isOpenSort ?
                                            <div className={styles.isopensort}>
                                                <div>
                                                    <input type="radio" name="filter" value="descending" onChange={handleDescending} checked={match.params.sort === 'descending' ? true : !match.params.sort ? true : false}></input>
                                                    <p>Newest</p>
                                                </div>
                                                <div>
                                                    <input type="radio" name="filter" value="ascending" onChange={handleAscending} checked={match.params.sort === 'ascending' ? true : false}></input>
                                                    <p>Oldest</p>
                                                </div>
                                            </div>
                                        : null}
                                    </div>
                                </div>
                                
                            </section>

                            <section className={styles.itemslistnow}>
                                {userz ? 
                                    userz.map(user =>
                                        <article key={user._id} className={styles.item}>
                                            {user.avatar === 'unknown.png' ?
                                                <img className={styles.smallScreen} src={unknown} alt={user.name} width="50" height="50"></img>
                                            : filez ?
                                                filez.map(file =>
                                                    file === null ?
                                                        null
                                                    : file.filename === user.avatar ?
                                                        <img className={styles.smallScreen} key={file._id} src={`/api/uploads/image/${file.filename}`} alt={user.name} width="50" height="50"></img>
                                                    : null
                                                )
                                            : null}
                                            <h3>{user.name}</h3>
                                            <p className={styles.smallScreen}>{user.email}</p>
                                            <p className={styles.smallScreen}>{user.role}</p>
                                            <p className={styles.smallScreen}>{user.register_date.slice(0,10)} {user.register_date.slice(11,19)}</p>
                                            {byWho ?
                                                byWho._id !== user._id ?
                                                    user.role === "admin" ?
                                                        <button id={user._id} onClick={demote}>Demote</button>
                                                    : <button id={user._id} onClick={promote}>Promote</button>
                                                : user.role === "admin" ?
                                                    <button disabled>Demote</button>
                                                : <button disabled>Promote</button>
                                            : null}
                                            {user.role === "admin" ?
                                                <button disabled>{delpost}</button>
                                            : <button id={user._id} value={user.avatar} onClick={handleDelUser}>{delpost}</button>}
                                        </article>                                
                                    )
                                : null}                            

                                {/* PAGINATION */}

                                {previous ?
                                    next ?
                                        <div className={styles.pagination}>
                                            <button value={previous.page} onClick={togglePage}>{previous.page}</button>
                                            <button disabled>{next.page - 1}</button>
                                            <button className={styles.lastbtn} value={next.page} onClick={togglePage}>{next.page}</button>
                                        </div>
                                    : <div className={styles.pagination}>
                                        <button value={previous.page} onClick={togglePage}>{previous.page}</button>
                                        <button className={styles.lastbtn} disabled>{previous.page + 1}</button>
                                    </div>
                                : next ?
                                    <div className={styles.pagination}>
                                        <button disabled>{next.page - 1}</button>
                                        <button className={styles.lastbtn} value={next.page} onClick={togglePage}>{next.page}</button>
                                    </div>
                                : null}

                                {/* PAGINATION */}

                            </section>

                        </section>

                        <MessUsers/>

                    </main>

                // : null
            : null
    )
}  

export default UsersList