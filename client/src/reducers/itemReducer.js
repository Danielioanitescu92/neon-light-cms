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
} from '../actions/types';

const initialState = {
    items: [],
    totalViews: 0,
    viewsSource: null,
    viewsTime: null,
    viewsUser: null,
    countAll: null,
    screenSize: null,
    graphix: null,
    uniques: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case GET_PAGINATED_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case GET_THIS_ITEM:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_ITEMS:
            return {
                ...state,
                items: {
                    ...state.items,
                    results: state.items.results.filter(item => item._id !== action.payload)
                }
            }
        case ADD_ITEMS:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item => item._id !== action.payload._id ? item : action.payload )
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }

        case VIEWS_SOURCE:
            return {
                ...state,
                viewsSource: action.payload
            }
        case VIEWS_TIME:
            return {
                ...state,
                viewsTime: action.payload
            }
        case VIEWS_USER:
            return {
                ...state,
                viewsUser: action.payload
            }
        case COUNT_ALL:
            return {
                ...state,
                countAll: action.payload
            }
        case SCREEN_SIZE:
            return {
                ...state,
                screenSize: action.payload
            }
        case GRAPHIX:
            return {
                ...state,
                graphix: action.payload
            }
        case UNIQUES:
            return {
                ...state,
                uniques: action.payload
            }

        case TOTAL_VIEWS:
            return {
                ...state,
                totalViews: action.payload
            }
        case GO_ITEMS:
            return {
                ...state,
                items: []
            }
        default:
            return state;
    }
}