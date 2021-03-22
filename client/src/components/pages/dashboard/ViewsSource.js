import React, { useState, useEffect } from 'react'
import styles from './styles/ViewsSource.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getViewsSource } from '../../../actions/itemActions'
import ChartPie from './ChartPie'

const ViewsSource = ({ match }) => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)
    const viewsSource = useSelector(store => store.item.viewsSource)
    const [ colors, setColors ] = useState('')

    const [ whooseViews, setWhooseViews ] = useState(match.url.includes('/myaccount') ? byWho.name : 'allUsers')
    const [ whatTime, setWhatTime ] = useState('all')
    const [ viewsSourceTotal, setViewsSourceTotal ] = useState(0)

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

    useEffect(() => {
        if(viewsSource) {
            let x = 0
            Object.values(viewsSource).map(vu => {
                x = x + vu
            })            
            setViewsSourceTotal(x)
            let colorz =[]
            Object.keys(viewsSource).map(vu => {
                colorz.push({name: vu, color: `rgb(${Math.floor(Math.random() * (255 - 0))},${Math.floor(Math.random() * (255 - 0))},${Math.floor(Math.random() * (255 - 0))})`})
            })            
            setColors(colorz)
        }
    }, [viewsSource])
    
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
                            <h3>Total views: {viewsSourceTotal}</h3>                          
                            
                            {colors ?
                                <ChartPie viewsUsez={viewsSource} colors={colors}/>
                            : null}

                            {colors ?
                                Object.keys(viewsSource).map(user =>
                                    colors.map(col =>
                                        col.name === user ?
                                            <div key={user}>
                                                <div style={{
                                                    width: '10px',
                                                    height: '10px',
                                                    borderRadius: '50%',
                                                    background: col.color
                                                }}></div>
                                                <h4 key={user}>{user}'s views: {viewsSource[user]}</h4>
                                            </div>
                                        : null
                                    )
                                )
                            : null}

                        </div>
                    : null}
                </div>
            : null                
        : null
    )
}

export default ViewsSource
