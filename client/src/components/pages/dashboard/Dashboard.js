import React, {useEffect} from 'react'
import styles from './styles/Dashboard.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../../actions/userActions'

import ViewsSource from '../dashboard/ViewsSource'
import ViewsTime from '../dashboard/ViewsTime'
import ViewsUsers from '../dashboard/ViewsUsers'
import CountAll from '../dashboard/CountAll'
import ScreenSize from '../dashboard/ScreenSize'
import Graphix from '../dashboard/Graphix'
import Uniques from '../dashboard/Uniques'

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
