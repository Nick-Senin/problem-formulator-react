import React, { useEffect, useState  } from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "../hooks/hooks";
import './BlockModal.css'; 

export const BlockModal = ({onSubmit , onDeny , isDisplayed}) => {
    
    const [ factor , setFactor ] = useState('');
    const [ factorType , setFactorType ] = useState(true); // true - USEFULL

    const [width , height] = useWindowSize(); 

    useEffect(()=>{
        setFactor('');
    }, [isDisplayed])

    function onChange(event){
        setFactor(event.target.value);
    }

    function onReadyClick(event){
        event.preventDefault();
        onSubmit(factor , factorType);
    }

    function onDenyClick(event){
        onDeny();
    }

    return (
        <div 
            className="modal_back" 
            style={{display:(isDisplayed?'flex':'none'),
                    width:width,
                    height:height}}
            onClick={onDenyClick} 
        > 
            <div 
                className="modal_pane"
                onClick={(e)=>{e.stopPropagation();} }
            >
                <input 
                    type='text' 
                    className="modal_input" 
                    value={factor} 
                    onChange={onChange} 
                    placeholder={'Введите название эффекта'}
                />
                <br/>
                <button type="submit" className="modal_submit" onClick={onReadyClick}>Готово</button>
                <input 
                    type='radio' 
                    className="modal_radio" 
                    checked={factorType} 
                    id='choice1'  
                    name={'new_block_type'}
                    onChange={(e)=>setFactorType(!factorType)}
                />
                <label htmlFor='choice1' className='modal modal_label'> Полезный </label>
                <input 
                    type='radio' 
                    className="modal_radio" 
                    checked={!factorType} 
                    id='choice2'  
                    name={'new_block_type'} 
                    onChange={(e)=>{setFactorType(!factorType)}}
                /> 
                <label htmlFor='choice2' className='label modal_label'> Вредный </label>
            </div>
        </div>
    ) 
}