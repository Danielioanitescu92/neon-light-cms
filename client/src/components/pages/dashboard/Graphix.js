import React, { useState, useEffect } from 'react'
import styles from './styles/Graphix.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getGraphix } from '../../../actions/itemActions'

const Graphix = () => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const graphix = useSelector(store => store.item.graphix)
    const [ graphixDate, setGraphixDate ] = useState('month')

    useEffect(() => {
        if(byWho) {
            dispatch(getGraphix(graphixDate))
        }
    }, [byWho])

    const handleGraphix = e => setGraphixDate(e.target.value)

    const searchViews = e => {
        e.preventDefault()
        dispatch(getGraphix(graphixDate))
    }

    return (
        graphix ?
            <div className={styles.bigdiv}>
                
            <h2>Total Views</h2>

                <form onSubmit={searchViews} className={styles.myform}>
                    <select id="graphixDate" name="graphixDate" value={graphixDate} onChange={handleGraphix}> 
                        <option value="week">Last Week</option>                                    
                        <option value="month">Last Month</option>                                    
                        <option value="year">Last Year</option>                                  
                        <option value="all">All Time</option>
                    </select>
                    <input type='submit' value='Submit' />
                </form>
                
                {graphix ?
                    <div className={styles.grffcontainer}>
                        <div className={styles.grff}>
                            {graphix.dayz.map(d => 
                                <div key={d.date} className={styles.mytest}>
                                    {graphix.highest.views === 0 ?
                                        <div className={styles.grffBl} style={{ height: `0%` }}></div>
                                    : d.views === graphix.highest.views ?
                                        <div className={styles.grffBl} style={{ height: `100%` }}></div>
                                    : <div className={styles.grffBl} style={{ height: `${(d.views * 100)/graphix.highest.views}%` }}></div>}
                                </div>
                            )}
                            <div className={styles.mynrs}>
                                {graphix.countFromHigh.map(myNr =>
                                    <div key={myNr} className={styles.mynr}>{myNr}</div>
                                )}
                            </div>
                        </div>
                        <div className={styles.mydate}>
                            {graphix.dayz.map(d => 
                                <p key={d.date} className={styles.mydateNr}> {d.date.slice(0,10)} </p>
                            )}
                        </div>
                    </div>
                : null}
                
            </div>
        : null
    )
}

export default Graphix
