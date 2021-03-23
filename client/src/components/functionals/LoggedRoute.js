import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux"

export const LoggedRoute = ({
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
                return <h2>Log In to receive information</h2>
            }
        }}
        />
    );
};