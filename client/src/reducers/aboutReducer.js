import {
    GET_AB,
    UPDATE_AB,
    AB_LOADING,
    GO_AB
} from '../actions/types';

const initialState = {
    ab: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_AB:
            return {
                ...state,
                ab: action.payload,
                loading: false
            }
        case UPDATE_AB:
            return {
                ...state,
                ab: state.ab.map(a => a._id !== action.payload._id ? a : action.payload )
            }
        case AB_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_AB:
            return {
                ...state,
                ab: []
            }
        default:
            return state;
    }
}