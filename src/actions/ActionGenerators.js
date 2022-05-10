export const ADD_BLOCK = 'ADD_BLOCK'
export const ADD_EDGE = 'ADD_EDGE'
export const REMOVE_EDGE = 'REMOVE_EDGE'
export const CHANGE_BLOCK = 'CHANGE_BLOCK'
export const CHANGE_EDGE = 'CHANGE_EDGE'
export const REMOVE_BLOCK = 'REMOVE_BLOCK' 

export const START_ARROW_BIND = 'START_ARROW_BIND' 
export const CLEAR_ARROW_BIND = 'CLEAR_ARROW_BIND'
export const CREATE_ARROW_BIND = 'CREATE_ARROW_BIND'

export const SET_FORMULATED_TASKS = 'SET_FORMULATED_TASKS'

export const addBlock = (newBlock)=> ({
  type: ADD_BLOCK,
  newBlock:newBlock
})

export const addEdge = ( startBlockId , endBlockId , edgeType)=> {
  return {
  type: ADD_EDGE,
  startId:startBlockId ,
  endId:endBlockId , 
  edgeType:edgeType
}}

export const removeEdge = ( startId, endId )=> ({
  type: REMOVE_EDGE,  
  startId:startId ,
  endId:endId  
})

export const changeBlock = (blockId , newType , newFactor )=> ({
  type: CHANGE_BLOCK,
  changeId: blockId, 
  newBlockData:{type:newType , factor:newFactor , id:blockId }
})

export const removeBlock = ( removeId ) => ({
  type:REMOVE_BLOCK , 
  removeId:removeId
})

export const startArrowBind = ( startPoint ,startId ) => ({
  type:START_ARROW_BIND  ,
  startPoint:startPoint  ,
  startId:startId
})

export const clearArrowBind = () => ({
  type: CLEAR_ARROW_BIND 
})

export const setFormulatedTasks = ( formulatedTasks ) => ({
  type : SET_FORMULATED_TASKS ,
  formulatedTasks:formulatedTasks 
})


/*
export const createArrowBind = ( startId ) => ({
  type : CREATE_ARROW_BIND , 
  startId:startId
}) */

/*
  arrowBind:{
    isArrowBind:true/false , 
    startPoint:{x: , y:} ,
    endId: ...
  }
*/