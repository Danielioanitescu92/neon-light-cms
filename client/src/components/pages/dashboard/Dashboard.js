import React, {useEffect} from 'react'
import styles from './styles/Dashboard.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../../actions/userActions'

import ViewsSource from './ViewsSource'
import ViewsTime from './ViewsTime'
import ViewsUsers from './ViewsUsers'
import CountAll from './CountAll'
import ScreenSize from './ScreenSize'
import Graphix from './Graphix'
import Uniques from './Uniques'

const Dashboard = ({ match }) => {
    const dispatch = useDispatch()
    const byWho = useSelector(store => store.auth.user)

    useEffect(() => {
        if(byWho) {
            if(!match.url.includes('/myaccount')) {
                dispatch(getUsers())
            }
        }
    }, [byWho])
    
    return (
        byWho ?
            <div className={styles.thedash}>     
                <CountAll match={match}/> 
                <div className={styles.ungrap}>
                    <Graphix className={styles.ungrapdiv} />                 
                    <Uniques className={styles.ungrapdiv} />                       
                </div>
                <ScreenSize/>              
                <div className={styles.ungrap}>
                    <ViewsSource match={match}/>
                    <ViewsTime match={match}/>
                    <ViewsUsers match={match}/>                      
                </div>
            </div>
        : null
    )
}

export default Dashboard
