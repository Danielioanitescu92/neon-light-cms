import React, { useState, useEffect } from 'react'
import styles from './styles/PostsList.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getUsers } from '../../../actions/userActions'
import { deleteItem, getSpecificItems, getSpecificItemsForMe } from '../../../actions/itemActions'
import { getItemsFiles, goItemsFiles, deleteItemFile } from '../../../actions/fileActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { faGlasses } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const PostsList = ({ match }) => {
    const viewspost = <FontAwesomeIcon icon={faEye} />
    const commentspost = <FontAwesomeIcon icon={faComments} />
    const readpost = <FontAwesomeIcon icon={faGlasses} />
    const editpost = <FontAwesomeIcon icon={faEdit} />
    const delpost = <FontAwesomeIcon icon={faTrash} />

    const dispatch = useDispatch()
    const history = useHistory();

    const byWho = useSelector(store => store.auth.user)
    const previous = useSelector(store => store.item.items.previous)
    const itemz = useSelector(store => store.item.items.results)
    const next = useSelector(store => store.item.items.next)
    const userz = useSelector(store => store.user.users)
    const picz = useSelector(store => store.file.files.items)
    const piczLoading = useSelector(store => store.file.loadingIt)
    const itemzLoading = useSelector(store => store.item.loading)

    const [ query, setQuery ] = useState('')
    const [ search, setSearch ] = useState(match.params.search ? match.params.search : null)
    const [ author, setAuthor ] = useState(match.url.includes('/myaccount') ? byWho.name : match.params.author ? match.params.author : null)
    const [ page, setPage ] = useState(match.params.page ? match.params.page : null)
    const [ sort, setSort ] = useState(match.params.sort ? match.params.sort : null)
    const [ finder, setFinder ] = useState(false)
    const [ isOpenFilters, setIsOpenFilters ] = useState(false)
    const [ isOpenAuthor, setIsOpenAuthor ] = useState(false)
    const [ isOpenSort, setIsOpenSort ] = useState(false)

    const jump = (search, author, page, sort) => {

        if(byWho) {
            // ITEMS            
            if (match.url.includes(`/myaccount`)) { // on /myaccount (avatar isn't NULL)
                history.push(
                    search ?
                        page ?
                            sort ?
                                `/myaccount/search/${search}/page/${page}/sort/${sort}`
                            : `/myaccount/search/${search}/page/${page}`
                        : sort ?
                            `/myaccount/search/${search}/sort/${sort}`
                        : `/myaccount/search/${search}`
            
                    : page ?
                        sort ?
                            `/myaccount/page/${page}/sort/${sort}`
                        : `/myaccount/page/${page}`
            
                    : sort ?
                        `/myaccount/sort/${sort}`
            
                    : `/myaccount`
                )
                dispatch(getSpecificItemsForMe(search, byWho.name, page, sort))
            } else {                
                if (!search, !author, !page, !sort) { // if everything is NULL (Home) / or coming from another page (to HOME)
                    history.push(`/`)
                }                
                if (search || author || page || sort) { // if one of them isn't NULL (changing any filter)
                    history.push(        
                        search ?
                            author ?
                                page ?
                                    sort ?
                                        `/search/${search}/author/${author}/page/${page}/sort/${sort}`
                                    : `/search/${search}/author/${author}/page/${page}`
                                : sort ?
                                    `/search/${search}/author/${author}/sort/${sort}`
                                : `/search/${search}/author/${author}`
                            : page ?
                                sort ?
                                    `/search/${search}/page/${page}/sort/${sort}`
                                : `/search/${search}/page/${page}`
                            : sort ?
                                `/search/${search}/sort/${sort}`
                            : `/search/${search}`
                
                        : author ?
                            page ?
                                sort ?
                                    `/author/${author}/page/${page}/sort/${sort}`
                                : `/author/${author}/page/${page}`
                            : sort ?
                                `/author/${author}/sort/${sort}`
                            : `/author/${author}`
                
                        : page ?
                            sort ?
                                `/page/${page}/sort/${sort}`
                            : `/page/${page}`
                
                        : sort ?
                            `/sort/${sort}`
                
                        : `/`
                    )
                }
                dispatch(getSpecificItems(search, author, page, sort))
            }
            // USERS
            dispatch(getUsers())
        }
    }

    useEffect(() => {
        // RESET FILTERS
        if(byWho) {
            jump(search, author, page, sort)
            if(window.location.pathname === '/') {
                setQuery('')
                setSearch(null)
                setAuthor(null)
                setPage(null)
                setSort(null)
            } else if (window.location.pathname === '/myaccount') {
                setQuery('')
                setSearch(null)
                setPage(null)
                setSort(null)
            }
        }
    }, [byWho, finder])

    useEffect(() => {
        // BRING NEW IMAGES
        if(!piczLoading) {
            if(!itemzLoading) {
                if(itemz) {
                    dispatch(goItemsFiles());
                    if(itemz.length > 0) {
                        itemz.map(item => {
                            dispatch(getItemsFiles([item.picUrl]))
                        })
                    }
                }
            }
        }
    }, [itemz])

    // PAGE
    const togglePage = e => {
        setPage(e.target.value)
        setFinder(!finder)
    }

    // SORT
    const toggleSort = () => {
        setIsOpenSort(!isOpenSort)
    }
    const handlePopular = e => {
        setSort(e.target.value)
        setPage(1)
        setIsOpenSort(!isOpenSort)
        setFinder(!finder)
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

    // SEARCH
    const handleSearch = e => {
        setQuery(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault()
        setSearch(query)
        setPage(1)
        setFinder(!finder)
    }

    // AUTHOR
    const toggleFilters = () => {
        setIsOpenFilters(!isOpenFilters)
    }
    const toggleAuthor = () => {
        setIsOpenAuthor(!isOpenAuthor)
    }
    const handleAuthor = e => {
        setAuthor(match.url.includes('/myaccount') ? byWho.name : e.target.value)
        setPage(1)
        setIsOpenFilters(!isOpenFilters)
        setIsOpenAuthor(!isOpenAuthor)
        setFinder(!finder)
    }

    // DELETE POST
    const handleDelPost = e => {
        dispatch(deleteItem(e.target.id))
        if(!piczLoading) {
            if(!itemzLoading) {
                itemz.map(item => {
                    if(item._id === e.target.id) {
                        picz.map(pic => {
                            if(pic !== null) {
                                if(item.picUrl === pic.filename) {
                                    dispatch(deleteItemFile(pic.filename))
                                }
                            }
                        })
                    }
                })
            }
        }
        setFinder(!finder)
    }
    
    return (
        byWho ?
            <main className={match.url.includes('/myaccount') ? styles.myacclist : styles.thelist}>


                <section className={styles.filtersDiv}>

                    <form className={styles.searchform} onSubmit={handleSubmit}>
                        <input type="text" value={query} onChange={handleSearch}></input>
                        <input type="submit" value="Search"></input>
                    </form>
                    
                    <div className={styles.filters}>
                        {!match.url.includes('/myaccount') ?
                            <div>
                                <button onClick={toggleFilters}>Filters</button>
                                {isOpenFilters ?
                                    <div className={styles.isopenfilters}>
                                        <button onClick={toggleAuthor}>Author</button>
                                        {isOpenAuthor ?
                                            userz ?
                                                userz.map(user =>
                                                    <div className={styles.isopenauthor} key={user.name}>
                                                        <input className={styles.authorinput}
                                                            type="checkbox"
                                                            name="author"
                                                            id={user.name}
                                                            value={
                                                                match.params.author ?
                                                                    
                                                                    match.params.author === user.name ?
                                                                        ''
                                                                    : match.params.author.includes(`${user.name},`) ?
                                                                        match.params.author.replace(`${user.name},`,'')
                                                                    : match.params.author.includes(`,${user.name}`) ?
                                                                        match.params.author.replace(`,${user.name}`,'')
                                                                    : `${match.params.author},${user.name}`

                                                                : user.name
                                                            }
                                                            onChange={handleAuthor}
                                                            defaultChecked={
                                                                match.params.author ?
                                                                    match.params.author.includes(user.name) ?
                                                                        true
                                                                    : match.params.author === user.name ?
                                                                        true
                                                                    : false
                                                                : false
                                                            }
                                                        ></input>
                                                        <p>{user.name}</p>
                                                    </div>
                                                )
                                            : null
                                        : null}
                                    </div>
                                : null}
                            </div>
                        : null}
                        
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
                                    <div>
                                        <input type="radio" name="filter" value="popular" onChange={handlePopular} checked={match.params.sort === 'popular' ? true : false}></input>
                                        <p>Most popular</p>
                                    </div>
                                </div>
                            : null}
                        </div>
                    </div>
                        
                </section>

                <section className={styles.itemslistnow}>
                    {itemz ?
                        itemz.map(item =>                            
                            <article key={item._id} className={styles.item}>
                                {picz ?
                                    picz.length > 0 ?
                                        picz.map(pic =>
                                            pic === null ?
                                                null
                                            : pic.filename === item.picUrl ?
                                                <img key={pic._id} src={`/api/uploads/image/${pic.filename}`} alt={pic.filename} width="50" height="50"></img>
                                            : null
                                        )
                                    : null
                                : null}
                                <h3>{item.title}</h3>
                                <p>by { item.by }</p>
                                <p>{item.views.total} {viewspost}</p>
                                <p>{item.commCount} {commentspost}</p>
                                <p>{item.date.slice(0,10)} {item.date.slice(11,19)}</p>
                                <Link style={{ color: 'rgb(255, 255, 255)' }} to={`/post/${item._id}`}>
                                    <p>{readpost}</p>
                                </Link>
                                {byWho ?
                                    byWho.role === "admin" ?
                                        <Link to={`/edit/${item._id}`}>
                                            <p style={{ color: 'rgb(255, 255, 255)' }}>{editpost}</p>
                                        </Link>
                                    : null
                                : null}
                                {byWho ?
                                    byWho.role === "admin" ?
                                        <p style={{ cursor: 'pointer' }} id={item._id} onClick={handleDelPost} >{delpost}</p>
                                    : null
                                : null}
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
            
            </main>
        : null
    )
}

export default PostsList
