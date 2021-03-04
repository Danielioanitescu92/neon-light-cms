import React, { useState, useEffect } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getScreenSize } from '../actions/itemActions'

const ScreenSize = () => {
    const dispatch = useDispatch()

    const byWho = useSelector(store => store.auth.user)
    const screenSize = useSelector(store => store.item.screenSize)

    useEffect(() => {
        if(byWho) {
            dispatch(getScreenSize())
        }
    }, [byWho])

    return (
        screenSize ?
            <div>
                <div>
                    <h3>PHONE</h3>
                    <h1>{screenSize.Phone}</h1>
                </div>
                <div>
                    <h3>TABLET</h3>
                    <h1>{screenSize.Tablet}</h1>
                </div>
                <div>
                    <h3>DESKTOP</h3>
                    <h1>{screenSize.Desktop}</h1>
                </div>
            </div>
        : null
    )
}

export default ScreenSize
