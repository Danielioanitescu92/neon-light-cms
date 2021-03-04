import axios from 'axios';
import {
    GET_ITEMS,
    ADD_ITEMS,
    UPDATE_ITEM,
    DELETE_ITEMS,
    ITEMS_LOADING,
    GO_ITEMS,
    GET_PAGINATED_ITEMS,
    GET_THIS_ITEM,
    TOTAL_VIEWS,
    VIEWS_SOURCE,
    VIEWS_TIME,
    VIEWS_USER,
    COUNT_ALL,
    SCREEN_SIZE,
    GRAPHIX,
    UNIQUES
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { goComments, getThisComms, deleteCommOnPostDel } from './commentActions';
import { goReplies, getThisReps, deleteReplyOnPostDel } from './replyActions';
import { goSubs } from './subActions';
import { goTc } from './tcActions';
import { goPp } from './ppActions';
import { goAb } from './aboutActions';

export const getItems = () => {
    return function(dispatch) {
        dispatch(setItemsLoading());
        axios.get('/api/items')
            .then(res => 
                dispatch({
                    type: GET_ITEMS,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const getThisItem = id => {
    return function(dispatch) {
        dispatch(setItemsLoading());
        axios.get(`/api/items/getThisItem/${id}`)
            .then(res => {
                dispatch({
                    type: GET_THIS_ITEM,
                    payload: res.data
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const getSpecificItems = (search, author, page, sort) => {
    console.log("/ ", search, author, page, sort)
    return function(dispatch) {
        dispatch(setItemsLoading())
        let firstArray = []
        let picsArray = []
        dispatch(goItems())
        dispatch(goComments())
        dispatch(goReplies())
        dispatch(goSubs())
        dispatch(goTc())
        dispatch(goPp())
        dispatch(goAb())
        axios.get(
            search ?
                author ?
                    page ?
                        sort ? 
                            `/api/items/search/${search}/author/${author}/page/${page}/sort/${sort}`
                        : `/api/items/search/${search}/author/${author}/page/${page}`
                    : sort ? 
                        `/api/items/search/${search}/author/${author}/sort/${sort}`
                    : `/api/items/search/${search}/author/${author}`
                : page ?
                    sort ?
                        `/api/items/search/${search}/page/${page}/sort/${sort}`
                    : `/api/items/search/${search}/page/${page}`
                : sort ?
                    `/api/items/search/${search}/sort/${sort}`
                : `/api/items/search/${search}`
            : author ?
                page ?
                    sort ? 
                        `/api/items/author/${author}/page/${page}/sort/${sort}`
                    : `/api/items/author/${author}/page/${page}`
                : sort ? 
                    `/api/items/author/${author}/sort/${sort}`
                : `/api/items/author/${author}`
            : page ?
                sort ?
                    `/api/items/page/${page}/sort/${sort}`
                : `/api/items/page/${page}`
            : sort ?
                `/api/items/sort/${sort}`
            : `/api/items`
        )
        .then(res => {
                dispatch({
                    type: GET_PAGINATED_ITEMS,
                    payload: res.data
                })
            }
        )
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
    }
};

export const getSpecificItemsForMe = (search, me, page, sort) => {
    console.log("/myAcc ", search, me, page, sort)
    return function(dispatch) {
        dispatch(setItemsLoading())
        let firstArray = []
        let picsArray = []
        dispatch(goItems())
        dispatch(goComments())
        dispatch(goReplies())
        dispatch(goSubs())
        dispatch(goTc())
        dispatch(goPp())
        dispatch(goAb())
        axios.get(
            search ?
                page ?
                    sort ?
                        `/api/items/forMe/${me}/search/${search}/page/${page}/sort/${sort}`
                    : `/api/items/forMe/${me}/search/${search}/page/${page}`
                : sort ?
                    `/api/items/forMe/${me}/search/${search}/sort/${sort}`
                : `/api/items/forMe/${me}/search/${search}`
            : page ?
                sort ?
                    `/api/items/forMe/${me}/page/${page}/sort/${sort}`
                : `/api/items/forMe/${me}/page/${page}`
            : sort ?
                `/api/items/forMe/${me}/sort/${sort}`
            : `/api/items/forMe/${me}`
        )
        .then(res => {
                dispatch({
                    type: GET_PAGINATED_ITEMS,
                    payload: res.data
                })
            }
        )
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
    }
};

export const deleteItem = id => {
    return function(dispatch, getState) {
        axios
            .delete(`/api/items/${id}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: DELETE_ITEMS,
                    payload: id
                })
                dispatch(deleteCommOnPostDel(id))
                dispatch(deleteReplyOnPostDel(id))
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const addItem = (item) => {
    return function(dispatch, getState) {
        // const body = JSON.stringify(item);
        axios
            .post('/api/items', item, tokenConfig(getState))
            .then(res => {
                console.log("got res.data: ", res.data)
                dispatch({
                    type: ADD_ITEMS,
                    payload: res.data
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const doneEditing = item => {
    return function(dispatch, getState) {        
        axios
            .post(`/api/items/edit/${item._id}`, item, tokenConfig(getState))
            // .then(res => {
            //     dispatch({
            //         type: UPDATE_ITEM,
            //         payload: item
            //     })
            // })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const doneEditingCC = item => {
    return function(dispatch, getState) {        
        axios
            .post(`/api/items/edit/${item._id}`, item, tokenConfig(getState))
            .then(res => {
                dispatch(getThisItem(item._id))
                dispatch(getThisComms(item._id))
                dispatch(getThisReps(item._id))
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const getViewsSource = (whooseViews, whatTime) => {
    return function(dispatch) {
        axios
            .get(`/api/items/viewsSource/${whooseViews}/${whatTime}`)
            .then(res => {
                dispatch({
                    type: VIEWS_SOURCE,
                    payload: res.data
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const getViewsTime = (whooseViews, whatSource) => {
    return function(dispatch) {
        axios
            .get(`/api/items/viewsTime/${whooseViews}/${whatSource}`)
            .then(res => {
                dispatch({
                    type: VIEWS_TIME,
                    payload: res.data
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const getViewsUser = (whatSource, whatTime) => {
    return function(dispatch) {
        axios
            .get(`/api/items/viewsUser/${whatSource}/${whatTime}`)
            .then(res => {
                dispatch({
                    type: VIEWS_USER,
                    payload: res.data
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const getCountAll = (author) => {
    return function(dispatch) {
        axios
            .get(`/api/items/countAll/${author}`)
            .then(res => {
                dispatch({
                    type: COUNT_ALL,
                    payload: res.data
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const getScreenSize = () => {
    return function(dispatch) {
        axios
            .get(`/api/items/screenSize`)
            .then(res => {
                dispatch({
                    type: SCREEN_SIZE,
                    payload: res.data
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const getGraphix = date => {
    return function(dispatch) {
        axios
            .get(`/api/items/graphix/${date}`)
            .then(res => {
                dispatch({
                    type: GRAPHIX,
                    payload: res.data
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const getUniques = date => {
    return function(dispatch) {
        axios
            .get(`/api/items/getUniques/${date}`)
            .then(res => {
                dispatch({
                    type: UNIQUES,
                    payload: res.data
                })
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const goItems = () => {
    return {
        type: GO_ITEMS
    }
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};
