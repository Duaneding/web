export default function createStore(reducer){
    let currentState;
    let currentListeners = [];

    function getState(){
        return currentState;
    }
    function dispatch(action){
        currentState = reducer(currentState,action);
        currentListeners.forEach(fn => fn())
    }
    function subscribe(fn){
        currentListeners.push(fn)
        return () => {
            currentListeners = currentListeners.filter((listener) => listener !== fn)
        }
    }
    dispatch({type:'test'})
    return {
        getState,
        dispatch,
        subscribe
    }
}
