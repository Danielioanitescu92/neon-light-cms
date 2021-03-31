import axios from 'axios';
import {
    GET_USERS,
    GET_THIS_USER,
    UPDATE_USER,
    DELETE_USERS,
    ADD_USER,
    USERS_LOADING,
    GO_USERS,
    REGISTER_FAIL
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { goItems } from './itemActions';
import { goComments } from './commentActions';
import { goReplies } from './replyActions';
import { goSubs } from './subActions';
import { goTc } from './tcActions';
import { goPp } from './ppActions';
import { goAb } from './aboutActions';

// Get list of users (for admin only)
export const getUsers = () => {
    return function(dispatch) {
        dispatch(setUsersLoading());
        axios.get('/api/users/allUsers')
            .then(res => 
                dispatch({
                    type: GET_USERS,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const getThisUser = name => {
    return function(dispatch) {
        dispatch(setUsersLoading());
        axios.get(`/api/users/getThisUser/${name}`)
            .then(res => 
                dispatch({
                    type: GET_THIS_USER,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const getSpecificUsers = (search, rl, page, sort) => {
    return function(dispatch) {
        dispatch(goUsers())
        dispatch(goItems())
        dispatch(goComments())
        dispatch(goReplies())
        dispatch(goSubs())
        dispatch(goTc())
        dispatch(goPp())
        dispatch(goAb())
        dispatch(setUsersLoading());
        axios.get(
            search ?
                rl ?
                    page ?
                        sort ? 
                            `/api/users/search/${search}/role/${rl}/page/${page}/sort/${sort}`
                        : `/api/users/search/${search}/role/${rl}/page/${page}`
                    : sort ? 
                        `/api/users/search/${search}/role/${rl}/sort/${sort}`
                    : `/api/users/search/${search}/role/${rl}`
                : page ?
                    sort ?
                        `/api/users/search/${search}/page/${page}/sort/${sort}`
                    : `/api/users/search/${search}/page/${page}`
                : sort ?
                    `/api/users/search/${search}/sort/${sort}`
                : `/api/users/search/${search}`
            : rl ?
                page ?
                    sort ? 
                        `/api/users/role/${rl}/page/${page}/sort/${sort}`
                    : `/api/users/role/${rl}/page/${page}`
                : sort ? 
                    `/api/users/role/${rl}/sort/${sort}`
                : `/api/users/role/${rl}`
            : page ?
                sort ?
                    `/api/users/page/${page}/sort/${sort}`
                : `/api/users/page/${page}`
            : sort ?
                `/api/users/sort/${sort}`
            : `/api/users`
        )
            .then(res => {
                    dispatch({
                        type: GET_USERS,
                        payload: res.data
                    })
                }
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

// Register User
export const addUser = ({ name, email, password, role }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ name, email, password, role });

        axios.post('/api/users', body, config)
        .then(res => {
                dispatch({
                    type: ADD_USER,
                    payload: res.data
                })
                dispatch(getSpecificUsers(null, null, null, null))
            }
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
    }
}

export const doneEditing = user => {
    return function(dispatch) {
        dispatch(setUsersLoading())
        axios
            .post(`/api/users/editprofile/${user._id}`, user)
            .then(res => {
                dispatch({
                    type: UPDATE_USER,
                    payload: user
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const donePass = user => {
    return function(dispatch, getState) { 
        axios
            .post(`/api/users/changepass/${user._id}`, user, tokenConfig(getState))
            .then(res => 
                dispatch({
                    type: UPDATE_USER,
                    payload: user
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const deleteUser = id => {
    return function(dispatch, getState) {
        axios
            .delete(`/api/users/${id}`, tokenConfig(getState))
            .then(res => 
                dispatch({
                    type: DELETE_USERS,
                    payload: id
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

// Confirm account
export const confAcc = tok => {
    return function(dispatch) {
        // dispatch({ type: USERS_LOADING });

        axios.get(`/api/users/confirmAccount/${tok}`)
        .then(res => {
            dispatch(returnErrors(res.data, res.status, 'ACC_LOADED'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ACC_LOADED'));
        })
    }
}

// Contact developer
export const contDev = ({ name, email, subject, text }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const body = JSON.stringify({ name, email, subject, text });

        axios.post(`/api/users/contactdev`, body, config)
        .then(res => {
            dispatch(returnErrors(res.data, res.status, 'ACC_LOADED'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ACC_LOADED'));
        })
    }
}

// Contact admin
export const contAdmin = ({ name, email, subject, text }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const body = JSON.stringify({ name, email, subject, text });

        axios.post(`/api/users/contactadmin`, body, config)
        .then(res => {
            dispatch(returnErrors(res.data, res.status, 'ACC_LOADED'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ACC_LOADED'));
        })
    }
}

// Send Message to all Users
export const sendMessage = ({ subject, text }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const body = JSON.stringify({ subject, text });

        axios.post(`/api/users/sendMessage`, body, config)
        .then(res => {
            dispatch(returnErrors(res.data, res.status, 'ACC_LOADED'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ACC_LOADED'));
        })
    }   // prints out 
}

export const goUsers = () => {
    return {
        type: GO_USERS
    }
}

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    };
};
