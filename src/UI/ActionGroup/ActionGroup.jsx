import React, { useEffect , useState} from "react";
import {useToggle} from '../../hooks/hooks.js'; 
import './ActionGroup.css'

const ActionGroup = function ({onChangeMode}){

    const [viewMode , toggleViewMode] = useToggle();  

    function onChangeMarkMode (event){
        onChangeMode(); 
        toggleViewMode(); 
    }

    return (
        <div 
            className="task-cont"
            onClick={onChangeMarkMode}
        >
            { !viewMode ?
            <div className="task-preview_mode task-action_block"/> 
            :
            <div className="task-edit_mode task-action_block" /> 
            }
        </div> 
    )
}

export default ActionGroup;  