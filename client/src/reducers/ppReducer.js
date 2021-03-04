import {
    GET_PP,
    UPDATE_PP,
    PP_LOADING,
    GO_PP
} from '../actions/types';

const initialState = {
    pp: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PP:
            return {
                ...state,
                pp: action.payload,
                loading: false
            }
        case UPDATE_PP:
            return {
                ...state,
                pp: state.pp.map(p => p._id !== action.payload._id ? p : action.payload )
            }
        case PP_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_PP:
            return {
                ...state,
                pp: []
            }
        default:
            return state;
    }
}