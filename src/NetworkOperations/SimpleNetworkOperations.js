import { CONTR, HARMFULL, INDUCE, PREVENT, USEFULL } from '../constants/consts.js'; 
import {NetworkOperations} from './NetworkOperations.js';

export class SimpleNetworkOperations extends NetworkOperations{
  static updateContradictions (blocks , edges) {
    blocks.forEach ( (block,index,blockArr) => {
      if(this.checkContr(edges, blocks, block.id)) {
        blockArr[index].type = CONTR; 
      }else if ( block.type === CONTR ){
        blockArr[index].type = USEFULL; 
      }
    }); 
  }

  static checkContr ( edges, allBlocks , blockId ) {
    const checkBlockContr = (blocks) => {
      if(!blocks.length) return false;

      let [hasUsefull, hasHarmfull] = [false,false]; 

      for( let blockId of blocks ) {
        if( [USEFULL, CONTR].includes( NetworkOperations.getBlockById(allBlocks, blockId).type)) hasUsefull = true; 
        if(NetworkOperations.getBlockById( allBlocks, blockId).type === HARMFULL) hasHarmfull = true; 
      }
      return (hasHarmfull && hasUsefull); 
    }
    const presContr = false; 
    const succsContr = checkBlockContr( NetworkOperations.getSuccessors(edges , blockId) );

    return (presContr || succsContr);
  }
}