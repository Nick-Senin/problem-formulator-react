import { CONTR, HARMFULL, INDUCE, PREVENT, USEFULL } from '../constants/consts.js';


export class NetworkOperations{
  static getBlockById (blocks , id ) {
      if(!(blocks && id)) return undefined; 

      return blocks.filter(block => block.id === id)[0]; 
  }

  static getPredcessors ( edges , blockId ) {
      if(!blockId) return undefined; 
      if(!edges) return []; 

      return edges.filter(edge => (edge.endId === blockId) )
                  .map(edge => edge.startId); 
  }
  static addBlock( allBlocks , newBlock ){
      return [...allBlocks , newBlock]; 
  }

  static removeBlock (allBlocks , edges , removeId ){
    if(!removeId) throw new Error('_Remove ID not set'); 

    const newBlocks = allBlocks.filter( block => block.id !== removeId );
    const newEdges = edges.filter( edge => {
      return ((edge.startId !== removeId ) && (edge.endId !== removeId )); 
    });

    this.updateContradictions(newBlocks , newEdges);

    return { blocks:newBlocks , edges:newEdges }; 
  }

  static getSuccessors ( edges , blockId ) {
      if(!blockId) return undefined; 
      if(!edges) return []; 

      return edges.filter(edge => (edge.startId === blockId) )
                  .map(edge => edge.endId); 
  }

  static addEdge ( allBlocks , edges , startId , endId , edgeType = INDUCE ) {
      if( !(endId || startId ) )  throw new Error('_One of the blocks not defined');

      const newEdge = { startId:startId , endId:endId , type:edgeType }; 

      for(let edge of edges) {
        if(( (edge.startId === startId) && (edge.endId === endId) ) ||
           ( (edge.startId === endId) && (edge.endId === startId) )) {
            return {blocks:allBlocks , edges:edges}; 
        }
      }

      if( startId === endId ){
        return {blocks:allBlocks , edges:edges}; 
      } 

      const newEdges = [ ...edges , newEdge   ];
      const newBlocks = [...allBlocks]; 

      this.updateContradictions(newBlocks , newEdges); 

      return { blocks:newBlocks , edges:newEdges};  
  }

  static removeEdge ( allBlocks , edges , startId , endId ) {
      if( !(endId || startId ) )  throw new Error('_One of the blocks not defined');

      const newEdges = edges.filter( edge => !((edge.startId == startId) 
                                           && (edge.endId == endId))); 
      const newBlocks = [...allBlocks]; 

      this.updateContradictions(newBlocks , newEdges); 

      return { blocks:newBlocks , edges:newEdges};  
  }

  static changeBlock ( blockId , newBlockData , allBlocks , allEdges ) {
      if (!blockId) throw new Error('Wrond changed block ID'); 

      const newBlock = allBlocks.filter(block => block.id === blockId)[0]; 

      if(!newBlock) throw new Error('Wrond changed block ID'); 

      newBlock.type = newBlockData.type || USEFULL;  
      newBlock.factor = newBlockData.factor || '';
      
      const newBlocks = [...allBlocks]; 

      newBlocks.forEach( (block,index,blockArr)=> {
          if(block.id === blockId ){
            blockArr[index] = newBlock; 
          }
      });

      this.updateContradictions(newBlocks , allEdges); 

      return newBlocks; 
  }

  static updateContradictions (blocks , edges) {
  }

  static checkContr ( edges, allBlocks , blockId ) {
    return false;
  }
}