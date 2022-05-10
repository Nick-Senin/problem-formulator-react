import React from "react";
import './ActionFormGroup.css'

const ActionFormGroup = function ({onFormulate}){

/* ${imgs_props[elem]} */ 
    return (
        <div className="cont" onClick={()=>(onFormulate())}>
            <div className="generate_action action_block" /> 
        </div> 
    )
}
// 
export default ActionFormGroup;  