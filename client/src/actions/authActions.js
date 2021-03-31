import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    TOK_LOADED,
    NO_USER_LOADING,
    AV_CHANGED
} from './types';

// Check token and load user
export const loadUser = () => {
    return function(dispatch, getState) {
        dispatch({ type: USER_LOADING });

        axios.get('./api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })
    }
}

// Editing avatar
export const editAvatar = (id, avatar) => {
    return function(dispatch, getState) {
        dispatch({ type: USER_LOADING });

        const body = JSON.stringify({ id, avatar });

        axios.put(`./api/auth/editAvatar`, body, tokenConfig(getState))
        .then(res => dispatch({
            type: AV_CHANGED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: USER_LOADED });
        })
    }
}

// Login User
export const login = ({ email, password }) => {
    return function(dispatch) {
        dispatch({ type: USER_LOADING });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ email, password });

        axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({ type: LOGIN_FAIL })
            dispatch({ type: NO_USER_LOADING })
        })
    }
}

// Forgot Password
export const forg = email => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ email });

        axios.post('/api/auth/forgotPass', body, config)
        .then(res => {
            dispatch(returnErrors(res.data, res.status, 'FORG_SUCCESS'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'FORG_FAIL'));
        })
    }
}

// Load token
export const getPar = tok => {
    return function(dispatch) {
        dispatch({ type: USER_LOADING });

        axios.get(`/api/auth/resetPass/${tok}`)
        .then(res => {
            dispatch({
                type: TOK_LOADED,
                payload: res.data.username
            })
            dispatch(returnErrors(res.data.msg, res.status, 'TOK_LOADED'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'TOK_LOADED'));
        })
    }
}

// Reset Password
export const reset = ({ username, password, confirmPassword }) => {
    console.log('reset')
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ username, password, confirmPassword });

        axios.put('/api/auth/updatePasswordViaEmail', body, config)
        .then(res => {
            dispatch(returnErrors(res.data, res.status, 'Password reset succesfully. You can now login.'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'Password reset failed. Please contact our team.'));
        })
    }
}

// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// Setup config/headers and token
export const tokenConfig = getState => {
    
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}