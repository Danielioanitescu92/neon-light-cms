import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux"

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
                if (byWho.role === 'admin') {
                    return <Component {...props} />;
                } else {
                    return <h2>Acces denied. Admins only.</h2>
                }
            } else {
                return <h2>Acces denied. Admins only.</h2>
            }
        }}
        />
    );
};