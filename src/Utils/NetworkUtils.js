import { CONTR, HARMFULL, INDUCE, USEFULL } from '../constants/consts.js';  
import { NetworkOperations } from '../NetworkOperations/NetworkOperations.js';

export class NetworkUtils{
    static getSurroundings( initBlock , targetType , isOutgoing , blocks , edges){
        const targetBlockType = (targetType === HARMFULL) ? [HARMFULL] : [USEFULL , CONTR] ;

        if (isOutgoing) {
            return NetworkOperations.getSuccessors(edges, initBlock).filter( blockId => {
                return targetBlockType.includes( NetworkOperations.getBlockById( blocks,  blockId).type);
            }).map(blockId => {
                return NetworkOperations.getBlockById(blocks, blockId).factor; 
            })
        }else{
            return NetworkOperations.getPredcessors(edges, initBlock).filter( blockId => {
                return targetBlockType.includes( NetworkOperations.getBlockById(blocks, blockId).type);
            }).map(blockId => {
                return NetworkOperations.getBlockById(blocks, blockId).factor; 
            })
        }
    }

    static getDirectedEdge(startId, endId, edges){
        return edges.filter( edge => {
           return ((edge.startId === startId) && (edge.endId === endId));
        })[0];
    }
}
