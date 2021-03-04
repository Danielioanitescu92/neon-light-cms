import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getViewsUser } from '../actions/itemActions'

const ViewsUser = ({ match }) => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)
    const viewsUser = useSelector(store => store.item.viewsUser)

    const [ whatSource, setWhatSource ] = useState('total')
    const [ whatTime, setWhatTime ] = useState('all')
    const [ viewsUsersTotal, setViewsUsersTotal ] = useState(0)

    const handleChangeSource = e => setWhatSource(e.target.value)
    const handleChangeTime = e => setWhatTime(e.target.value)

    const searchViews = e => {
        e.preventDefault()
        dispatch(getViewsUser(whatSource, whatTime))
    }

    useEffect(() => {
        if(byWho) {
            dispatch(getViewsUser(whatSource, whatTime))
        }
    }, [byWho])

    useEffect(() => {
        if(viewsUser) {
            let x = 0
            viewsUser.map(vu => {
                x = x + vu.counting
            })            
            setViewsUsersTotal(x)
        }
    }, [viewsUser])
    
    return (
        byWho ?
            userz ?
                <div>
                    <form onSubmit={searchViews}>
                        <div>
                            <label>Select source:</label>
                            <select id="whatSource" name="whatSource" value={whatSource} onChange={handleChangeSource}>                                    
                                <option value="organic">Organic</option>                                    
                                <option value="facebook">Facebook</option>                                    
                                <option value="googleAds">Google Ads</option>                                    
                                <option value="total">Total</option>
                            </select>
                        </div>
                        <div>
                            <label>Select time:</label>
                            <select id="whatTime" name="whatTime" value={whatTime} onChange={handleChangeTime}>                                    
                                <option value="day">Last Day</option>                                    
                                <option value="week">Last Week</option>                                    
                                <option value="month">Last Month</option>                                    
                                <option value="year">Last Year</option>                                  
                                <option value="all">All Time</option>
                            </select>
                        </div>
                        <input type='submit' value='Submit' />
                    </form>
                    
                    
                    {viewsUser ?
                        <div>
                            <h3>Total views: {viewsUsersTotal}</h3>
                            {viewsUser ?
                                viewsUser.map(user =>
                                    !match.url.includes('/myaccount') ?
                                        <h4 key={user.name}>{user.name}'s views: {user.counting}</h4>
                                    : user.name === byWho.name ?
                                        <h4 key={user.name}>{user.name}'s views: {user.counting}</h4>
                                    : null
                                )
                            : null}                                  
                        </div>
                    : null}
                </div>
            : null                
        : null
    )
}

export default ViewsUser
