import {createStore,combineReducers} from "redux"

function countReducer(state=0,action){
    switch (action.type){
        case 'ADD':
            return state + action.payload || 1;
        case 'MINUS':
            return state - action.payload || 1;
        default:
            return state;
    }
}

const store = createStore(combineReducers({count:countReducer}))

export default store