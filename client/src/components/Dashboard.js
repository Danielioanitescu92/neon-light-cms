import React, {useEffect} from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../actions/userActions'

import ViewsSource from './ViewsSource'
import ViewsTime from './ViewsTime'
import ViewsUsers from './ViewsUsers'
import CountAll from './CountAll'
import ScreenSize from './ScreenSize'
import Graphix from './Graphix'
import Uniques from './Uniques'

const PostsList = ({ match }) => {
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
            <div className={styles.thelist}>    
                <Uniques/>                    
                <Graphix/>                    
                <ScreenSize/>                
                <CountAll match={match}/>
                <ViewsSource match={match}/>
                <ViewsTime match={match}/>
                <ViewsUsers match={match}/> 
            </div>
        : null
    )
}

export default PostsList
