import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getViewsSource } from '../actions/itemActions'

const ViewsSource = ({ match }) => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)
    const viewsSource = useSelector(store => store.item.viewsSource)

    const [ whooseViews, setWhooseViews ] = useState(match.url.includes('/myaccount') ? byWho.name : 'allUsers')
    const [ whatTime, setWhatTime ] = useState('all')

    const handleUsersViews = e => setWhooseViews(e.target.value)
    const handleChangeTime = e => setWhatTime(e.target.value)

    const searchViews = e => {
        e.preventDefault()
        dispatch(getViewsSource(whooseViews, whatTime))
    }

    useEffect(() => {
        if(byWho) {
            dispatch(getViewsSource(whooseViews, whatTime))
        }
    }, [byWho])
    
    return (
        byWho ?
            userz ?
                <div>
                    <form onSubmit={searchViews}>
                        {!match.url.includes('/myaccount') ?
                            !userz.results ?
                                <div>
                                    <label>Views for:</label>
                                    <select id="whooseViews" name="whooseViews" value={whooseViews} onChange={handleUsersViews}>  
                                        {userz ?
                                            userz.map(user => <option key={user._id} value={user.name}>{user.name}</option>)
                                        : null}                                  
                                        <option value="allUsers">All Users</option>
                                    </select>
                                </div>
                            : null
                        : null}
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
                    
                    
                    {viewsSource ?
                        <div>
                            <h3>Total views: {viewsSource.OrgViews + viewsSource.FbViews + viewsSource.GoogleViews}</h3>
                            <h4>Organic views: {viewsSource.OrgViews}</h4>
                            <h4>Facebook views: {viewsSource.FbViews}</h4>
                            <h4>GoogleAds views: {viewsSource.GoogleViews}</h4>
                        </div>
                    : null}
                </div>
            : null                
        : null
    )
}

export default ViewsSource
