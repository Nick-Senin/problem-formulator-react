import React from 'react';
import ActionGroup from '../ActionGroup/ActionGroup';
import './TasksSystemHeader.css'

const TasksSystemHeader  = ({onChangeMode}) => {
    return (
        <div className='tasks_header'>
            <ActionGroup 
                path={'../../../public/'} 
                btn1={'edit_mode.svg'}  
                btn2={'preview_mode.svg'} 
                onChangeMode = {onChangeMode}    
            /> 
            <h1 className='tasks_title unselectable' >Система задач</h1>
        </div>
    ); 
}

export default TasksSystemHeader; 