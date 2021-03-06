import axios from 'axios';
import {
    GET_FILE,
    DELETE_FILE,
    ADD_USER_FILE,
    ADD_POST_FILE,
    GO_FILE,
    FILE_LOADING,
    AVATAR_FILES_LOADING,
    GET_ITEMS_FILES,
    GET_AVATARS_FILE,
    GO_ITEMS_FILE,
    GO_AVATARS_FILE,
    DELETE_AVATAR_FILE,
    DELETE_ITEM_FILE
} from './types';
import { returnErrors } from './errorActions';
import { addItem } from './itemActions';
import { doneEditing } from './userActions'
import { sendTheNewPost } from './subActions'
import { editAvatar } from './authActions'

export const getFiles = () => {
    return function(dispatch) {
        dispatch(setFilesLoading());
        axios.get('/api/uploads/files')
            .then(res => 
                dispatch({
                    type: GET_FILE,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const getItemsFiles = picsArray => {
    return function(dispatch) {
        dispatch(setFilesLoading());
        if(picsArray) {
            picsArray.map(filename =>
                axios
                .get(`/api/uploads/files/${filename}`)
                .then(res =>
                    dispatch({
                        type: GET_ITEMS_FILES,
                        payload: res.data
                    })
                )
                .catch(err => 
                    dispatch(returnErrors(err.response.data, err.response.status))
                )
            )
        }
    }
};

export const getAvatarsFile = avatarsArray => {
    return function(dispatch) {
        dispatch(setAvatarFilesLoading());
        dispatch(goAvatarsFile());
        avatarsArray.map(filename =>
            axios
            .get(`/api/uploads/files/${filename}`)
            .then(res =>
                dispatch({
                    type: GET_AVATARS_FILE,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
        )
    }
};

export const addPostFile = (file, newItem) => {
    return function(dispatch) {
        dispatch(setFilesLoading());
        const config = {
            headers: {
                'Content-Type': 'multipart/data-form'
            }
        }
        axios
            .post('/api/uploads/upload', file, config)
            .then(res => 
                dispatch({
                    type: ADD_POST_FILE, 
                    payload: res.data
                })
            )
            .then(() => 
                dispatch(addItem(newItem))
            )
            .then(() => 
                dispatch(sendTheNewPost(newItem))
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const addUserFile = (file, editedProfile) => {
    return function(dispatch) {
        dispatch(setAvatarFilesLoading())
        const config = {
            headers: {
                'Content-Type': 'multipart/data-form'
            }
        }
        axios
            .post('/api/uploads/upload', file, config)
            .then(res => {
                dispatch(editAvatar(editedProfile._id, editedProfile.avatar))
                dispatch(doneEditing(editedProfile))
                dispatch({
                    type: ADD_USER_FILE, 
                    payload: res.data
                })
            })
            .then(() => {
                dispatch(getAvatarsFile([editedProfile.avatar]))
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const deleteFile = id => {
    return function(dispatch) {
        axios
            .delete(`/api/uploads/files/${id}`)
            .then(res => 
                dispatch({
                    type: DELETE_FILE,
                    payload: id
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const deleteItemFile = id => {
    return function(dispatch) {
        axios
            .delete(`/api/uploads/files/${id}`)
            .then(res => 
                dispatch({
                    type: DELETE_ITEM_FILE,
                    payload: id
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const deleteAvatarFile = filename => {
    return function(dispatch) {
        axios
            .delete(`/api/uploads/files/${filename}`)
            .then(res => 
                dispatch({
                    type: DELETE_AVATAR_FILE,
                    payload: filename
                })
                
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const goFiles = () => {
    return {
        type: GO_FILE
    }
}

export const goItemsFiles = () => {
    return {
        type: GO_ITEMS_FILE
    }
}

export const goAvatarsFile = () => {
    return {
        type: GO_AVATARS_FILE
    }
}

export const setFilesLoading = () => {
    return {
        type: FILE_LOADING
    };
};

export const setAvatarFilesLoading = () => {
    return {
        type: AVATAR_FILES_LOADING
    };
};