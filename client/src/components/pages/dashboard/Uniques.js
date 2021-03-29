import React, { useState, useEffect } from 'react'
import styles from './styles/Unique.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getUniques } from '../../../actions/itemActions'

const Uniques = () => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const uniques = useSelector(store => store.item.uniques)
    const [ uniquesDate, setUniquesDate ] = useState('month')

    useEffect(() => {
        if(byWho) {
            dispatch(getUniques(uniquesDate))
        }
    }, [byWho])

    const handleUniques = e => setUniquesDate(e.target.value)

    const searchViews = e => {
        e.preventDefault()
        dispatch(getUniques(uniquesDate))
    }

    return (
        uniques ?
            <div className={styles.bigdiv}>
                <h2>Unique Views</h2>

                <form onSubmit={searchViews} className={styles.myform}>
                    <select id="uniquesDate" name="uniquesDate" value={uniquesDate} onChange={handleUniques}> 
                        <option value="week">Last Week</option>                                    
                        <option value="month">Last Month</option>                                    
                        <option value="year">Last Year</option>                                  
                        <option value="all">All Time</option>
                    </select>
                    <input type='submit' value='Submit' />
                </form>
                
                {uniques ?
                    <h3>Unique visitors: {uniques.uniques}</h3>
                : null}
                
            </div>
        : null
    )
}

export default Uniques
