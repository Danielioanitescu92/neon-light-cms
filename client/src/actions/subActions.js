import axios from 'axios';
import {
    GET_SUBS,
    DELETE_SUB,
    SUBS_LOADING,
    GO_SUBS,
    TOTAL_SUBS
} from './types';
import { returnErrors } from './errorActions';
import { goUsers } from './userActions';
import { goItems } from './itemActions';
import { goComments } from './commentActions';
import { goReplies } from './replyActions';
import { goTc } from './tcActions';
import { goPp } from './ppActions';
import { goAb } from './aboutActions';

// Get list of subs (for admin only)
export const getSubs = () => {
    return function(dispatch) {
        dispatch(setSubsLoading());
        axios.get('/api/subscribers/allSubscribers')
            .then(res => 
                dispatch({
                    type: GET_SUBS,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const getSpecificSubs = (search, page, sort) => {
    return function(dispatch) {
        dispatch(goUsers())
        dispatch(goItems())
        dispatch(goComments())
        dispatch(goReplies())
        dispatch(goSubs())
        dispatch(goTc())
        dispatch(goPp())
        dispatch(goAb())
        dispatch(setSubsLoading());
        axios.get(
            search ?
                page ?
                    sort ?
                        `/api/subscribers/search/${search}/page/${page}/sort/${sort}`
                    : `/api/subscribers/search/${search}/page/${page}`
                : sort ?
                    `/api/subscribers/search/${search}/sort/${sort}`
                : `/api/subscribers/search/${search}`
            : page ?
                sort ?
                    `/api/subscribers/page/${page}/sort/${sort}`
                : `/api/subscribers/page/${page}`
            : sort ?
                `/api/subscribers/sort/${sort}`
            : `/api/subscribers`
        )
            .then(res => {
                    dispatch({
                        type: GET_SUBS,
                        payload: res.data
                    })
                }
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

// Delete Subscriber
export const unsubscribe = id => {
    return function(dispatch) {
        axios
            .delete(`/api/subscribers/${id}`)
            .then(res => 
                dispatch({
                    type: DELETE_SUB,
                    payload: id
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

// Send New Posts to all Subs
export const sendTheNewPost = newItem => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        // const body = JSON.stringify({ picUrl, title, subtitle, text, by });

        axios.post(`/api/subscribers`, newItem, config)
        .then(res => {
            dispatch(returnErrors(res.data, res.status, 'ACC_LOADED'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ACC_LOADED'));
        })
    }
}

// Send Newsletter to all Subs
export const sendNewsletter = ({ subject, text }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const body = JSON.stringify({ subject, text });

        axios.post(`/api/subscribers/sendNewsletter`, body, config)
        .then(res => {
            dispatch(returnErrors(res.data, res.status, 'ACC_LOADED'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ACC_LOADED'));
        })
    }   // prints out 
}

export const getTotalSubs = mytime => {
    console.log(mytime)
    return function(dispatch) {
        axios
            .get(`/api/subscribers/allsubs/${mytime}`)
            .then(res => {
                dispatch({
                    type: TOTAL_SUBS,
                    payload: res.data
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

// (for admin only)
export const goSubs = () => {
    return {
        type: GO_SUBS
    }
}

// (for admin only)
export const setSubsLoading = () => {
    return {
        type: SUBS_LOADING
    };
};
