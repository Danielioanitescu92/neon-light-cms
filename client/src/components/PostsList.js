import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getUsers } from '../actions/userActions'
import { deleteItem, getSpecificItems, getSpecificItemsForMe } from '../actions/itemActions'
import { getItemsFiles, goItemsFiles } from '../actions/fileActions'

import ViewsSource from './ViewsSource'
import ViewsTime from './ViewsTime'
import ViewsUsers from './ViewsUsers'
import CountAll from './CountAll'

const PostsList = ({ match }) => {
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
        console.log("DELETED ITEM _ID: ", e.target.id)
        dispatch(deleteItem(e.target.id))
        setFinder(!finder)
    }
    
    return (
        <div>

            {byWho ?
                <div className={styles.thelist}>
                    
                    {match.url.includes('/myaccount') ?
                        <div>
                            <CountAll match={match}/>
                            <ViewsSource match={match}/>
                            <ViewsTime match={match}/>
                            <ViewsUsers match={match}/>
                        </div>
                    : null}

                    <button onClick={() => history.push(`/addpost`)}> Add Post </button>
        
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={query} onChange={handleSearch}></input>
                        <input type="submit" value="Search"></input>
                    </form>

                    {!match.url.includes('/myaccount') ?
                        <div>
                            <button onClick={toggleFilters}>Filters</button>
                            {isOpenFilters ?
                                <div>
                                    <h4>Author <button onClick={toggleAuthor}>v</button></h4>
                                    {isOpenAuthor ?
                                        userz ?
                                            userz.map(user =>
                                                <div key={user.name}>
                                                    <input 
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
                    
                    <button onClick={toggleSort}>Sort</button>
                    {isOpenSort ?
                        <div>
                            <input type="radio" name="filter" value="descending" onChange={handleDescending} checked={match.params.sort === 'descending' ? true : !match.params.sort ? true : false}></input> <p>Newest</p>
                            <input type="radio" name="filter" value="ascending" onChange={handleAscending} checked={match.params.sort === 'ascending' ? true : false}></input> <p>Oldest</p>           
                            <input type="radio" name="filter" value="popular" onChange={handlePopular} checked={match.params.sort === 'popular' ? true : false}></input> <p>Most popular</p>
                        </div>
                    : null}
        
                    {itemz ?
                        itemz.map(item =>                            
                            <div key={item._id} className={styles.item}>
                                <div>
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
                                </div>
                                <div>
                                    <p>by { item.by }</p>
                                </div>
                                <div>
                                    <p>{item.views.total} views</p>
                                </div>
                                <div>
                                    <p>{item.commCount} comments</p>
                                </div>                                
                                <div>
                                    <h2>{item.title}</h2>
                                </div>
                                {/* <div>
                                    {item.text ?
                                        item.text.blocks ?
                                            <p>{item.text.blocks.find(elem => elem.type === 'paragraph').data.text.slice(0,10)}[...]</p>
                                        : null
                                    : null}
                                </div> */}
                                <div>
                                    <p>{item.date.slice(0,10)} {item.date.slice(11,19)}</p>
                                </div>
                                <div>
                                    <Link to={`/post/${item._id}`}>
                                        <p>Read more</p>
                                    </Link>
                                </div>
                                <div>
                                    {byWho ?
                                        byWho.role === "admin" ?
                                            <Link to={`/edit/${item._id}`}>
                                                <p>Edit</p>
                                            </Link>
                                        : null
                                    : null}
                                </div>
                                <div>
                                    {byWho ?
                                        byWho.role === "admin" ?
                                            <button id={item._id} value={item.title} onClick={handleDelPost} > X </button>
                                        : null
                                    : null}
                                </div>
                            </div>                        
                        )
                    : null}

                    {/* PAGINATION */}

                    {previous ?
                        next ?
                            <div>
                                <button value={previous.page} onClick={togglePage}>{previous.page}</button>
                                <button disabled>{next.page - 1}</button>
                                <button value={next.page} onClick={togglePage}>{next.page}</button>
                            </div>
                        : <div>
                            <button value={previous.page} onClick={togglePage}>{previous.page}</button>
                            <button disabled>{previous.page + 1}</button>
                        </div>
                    : next ?
                        <div>
                            <button disabled>{next.page - 1}</button>
                            <button value={next.page} onClick={togglePage}>{next.page}</button>
                        </div>
                    : null}

                    {/* PAGINATION */}
                
                </div>
            : null}

        </div>
    )
}

export default PostsList
