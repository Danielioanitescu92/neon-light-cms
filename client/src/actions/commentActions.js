import axios from 'axios';
import { 
    GET_COMMENTS,
    GET_THIS_COMMS,
    ADD_COMMENTS,
    DELETE_COMMENTS,
    COMMENTS_LOADING,
    GO_COMMENTS
} from './types';
import { tokenConfig } from './authActions';

export const getComments = () => {
    return function(dispatch) {
        dispatch(setCommentsLoading());
        axios.get('/api/comments')
            .then(res => 
                dispatch({
                    type: GET_COMMENTS,
                    payload: res.data
                })
            )
    }
};

export const getThisComms = id => { // item id
    return function(dispatch) {
        dispatch(setCommentsLoading());
        axios
        .get(`/api/comments/getThisComms/${id}`)
        .then(res => {
            dispatch({
                type: GET_THIS_COMMS,
                payload: res.data
            })
        })
    }
};

export const deleteComment = id => {
    return function(dispatch, getState) {
        axios
            .delete(`/api/comments/${id}`, tokenConfig(getState))
            .then(() => {
                dispatch({
                    type: DELETE_COMMENTS,
                    payload: id
                })
            })
    }
};

export const deleteCommOnPostDel = id => {
    return function(dispatch, getState) {
        axios
            .delete(`/api/comments/onPostDel/${id}`, tokenConfig(getState))
            // .then(res => {
            //     if(res.data._id){
            //         dispatch({
            //             type: DELETE_COMMENTS,
            //             payload: res.data._id
            //         })
            //     }
            // })
    }
};

export const addComment = comments => {
    return function(dispatch) {
        axios
            .post('/api/comments', comments)
            .then(res => 
                dispatch({
                    type: ADD_COMMENTS,
                    payload: res.data
                })
            )
    }
};

export const addLike = ({ commentId, userId, itemId }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ commentId, userId });

        axios.post(`/api/comments/like`, body, config)
            .then(res => {
                dispatch(getThisComms(itemId))
            }
        )
    }
};

export const removeLike = ({ commentId, userId, itemId }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ commentId, userId });

        axios.post(`/api/comments/unlike`, body, config)
            .then(res => {
                dispatch(getThisComms(itemId))
            }
        )
    }
};

export const goComments = () => {
    return {
        type: GO_COMMENTS
    }
}

export const setCommentsLoading = () => {
    return {
        type: COMMENTS_LOADING
    };
};
