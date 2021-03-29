import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux"
import styles from './styles/ProtectedRoute.module.css'

export const RouteForAdmin = ({
    component: Component,
    ...rest
}) => {
    
    const byWho = useSelector(store => store.auth.user)

    return (
        <Route
        {...rest}
        render={props => {
            if(byWho) {
                if (byWho.role === 'admin') {
                    return <Component {...props} />;
                } else {
                    return (
                        <div className={styles.itemz}>
                            <div className={styles.post}>
                                <h1>Acces denied! Admins only.</h1>
                            </div>
                        </div>
                    )
                }
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