import axios from 'axios';
import {
    GET_AB,
    UPDATE_AB,
    AB_LOADING,
    GO_AB
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getAb = () => {
    return function(dispatch) {
        dispatch(setAbLoading());
        axios.get('/api/aboutus')
            .then(res => 
                dispatch({
                    type: GET_AB,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const doneEditAb = ab => {
    return function(dispatch, getState) {        
        axios
            .post(`/api/aboutus/editabout/${ab._id}`, ab, tokenConfig(getState))
            .then(res => 
                dispatch({
                    type: UPDATE_AB,
                    payload: ab   // isn't this suppose to be res.data???
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

export const goAb = () => {
    return {
        type: GO_AB
    }
}

export const setAbLoading = () => {
    return {
        type: AB_LOADING
    };
};
