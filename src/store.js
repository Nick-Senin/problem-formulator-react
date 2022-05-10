import { combineReducers, createStore } from "redux";
import { INDUCE, USEFULL , HARMFULL } from "./constants/consts.js";
import {network,  arrowBind  , formulatedTasks} from "./reducers/Reducers.js";
import shortid from 'shortid'; 
import {composeWithDevTools} from 'redux-devtools-extension';
import {useLocalStorage} from './hooks/hooks.js'; 

const initialState = {
  network:{
    blocks:[
      { factor: "Это 1текст же каждый", x: 20, y: 50, id:shortid.generate()  , type:USEFULL},
      { factor: "Это текст11 sfasdf", x: 20, y: 200, id:shortid.generate() , type:USEFULL },
      { factor: "Это текст11 qsdfa sfasdf", x: 420, y: 200, id:shortid.generate() , type:HARMFULL }
    ], 
    edges:[]
  }, 
  arrowBind:{
      isArrowBind:false , 
      startPoint:{} ,
      endId: null 
  }, 
  formulatedTasks:''
}

const stateStorage =  JSON.parse(localStorage.getItem('formulatorState')); 

export const store = createStore(combineReducers({network, arrowBind, formulatedTasks}) , stateStorage?stateStorage:initialState  ,composeWithDevTools() ); 
