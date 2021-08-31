// import "@babel/polyfill"

import './b.js'
// import css from'./styles/hahaha.css'
import less from'./styles/test.less'
// import home from './component/home.vue'
import pic from './images/baidu.png'  //file-loader url-loader
// console.log('hello:heesss');


// const img = new Image();
// img.src = pic;

// const app = document.querySelector('#app');
// app.appendChild(img)
import aHa from "./aha.vue"

import React , {Component} from "react";
import ReactDom from 'react-dom';


class App extends Component{
    render(){
        return <h1>hello react</h1>
    }
}

ReactDom.render(<App />,document.getElementById('app'))