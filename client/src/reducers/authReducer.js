import {
    USER_LOADED,
    USER_LOADING,
    NO_USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    // FORG_SUCCESS,
    // REGISTER_SUCCESS,
    REGISTER_FAIL,
    TOK_LOADED,
    AV_CHANGED
    // FORG_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    forToken: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                forToken: null,
                user: action.payload
            };
        case AV_CHANGED:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            };
        case TOK_LOADED:
            console.log('reducer', action.payload)   // works, prints out 'dani'
            return {
                ...state,
                isLoading: false,
                forToken: action.payload
            };
        // case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                forToken: null,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                forToken: null
            }
        case NO_USER_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}