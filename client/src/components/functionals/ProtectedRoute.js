import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux"
import styles from './styles/ProtectedRoute.module.css'

export const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    
    const byWho = useSelector(store => store.auth.user)

    return (
        <Route
        {...rest}
        render={props => {
            if(byWho) {
                return <Component {...props} />
            } else {
                return (
                    <div className={styles.itemz}>
                        <div className={styles.post}>
                            <h1>Log In to receive information</h1>
                        </div>
                    </div>
                )
            }
        }}
        />
    );
};