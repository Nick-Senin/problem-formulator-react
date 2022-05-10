import { Group, Rect, Arrow } from "react-konva";
import { useSubscribe } from "../../hooks/hooks";
import { Fragment, useEffect, useState } from "react";
import { store } from "../../store";
import {truncVector} from '../../Utils/MathUtils.js';

export default function ArrowConnect({mouseX , mouseY}) { 

  const [isArrowBind , setArrowBind] = useState(false);
  const [points , setPoints] = useState({startPoint:{x:0, y:0}, endPoint:{x:0, y:0}});


  useEffect(()=>{
    if(!isArrowBind){
      return; 
    }

    setPoints(prev => {
      let newEnd = {x:+mouseX, y:+mouseY};
      newEnd = truncVector(prev.startPoint, newEnd, 15);

      return { startPoint:(prev.startPoint || 0) ,
                endPoint:({x:newEnd.x, y:newEnd.y} || 0)}
    });
  }, [mouseX , mouseY]); 


  useSubscribe(()=>{

    const state = store.getState().arrowBind;   

    setArrowBind(prev => state.isArrowBind);

    setPoints(prev => ({ 
        startPoint:(state.startPoint || 0),
        endPoint:(state.startPoint || 0) 
    }));
  })

  return (
    <Fragment>
      { isArrowBind ?
        <Arrow
          points={[ 
            points.startPoint.x || 0,  
            points.startPoint.y || 0,  
            points.endPoint.x || 0,  
            points.endPoint.y || 0  
          ]}
          fill="black"
          stroke="black"
          />
          :
        <Rect/>}
    </Fragment>
);
}