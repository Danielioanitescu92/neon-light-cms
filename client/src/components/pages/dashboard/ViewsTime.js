import React, { useState, useEffect } from 'react'
import styles from './styles/ViewsTime.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getViewsTime } from '../../../actions/itemActions'
import ChartPie from './ChartPie'

const ViewsTime = ({ match }) => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const userz = useSelector(store => store.user.users)
    const viewsTime = useSelector(store => store.item.viewsTime)
    const [ colors, setColors ] = useState('')

    const [ whooseViews, setWhooseViews ] = useState(match.url.includes('/myaccount') ? byWho.name : 'allUsers')
    const [ whatSource, setWhatSource ] = useState('total')
    const [ viewsTimeTotal, setViewsTimeTotal ] = useState(0)

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

    useEffect(() => {
        if(viewsTime) {
            let x = 0
            Object.values(viewsTime).map(vu => {
                x = x + vu
            })            
            setViewsTimeTotal(x)
            let colorz =[]
            Object.keys(viewsTime).map(vu => {
                colorz.push({name: vu, color: `rgb(${Math.floor(Math.random() * (255 - 0))},${Math.floor(Math.random() * (255 - 0))},${Math.floor(Math.random() * (255 - 0))})`})
            })            
            setColors(colorz)
        }
    }, [viewsTime])
    
    return (
        byWho ?
            userz ?
                <div className={match.url.includes('/myaccount') ? styles.formdiv : styles.dashformdiv}>
                    <form onSubmit={searchViews} className={styles.searchform}>
                        {!match.url.includes('/myaccount') ?
                            !userz.results ?
                                <div className={styles.underform}>
                                    <select id="whooseViews" name="whooseViews" value={whooseViews} onChange={handleUsersViews}>  
                                        {userz ?
                                            userz.map(user => <option key={user._id} value={user.name}>{user.name}</option>)
                                        : null}                                  
                                        <option value="allUsers">All Users</option>
                                    </select>
                                </div>
                            : null
                        : null}
                        <div className={styles.underform}>
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
                            <h3>Total views: {viewsTimeTotal}</h3>                            
                            
                            {colors ?
                                <ChartPie viewsUsez={viewsTime} colors={colors}/>
                            : null}

                            {colors ?
                                Object.keys(viewsTime).map(user =>
                                    colors.map(col =>
                                        col.name === user ?
                                            <div key={user}>
                                                <div style={{
                                                    width: '10px',
                                                    height: '10px',
                                                    borderRadius: '50%',
                                                    background: col.color
                                                }}></div>
                                                <h4 key={user}>{user}'s views: {viewsTime[user]}</h4>
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

export default ViewsTime
