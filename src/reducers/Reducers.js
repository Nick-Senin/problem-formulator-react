import { combineReducers } from "redux"; 
import {ADD_BLOCK , ADD_EDGE , REMOVE_EDGE , CHANGE_BLOCK, REMOVE_BLOCK , CHANGE_EDGE, START_ARROW_BIND, CLEAR_ARROW_BIND, CREATE_ARROW_BIND, SET_FORMULATED_TASKS} from '../actions/ActionGenerators.js'
import {SimpleNetworkOperations} from '../NetworkOperations/SimpleNetworkOperations.js'; 


/*
network{
  blocks:[
    {x,y,type,id,factor}
  ] ,
  edges:[
    {startId , endId}
  ]
}
*/

export function network( state={blocks:[] , edges:[]} , action ){
    let newState = {}; 
    switch(action.type){
        case ADD_BLOCK :
          return { blocks: SimpleNetworkOperations.addBlock(state.blocks ,
                                                    action.newBlock) 
                 , edges:[...state.edges]}; 
        case REMOVE_BLOCK : 
          newState =  SimpleNetworkOperations.removeBlock(state.blocks ,
                                                      state.edges , 
                                                  action.removeId ); 
          return  { blocks:newState.blocks , edges:newState.edges}; 
        case ADD_EDGE : 
          newState =  SimpleNetworkOperations.addEdge(state.blocks ,
                                                  state.edges , 
                                               action.startId ,
                                                 action.endId ,  
                                              action.edgeType ); 
          return newState;  
        case REMOVE_EDGE : 
          newState =  SimpleNetworkOperations.removeEdge(state.blocks ,
                                                     state.edges , 
                                                  action.startId ,
                                                    action.endId ); 
          return newState;  
        case CHANGE_BLOCK : 
          return { blocks: SimpleNetworkOperations.changeBlock(action.changeId , 
                                                         action.newBlockData,  
                                                         state.blocks,
                                                         state.edges) 
                 , edges:[...state.edges]}; 
        default : 
            return {...state}; 
    }
}

/*
  arrowBind:{
    isArrowBind:true/false , 
    startPoint:{x , y} ,
    startId: ...
  }
*/

export function arrowBind( state={ isArrowBind:false, startPoint:{}, endId:null} , action ) {
  var newState = Object.assign({}, state);

  switch (action.type){
    case START_ARROW_BIND : 
      newState.isArrowBind = true;   
      newState.startPoint = action.startPoint; 
      newState.startId = action.startId; 
    return newState; 
    case CLEAR_ARROW_BIND : 
      newState.isArrowBind = false;   
      newState.endId = null; 
    return newState; 
    default :
      return newState; 
  }
}

/*
  formulatedTasks:'Здесь некоторые задачи'
*/

export function formulatedTasks( state='' , action ){
  if(action.type === SET_FORMULATED_TASKS){
    return action.formulatedTasks; 
  }else{
    return state; 
  } 
}



