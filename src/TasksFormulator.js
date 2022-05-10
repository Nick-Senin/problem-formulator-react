import { CONTR, HARMFULL, INDUCE, PREVENT, USEFULL } from './constants/consts.js';  
import {NetworkUtils} from './Utils/NetworkUtils.js'; 

class TaskFormulator {
  static formulateTasksByBlock(block , blocks , edges ) { // тут именно блок

    // NetworkUtils.getSurroundings(block.id,HARMFULL,false,blocks,edges); 

    const induce_usefull =        NetworkUtils.getSurroundings(block.id,USEFULL,true,blocks,edges); 
    const induce_harmfull =       NetworkUtils.getSurroundings(block.id,HARMFULL,true,blocks,edges);
    const induced_from_usefull =  NetworkUtils.getSurroundings(block.id,USEFULL,false,blocks,edges);

    function wrapStrong ( str, color='green' , bold=true){
      return  '<strong style="color:' + color + '; ' + (bold?'font-weight:bold;':'') + '">' + str + '</strong>' 
    }

    let task_str = ''; 

    if ( block.type === HARMFULL ){   
      task_str =  'Найти путь предотвратить, устранить или ослабить ' +  wrapStrong( block.factor , '#B22222' );  

      if(  induced_from_usefull.length > 0 ) 
          task_str = task_str + ' при условии ' +  induced_from_usefull.map(elem => wrapStrong(elem)).join(' и '); 

      if(  induce_usefull.length > 0 )
          task_str = task_str + ' не мешающий реализовать ' + induce_usefull.map(elem => wrapStrong(elem)).join(' и '); 
    }

    if ( [USEFULL , CONTR].includes(block.type) ){
      task_str = 'Найти альтернативный путь осуществления ' + wrapStrong(block.factor); 

      if ( induced_from_usefull.length > 0 ) 
        task_str = task_str + ' не требующий одного или нескольких условий, включая ' + induced_from_usefull.map(elem => wrapStrong(elem)).join(' и '); 

      if ( induce_usefull.length > 0 ) 
        task_str = task_str + ' который обеспечивает ' +  induce_usefull.map(elem => wrapStrong(elem)).join(' и '); 

      if (  induce_harmfull.length > 0 ) 
        task_str = task_str + ' и не приводящее к ' + induce_harmfull.map(elem => wrapStrong(elem , '#B22222')).join(' и '); 

/*
      if ( prevent_harmfull.length > 0 )  
        task_str = task_str + ' или противодействие ' +  prevent_harmfull.map(elem => wrapStrong(elem , '#B22222')).join(' и '); 

      if ( prevented_from.length  > 0 ) 
        task_str = task_str + ' не подверженный действию **'+ prevented_from.join(" и ") + '**'; 

      if ( prevent_usefull.length  > 0 ) 
        task_str = task_str + ' или ' + prevent_usefull.map(elem => wrapStrong(elem)).join(' и '); 
*/
    }

    if ( block.type === CONTR ){
        task_str = 'Разрешить противоречие: '
        + wrapStrong( block.factor  , 'yellow') 
        + ' должно происходить, чтобы '
        +  induce_usefull.map(elem => wrapStrong(elem)).join(' и ') 
        + 'и не должно  происходить, чтобы не '
        +  induce_harmfull.map(elem => wrapStrong(elem , '#B22222')).join(' и '); 
    } 

    task_str += '.'; 

    return task_str; 

  }

  static formulateTasksSystem(blocks , edges) {
    let tasks_system = '';

    blocks.forEach( (block , index) => {
      tasks_system +='### Задача ' + (index+1) + "\n"; 
      tasks_system += TaskFormulator.formulateTasksByBlock(block , blocks , edges); 
      tasks_system += '\n\n#### Решения\n\n'; 
    }); 

    return tasks_system; 
  }
}

export default TaskFormulator; 
