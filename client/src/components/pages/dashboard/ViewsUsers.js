import React, { useState, useEffect } from 'react'
import styles from './styles/ViewsUsers.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getViewsUser } from '../../../actions/itemActions'
import ChartPie from './ChartPie'

const ViewsUser = ({ match }) => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)
    const viewsUser = useSelector(store => store.item.viewsUser)
    const piczLoading = useSelector(store => store.file.loadingIt)
    const itemzLoading = useSelector(store => store.item.loading)

    const [ whatSource, setWhatSource ] = useState('total')
    const [ whatTime, setWhatTime ] = useState('all')
    const [ viewsUsersTotal, setViewsUsersTotal ] = useState(0)
    const [ colors, setColors ] = useState('')

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
            let colorz =[]
            viewsUser.map(vu => {
                x = x + vu.counting
                return colorz.push({name: vu.name, color: `rgb(${Math.floor(Math.random() * (255 - 0))},${Math.floor(Math.random() * (255 - 0))},${Math.floor(Math.random() * (255 - 0))})`})
            })            
            setViewsUsersTotal(x)
            setColors(colorz)
        }
    }, [viewsUser])
    
    return (
        byWho ?
            userz ?
                <div className={match.url.includes('/myaccount') ? styles.formdiv : styles.dashformdiv}>
                    <form onSubmit={searchViews} className={styles.searchform}>
                        <div className={styles.underform}>
                            <select id="whatSource" name="whatSource" value={whatSource} onChange={handleChangeSource}>                                    
                                <option value="organic">Organic</option>                                    
                                <option value="facebook">Facebook</option>                                    
                                <option value="googleAds">Google Ads</option>                                    
                                <option value="total">Total</option>
                            </select>
                        </div>
                        <div className={styles.underform}>
                            <select id="whatTime" name="whatTime" value={whatTime} onChange={handleChangeTime}>                                    
                                <option value="day">Last Day</option>                                    
                                <option value="week">Last Week</option>                                    
                                <option value="month">Last Month</option>                                    
                                <option value="year">Last Year</option>                                  
                                <option value="all">All Time</option>
                            </select>
                        </div>
                        <input type='submit' value='Submit'  disabled={piczLoading ? true : itemzLoading ? true : false}/>
                    </form>
                    
                    {viewsUser ?
                        <div>
                            <h3>Total views: {viewsUsersTotal}</h3>
                            
                            {!match.url.includes('/myaccount') ?
                                colors ?
                                    <ChartPie viewsUsez={viewsUser} colors={colors}/>
                                : null
                            : null}    
                            
                            {!match.url.includes('/myaccount') ?
                                viewsUser ?
                                    colors ?
                                        viewsUser.map(user =>
                                            colors.map(col =>
                                                col.name === user.name ?
                                                    !match.url.includes('/myaccount') ?
                                                        <div key={user.name}>
                                                            <div style={{
                                                                width: '10px',
                                                                height: '10px',
                                                                borderRadius: '50%',
                                                                background: col.color
                                                            }}></div>
                                                            <h4 key={user.name}>{user.name}'s views: {user.counting}</h4>
                                                        </div>
                                                    : user.name === byWho.name ?
                                                        <div key={user.name}>
                                                            <div style={{
                                                                width: '10px',
                                                                height: '10px',
                                                                borderRadius: '50%',
                                                                background: col.color
                                                            }}></div>
                                                            <h4 key={user.name}>{user.name}'s views: {user.counting}</h4>
                                                        </div>
                                                    : null
                                                : null
                                            )
                                        )
                                    : null
                                : null
                            : null}                           

                        </div>
                    : null}

                </div>
            : null                
        : null
    )
}

export default ViewsUser
