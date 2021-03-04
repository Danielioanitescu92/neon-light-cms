import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getViewsTime } from '../actions/itemActions'

const ViewsTime = ({ match }) => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)
    const viewsTime = useSelector(store => store.item.viewsTime)

    const [ whooseViews, setWhooseViews ] = useState(match.url.includes('/myaccount') ? byWho.name : 'allUsers')
    const [ whatSource, setWhatSource ] = useState('total')

    const handleUsersViews = e => setWhooseViews(e.target.value)
    const handleChangeSource = e => setWhatSource(e.target.value)

    const searchViews = e => {
        e.preventDefault()
        dispatch(getViewsTime(whooseViews, whatSource))
    }

    useEffect(() => {
        if(byWho) {
            dispatch(getViewsTime(whooseViews, whatSource))
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
                            <label>Select source:</label>
                            <select id="whatSource" name="whatSource" value={whatSource} onChange={handleChangeSource}>                                    
                                <option value="organic">Organic</option>                                    
                                <option value="facebook">Facebook</option>                                    
                                <option value="googleAds">Google Ads</option>                                    
                                <option value="total">Total</option>
                            </select>
                        </div>
                        <input type='submit' value='Submit' />
                    </form>
                    
                    
                    {viewsTime ?
                        <div>
                            <h3>Total views: {viewsTime.LastDay + viewsTime.LastWeek + viewsTime.LastMonth + viewsTime.LastYear}</h3>
                            <h4>Last Day: {viewsTime.LastDay}</h4>
                            <h4>Last Week: {viewsTime.LastWeek}</h4>
                            <h4>Last Month: {viewsTime.LastMonth}</h4>
                            <h4>Last Year: {viewsTime.LastYear}</h4>
                        </div>
                    : null}
                </div>
            : null                
        : null
    )
}

export default ViewsTime
