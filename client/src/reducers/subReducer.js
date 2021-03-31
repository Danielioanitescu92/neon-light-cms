import {
    GET_SUBS,
    DELETE_SUB,
    SUBS_LOADING,
    GO_SUBS,
    TOTAL_SUBS
} from '../actions/types';

const initialState = {
    subscribers: [],
    totalSubs: 0,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SUBS:
            return {
                ...state,
                subscribers: action.payload,
                loading: false
            }
            
        case DELETE_SUB:
            return {
                ...state,
                subscribers: {
                    ...state.subscribers,
                    results: state.subscribers.results.filter(sub => sub._id !== action.payload)
                }
            }
        case SUBS_LOADING:
            return {
                ...state,
                loading: true
            }
        case TOTAL_SUBS:
            return {
                ...state,
                totalSubs: action.payload
            }
        case GO_SUBS:
            return {
                ...state,
                subscribers: []
            }
        default:
            return state;
    }
}