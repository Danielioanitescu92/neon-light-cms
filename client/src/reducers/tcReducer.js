import {
    GET_TC,
    UPDATE_TC,
    TC_LOADING,
    GO_TC
} from '../actions/types';

const initialState = {
    tc: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TC:
            return {
                ...state,
                tc: action.payload,
                loading: false
            }
        case UPDATE_TC:
            return {
                ...state,
                tc: state.tc.map(t => t._id !== action.payload._id ? t : action.payload )
            }
        case TC_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_TC:
            return {
                ...state,
                tc: []
            }
        default:
            return state;
    }
}