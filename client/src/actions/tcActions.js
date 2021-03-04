import axios from 'axios';
import {
    GET_TC,
    UPDATE_TC,
    TC_LOADING,
    GO_TC
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getTc = () => {
    return function(dispatch) {
        dispatch(setTcLoading());
        axios.get('/api/termscons')
            .then(res => 
                dispatch({
                    type: GET_TC,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const doneEditTc = tc => {
    return function(dispatch, getState) {        
        axios
            .post(`/api/termscons/edittc/${tc._id}`, tc, tokenConfig(getState))
            .then(res => 
                dispatch({
                    type: UPDATE_TC,
                    payload: tc
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const goTc = () => {
    return {
        type: GO_TC
    }
}

export const setTcLoading = () => {
    return {
        type: TC_LOADING
    };
};
