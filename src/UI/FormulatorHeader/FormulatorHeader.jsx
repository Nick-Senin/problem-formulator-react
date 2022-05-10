import React from 'react';
import './FormulatorHeader.css'; 
import BlockGroup from '../BlockGroup/BlockGroup';
import ActionFormGroup from '../ActionFormGroup/ActionFormGroup';

const FormulatorHeader = ({onFormulate}) => {
    return (
        <div className='formulator_header'>
            <ActionFormGroup
                onFormulate={onFormulate}
            />
           <h1 className='title unselectable'>
               Формулятор задач 
           </h1>
        </div>
    ); 
}

/*
   background-image: url('../../../public/generate.svg');
   background-image: url('../../../public/plus.svg');
*/

export default FormulatorHeader; 