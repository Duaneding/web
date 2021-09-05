import React , {useReducer} from 'react';

function countReducer(state,action){
    switch (action.type){
        case 'ADD':
            return {count:state.count + (action.payload || 1)};
        case 'MINUS':
            return {count:state.count - (action.payload || 1)};
        default:
            return {count:state.count};
    }
}
function ReduxPage(){
    const [state,dispatch] = useReducer(countReducer,{count:0})
    const add = () => {
        dispatch({type:'ADD',payload:1})
    }
    return (
        <div>
            <h3>ReduxPage</h3>
            <p>{state.count}</p>
            <button type="" onClick={add}>add</button>
            <button type="" onClick={() => dispatch({type:'MINUS'})}>MINUS</button>
        </div>
    )
}
export default ReduxPage