import React, { useState, useEffect } from 'react'
import styles from './styles/SubsList.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSpecificSubs, unsubscribe, getTotalSubs } from '../../../actions/subActions'
import Campagne from './Campagne'

const SubsList = ({ match }) => {  
    const dispatch = useDispatch()
    const history = useHistory();

    const byWho = useSelector(store => store.auth.user)
    const err = useSelector(store => store.error)

    const previous = useSelector(store => store.sub.subscribers.previous)
    const subz = useSelector(store => store.sub.subscribers.results)
    const next = useSelector(store => store.sub.subscribers.next)
    const totalSubs = useSelector(store => store.sub.totalSubs)
    
    const [ msg, setMsg ] = useState('')

    const [ query, setQuery ] = useState('')
    const [ search, setSearch ] = useState(match.params.search ? match.params.search : null)
    const [ page, setPage ] = useState(match.params.page ? match.params.page : null)
    const [ sort, setSort ] = useState(match.params.sort ? match.params.sort : null)
    const [ finder, setFinder ] = useState(false)
    const [ isOpenSort, setIsOpenSort ] = useState(false)
    const [ whatTime, setWhatTime ] = useState('year')

    const jump = (search, page, sort) => {

        if(byWho) {
            if (!search, !page, !sort) { // if everything is NULL (SUBSLIST) / or coming from another page (to SUBSLIST)
                history.push(`/subslist`)
            }                
            if (search || page || sort) { // if one of them isn't NULL (changing any filter)
                history.push( 
                    search ?
                        page ?
                            sort ?
                                `/subslist/search/${search}/page/${page}/sort/${sort}`
                            : `/subslist/search/${search}/page/${page}`
                        : sort ?
                            `/subslist/search/${search}/sort/${sort}`
                        : `/subslist/search/${search}`
            
                    : page ?
                        sort ?
                            `/subslist/page/${page}/sort/${sort}`
                        : `/subslist/page/${page}`
            
                    : sort ?
                        `/subslist/sort/${sort}`
            
                    : `/subslist`
                )
            }
            dispatch(getSpecificSubs(search, page, sort))
            dispatch(getTotalSubs(whatTime))
        }
    }
    
    const handleChangeTime = e => setWhatTime(e.target.value)
    const searchTime = e => {
        e.preventDefault()
        dispatch(getTotalSubs(whatTime))
    }

    useEffect(() => {
        if(byWho) {
            if(window.location.pathname === '/subslist') {
                setQuery('')
                setSearch(null)
                setPage(null)
                setSort(null)
            }
        }
    }, [window.location.pathname])

    useEffect(() => {
        jump(search, page, sort)
    }, [byWho, finder])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

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

    // DELETE
    const handleDelSub = e => {
        dispatch(unsubscribe(e.target.id))
    } 

    return (
        <div>
            {byWho ?
                // byWho.role === "admin" ?

                    <div>
                    
                        <div>
                            {msg ? <h3>{msg}</h3> : null}
                        </div>

                        {subz ?
                            <div>
                                <h3>New subscribers: {totalSubs}</h3>
                                <form onSubmit={searchTime}>
                                    <label>Select time:</label>
                                    <select id="whatTime" name="whatTime" value={whatTime} onChange={handleChangeTime}>                                    
                                        <option value="day">Last Day</option>                                    
                                        <option value="week">Last Week</option>                                    
                                        <option value="month">Last Month</option>                                    
                                        <option value="year">Last Year</option>
                                    </select>
                                    <input type='submit' value='Submit' />
                                </form>
                            </div>
                        : null}

                        <form onSubmit={handleSubmit}>
                            <input type="text" value={query} onChange={handleSearch}></input>
                            <input type="submit" value="Search"></input>
                        </form>

                        <button onClick={toggleSort}>Sort</button>
                        {isOpenSort ?
                            <div>
                                <input type="radio" name="filter" value="descending" onChange={handleDescending} checked={match.params.sort === 'descending' ? true : !match.params.sort ? true : false}></input> <p>Newest</p>
                                <input type="radio" name="filter" value="ascending" onChange={handleAscending} checked={match.params.sort === 'ascending' ? true : false}></input> <p>Oldest</p>
                            </div>
                        : null}

                        <div>
                            {subz ? 
                                subz.map(sub =>
                                    <div key={sub._id} className={styles.item}>
                                        <div>
                                            <p>{sub.email}</p>
                                        </div>
                                        <div>
                                            <p>{sub.register_date.slice(0,10)} {sub.register_date.slice(11,19)}</p>
                                        </div>
                                        <div>
                                            <button id={sub.email} onClick={handleDelSub} > X </button>
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

                        <Campagne/>

                    </div>
                // : null
            : null}
        </div>
    )
}  

export default SubsList